import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Code,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { syntaxData } from '../data/syntaxData';
import { CodeBlock } from '../components/CodeBlock';
import { SyntaxTopic } from '../types';

export const SyntaxPage: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(syntaxData[0].id);

  const activeTopic = syntaxData.find((t) => t.id === selectedTopicId) || syntaxData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Code className="w-3.5 h-3.5" />
          <span>Interactive Language Syntax Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Syntax Reference & Diagnostics
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore the exact syntax and semantics verified in Qura v0.1.0-alpha. Learn valid constructs and understand how
          the compiler catches common mistakes before code generation.
        </p>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        {syntaxData.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedTopicId === topic.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* Main Topic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Code and Rules */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                {activeTopic.category}
              </span>
              {activeTopic.docLink && (
                <Link
                  href={activeTopic.docLink}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Read chapter in Docs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{activeTopic.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeTopic.explanation}
            </p>

            {/* Main Code Block */}
            <CodeBlock code={activeTopic.code} language="qura" showLineNumbers={true} />

            {/* Restrictions */}
            {activeTopic.restrictions && activeTopic.restrictions.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Enforced Constraints in v0.1.0-alpha:</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-6 list-disc">
                  {activeTopic.restrictions.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Correct vs Incorrect Compiler Comparison */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Compiler Behavior Comparison
            </h3>

            {/* Correct Example */}
            {activeTopic.correctExample && (
              <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Correct Usage (Compiles Cleanly)</span>
                </div>
                <CodeBlock
                  code={activeTopic.correctExample.code}
                  language="qura"
                  className="my-1 border-emerald-200/60 dark:border-emerald-800/60"
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {activeTopic.correctExample.explanation}
                </p>
              </div>
            )}

            {/* Incorrect Example */}
            {activeTopic.incorrectExample && (
              <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Rejected by Compiler (Semantic Error)</span>
                </div>
                <CodeBlock
                  code={activeTopic.incorrectExample.code}
                  language="qura"
                  className="my-1 border-rose-200/60 dark:border-rose-800/60"
                />
                <div className="p-2.5 rounded-lg bg-slate-900 text-rose-400 font-mono text-[11px] overflow-x-auto">
                  {activeTopic.incorrectExample.error}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {activeTopic.incorrectExample.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
