import Image from "next/image";

import { PageWrapper, Section } from "@/components/layout";

const programs = [
  { logo: "https://github.com/user-attachments/assets/e0a40d06-f5b8-42a7-a5a0-033280f842be", alt: "IEEE IGDTUW Logo", badge: "Open Source Week", title: "IEEE IGDTUW", desc: "A week-long intensive event aimed at fostering global collaboration and high-level skill-building in the open-source ecosystem." },
  { logo: "https://github.com/user-attachments/assets/2b03167c-a598-48be-9f93-66130e58ec00", alt: "Vultr Logo", badge: "Cloud Hackathon", title: "Vultr Cloud Innovate", desc: "Harnessing high-performance cloud infrastructure to develop scalable solutions for real-world problems using Vultr's computing and networking power." },
  { logo: "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png", alt: "GSSoC Logo", badge: "Summer 2024", title: "GirlScript Summer of Code", desc: "A massive three-month initiative focused on bringing beginners into the world of open-source software development through expert mentorship." },
  { logo: "https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png", alt: "GSSoC Logo", badge: "Summer 2026", title: "GirlScript Summer of Code 2026", desc: "A large-scale open-source program that provides mentorship, real-world project experience, and collaboration opportunities for contributors worldwide." },
];

/** Static "Programs Participated In" section — server rendered. */
export default function ProgramsSection() {
  return (
    <Section id="programs" className="scroll-reveal">
      <PageWrapper>
        <h2>Programs Participated In</h2>
        <p className="center">We are proud to have collaborated with and contributed to these prestigious tech and open-source initiatives</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 w-full">
          {programs.map((p, i) => (
            <div className="program-card w-full fade-in" key={i}>
              <div className="program-logo-wrapper">
                <Image
                  src={p.logo}
                  alt={p.alt}
                  width={180}
                  height={80}
                  sizes="180px"
                  className="program-logo"
                />
              </div>
              <span className="program-badge">{p.badge}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </PageWrapper>
    </Section>
  );
}
