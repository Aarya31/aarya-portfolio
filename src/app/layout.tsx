import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aarya Prajapat | Software Engineer | Full Stack & AI Developer",
  description: "Official portfolio of Aarya Prajapat, a Software Engineer at TCS specialized in Full Stack Development, Java, Spring Boot, Angular, React, Machine Learning, and Data Analytics.",
  keywords: [
    "Aarya Prajapat",
    "Aarya Prajapat Portfolio",
    "Aarya Prajapat Software Engineer",
    "Aarya Prajapat TCS",
    "Full Stack Developer Nagpur",
    "Software Engineer Pune",
    "React Developer",
    "Spring Boot Developer",
    "Machine Learning Engineer Portfolio"
  ],
  authors: [{ name: "Aarya Prajapat", url: "https://github.com/Aarya31" }],
  creator: "Aarya Prajapat",
  openGraph: {
    title: "Aarya Prajapat | Software Engineer Portfolio",
    description: "Software Engineer at TCS with expertise in Full Stack Development, Machine Learning, Data Analytics, and enterprise systems.",
    url: "https://aarya-prajapat.vercel.app",
    siteName: "Aarya Prajapat Portfolio",
    type: "profile",
    images: [
      {
        url: "https://aarya-prajapat.vercel.app/portrait.jpg",
        width: 800,
        height: 800,
        alt: "Aarya Prajapat Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarya Prajapat | Software Engineer",
    description: "Software Engineer at TCS. specialized in Full Stack & AI.",
    images: ["https://aarya-prajapat.vercel.app/portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data Schema for Search Engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aarya Prajapat",
  "jobTitle": "Software Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Tata Consultancy Services"
  },
  "url": "https://aarya-prajapat.vercel.app",
  "sameAs": [
    "https://github.com/Aarya31",
    "https://www.linkedin.com/in/aarya-prajapat/"
  ],
  "knowsAbout": [
    "Software Engineering",
    "Full Stack Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Java",
    "Spring Boot",
    "Angular",
    "Next.js",
    "React"
  ],
  "email": "aaryaprajapat85@gmail.com",
  "telephone": "+919518301858"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen text-slate-100 antialiased relative font-sans">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
