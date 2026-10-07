import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { SITE } from "@/data/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHeading title="Resume" subtitle="The one-page version of me." />
      <div className="page-pad flex-1 bg-sheet px-4 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        <a href={SITE.resume} download className="pill pill-filled py-2.5!">
          Download PDF
        </a>
        <a href={SITE.resume} target="_blank" rel="noreferrer" className="pill py-2.5!">
          Open in new tab
        </a>
      </div>
      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[28px] bg-card p-2 shadow-[0_20px_40px_-24px_rgba(31,34,53,0.5)]">
        <iframe src={`${SITE.resume}#view=FitH`} title="Michelle Xu's resume" className="h-[80vh] w-full rounded-xl bg-white" />
      </div>
      </div>
    </main>
  );
}
