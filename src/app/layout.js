import Providers from "@/components/Providers";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://shibin-portfolio.vercel.app"),
  title: {
    default: "Shibin Siyad",
    template: "%s | Shibin Siyad",
  },
  description:
    "Portfolio of Shibin Siyad — Full Stack Developer specializing in React, Next.js, Node.js, Express, MongoDB, and high-performance modern web applications.",
  keywords: [
    "Shibin Siyad",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Software Engineer",
    "Web Developer Portfolio",
    "Kerala Web Developer",
  ],
  authors: [{ name: "Shibin Siyad", url: "https://github.com/siyzz07" }],
  creator: "Shibin Siyad",
  publisher: "Shibin Siyad",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shibin-portfolio.vercel.app",
    title: "Shibin Siyad",
    description:
      "Explore the portfolio of Shibin Siyad — high-performance full-stack applications, scalable architectures, and interactive digital experiences.",
    siteName: "Shibin Siyad",
    images: [
      {
        url: "/pro.png",
        width: 1200,
        height: 630,
        alt: "Shibin Siyad Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shibin Siyad",
    description:
      "Explore the portfolio of Shibin Siyad — high-performance full-stack applications and scalable architectures.",
    images: ["/pro.png"],
    creator: "@shibin_siyad__",
  },
  icons: {
    icon: "/pro.png",
    shortcut: "/pro.png",
    apple: "/pro.png",
  },
};

export const viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  // Schema.org Structured Data (JSON-LD) for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shibin Siyad",
    jobTitle: "Full Stack Developer",
    url: "https://shibin-portfolio.vercel.app",
    sameAs: [
      "https://github.com/siyzz07",
      "https://www.linkedin.com/in/shibin-siyad-k/",
      "https://www.instagram.com/shibin_siyad__",
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Full Stack Development",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/pro.png" />
        <link rel="shortcut icon" type="image/png" href="/pro.png" />
        <link rel="apple-touch-icon" href="/pro.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-foreground antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
