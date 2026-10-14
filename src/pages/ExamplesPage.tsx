import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Code,
  Terminal,
  ExternalLink,
  ChevronRight,
  Download,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { examplesData } from '../data/examplesData';
import { CodeBlock } from '../components/CodeBlock';
import { ExampleProgram } from '../types';

export const ExamplesPage: React.FC = () => {
  const [selectedExampleId, setSelectedExampleId] = useState<string>(examplesData[0].id);

  const activeExample: ExampleProgram =
    examplesData.find((ex) => ex.id === selectedExampleId) || examplesData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Code className="w-3.5 h-3.5" />
          <span>Verified Repository Programs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Examples & Canonical Programs
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore complete programs directly verified against the Qura native compiler. Every example compiles to an
          x86_64 Windows executable without warnings or errors.
        </p>
      </div>

      {/* Example Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {examplesData.map((example) => {
          const isSelected = example.id === selectedExampleId;
          return (
            <div
              key={example.id}
              onClick={() => setSelectedExampleId(example.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-md shadow-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  {example.category}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Exit {example.verifiedExitCode}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{example.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{example.description}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Example Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Code block */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-slate-600 dark:text-slate-400">
              Source: <span className="text-indigo-600 dark:text-indigo-400">{activeExample.filename}</span>
            </span>
            <div className="flex items-center gap-3">
              <a
                href={activeExample.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Open on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`/examples/${activeExample.filename}`}
                download={activeExample.filename}
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Download className="w-3 h-3" />
                <span>Raw File</span>
              </a>
            </div>
          </div>

          <CodeBlock
            code={activeExample.code}
            language="qura"
            title={activeExample.filename}
            showLineNumbers={true}
          />
        </div>

        {/* Info & Output Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono">
                {activeExample.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                {activeExample.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {activeExample.description}
              </p>
            </div>

            {/* Verified Execution Panel */}
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Execution Result:</span>
                </span>
                <span className="text-emerald-400 font-bold">
                  Exit: {activeExample.verifiedExitCode}
                </span>
              </div>
              {activeExample.verifiedOutput ? (
                <div>
                  <span className="text-slate-500 block mb-1 text-[11px]">Stdout:</span>
                  <pre className="text-slate-200 text-xs whitespace-pre-wrap">{activeExample.verifiedOutput}</pre>
                </div>
              ) : (
                <p className="text-slate-400 text-[11px] italic">
                  Program computes value and propagates result directly through process exit code {activeExample.verifiedExitCode}.
                </p>
              )}
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                Technical Highlights
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                {activeExample.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/docs/cli"
                className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span>Learn how to compile with qura build</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
