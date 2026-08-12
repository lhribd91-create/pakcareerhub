"use client";

import { useEffect, useState } from "react";

export default function McqsPage() {
  const [mcqs, setMcqs] = useState([]);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    fetch("/api/data/mcqs")
      .then((r) => r.json())
      .then((d) => setMcqs(d.items || []));
  }, []);

  return (
    <div className="container-px max-w-3xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MCQ Practice</h1>
        <p className="text-[var(--muted)]">Practice multiple choice questions for test preparation.</p>
      </div>

      {mcqs.length === 0 ? (
        <div className="card p-12 text-center text-[var(--muted)]">No MCQs available yet.</div>
      ) : (
        <div className="space-y-5">
          {mcqs.map((mcq, i) => (
            <div key={mcq.id} className="card p-6">
              <p className="font-semibold mb-3">{i + 1}. {mcq.question}</p>
              <div className="space-y-2 mb-3">
                {mcq.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      revealed[mcq.id] && idx === mcq.correctIndex
                        ? "border-[var(--green)] bg-[var(--green)]/10 font-semibold"
                        : "border-[var(--line)]"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setRevealed((r) => ({ ...r, [mcq.id]: true }))}
                className="text-sm font-semibold text-[var(--green)]"
              >
                Show Answer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
