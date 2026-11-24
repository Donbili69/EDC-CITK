import Link from "next/link";

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
    <footer className="border-t border-line bg-paper-dim text-ink">
      <div className="container-page grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-display-md font-medium">EDC CITK</div>
          <p className="mt-3 max-w-[32ch] text-small text-ink-600">
            Entrepreneurship Development Club, Central Institute of Technology Kokrajhar.
            Established 30 July 2022.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-micro uppercase tracking-wide text-ink-400">{col.title}</div>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-small text-ink-600 hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-micro text-ink-400 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} EDC CITK. All rights reserved.</span>
          <span>Built by the EDC CITK developer team.</span>
        </div>
      </div>
    </footer>
  );
}
