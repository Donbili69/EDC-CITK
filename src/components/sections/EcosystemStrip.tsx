const nodes = ["Students", "Ideas", "EDC", "Mentorship", "Industry", "Startups", "Alumni"];

// V1: a static labeled flow. The interactive version (hover to expand each
// node, click through to related content) is Sprint 4 work — see the
// Ecosystem page, which gets its own dedicated interactive component.
export function EcosystemStrip() {
  return (
    <section className="border-b border-line bg-paper-dim py-16 text-ink md:py-20">
      <div className="container-page">
        <h2 className="text-display-md font-medium">The EDC ecosystem</h2>
        <p className="mt-2 max-w-prose text-small text-ink-600">
          A continuous loop, not a funnel. Every stage feeds back into the next cohort of ideas.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-4">
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span className="border border-ink/20 px-4 py-2 text-small">{node}</span>
              {i < nodes.length - 1 && <span className="text-ink-400">&rarr;</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
