import type { Member } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function TeamPreview({ members }: { members: Member[] }) {
  return (
    <section className="border-b border-line py-16 md:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <h2 className="text-display-md font-medium">Core team</h2>
          <Button href="/team" variant="ghost" className="hidden px-0 md:inline-flex">
            Meet the full team
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="text-center">
              <div className="mx-auto h-20 w-20 bg-ink/5" aria-hidden="true" />
              <div className="mt-3 text-small font-medium">{member.name}</div>
              <div className="text-micro text-ink-600">{member.role}</div>
            </div>
          ))}
        </div>

        <Button href="/team" variant="ghost" className="mt-6 w-full md:hidden">
          Meet the full team
        </Button>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="max-w-[20ch] text-display-md font-medium">
          Have an idea? There&rsquo;s a place for it here.
        </h2>
        <div className="flex shrink-0 gap-3">
          <Button href="/connect" variant="primary">
            Join EDC
          </Button>
          <Button href="/connect" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
