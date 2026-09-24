export default function robots() {
  const baseUrl = "https://shibin-portfolio.vercel.app"; // Replace with your production domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
