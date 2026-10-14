import React from 'react';
import { Link } from 'wouter';
import {
  Info,
  ShieldCheck,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Heart,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { siteConfig } from '../data/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Info className="w-3.5 h-3.5" />
          <span>About Qura Language</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Purpose, Origin & Principles
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          The story behind Qura Language, our design values, leadership, and commitment to open, honest developer tooling.
        </p>
      </div>

      {/* Origin & Motivation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Qura Language?</h2>
          <p>
            Modern software engineering frequently presents a dichotomy: on one side are high-level languages with heavy
            virtual machine runtimes and complex background garbage collectors; on the other are systems languages with
            steep learning curves and intricate lifetime management.
          </p>
          <p>
            Qura Language was founded to explore an intentional middle ground: <strong>clear code, approachable tooling,
            and native compilation</strong>. By compiling ahead-of-time through the Cranelift native backend, Qura
            produces standalone native machine code without the complexity of heavy VM layers.
          </p>
          <p>
            We adhere strictly to technical honesty: we do not claim Qura is faster, safer, or better than established
            languages without reproducible empirical benchmarks. Instead, we focus on delivering a transparent, enjoyable
            development experience where the compiler actively guides the developer through structured diagnostics and
            clear immutability defaults.
          </p>
        </div>

        {/* Maintainer & Organization Info Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Project Leadership
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{siteConfig.maintainer}</h3>
              <p className="text-xs text-slate-500">Founder & Lead Compiler Architect</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Organization:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{siteConfig.organization}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Source Repository:</span>
                <a
                  href={siteConfig.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">License:</span>
                <span className="text-slate-900 dark:text-white font-mono">{siteConfig.licenseName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Engineering Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">1. Predictable Semantics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No hidden magic, implicit type coercions, or surprise operator overloads. Code should do exactly what it
              says on the page.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">2. Compassionate Diagnostics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Compiler errors are not reprimands; they are teaching tools. Qura emits precise carets and hints to help
              developers fix mistakes immediately.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">3. Honest Evolution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never present unimplemented features as working functionality. Planned milestones are clearly
              delineated from verified capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
