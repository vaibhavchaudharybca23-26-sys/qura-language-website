import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Download,
  BookOpen,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
  PackageCheck,
  ChevronRight,
  AlertTriangle,
  Play,
  Copy,
  Check,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { CodeBlock } from '../components/CodeBlock';
import { siteConfig } from '../data/siteConfig';
import { examplesData } from '../data/examplesData';

export const HomePage: React.FC = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [copiedHash, setCopiedHash] = useState(false);

  const activeExample = examplesData[selectedExampleIndex] || examplesData[0];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(siteConfig.publishedRelease.assets[0].sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-24 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow background accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>v0.1.0-alpha Developer Preview</span>
              <span className="text-slate-400">|</span>
              <span>Windows x86_64</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Balanced by design.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Powerful by capability.
              </span>{' '}
              Clear by default.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Qura is an evolving general-purpose programming language and native compiler developed under Qura
              Technologies. Engineered with Cranelift to generate standalone Windows machine code with predictable
              tooling and expressive compiler diagnostics.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>Download for Windows (v0.1.0-alpha)</span>
              </Link>

              <Link
                href="/docs/intro"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>Read the Docs</span>
              </Link>

              <a
                href={siteConfig.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Verification pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Cranelift Native Backend
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Standalone .exe Output
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Apache-2.0 License
              </span>
            </div>
          </div>

          {/* Hero code sample preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                  <span className="ml-2 font-mono text-slate-600 dark:text-slate-300 font-semibold">
                    hello_world.qura
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Verified Compilation
                </span>
              </div>

              <div className="p-4">
                <CodeBlock
                  code={`fn main() -> i32 {
    println("Hello from Qura Language!");
    println(42);
    println(true);
    return 0;
}`}
                  language="qura"
                  showLineNumbers={true}
                  className="my-0 border-0 bg-transparent dark:bg-transparent shadow-none"
                />
              </div>

              {/* Execution output strip */}
              <div className="p-4 bg-slate-900 text-slate-200 text-xs font-mono border-t border-slate-800">
                <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Terminal ($ qura run hello_world.qura)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400">Exit code: 0</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p>Hello from Qura Language!</p>
                  <p>42</p>
                  <p>true</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT QURA IS: DESIGN PILLARS --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            What Qura Is
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Engineered for clarity and native efficiency
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Qura does not seek to reinvent programming with cryptic symbols or complex runtime machinery. It provides a
            structured, honest language built on solid compiler engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Native Cranelift Codegen</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Programs compile ahead-of-time directly to native machine code via Cranelift, generating native Windows
              COFF objects that link with <code className="text-indigo-600 dark:text-indigo-400">kernel32.lib</code>. No
              virtual machine overhead.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Clear Scoping & Immutability</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Bindings are strictly immutable by default with <code className="text-indigo-500">let</code>. Mutation
              must be declared explicitly with <code className="text-indigo-500">let mut</code>. Same-scope variable
              shadowing is prevented by semantic analysis.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Approachable Developer Tooling</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              The unified <code className="text-indigo-500">qura</code> CLI provides instant type checking, single-command
              compilation and execution, and automated diagnostic environment checks with{' '}
              <code className="text-indigo-500">qura doctor</code>.
            </p>
          </div>
        </div>
      </section>

      {/* --- HOW QURA WORKS: COMPILER PIPELINE --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Compiler Pipeline
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">How Qura compiles source code to native binaries</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Verified against the multi-crate Rust compiler workspace implementation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 text-xs font-mono">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">01. qura_syntax</div>
              <div className="font-sans font-semibold text-slate-900 dark:text-white">Lexer & Spans</div>
              <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400">
                Converts UTF-8 source into token streams with precise line and column span tracking.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">02. qura_parser</div>
              <div className="font-sans font-semibold text-slate-900 dark:text-white">Pratt AST Parser</div>
              <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400">
                Recursive descent statements and Pratt operator precedence parsing into an AST.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">03. qura_sema</div>
              <div className="font-sans font-semibold text-slate-900 dark:text-white">2-Pass Scope & Type</div>
              <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400">
                Two-pass symbol resolution enabling forward calls, strict type and mutability checks.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">04. qura_ir</div>
              <div className="font-sans font-semibold text-slate-900 dark:text-white">SSA QIR & Verifier</div>
              <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400">
                Lowers control flow to basic blocks and verifies SSA dominator trees before codegen.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-2xs">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">05. Cranelift</div>
              <div className="font-sans font-semibold text-slate-900 dark:text-white">Native Codegen</div>
              <p className="font-sans text-[11px] text-slate-600 dark:text-slate-400">
                Emits Windows x86_64 COFF object files with string constants and standard I/O runtime.
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-xl bg-indigo-600 text-white border border-indigo-500 space-y-2 shadow-sm">
              <div className="text-indigo-100 font-bold">06. Host Linker</div>
              <div className="font-sans font-semibold text-white">Standalone EXE</div>
              <p className="font-sans text-[11px] text-indigo-100">
                Discovers link.exe or lld-link.exe + kernel32.lib to output standalone Windows binary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VERIFIED EXAMPLES LIBRARY PREVIEW --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Authentic Code
            </span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Verified Qura language examples
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Every example below compiles and executes against the current v0.1.0-alpha compiler.
            </p>
          </div>
          <Link
            href="/examples"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore all examples</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Example Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          {examplesData.map((example, idx) => (
            <button
              key={example.id}
              onClick={() => setSelectedExampleIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                selectedExampleIndex === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {example.filename}
            </button>
          ))}
        </div>

        {/* Selected Example Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <CodeBlock
              code={activeExample.code}
              language="qura"
              title={activeExample.filename}
              showLineNumbers={true}
            />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                  {activeExample.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2">
                  {activeExample.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {activeExample.description}
                </p>
              </div>

              {/* Execution details */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Exit Code:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {activeExample.verifiedExitCode}
                  </span>
                </div>
                {activeExample.verifiedOutput && (
                  <div>
                    <span className="text-slate-500 block mb-1">Standard Output:</span>
                    <pre className="p-2 rounded bg-slate-900 text-slate-200 text-[11px] overflow-x-auto whitespace-pre-wrap">
                      {activeExample.verifiedOutput}
                    </pre>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Key Features:</span>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {activeExample.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={activeExample.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View source on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK START PREVIEW --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-950 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Get Started in Minutes
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Three commands from download to native execution
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              The Qura CLI simplifies compilation, execution, and host diagnostic verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
                1
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Verify Your Toolchain</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Audits your Windows C++ build tools, linker paths, and SDK directory.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs">
                qura doctor
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
                2
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Check Your Code</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Performs sub-millisecond lexical, grammar, and type checking.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs">
                qura check main.qura
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center font-mono">
                3
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Compile and Run</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compiles to native x86_64 machine code and executes immediately.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs">
                qura run main.qura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST VERIFIED RELEASE CARD --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 backdrop-blur-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Latest Verified Release
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Qura Language {siteConfig.publishedRelease.version}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Published on {siteConfig.publishedRelease.releaseDate} for {siteConfig.publishedRelease.assets[0].platform}.
              Includes the complete standalone CLI binary, setup guides, verified examples, and VS Code extension.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>Archive size: {siteConfig.publishedRelease.assets[0].size}</span>
              <span>•</span>
              <button
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                title="Click to copy SHA-256 hash"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>SHA-256: {siteConfig.publishedRelease.assets[0].sha256.slice(0, 16)}...</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <a
              href={siteConfig.publishedRelease.assets[0].downloadUrl}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all text-center"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP (1.59 MB)</span>
            </a>
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center"
            >
              <span>Installation Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- VS CODE EXTENSION SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Editor Support
            </span>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Official Visual Studio Code Extension
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Experience authentic syntax highlighting, bracket matching, auto-closing quotes, and comment toggling.
              Packaged as a standalone <code className="text-indigo-500">.vsix</code> extension ready for VS Code,
              Cursor, and VSCodium.
            </p>

            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>TextMate grammar covering all Qura keywords, types, and built-ins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>String escape sequence detection for \n, \r, \t, \\, and \"</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Single-line (//) and nested block (/* */) comment toggling</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.publishedRelease.assets[1].downloadUrl}
                download="qura-lang-0.1.0.vsix"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .VSIX (8.48 KB)</span>
              </a>
              <Link
                href="/docs/vscode"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Setup instructions</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs shadow-xs space-y-3">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-semibold">VS Code Extension Installation</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">PowerShell</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-slate-500 font-sans"># Install downloaded VSIX package directly:</p>
                <p className="text-indigo-600 dark:text-emerald-400 font-bold">code --install-extension qura-lang-0.1.0.vsix</p>
                <p className="text-slate-500 font-sans pt-2"># Or copy directly to extension directory:</p>
                <p className="text-indigo-600 dark:text-emerald-400">
                  Copy-Item -Recurse "editors/vscode" "$HOME/.vscode/extensions/qura-lang"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROADMAP PREVIEW --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            Future Direction
          </span>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Transparent Language Evolution</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            We explicitly delineate implemented capabilities from upcoming milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Milestones 1-6</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                Completed
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Core Compiler & CLI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Lexer, Pratt parser, 2-pass sema, QIR SSA verifier, Cranelift native codegen, CLI, and VS Code support.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">Milestone 7</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold">
                In Progress
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Compound Types</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              User-defined struct declarations, field access expressions, and algebraic enumerations.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-bold">Milestone 8</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                Planned
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Heap Memory & Collections</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Dynamic heap allocation runtime, List&lt;T&gt;, dynamic string concatenation, and Map&lt;K, V&gt;.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 font-bold">Milestone 9-10</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                Planned
              </span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">C-ABI FFI & Modules</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              User-defined extern "C" bindings for native DLLs, multi-file compilation, and import system.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View complete roadmap details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- FOOTER CTA STRIP --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 dark:from-indigo-950 dark:to-slate-950 text-white text-center space-y-6 shadow-xl shadow-indigo-600/10">
          <h3 className="text-2xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to explore native programming with Qura?
          </h3>
          <p className="text-indigo-200 text-sm max-w-xl mx-auto">
            Download the Windows Developer Preview or start reading the step-by-step developer tutorial.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white text-indigo-950 hover:bg-indigo-50 shadow-md transition-all font-sans"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Download v0.1.0-alpha for Windows</span>
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-indigo-800/60 hover:bg-indigo-800 text-white border border-indigo-700/60 transition-all font-sans"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start the Guided Tutorial</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
