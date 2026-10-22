import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, ClipboardCheck } from "lucide-react";
import { ASSESSMENTS } from "@/data/assessments";
import { useProgress } from "@/lib/progress";
import AssessmentRunner from "@/components/assessments/AssessmentRunner";
import AssessmentResults from "@/components/assessments/AssessmentResults";

/** Route: /lab/assessment/:experimentId/:testType (pre | post). */
export default function AssessmentPage() {
  const { experimentId, testType } = useParams();
  const { progress, submitAssessment, storageFailed } = useProgress();
  const [result, setResult] = useState(null);

  const meta = ASSESSMENTS[experimentId];
  if (!meta || !["pre", "post"].includes(testType)) {
    return <Navigate to="/lab" replace />;
  }

  const questions = testType === "pre" ? meta.preTest : meta.postTest;
  const label = testType === "pre" ? "Pre-Test" : "Post-Test";

  const handleFinish = (res) => {
    submitAssessment(experimentId, testType, res);
    setResult(res);
    window.scrollTo(0, 0);
  };

  const storedFor = (type) => progress.assessments?.[experimentId]?.[type]?.latest || null;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        to={meta.route}
        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> Back to {meta.title}
      </Link>

      <div className="flex items-center gap-2.5">
        <ClipboardCheck className="h-5 w-5 text-orange-400" />
        <div>
          <h1 className="font-heading text-xl font-bold tracking-tight md:text-2xl">
            {meta.title} — {label}
          </h1>
          <p className="text-xs text-muted-foreground">
            15 questions · fundamentals, application, prediction &amp; analysis · answers are not revealed until you submit
          </p>
        </div>
      </div>

      {storageFailed && (
        <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs font-medium text-destructive">
          Saving failed — this browser is blocking local storage, so your answers and score cannot be kept after you leave.
        </p>
      )}

      {result ? (
        <AssessmentResults
          meta={meta}
          testType={testType}
          result={result}
          questions={questions}
          pre={testType === "pre" ? result : storedFor("pre")}
          post={testType === "post" ? result : storedFor("post")}
          onRetake={() => setResult(null)}
        />
      ) : (
        <AssessmentRunner
          experimentId={experimentId}
          testType={testType}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}