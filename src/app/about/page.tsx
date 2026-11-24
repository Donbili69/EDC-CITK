import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { getAboutContent, getTimeline } from "@/lib/api/about";

export const metadata: Metadata = {
  title: "About",
  description: "About the Entrepreneurship Development Club, CITK: vision, mission, objectives and journey since 30 July 2022.",
};

export default async function AboutPage() {
  const [about, timeline] = await Promise.all([getAboutContent(), getTimeline()]);

  return (
    <>
      <section className="grid-field border-b border-line">
        <div className="container-page py-16 md:py-24">
          <p className="text-small text-ink-600">About EDC CITK</p>
          <h1 className="mt-2 max-w-[22ch] text-display-lg font-medium md:text-display-xl">
            {about.headline}
          </h1>
          <p className="mt-5 max-w-prose text-ink-600">{about.intro}</p>
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-display-md font-medium">Vision</h2>
            <p className="mt-3 max-w-prose text-ink-600">{about.vision}</p>
          </div>
          <div>
            <h2 className="text-display-md font-medium">Mission</h2>
            <p className="mt-3 max-w-prose text-ink-600">{about.mission}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-display-md font-medium">Objectives</h2>
          <ul className="mt-6 divide-y divide-line border border-line">
            {about.objectives.map((o) => (
              <li key={o} className="px-5 py-4 text-ink-600">
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-display-md font-medium">What EDC does</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {about.whatWeDo.map((item) => (
              <div key={item.title} className="border border-line p-5">
                <h3 className="text-body font-medium">{item.title}</h3>
                <p className="mt-1 text-small text-ink-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-display-md font-medium">Our journey</h2>
          <p className="mt-2 max-w-prose text-small text-ink-600">
            From 30 July 2022 to today. Select a milestone to read more.
          </p>
          <div className="mt-8">
            <JourneyTimeline milestones={timeline} />
          </div>
        </div>
      </section>
    </>
  );
}
