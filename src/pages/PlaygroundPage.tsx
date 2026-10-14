import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Code,
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Download,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { examplesData } from '../data/examplesData';
import { CodeBlock } from '../components/CodeBlock';

const PRESET_PROGRAMS = [
  {
    id: 'hello_world',
    name: 'Hello World',
    code: `fn main() -> i32 {
    println("Hello from Qura Language!");
    println(42);
    println(true);
    return 0;
}`,
    verifiedOutput: `Hello from Qura Language!\n42\ntrue`,
    verifiedExitCode: 0,
    note: 'Prints string literal, integer, and boolean to standard output.',
  },
  {
    id: 'hello_math',
    name: 'Arithmetic Functions',
    code: `fn calculate(base: i32, multiplier: i32, offset: i32) -> i32 {
    let product = base * multiplier;
    return product + offset;
}

fn main() -> i32 {
    let result = calculate(10, 4, 2); // 10 * 4 + 2 = 42
    return result;
}`,
    verifiedOutput: '(Executes arithmetic and returns 42 as process exit code)',
    verifiedExitCode: 42,
    note: 'Calls multi-argument function and propagates return value directly to OS exit code.',
  },
  {
    id: 'factorial',
    name: 'Factorial (5!)',
    code: `fn factorial(n: i32) -> i32 {
    let mut acc = 1;
    let mut i = 1;
    while i <= n {
        acc = acc * i;
        i = i + 1;
    }
    return acc;
}

fn main() -> i32 {
    let answer = factorial(5); // 5! = 120
    return answer;
}`,
    verifiedOutput: '(Computes 5! = 120 and returns 120 as process exit code)',
    verifiedExitCode: 120,
    note: 'Iterative while loop with mutable state accumulator (let mut).',
  },
  {
    id: 'collatz',
    name: 'Collatz Conjecture (n = 27)',
    code: `fn collatz_steps(mut n: i32) -> i32 {
    let mut steps = 0;
    while n > 1 {
        let is_even = n % 2 == 0;
        if is_even {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps = steps + 1;
    }
    return steps;
}

fn main() -> i32 {
    let total_steps = collatz_steps(27); // 111 steps
    return total_steps;
}`,
    verifiedOutput: '(Executes 111 iterations and returns 111 as process exit code)',
    verifiedExitCode: 111,
    note: 'Collatz conjecture step counter testing mutable parameter and branching.',
  },
];

export const PlaygroundPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_PROGRAMS[0]);
  const [userCode, setUserCode] = useState(PRESET_PROGRAMS[0].code);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);

  const handleSelectPreset = (preset: typeof PRESET_PROGRAMS[0]) => {
    setSelectedPreset(preset);
    setUserCode(preset.code);
  };

  const handleReset = () => {
    setUserCode(selectedPreset.code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Light client-side code analysis
  const analyzeCode = (code: string) => {
    const fnMatches = code.match(/fn\s+([a-zA-Z_][a-zA-Z0-9_]*)/g) || [];
    const letMutMatches = code.match(/let\s+mut\s+([a-zA-Z_][a-zA-Z0-9_]*)/g) || [];
    const letMatches = code.match(/let\s+(?!mut\s)([a-zA-Z_][a-zA-Z0-9_]*)/g) || [];
    const hasMain = /fn\s+main\b/.test(code);
    const hasPrint = /\b(print|println)\b/.test(code);
    const hasWhile = /\bwhile\b/.test(code);
    const hasIf = /\bif\b/.test(code);

    return {
      functions: fnMatches.map((m) => m.replace(/^fn\s+/, '')),
      letMutCount: letMutMatches.length,
      letCount: letMatches.length,
      hasMain,
      hasPrint,
      hasWhile,
      hasIf,
    };
  };

  const analysis = analyzeCode(userCode);
  const isPresetUnmodified = userCode.trim() === selectedPreset.code.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Code className="w-3.5 h-3.5" />
          <span>Interactive Code Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Qura Code Playground
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Inspect, edit, and explore Qura Language source code.
        </p>
      </div>

      {/* Honest Execution Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-200 border border-indigo-500/30 shadow-md space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Notice: Native Ahead-of-Time Architecture</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Qura is a native ahead-of-time compiler generating standalone Windows x86_64 machine code via Cranelift and
          linking against host SDK libraries. It does not run in a browser sandbox. This playground provides an
          <strong> editor-only preview with real syntax highlighting and static structure analysis</strong>. To compile
          and run code natively, download the <code className="text-indigo-300 font-mono">qura</code> CLI for Windows.
        </p>
      </div>

      {/* Editor Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium px-2">Presets:</span>
          {PRESET_PROGRAMS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedPreset.id === preset.id && isPresetUnmodified
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset to preset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Copy code"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Side */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-mono text-slate-600 dark:text-slate-300 font-semibold">
                playground.qura (Editable Source)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {userCode.split('\n').length} lines
              </span>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              rows={16}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 focus:outline-hidden resize-y leading-relaxed"
            />
          </div>

          {/* Syntax preview */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Syntax Highlighted Preview:
            </span>
            <CodeBlock code={userCode} language="qura" showLineNumbers={true} />
          </div>
        </div>

        {/* Analysis & Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Static Analysis Card */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Static Structure Analysis</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Program Entry Point:</span>
                <span className={`font-semibold ${analysis.hasMain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {analysis.hasMain ? 'fn main() detected' : 'Missing fn main()'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Declared Functions:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {analysis.functions.length > 0 ? analysis.functions.join(', ') : 'None'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Immutable Bindings (let):</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{analysis.letCount}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Mutable Bindings (let mut):</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{analysis.letMutCount}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Control Flow Constructs:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono">
                  {[analysis.hasWhile ? 'while' : '', analysis.hasIf ? 'if/else' : '']
                    .filter(Boolean)
                    .join(', ') || 'Straight-line'}
                </span>
              </div>
            </div>
          </div>

          {/* Preset Execution Reference */}
          {isPresetUnmodified && (
            <div className="p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                  Verified Compiler Output ({selectedPreset.name})
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                  Exit Code: {selectedPreset.verifiedExitCode}
                </span>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono whitespace-pre-wrap">
                {selectedPreset.verifiedOutput}
              </pre>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                *Verified by compiling with Cranelift release binary on Windows x86_64.
              </p>
            </div>
          )}

          {/* Run Locally Terminal Instructions */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
              Run Locally in Terminal
            </span>
            <p className="text-xs text-slate-300">
              Save your code to <code className="text-indigo-300 font-mono">sample.qura</code>, then execute with the CLI:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto">
              qura run sample.qura
            </div>
            <div className="pt-2">
              <Link
                href="/download"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download the Windows CLI (v0.1.0-alpha)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
