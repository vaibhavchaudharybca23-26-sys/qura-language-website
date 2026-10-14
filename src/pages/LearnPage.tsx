import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Terminal,
  Code,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { learnData } from '../data/learnData';
import { CodeBlock } from '../components/CodeBlock';
import { TutorialStep } from '../types';

export const LearnPage: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep: TutorialStep = learnData[activeStepIndex] || learnData[0];
  const prevStep = activeStepIndex > 0 ? learnData[activeStepIndex - 1] : null;
  const nextStep = activeStepIndex < learnData.length - 1 ? learnData[activeStepIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>12-Step Guided Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Learn Qura from First Principles
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          A step-by-step developer tutorial covering environment setup, basic syntax, native compilation, loop state
          accumulation, and Visual Studio Code integration.
        </p>
      </div>

      {/* Main Layout: Step Navigator Sidebar + Active Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Step navigation menu */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-2">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-xs space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 block mb-2 font-mono">
              Course Outline
            </span>
            {learnData.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{step.title}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Current Lesson Content */}
        <main className="lg:col-span-8 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
            {/* Step badge & progress */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                Lesson {currentStep.step} of {learnData.length}
              </span>
              {currentStep.referenceLink && (
                <Link
                  href={currentStep.referenceLink}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Reference Docs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {currentStep.title}
            </h2>

            {/* Objective & Prerequisites */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Learning Objective:</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentStep.objective}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Prerequisites:</span>
                </span>
                <ul className="text-slate-600 dark:text-slate-300 space-y-0.5 ml-4 list-disc">
                  {currentStep.prerequisites.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* In-depth explanation */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {currentStep.explanation}
            </div>

            {/* Code Example */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                Code Snippet:
              </span>
              <CodeBlock code={currentStep.code} language={currentStep.step === 2 || currentStep.step === 10 ? 'powershell' : 'qura'} showLineNumbers={true} />
            </div>

            {/* Verified output / exit code */}
            {currentStep.verifiedOutput && (
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Verified Compiler Output:</span>
                  </span>
                  {currentStep.verifiedExitCode !== undefined && (
                    <span className="text-emerald-400">Exit Code: {currentStep.verifiedExitCode}</span>
                  )}
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap">{currentStep.verifiedOutput}</pre>
              </div>
            )}

            {/* Common Mistakes */}
            {currentStep.commonMistakes && currentStep.commonMistakes.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Common Pitfalls to Avoid:</span>
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 ml-5 list-disc">
                  {currentStep.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next / Prev Navigation Bar */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              {prevStep ? (
                <button
                  onClick={() => {
                    setActiveStepIndex(activeStepIndex - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous: {prevStep.title}</span>
                </button>
              ) : (
                <div />
              )}

              {nextStep ? (
                <button
                  onClick={() => {
                    setActiveStepIndex(activeStepIndex + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer ml-auto"
                >
                  <span>Next: {nextStep.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/examples"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors ml-auto"
                >
                  <span>Complete Course: View Examples</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
