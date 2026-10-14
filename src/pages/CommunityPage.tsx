import React from 'react';
import { Link } from 'wouter';
import {
  MessageSquare,
  Shield,
  GitPullRequest,
  Bug,
  Lightbulb,
  FileText,
  ExternalLink,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { siteConfig } from '../data/siteConfig';

export const CommunityPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Open Source Collaboration</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Community & Contributing
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Qura is licensed under the Apache License 2.0. We build out in the open on GitHub, welcoming bug reports,
          documentation improvements, grammar test cases, and architectural discussions.
        </p>
      </div>

      {/* GitHub Participation Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bug Reports */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Bug className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Report a Bug</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Found an issue in compiler diagnostics, parser error recovery, or native code generation? Open an issue with a
            minimal reproducible <code className="text-indigo-500 font-mono">.qura</code> snippet.
          </p>
          <a
            href={siteConfig.githubIssues}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Open Issue on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Feature Proposals */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Propose Language Features</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Propose syntax proposals, standard library functions, or compiler optimizations. Check existing discussions
            and milestones before submitting.
          </p>
          <a
            href={siteConfig.githubDiscussions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Start a Discussion</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Pull Requests */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Submit a Pull Request</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Submit code changes, compiler refactors, diagnostic enhancements, or documentation fixes. Ensure all workspace
            tests pass with <code className="text-indigo-500 font-mono">cargo test</code>.
          </p>
          <Link
            href="/contributing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Contribution Guidelines</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Improve Docs */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Improve Documentation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Help improve tutorial clarity, fix typos, or clarify language constraints. High-quality documentation is a
            first-class citizen in Qura.
          </p>
          <Link
            href="/docs/intro"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Explore Documentation</span>
          </Link>
        </div>

        {/* Security Disclosures */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Private Security Disclosure</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Report potential security vulnerabilities privately via GitHub Private Vulnerability Reporting so maintainers
            can coordinate fixes before public disclosure.
          </p>
          <Link
            href="/security"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Security Policy</span>
          </Link>
        </div>

        {/* Community Channel Notice */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Official Channel: GitHub</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The canonical gathering place for the Qura community is the GitHub repository. We do not maintain external
            third-party chat servers or unverified social groups.
          </p>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
          >
            <span>Join us on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
