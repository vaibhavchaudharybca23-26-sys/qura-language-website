import React from 'react';
import { Link } from 'wouter';
import { ExternalLink, Shield, FileText, Sparkles, Terminal, Download } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { siteConfig } from '../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Attribution column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/qura-logo.png" alt="Qura Logo" className="w-8 h-8 rounded-md object-contain dark:invert" />
              <span className="font-bold text-lg text-slate-900 dark:text-white">Qura Language</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Developer Preview Notice</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Qura is currently in active v0.1.0-alpha development. Implemented capabilities are verified against the native compiler and are subject to evolution before v1.0.
              </p>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Documentation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/docs/intro" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Windows Setup
                </Link>
              </li>
              <li>
                <Link href="/docs/doctor" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  qura doctor
                </Link>
              </li>
              <li>
                <Link href="/docs/variables" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Variables & Mutability
                </Link>
              </li>
              <li>
                <Link href="/docs/types" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Primitive Types
                </Link>
              </li>
              <li>
                <Link href="/docs/grammar" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Language Grammar
                </Link>
              </li>
              <li>
                <Link href="/docs/error-codes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Error Codes (E0001-E0109)
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Tooling */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources & Tooling
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/download" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Downloads (v0.1.0-alpha)</span>
                </Link>
              </li>
              <li>
                <Link href="/syntax" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Syntax Explorer
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Examples Library
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Web Playground
                </Link>
              </li>
              <li>
                <Link href="/docs/vscode" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  VS Code Extension
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Changelog & Releases
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Project Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Governance & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Qura
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Community & Contributing
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Apache 2.0 License</span>
                </Link>
              </li>
              <li>
                <Link href="/trademarks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Trademark Guidelines
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Security Policy</span>
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.maintainer} and {siteConfig.organization} contributors. Licensed under Apache-2.0.
          </p>
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] text-slate-400">
              Compiler target: {siteConfig.targetPlatform}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
