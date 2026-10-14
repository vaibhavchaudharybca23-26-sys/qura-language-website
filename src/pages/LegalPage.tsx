import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import {
  Shield,
  FileText,
  Lock,
  GitPullRequest,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { siteConfig } from '../data/siteConfig';

interface LegalPageProps {
  initialTab?: 'license' | 'trademarks' | 'security' | 'contributing';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'license' }) => {
  const [activeTab, setActiveTab] = useState<'license' | 'trademarks' | 'security' | 'contributing'>(initialTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Shield className="w-3.5 h-3.5" />
          <span>Governance & Policies</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Legal, Security & Governance
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Official governance documents, software license terms, trademark guidelines, and security reporting
          procedures for Qura Language.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('license')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'license'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Apache 2.0 License & Notices
        </button>

        <button
          onClick={() => setActiveTab('trademarks')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'trademarks'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Trademark & Brand Guidelines
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Security Policy & Disclosure
        </button>

        <button
          onClick={() => setActiveTab('contributing')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'contributing'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Contribution Guidelines
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        {/* LICENSE TAB */}
        {activeTab === 'license' && (
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Apache License, Version 2.0</h2>
            <p>
              Qura Language software and documentation are licensed under the Apache License, Version 2.0. You may freely
              use, inspect, modify, and distribute the compiler and standard runtime under the terms of this license.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Official NOTICE:</span>
              <p>Qura Language</p>
              <p>Copyright 2026 Vaibhav Chaudhary and Qura Technologies contributors</p>
              <p className="text-slate-500 pt-2">
                This product includes software developed by Vaibhav Chaudhary and the Qura Language open-source community.
              </p>
              <div className="text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                <p>Third-Party Components & Dependencies:</p>
                <p>- Cranelift (Bytecode Alliance) - Licensed under Apache-2.0 with LLVM Exception</p>
                <p>- target-lexicon - Licensed under Apache-2.0 with LLVM Exception</p>
                <p>- object / gimli - Dual-licensed under Apache-2.0 or MIT</p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              For complete full text of the Apache License Version 2.0, see the{' '}
              <a
                href={`${siteConfig.githubRepo}/blob/master/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline"
              >
                LICENSE file in the repository
              </a>.
            </p>
          </div>
        )}

        {/* TRADEMARKS TAB */}
        {activeTab === 'trademarks' && (
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trademark & Brand Guidelines</h2>

            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-300">Software License vs. Brand Identity</span>
              <p className="text-slate-600 dark:text-slate-400">
                While the source code is licensed under Apache-2.0, Section 6 of the Apache License explicitly states that
                it does not grant permission to use the trade names, trademarks, service marks, or product names of the
                Licensor.
              </p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">Permitted Uses</h3>
            <ul className="space-y-2 list-disc ml-5 text-xs sm:text-sm">
              <li>
                <strong>Describing software:</strong> Stating truthfully that your software is written in Qura, compiles
                with Qura, or runs on Qura (e.g. <em>"Built with Qura Language"</em>).
              </li>
              <li>
                <strong>Tooling & Extensions:</strong> Creating editor plugins, extensions, or linters (e.g.{' '}
                <em>"Qura Language Support for VS Code"</em>).
              </li>
              <li>
                <strong>Educational content:</strong> Writing tutorials, articles, books, or documentation about learning
                and using Qura.
              </li>
              <li>
                <strong>Factual attribution:</strong> Complying with Apache-2.0 notice requirements to state that your work
                is derived from Qura Language.
              </li>
            </ul>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">Restricted Uses</h3>
            <ul className="space-y-2 list-disc ml-5 text-xs sm:text-sm">
              <li>
                Do not name a fork or derivative compiler in a manner suggesting it is the official or endorsed version
                (e.g. do not call a fork <em>"The Official Qura Compiler"</em>).
              </li>
              <li>
                Do not use the Qura name or logo as the primary branding of a commercial product or service in a way that
                implies sponsorship or endorsement.
              </li>
              <li>Do not register domain names or social handles containing "Qura Language" in a misleading manner.</li>
            </ul>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Security Policy & Responsible Disclosure</h2>
            <p>
              We take the security of Qura Language seriously. If you discover a potential vulnerability in the compiler,
              standard runtime, or distribution assets, please report it responsibly so that we can coordinate a fix before
              public disclosure.
            </p>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>Preferred Method: GitHub Private Vulnerability Reporting</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Please submit reports through GitHub's built-in Private Vulnerability Reporting feature:
              </p>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal ml-5">
                <li>
                  Navigate to the repository:{' '}
                  <a
                    href={siteConfig.githubSecurityAdvisories}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 underline font-mono"
                  >
                    qura-language/security/advisories
                  </a>
                </li>
                <li>Click on the <strong>Security</strong> tab.</li>
                <li>Select <strong>Advisories</strong> and click <strong>Report a vulnerability</strong>.</li>
              </ol>
            </div>

            <p className="text-xs text-slate-500">
              Please do not disclose potential security issues publicly in general issue trackers or community discussions
              until a patch has been prepared.
            </p>
          </div>
        )}

        {/* CONTRIBUTING TAB */}
        {activeTab === 'contributing' && (
          <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contribution Guidelines</h2>
            <p>
              Thank you for contributing to Qura! All contributions, including bug reports, compiler enhancements,
              documentation improvements, and tests, are appreciated.
            </p>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-4">Workflow Steps:</h3>
            <ol className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-decimal ml-5">
              <li>Fork the repository on GitHub and create a topic branch for your changes.</li>
              <li>Ensure your code adheres to standard Rust formatting (<code className="font-mono text-indigo-500">cargo fmt</code>).</li>
              <li>Run the complete test suite across the workspace: <code className="font-mono text-indigo-500">cargo test --workspace</code>.</li>
              <li>Add automated unit or integration tests verifying any new parser constructs or semantic rules.</li>
              <li>Submit a clear pull request explaining the rationale and changes.</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
