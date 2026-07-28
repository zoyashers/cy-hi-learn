import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yourdomain.com";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/pricing`, lastModified: new Date() },
    { url: `${base}/compare`, lastModified: new Date() },
    { url: `${base}/preview`, lastModified: new Date() },
    { url: `${base}/universities/request-demo`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
  ];
}
