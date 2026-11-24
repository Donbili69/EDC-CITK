// Single source of truth for site-wide constants. Metadata, sitemap,
// footer links, and social URLs should all read from here rather than
// hardcoding strings in individual files — when EDC's domain or socials
// change, this is the only file that needs editing.
export const siteConfig = {
  name: "EDC CITK",
  // "EDC CITK" is the everyday name (institute norm). Use fullName only in formal contexts.
  fullName: "Entrepreneurship Development Club (EDC), CITK",
  institute: "Central Institute of Technology Kokrajhar",
  description:
    "The official digital home of the Entrepreneurship Development Club at CITK — events, initiatives, team, alumni and achievements.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edc-citk.example.edu",
  // TO CONFIRM: blueprint says 30 July 2022, club says 31 July 2022.
  // Change it here, and in lib/mock-data/timeline.json (first entry).
  established: "2022-07-30",
  social: {
    instagram: "",
    linkedin: "",
    twitter: "",
  },
};
