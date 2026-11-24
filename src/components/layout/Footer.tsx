import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { formatDate } from "@/lib/utils/format";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/events", label: "Events" },
      { href: "/initiatives", label: "Initiatives" },
      { href: "/ecosystem", label: "Ecosystem" },
    ],
  },
  {
    title: "People",
    links: [
      { href: "/team", label: "Team" },
      { href: "/alumni", label: "Alumni" },
      { href: "/achievements", label: "Achievements" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/connect", label: "Join EDC" },
      { href: "/connect", label: "Collaborate" },
      { href: "/connect", label: "Become a mentor" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-on-panel/15 bg-panel text-on-panel">
      <div className="container-page grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-display-md font-medium">EDC CITK</div>
          <p className="mt-3 max-w-[32ch] text-small text-on-panel/60">
            {siteConfig.fullName}, {siteConfig.institute}. Established{" "}
            {formatDate(siteConfig.established)}.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-micro uppercase tracking-wide text-on-panel/40">{col.title}</div>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-small text-on-panel/80 hover:text-on-panel">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-on-panel/15">
        <div className="container-page flex flex-col gap-2 py-5 text-micro text-on-panel/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} EDC CITK. All rights reserved.</span>
          <span>Built by the EDC CITK developer team.</span>
        </div>
      </div>
    </footer>
  );
}
