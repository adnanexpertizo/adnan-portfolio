"use client";

import type React from "react";
import { cn } from "@/lib/utils";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold tracking-wide text-[color:var(--color-chart-2)] uppercase">
      {children}
    </h2>
  );
}

function HR() {
  return <hr className="border-t border-border my-1" />;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-3">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-chart-2)]"
      />
      <span>{children}</span>
    </li>
  );
}

export default function CVTemplate() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Action bar - hidden in print */}
      <div className="print:hidden sticky top-0 z-10 w-full max-w-[820px]">
        <div className="flex items-center justify-end">
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-md bg-[color:var(--color-chart-2)] text-white text-sm"
            aria-label="Download as PDF"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* A4 sheet */}
      <article
        id="cv-sheet"
        className={cn(
          "bg-card text-card-foreground shadow-sm",
          "md:px-5 md:py-4 p-2 border border-border print:w-[1000px] w-full max-w-[820px]",
          "rounded-lg flex flex-col gap-3",
          "print:shadow-none print:border-0 print:rounded-none"
        )}
      >
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold text-primary">Adnan Rafiq</h1>
          <p className="text-sm text-muted-foreground">Safety Officer</p>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Pakistan</span>
            <span className="text-border">|</span>
            <span>+92 000 2728975</span>
            <span className="text-border">|</span>
            <span>adnanrafiq@email.com</span>
          </div>

          <div className="mt-1">
            <a
              href="https://adnan-portfolio-seven.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1 text-xs text-primary hover:bg-muted print:no-underline"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-chart-2)]" />
              Portfolio: adnan-portfolio-seven.vercel.app
            </a>
          </div>
        </header>

        <div className="my-2">
          <HR />
        </div>

        {/* Summary */}
        <section aria-labelledby="summary">
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-1 text-sm leading-snug text-foreground/90">
            NEBOSH certified Safety Officer with extensive experience in
            workplace safety, audits, and compliance. Proficient in hazard
            identification, risk assessments, and incident investigations with a
            strong focus on training and communication. Known for implementing
            practical corrective actions and cross-functional collaboration to
            achieve measurable reductions in workplace incidents.
          </p>
        </section>

        <div className="my-2">
          <HR />
        </div>

        {/* Work Experience */}
        <section aria-labelledby="work">
          <SectionTitle>Work experience</SectionTitle>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">
                  Industrial Construction Ltd, Dubai, AE
                </p>
                <p className="text-xs text-muted-foreground">Safety Officer</p>
              </div>
              <div className="text-xs text-muted-foreground">
                2021-08 — present
              </div>
            </div>
            <div className="px-3 pb-1.5">
              <ul className="space-y-0.5 text-sm">
                <Bullet>
                  Led daily toolbox talks, site inspections, and permit-to-work
                  systems.
                </Bullet>
                <Bullet>
                  Reduced incident rate by 28% through hazard reporting and
                  corrective actions.
                </Bullet>
                <Bullet>
                  Collaborated with engineering and construction teams on
                  project safety plans.
                </Bullet>
              </ul>
            </div>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">
                  Peshawar Metro (BRT), Peshawar, PK
                </p>
                <p className="text-xs text-muted-foreground">Safety Officer</p>
              </div>
              <div className="text-xs text-muted-foreground">2019-04 — 2020-12</div>
            </div>
            <div className="px-3 pb-1.5">
              <ul className="space-y-0.5 text-sm">
                <Bullet>
                  Developed risk assessments and method statements for civil
                  activities.
                </Bullet>
                <Bullet>
                  Conducted incident investigations and implemented
                  corrective/preventive actions.
                </Bullet>
                <Bullet>
                  Trained 200+ workers on PPE, working at heights, and emergency
                  response.
                </Bullet>
              </ul>
            </div>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">
                  Macro Construction Group, Abu Dhabi, AE
                </p>
                <p className="text-xs text-muted-foreground">HSE Officer</p>
              </div>
              <div className="text-xs text-muted-foreground">2018-01 — 2019-03</div>
            </div>
            <div className="px-3 pb-1.5">
              <ul className="space-y-0.5 text-sm">
                <Bullet>
                  Supported site safety rounds and audits to ensure compliance.
                </Bullet>
                <Bullet>
                  Implemented safe lifting, scaffolding, and confined space
                  entry practices.
                </Bullet>
                <Bullet>
                  Maintained safety records, monitoring KPIs and closing
                  actions.
                </Bullet>
              </ul>
            </div>
          </div>
        </section>

        <div className="my-2">
          <HR />
        </div>

        {/* Education */}
        <section aria-labelledby="education">
          <SectionTitle>Education</SectionTitle>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">Safety Institute of Excellence</p>
                <p className="text-xs text-muted-foreground">
                  NEBOSH International General Certificate
                </p>
              </div>
              <div className="text-xs text-muted-foreground">2020-04</div>
            </div>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">University of Karachi</p>
                <p className="text-xs text-muted-foreground">Bachelor of Arts</p>
              </div>
              <div className="text-xs text-muted-foreground">2017-09</div>
            </div>
          </div>

          <div className="mt-2 border border-dashed border-border rounded-md cv-card">
            <div className="flex items-start justify-between gap-3 p-1.5">
              <div>
                <p className="text-sm font-medium">University of Peshawar</p>
                <p className="text-xs text-muted-foreground">
                  Intermediate (Pre-Engineering)
                </p>
              </div>
              <div className="text-xs text-muted-foreground">2015-04</div>
            </div>
          </div>
        </section>

        <div className="my-2">
          <HR />
        </div>

        {/* Qualifications */}
        <section aria-labelledby="qualifications">
          <SectionTitle>Qualifications</SectionTitle>
          <ul className="mt-1 space-y-0.5 text-sm">
            <Bullet>NEBOSH IGC</Bullet>
            <Bullet>IOSH Managing Safely</Bullet>
            <Bullet>
              Risk & Hazard Assessment, Incident Investigation & Reporting
            </Bullet>
            <Bullet>
              Emergency Response, Working at Heights, Scaffolding Safety
            </Bullet>
            <Bullet>H2S Awareness, First Aid & CPR</Bullet>
          </ul>
        </section>

        <div className="my-2">
          <HR />
        </div>

        {/* Certifications */}
        <section aria-labelledby="certifications">
          <SectionTitle>Certifications</SectionTitle>
          <ul className="certs-grid mt-1 grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-y-0.5 print:gap-x-4 text-sm">
            <li>NEBOSH IGC (1,2,3)</li>
            <li>IOSH Managing Safely</li>
            <li>Fire Safety & Prevention</li>
            <li>First Aid & CPR</li>
            <li>Scaffolding Safety</li>
            <li>Confined Space Entry</li>
            <li>H2S Awareness</li>
            <li>Risk Assessment</li>
          </ul>
        </section>

        <div className="mt-3 print:hidden">
          <div className="inline-flex rounded-md border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
            Add section
          </div>
        </div>
      </article>
    </div>
  );
}
