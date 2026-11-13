"use client";

import { useState } from "react";
import type { Job } from "@/lib/jobs-data";
import { JobBoard } from "./JobBoard";
import { ApplicationForm } from "./ApplicationForm";

// Owns the one piece of state the two sections share: "Apply for This Role"
// in the job panel preselects the position and location in the form below.
export function CareersBoard({ jobs }: { jobs: Job[] }) {
  const [applyFor, setApplyFor] = useState<{ job: Job; nonce: number } | null>(
    null,
  );

  const handleApply = (job: Job) => {
    setApplyFor({ job, nonce: Date.now() });
    document
      .getElementById("apply")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <JobBoard jobs={jobs} onApply={handleApply} />
      <ApplicationForm jobs={jobs} preselect={applyFor} />
    </>
  );
}
