export interface RoadmapMilestone {
  number: number;
  title: string;
  status: 'Implemented' | 'In Progress' | 'Planned' | 'Under Consideration';
  targetRelease?: string;
  summary: string;
  deliverables: { title: string; done: boolean }[];
}

export const roadmapData: RoadmapMilestone[] = [
  {
    number: 1,
    title: 'Lexical Analysis & Token Stream',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Foundational lexer with accurate source span tracking, string escapes, and nested block comments.',
    deliverables: [
      { title: 'Zero-copy token streaming with source location spans', done: true },
      { title: 'Keywords: fn, let, mut, if, else, while, return', done: true },
      { title: 'String literals with escape handling (\\n, \\r, \\t, \\\\, \\")', done: true },
      { title: 'Single-line (//) and arbitrarily nested block comments (/* */)', done: true },
    ],
  },
  {
    number: 2,
    title: 'Grammar Parsing & AST Construction',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Pratt expression parsing with strict precedence and recursive descent statement parser.',
    deliverables: [
      { title: 'Expression Pratt parser with full precedence table', done: true },
      { title: 'Function declarations with typed parameters and return types', done: true },
      { title: 'Statements: let, let mut, while, if/else, return, expressions', done: true },
      { title: 'Rich parser diagnostic error codes (E0001 - E0026)', done: true },
    ],
  },
  {
    number: 3,
    title: 'Semantic Analysis & Type Checking',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Two-pass symbol resolution, lexical scope validation, and strict scalar type checking.',
    deliverables: [
      { title: 'Two-pass symbol resolution enabling order-independent forward calls', done: true },
      { title: 'Lexical scope verification with same-scope duplicate symbol detection (E0104)', done: true },
      { title: 'Strict immutability enforcement on non-mut let bindings (E0102)', done: true },
      { title: 'Type inference and explicit type compatibility checks (E0100)', done: true },
    ],
  },
  {
    number: 4,
    title: 'SSA Intermediate Representation (QIR)',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Backend-agnostic Static Single Assignment intermediate representation with dominance verification.',
    deliverables: [
      { title: 'Explicit basic blocks, virtual registers, and control-flow graphs', done: true },
      { title: 'Dominator tree verifier preventing use-before-def and unlinked blocks', done: true },
      { title: 'Lowering of while loops and if/else branching into SSA phi nodes', done: true },
    ],
  },
  {
    number: 5,
    title: 'Cranelift Native Code Generation',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Direct translation to Cranelift IR, native x86_64 machine lowering, and host linker resolution.',
    deliverables: [
      { title: 'Cranelift object emission producing valid Windows COFF objects (.obj)', done: true },
      { title: 'Multi-strategy linker discovery (vswhere, Developer Shell, PATH, SDK registry)', done: true },
      { title: 'Automated invocation of link.exe or lld-link.exe with kernel32.lib', done: true },
      { title: 'Process exit code propagation from main() -> i32', done: true },
    ],
  },
  {
    number: 6,
    title: 'Developer Experience, CLI & VS Code',
    status: 'Implemented',
    targetRelease: 'v0.1.0-alpha',
    summary: 'Developer-facing CLI tools, diagnostic formatting, VS Code extension, and release distribution.',
    deliverables: [
      { title: 'Standard output runtime: built-in print() and println()', done: true },
      { title: 'Unified CLI: qura check, qura build, qura run, and qura doctor', done: true },
      { title: 'ANSI diagnostic renderer with source line carets (^~~~)', done: true },
      { title: 'Official VS Code extension with full TextMate grammar (qura-lang-0.1.0.vsix)', done: true },
      { title: 'Automated reproducible release packager (package_release.ps1)', done: true },
    ],
  },
  {
    number: 7,
    title: 'Compound Types & Data Modeling',
    status: 'In Progress',
    targetRelease: 'v0.2.0-alpha',
    summary: 'Introduction of user-defined data structures, enumerations, and pattern matching.',
    deliverables: [
      { title: 'Struct declarations with named fields: struct Point { x: i32, y: i32 }', done: false },
      { title: 'Field access and field assignment expressions (pt.x)', done: false },
      { title: 'Tagged enumerations and algebraic data types (enum Option<T>)', done: false },
      { title: 'Basic pattern matching construct (match)', done: false },
    ],
  },
  {
    number: 8,
    title: 'Dynamic Heap Memory & Standard Collections',
    status: 'Planned',
    targetRelease: 'v0.3.0-alpha',
    summary: 'Heap allocation runtime, growable arrays, dynamic strings, and associative maps.',
    deliverables: [
      { title: 'Dynamic heap allocator runtime integration', done: false },
      { title: 'Dynamic growable list type: List<T>', done: false },
      { title: 'Dynamic UTF-8 string concatenation and slicing', done: false },
      { title: 'Key-value hash map type: Map<K, V>', done: false },
    ],
  },
  {
    number: 9,
    title: 'C-ABI Foreign Function Interface (FFI)',
    status: 'Planned',
    targetRelease: 'v0.4.0-alpha',
    summary: 'User-defined extern "C" bindings for calling system libraries and native C DLLs.',
    deliverables: [
      { title: 'extern "C" function declarations in Qura source', done: false },
      { title: 'System library linking directives (#link "user32.dll", "sqlite3.dll")', done: false },
      { title: 'Raw pointer types and C-compatible scalar marshalling', done: false },
      { title: 'Safe wrappers for Win32 and POSIX system calls', done: false },
    ],
  },
  {
    number: 10,
    title: 'Modules, Imports & Package Management',
    status: 'Planned',
    targetRelease: 'v0.5.0-alpha',
    summary: 'Multi-file compilation, namespace hierarchies, import statements, and package distribution.',
    deliverables: [
      { title: 'Module declarations and source file hierarchy', done: false },
      { title: 'import syntax for intra-project and inter-module dependencies', done: false },
      { title: 'Qura package manifest format (qura.toml)', done: false },
      { title: 'Decentralized dependency resolution and build orchestration', done: false },
    ],
  },
  {
    number: 11,
    title: 'Cross-Platform Host Targets',
    status: 'Under Consideration',
    targetRelease: 'Future',
    summary: 'Expanding Cranelift codegen and linking support beyond Windows to Linux and macOS.',
    deliverables: [
      { title: 'Linux x86_64 ELF object emission and GNU ld/gold linker integration', done: false },
      { title: 'macOS AArch64 (Apple Silicon) Mach-O object emission and ld64 support', done: false },
      { title: 'Platform-agnostic standard I/O and runtime wrappers', done: false },
    ],
  },
];
