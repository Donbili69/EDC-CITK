// Single source of truth for site-wide constants. Metadata, sitemap,
// footer links, and social URLs should all read from here rather than
// hardcoding strings in individual files — when EDC's domain or socials
// change, this is the only file that needs editing.
export const siteConfig = {
  name: "EDC CITK",
  fullName: "Entrepreneurship Development Club, CITK",
  description:
    "The official digital home of the Entrepreneurship Development Club at CITK — events, initiatives, team, alumni and achievements.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edc-citk.example.edu",
  established: "2022-07-30",
  social: {
    instagram: "",
    linkedin: "",
    twitter: "",
  },
};
