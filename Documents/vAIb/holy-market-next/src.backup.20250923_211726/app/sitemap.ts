import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://holy-market-next.vercel.app";
  const paths = ["/", "/about", "/dashboard", "/company", "/profile", "/search"];
  return paths.map((p) => ({ url: `${baseUrl}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.6 }));
}

