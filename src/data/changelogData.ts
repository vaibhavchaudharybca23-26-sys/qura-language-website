export interface ChangelogRelease {
  version: string;
  tag: string;
  date: string;
  status: 'Published' | 'Unreleased' | 'Pre-release';
  title: string;
  summary: string;
  githubUrl: string;
  downloadUrl?: string;
  sha256?: string;
  sections: {
    category: 'Features' | 'Compiler Architecture' | 'Tooling & CLI' | 'Documentation & Testing' | 'Fixes';
    items: string[];
  }[];
  limitations: string[];
}

export const changelogData: ChangelogRelease[] = [
  {
    version: 'v0.1.0-alpha',
    tag: 'v0.1.0-alpha',
    date: 'October 14, 2026',
    status: 'Published',
    title: 'Initial Developer Preview Release (Windows x64)',
    summary:
      'The inaugural public developer preview of Qura Language, delivering a complete native ahead-of-time compiler pipeline powered by Cranelift, rich compiler diagnostics, developer CLI, and VS Code support.',
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/releases/tag/v0.1.0-alpha',
    downloadUrl:
      'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/releases/download/v0.1.0-alpha/qura-v0.1.0-alpha-windows-x64.zip',
    sha256: 'b0820ed6d2ff03c4e5dd60ce6cf0f714bf5abfb8f5b27d41ed375f675645e8c8',
    sections: [
      {
        category: 'Features',
        items: [
          'First-class functions with typed parameters and return annotations (fn name(a: i32) -> i32)',
          'Mutable parameters support (mut param: Type)',
          'Immutable let bindings by default, with explicit let mut for mutable variables',
          'Supported primitive scalar types: i32, i64, u32, u64, f64, bool, str, and unit ()',
          'Binary arithmetic (+, -, *, /, %) with signed and unsigned division/modulo specialization',
          'Comparison operators (==, !=, <, <=, >, >=) and boolean logic (&&, ||, !)',
          'While loops with mutable state accumulation and SSA phi generation',
          'Conditional branching: if / else if / else statements and expressions',
          'Built-in standard output: print() and println() for strings, integers, and booleans',
          'Double-quoted string literals with escape sequences (\\n, \\r, \\t, \\\\, \\")',
          'Nested block comments (/* /* ... */ */) and single-line comments (//)',
          'OS process exit code propagation from main() -> i32 (or exit code 0 when returning ())',
        ],
      },
      {
        category: 'Compiler Architecture',
        items: [
          'qura_syntax: Zero-copy lexer with token span tracking and keyword categorization',
          'qura_diagnostics: Colored ANSI diagnostic emitter with carets (^~~~), severity, and error codes E0001-E0109',
          'qura_parser: Recursive descent statement parser and Pratt expression precedence parser',
          'qura_sema: Two-pass symbol resolver enabling order-independent forward function calls and type checking',
          'qura_ir: Static Single Assignment (SSA) intermediate representation with dominator tree verification',
          'qura_codegen_cranelift: Cranelift native backend emitting Windows x86_64 COFF relocatable objects',
        ],
      },
      {
        category: 'Tooling & CLI',
        items: [
          'qura check <file.qura>: Rapid syntax and type verification without native code generation',
          'qura build <file.qura> [-o output.exe]: Standalone Windows executable compilation',
          'qura run <file.qura>: Direct compilation and execution with stdout/stderr streaming',
          'qura doctor: Diagnostic environment check inspecting target platform, linker path, and Windows SDK',
          'Robust multi-strategy linker resolution discovering link.exe or lld-link.exe via vswhere, LIB, and PATH',
          'Official Visual Studio Code extension (qura-lang-0.1.0.vsix) with complete TextMate grammar',
        ],
      },
      {
        category: 'Documentation & Testing',
        items: [
          'Complete Developer Quickstart guide (docs/QUICKSTART.md)',
          'Verified sample suite: hello_world.qura, hello_math.qura, factorial.qura, and collatz.qura',
          'Automated end-to-end integration tests verifying execution, exit codes, and diagnostics',
          'Governance files: Apache 2.0 LICENSE, NOTICE, SECURITY.md, and TRADEMARK.md',
          'Automated release packaging script (scripts/package_release.ps1)',
        ],
      },
    ],
    limitations: [
      'Single-file compilation only (multi-file import system planned for Milestone 10)',
      'No user-defined structs, enums, or pattern matching (scheduled for Milestone 7)',
      'No dynamic heap collections or growable strings (scheduled for Milestone 8)',
      'Requires host C++ Build Tools or LLVM + Windows SDK to link native binaries',
    ],
  },
];
