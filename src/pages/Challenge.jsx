import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, RefreshCw, BookOpen, Trophy } from "lucide-react";
import { QUESTIONS, TOPICS, DIFFICULTIES } from "@/data/questions";
import { fmt, todayIndex } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuestionCard({ q, index, total, streak, onAnswered }) {
  const { recordChallengeAnswer } = useProgress();
  const [given, setGiven] = useState(null);
  const [numericInput, setNumericInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const submit = () => {
    if (submitted) return;
    let isCorrect = false;
    if (q.type === "mcq") {
      if (given === null) return;
      isCorrect = given === q.answer;
    } else {
      const v = Number(numericInput.trim());
      if (!Number.isFinite(v)) return;
      isCorrect = Math.abs(v - q.answer) <= (q.tolerance || Math.abs(q.answer) * 0.02);
    }
    setWasCorrect(isCorrect);
    setSubmitted(true);
    onAnswered?.(q, isCorrect, q.type === "mcq" ? q.options[q.answer] : `${fmt(q.answer, 4)} ${q.unit}`, q.type === "mcq" ? (given !== null ? q.options[given] : null) : numericInput);
    recordChallengeAnswer({
      topic: q.topic, difficulty: q.difficulty, correct: isCorrect,
      streak: streak + (isCorrect ? 1 : 0),
      question: q.question, givenAnswer: q.type === "mcq" ? q.options[given] : numericInput,
    });
  };

  const topic = TOPICS.find((t) => t.id === q.topic);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
        <span className="rounded-md bg-secondary px-2 py-1 text-muted-foreground">Question {index + 1} / {total}</span>
        <span className="rounded-md bg-cyan-500/15 px-2 py-1 text-cyan-400">{topic?.label}</span>
        <span className={cn("rounded-md px-2 py-1",
          q.difficulty === "beginner" ? "bg-emerald-500/15 text-emerald-400" :
          q.difficulty === "intermediate" ? "bg-amber-500/15 text-amber-500" : "bg-destructive/15 text-destructive")}>
          {q.difficulty}
        </span>
      </div>
      <p className="text-sm font-medium leading-relaxed md:text-base">{q.question}</p>

      {q.type === "mcq" ? (
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, i) => {
            const isAnswer = submitted && i === q.answer;
            const isWrongPick = submitted && i === given && i !== q.answer;
            return (
              <button key={i} disabled={submitted}
                onClick={() => setGiven(i)}
                className={cn(
                  "rounded-lg border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                  submitted && isAnswer && "border-emerald-500/60 bg-emerald-500/15 text-emerald-300",
                  isWrongPick && "border-destructive/60 bg-destructive/10 text-destructive",
                  !submitted && given === i && "border-orange-500 bg-orange-500/15 text-orange-300",
                  !submitted && given !== i && "border-border bg-background hover:border-ring",
                  submitted && !isAnswer && !isWrongPick && "border-border bg-background text-muted-foreground"
                )}>
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text" inputMode="decimal" value={numericInput}
            onChange={(e) => setNumericInput(e.target.value)}
            disabled={submitted} placeholder="Your answer"
            aria-label="Numerical answer"
            className={cn("w-40 rounded-lg border bg-background px-3 py-2.5 font-mono text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-ring",
              submitted ? "border-border" : "border-input")}
          />
          <span className="text-sm text-muted-foreground">{q.unit}</span>
        </div>
      )}

      {!submitted ? (
        <button
          onClick={submit}
          disabled={q.type === "mcq" ? given === null : !numericInput.trim()}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check answer
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <div className={cn("flex items-start gap-2 rounded-lg border p-3 text-sm font-medium",
            wasCorrect ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-destructive/40 bg-destructive/10 text-destructive")}>
            {wasCorrect ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
            <span>Correct answer: {q.type === "mcq" ? q.options[q.answer] : `${fmt(q.answer, 4)} ${q.unit}`}</span>
          </div>
          <div className="rounded-lg border border-border bg-background p-3 text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Explanation: </span>{q.explanation}
          </div>
          {q.link && (
            <Link to={q.link} className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline">
              <BookOpen className="h-3.5 w-3.5" /> Investigate this concept in the Lab
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function Challenge() {
  const { progress } = useProgress();
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [session, setSession] = useState(null); // { questions, idx, score, streak, current }
  const [lastAnswer, setLastAnswer] = useState(null);

  const start = () => {
    const pool = QUESTIONS.filter((q) =>
      (topic === "all" || q.topic === topic) && (difficulty === "all" || q.difficulty === difficulty)
    );
    setSession({ questions: shuffle(pool).slice(0, 5), idx: 0, score: 0, streak: 0 });
    setLastAnswer(null);
  };

  const handleAnswered = (q, correct, answerShown, given) => {
    setSession((s) => ({ ...s, score: s.score + (correct ? 1 : 0), streak: correct ? s.streak + 1 : 0 }));
    setLastAnswer({ correct, answerShown, given });
  };

  const next = () => {
    setSession((s) => {
      if (s.idx + 1 >= s.questions.length) return { ...s, finished: true };
      return { ...s, idx: s.idx + 1 };
    });
    setLastAnswer(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Engineering Challenge</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Prediction, assumptions, and interpretation questions from a curated, hand-verified bank — not randomly generated equations.
        </p>
      </div>

      {!session && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Topic</span>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All topics</option>
                {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="all">All levels</option>
                {DIFFICULTIES.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </label>
          </div>
          <button onClick={start} className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
            <RefreshCw className="h-4 w-4" /> Start challenge (5 questions)
          </button>
        </div>
      )}

      {session && !session.finished && (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold">
            <span className="text-muted-foreground">Score: <span className="text-cyan-400">{session.score}</span> / {session.idx + (lastAnswer ? 1 : 0)}</span>
            <span className="text-muted-foreground">Streak: <span className="text-orange-400">{session.streak}</span></span>
          </div>
          <QuestionCard key={session.idx} q={session.questions[session.idx]} index={session.idx} total={session.questions.length} streak={session.streak} onAnswered={handleAnswered} />
          {lastAnswer && (
            <button onClick={next} className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
              {session.idx + 1 >= session.questions.length ? "Finish" : "Next question"} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {session && session.finished && (
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.07] p-6 text-center">
          <Trophy className="mx-auto h-8 w-8 text-orange-400" />
          <div className="mt-2 font-heading text-xl font-bold">Challenge complete</div>
          <div className="mt-1 font-mono text-3xl font-bold text-cyan-300">{session.score} / {session.questions.length}</div>
          <p className="mt-2 text-sm text-muted-foreground">
            {session.score === session.questions.length ? "Perfect run — every answer explained below." : "Read the explanations above before trying again; wrong answers teach the most."}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={start} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">Play again</button>
            <button onClick={() => setSession(null)} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Change settings</button>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Review — previously answered questions</h2>
        {progress.review.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing yet — your last 25 answered questions will appear here with results.</p>
        ) : (
          <ul className="space-y-2">
            {progress.review.slice(0, 10).map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-background p-3">
                {r.correct ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                <div>
                  <div className="text-xs leading-relaxed text-foreground">{r.question}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    Your answer: {r.givenAnswer || "—"} · {r.topic} · {r.difficulty}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}