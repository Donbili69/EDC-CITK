import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

// Static routes for now. Once Events/Initiatives/Alumni pages are built,
// extend this by fetching slugs through lib/api and mapping them to entries,
// the same way UpcomingEvents.tsx consumes lib/api/events.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/events", "/initiatives", "/ecosystem", "/team", "/alumni", "/achievements", "/connect"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
