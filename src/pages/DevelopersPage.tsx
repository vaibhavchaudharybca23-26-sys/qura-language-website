import React from 'react';
import { Link } from 'wouter';
import {
  Terminal,
  Cpu,
  Layers,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { CodeBlock } from '../components/CodeBlock';
import { siteConfig } from '../data/siteConfig';

export const DevelopersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Terminal className="w-3.5 h-3.5" />
          <span>Developer Hub & Compiler Internals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Developer Platform & Tooling
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Deep-dive into the Qura compiler workspace, building from source with Cargo, executing automated tests, and
          understanding compiler internals.
        </p>
      </div>

      {/* Compiler Crates Architecture */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Workspace Crates & Responsibilities
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The Qura compiler is structured as seven modular Rust crates with strict boundaries:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_syntax</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Lexer & Tokens</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides token definitions, line/column coordinate spans (<code className="text-indigo-500">Span</code>),
              raw AST nodes, and a zero-copy lexical scanner with nested block comment parsing.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_diagnostics</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Diagnostics & Emitter</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Formatted ANSI terminal emitter rendering carets (<code className="text-indigo-500">^~~~</code>), source
              snippets, error codes (<code className="text-indigo-500">E0001</code>-<code className="text-indigo-500">E0109</code>),
              and actionable tips.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_parser</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Pratt Expression Parser</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Recursive descent statement parser combined with a Pratt parser for binary and unary expressions with
              strict mathematical operator precedence.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_sema</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">2-Pass Semantic Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Constructs symbol tables across two passes to allow order-independent forward function calls, enforcing
              strict mutability and lexical scopes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_ir</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">SSA IR & Dominance Verifier</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lowers AST into QIR (Static Single Assignment intermediate representation) with explicit basic blocks, virtual
              registers, and a dominator tree verifier.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">crates/qura_codegen_cranelift</span>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Native Codegen & Linker</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cranelift backend generating Windows x86_64 COFF objects, embedding the console I/O runtime, and driving the
              host native linker.
            </p>
          </div>
        </div>
      </div>

      {/* Building from Source & Testing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <GithubIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Build From Source</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Qura requires Rust 1.87+ (stable MSVC toolchain) and Visual Studio C++ Build Tools or LLVM.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <p className="text-slate-500 font-sans"># 1. Clone the repository:</p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 overflow-x-auto">
              git clone https://github.com/vaibhavchaudharybca23-26-sys/qura-language.git
            </div>

            <p className="text-slate-500 font-sans pt-2"># 2. Compile release binary:</p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 overflow-x-auto">
              cargo build --release
            </div>

            <p className="text-slate-500 font-sans pt-2"># 3. Test compiler executable:</p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 overflow-x-auto">
              .\target\release\qura.exe doctor
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Run Automated Tests</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The workspace maintains comprehensive automated unit and integration tests across all crates.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <p className="text-slate-500 font-sans"># Run all workspace test suites:</p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 overflow-x-auto">
              cargo test --workspace
            </div>

            <p className="text-slate-500 font-sans pt-2"># Test suites included:</p>
            <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc ml-5 font-sans">
              <li>qura_syntax: lexer & escape tokens (5 tests)</li>
              <li>qura_parser: recursive descent & operator precedence (18 tests)</li>
              <li>qura_sema: symbol table & type checker (33 tests)</li>
              <li>qura_ir: SSA dominance verifier & lowering (26 tests)</li>
              <li>qura_codegen_cranelift: Cranelift execution & linking (22 tests)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Environment Variables Reference */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-4 h-4 text-indigo-500" />
          <span>Environment Variable Overrides</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          The Qura driver automatically detects linkers via <code className="text-indigo-500 font-mono">vswhere.exe</code>,
          Developer Shell <code className="text-indigo-500 font-mono">LIB</code> paths, and LLVM defaults. You can
          override paths manually if your tools are installed in non-standard directories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">QURA_LINKER</span>
            <p className="font-sans text-slate-500 text-[11px]">
              Full path to <code className="text-indigo-500">link.exe</code> or <code className="text-indigo-500">lld-link.exe</code>.
            </p>
            <div className="p-2 rounded bg-slate-900 text-slate-200 text-[10px] overflow-x-auto">
              $env:QURA_LINKER = "C:\LLVM\bin\lld-link.exe"
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">QURA_SDK_LIB_DIR</span>
            <p className="font-sans text-slate-500 text-[11px]">
              Directory containing Windows SDK <code className="text-indigo-500">kernel32.lib</code>.
            </p>
            <div className="p-2 rounded bg-slate-900 text-slate-200 text-[10px] overflow-x-auto">
              $env:QURA_SDK_LIB_DIR = "C:\...\Windows Kits\10\Lib\...\um\x64"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
