import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { readRecords, SessionRecord, ViewRecord, EventRecord } from "@/lib/db";
import { getContactMessages } from "@/lib/contact_db";

export async function GET() {
  try {
    // 1. Verify Session Authenticated
    const cookieStore = await cookies();
    const token = cookieStore.get("analytics_session")?.value;
    if (!verifySessionToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch all raw logs
    const sessions = await readRecords<SessionRecord>("sessions.jsonl");
    const views = await readRecords<ViewRecord>("views.jsonl");
    const events = await readRecords<EventRecord>("events.jsonl");
    const contactMessages = await getContactMessages();

    // 3. Aggregate General Stats
    const uniqueVisitors = new Set(sessions.map((s) => s.id)).size;
    const totalPageViews = views.filter((v) => v.type === "page").length;
    
    // Calculate session durations (sum of duration of all views/heartbeats per session)
    const sessionDurations: { [sessionId: string]: number } = {};
    views.forEach((v) => {
      sessionDurations[v.sessionId] = (sessionDurations[v.sessionId] || 0) + v.duration;
    });

    const durationValues = Object.values(sessionDurations);
    const avgSessionDuration = durationValues.length > 0
      ? Math.round(durationValues.reduce((a, b) => a + b, 0) / durationValues.length)
      : 0;

    const contactSubmissions = events.filter((e) => e.eventName === "contact_submit").length;

    // Bounce Rate: Session with only 1 view/action AND total duration < 15 seconds
    const sessionActionCounts: { [sessionId: string]: number } = {};
    views.forEach((v) => {
      sessionActionCounts[v.sessionId] = (sessionActionCounts[v.sessionId] || 0) + 1;
    });
    
    let bounces = 0;
    const uniqueSessionIds = Object.keys(sessionActionCounts);
    uniqueSessionIds.forEach((sid) => {
      const actions = sessionActionCounts[sid];
      const dur = sessionDurations[sid] || 0;
      if (actions <= 1 && dur < 15) {
        bounces++;
      }
    });

    const bounceRate = uniqueSessionIds.length > 0
      ? Math.round((bounces / uniqueSessionIds.length) * 100)
      : 0;

    // Active Visitors in last 5 minutes
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const activeSessionIds = new Set<string>();
    
    // Check sessions, views or events in last 5 minutes
    views.forEach((v) => {
      if (new Date(v.timestamp).getTime() > fiveMinutesAgo) {
        activeSessionIds.add(v.sessionId);
      }
    });
    events.forEach((e) => {
      if (new Date(e.timestamp).getTime() > fiveMinutesAgo) {
        activeSessionIds.add(e.sessionId);
      }
    });
    sessions.forEach((s) => {
      const activeTime = s.lastActive ? new Date(s.lastActive).getTime() : new Date(s.startTime).getTime();
      if (activeTime > fiveMinutesAgo) {
        activeSessionIds.add(s.id);
      }
    });

    const activeVisitors = activeSessionIds.size;

    // 4. Daily Timeline (Last 14 days)
    const dailyData: { [date: string]: { date: string; views: number; visitors: Set<string> } } = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      dailyData[dateStr] = { date: dateStr, views: 0, visitors: new Set() };
    }

    views.forEach((v) => {
      const dateStr = new Date(v.timestamp).toISOString().split("T")[0];
      if (dailyData[dateStr]) {
        if (v.type === "page") {
          dailyData[dateStr].views++;
        }
        dailyData[dateStr].visitors.add(v.sessionId);
      }
    });

    sessions.forEach((s) => {
      const dateStr = new Date(s.startTime).toISOString().split("T")[0];
      if (dailyData[dateStr]) {
        dailyData[dateStr].visitors.add(s.id);
      }
    });

    const timeline = Object.values(dailyData).map((d) => ({
      date: d.date,
      views: d.views,
      visitors: d.visitors.size,
    }));

    // 5. Section Scroll Depth Analysis
    const sectionCounts: { [sectionName: string]: Set<string> } = {};
    views.forEach((v) => {
      if (v.type === "section" && v.path.startsWith("#")) {
        const sectionName = v.path.toUpperCase().substring(1);
        if (!sectionCounts[sectionName]) {
          sectionCounts[sectionName] = new Set();
        }
        sectionCounts[sectionName].add(v.sessionId);
      }
    });
    const sections = Object.entries(sectionCounts)
      .map(([name, visitorSet]) => ({
        name,
        visitors: visitorSet.size,
      }))
      .sort((a, b) => b.visitors - a.visitors);

    // 6. Breakdowns (Technology, Referrer, Location)
    const browsers: { [key: string]: number } = {};
    const os: { [key: string]: number } = {};
    const devices: { [key: string]: number } = {};
    const countries: { [key: string]: number } = {};
    const referrers: { [key: string]: number } = {};

    sessions.forEach((s) => {
      browsers[s.browser] = (browsers[s.browser] || 0) + 1;
      os[s.os] = (os[s.os] || 0) + 1;
      devices[s.device] = (devices[s.device] || 0) + 1;
      countries[s.country] = (countries[s.country] || 0) + 1;
      referrers[s.referrer] = (referrers[s.referrer] || 0) + 1;
    });

    const formatBreakdown = (obj: { [key: string]: number }) =>
      Object.entries(obj)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    // 7. Sort Contact Messages descending by timestamp
    const sortedMessages = [...contactMessages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      stats: {
        totalViews: totalPageViews,
        uniqueVisitors,
        activeVisitors,
        avgSessionDuration,
        contactSubmissions,
        bounceRate,
      },
      timeline,
      sections,
      breakdowns: {
        browsers: formatBreakdown(browsers),
        os: formatBreakdown(os),
        devices: formatBreakdown(devices),
        countries: formatBreakdown(countries),
        referrers: formatBreakdown(referrers),
      },
      contactMessages: sortedMessages,
    });
  } catch (error: unknown) {
    console.error("Error aggregating analytics data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
