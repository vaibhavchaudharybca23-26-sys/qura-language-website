import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Download,
  Terminal,
  Shield,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Cpu,
  Package,
  Layers,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '../components/GithubIcon';
import { siteConfig } from '../data/siteConfig';

export const DownloadPage: React.FC = () => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedVerifyCmd, setCopiedVerifyCmd] = useState(false);

  const release = siteConfig.publishedRelease;
  const primaryAsset = release.assets[0];
  const vsixAsset = release.assets[1];

  const handleCopyHash = () => {
    navigator.clipboard.writeText(primaryAsset.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const verifyCmd = `Get-FileHash -Algorithm SHA256 .\\${primaryAsset.filename}`;

  const handleCopyVerifyCmd = () => {
    navigator.clipboard.writeText(verifyCmd);
    setCopiedVerifyCmd(true);
    setTimeout(() => setCopiedVerifyCmd(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Download className="w-3.5 h-3.5" />
          <span>Official Release Distribution</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Download Qura Compiler
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Install the official Developer Preview of the Qura compiler CLI and VS Code extension for Windows x86_64.
        </p>

        {/* Developer Preview Alert */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-xs sm:text-sm space-y-1">
          <div className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Developer Preview Notice (v0.1.0-alpha)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Qura is an early-stage language and native compiler under active development. While the compiler pipeline and
            Cranelift code generation are verified, language syntax and APIs may evolve prior to stable v1.0. It is
            recommended for experimentation, learning, and tooling development.
          </p>
        </div>
      </div>

      {/* Primary Download Card */}
      <div className="p-8 sm:p-10 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 shadow-lg space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-600 text-white">
                {release.version}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {release.channel}
              </span>
              <span className="text-xs text-slate-500 font-mono">Released {release.releaseDate}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Windows x64 Compiler Distribution
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Includes the standalone <code className="text-indigo-500 font-mono">qura.exe</code> compiler, host diagnostic
              tool (<code className="text-indigo-500 font-mono">qura doctor</code>), verified examples, and VS Code
              extension package.
            </p>
          </div>

          {/* Direct Download Button linking directly to verified asset URL */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
            <a
              href={primaryAsset.downloadUrl}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] text-center"
            >
              <Download className="w-5 h-5" />
              <span>Download ZIP ({primaryAsset.size.split(' ')[0]} {primaryAsset.size.split(' ')[1]})</span>
            </a>
            <span className="text-[11px] text-center text-slate-400">Direct HTTP download from GitHub Releases</span>
          </div>
        </div>

        {/* Asset Details & Checksums */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-white block text-sm">
              Package Specifications
            </span>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Filename:</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold">{primaryAsset.filename}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">File Size:</span>
              <span className="text-slate-800 dark:text-slate-200">{primaryAsset.size}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Target Architecture:</span>
              <span className="text-slate-800 dark:text-slate-200">x86_64-pc-windows-msvc</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">License:</span>
              <span className="text-slate-800 dark:text-slate-200">{siteConfig.licenseName}</span>
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-slate-900 dark:text-white text-sm">
                SHA-256 Checksum Verification
              </span>
              <button
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1 text-[11px] font-sans text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-300 text-[11px] break-all select-all">
              {primaryAsset.sha256}
            </div>
            <div className="pt-1">
              <span className="text-[11px] font-sans text-slate-500 block mb-1">Verify in PowerShell:</span>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px]">
                <code>{verifyCmd}</code>
                <button
                  onClick={handleCopyVerifyCmd}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  title="Copy command"
                >
                  {copiedVerifyCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* External links strip */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
          <a
            href={release.githubReleaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Release on GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <span>•</span>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span>Browse Full Source Code</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* VS Code Extension Download Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-mono">
            Editor Tooling
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Visual Studio Code Extension ({vsixAsset.filename})
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Syntax highlighting and language configuration for <code className="text-indigo-500">.qura</code> files.
            Compatible with VS Code, Cursor, and VSCodium.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href={vsixAsset.downloadUrl}
            download={vsixAsset.filename}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download .VSIX (8.48 KB)</span>
          </a>
          <Link
            href="/docs/vscode"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <span>Installation Guide</span>
          </Link>
        </div>
      </div>

      {/* Step-by-Step Windows Installation Workflow */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            Setup Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Windows Installation Workflow
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Follow these step-by-step instructions to extract the release and compile native programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Extract */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Extract the Release Archive</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Extract <code className="text-indigo-500">{primaryAsset.filename}</code> to a permanent directory such as{' '}
              <code className="text-indigo-500">C:\qura</code>. The archive contains the <code className="text-indigo-500">bin/qura.exe</code> executable.
            </p>
          </div>

          {/* Step 2: Add to PATH */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Add bin to PATH (PowerShell)</h3>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
              $env:PATH = "C:\qura\bin;" + $env:PATH
            </div>
            <p className="text-[11px] text-slate-500">
              For permanent setup, see the <Link href="/docs/installation" className="text-indigo-500 underline">detailed PATH guide</Link>.
            </p>
          </div>

          {/* Step 3: Run qura doctor */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                3
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Run Environment Diagnostics</h3>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs">
              qura doctor
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Confirms that Visual Studio C++ Build Tools or LLVM <code className="text-indigo-500">link.exe</code> and{' '}
              <code className="text-indigo-500">kernel32.lib</code> are discovered.
            </p>
          </div>

          {/* Step 4: Run Hello World */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                4
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Compile & Run a Sample</h3>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 text-indigo-300 font-mono text-xs">
              qura run examples/hello_world.qura
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Compiles to native x86_64 machine code, executes, and streams output.
            </p>
          </div>
        </div>
      </div>

      {/* Toolchain Prerequisites Box */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white space-y-4">
        <h3 className="text-lg font-bold">Host Toolchain & Linker Prerequisite</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Because Qura generates genuine machine code that links against Windows system APIs, your system requires either
          the Microsoft Visual C++ Build Tools or LLVM. If not already present, install with winget:
        </p>
        <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto">
          winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools"
        </div>
      </div>
    </div>
  );
};
