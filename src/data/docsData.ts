import { DocSection } from '../types';

export const docsData: DocSection[] = [
  // --- GETTING STARTED ---
  {
    id: 'intro',
    category: 'Getting Started',
    title: 'Introduction to Qura',
    summary: 'Overview of Qura Language, core design principles, and developer preview scope.',
    content: `
# Introduction to Qura Language

**Qura** is an evolving, general-purpose programming language developed by **Qura Technologies**. It is designed with an uncompromising focus on code clarity, approachable tooling, and native performance via ahead-of-time (AOT) machine code compilation.

The language is implemented from scratch with a modular compiler pipeline written in Rust, leveraging the **Cranelift** code generator to produce standalone native Windows x86_64 executables without requiring a heavy virtual machine or runtime interpreter.

### Core Design Philosophy
1. **Balanced by design:** A deliberate middle ground between the low-level mechanical control of systems languages and the syntactic ergonomics of modern application languages.
2. **Clear by default:** Predictable control flow, explicit variable mutability (\`let\` vs \`let mut\`), unambiguous type annotations on function boundaries, and expressive compiler diagnostics.
3. **Approachable tooling:** A unified CLI (\`qura check\`, \`qura build\`, \`qura run\`, and \`qura doctor\`) that detects your local environment, flags missing native linkers, and provides actionable remedies.

### Current Status: Developer Preview (v0.1.0-alpha)
Qura is currently in its initial **Developer Preview** release. The core compiler pipeline—including lexing, parsing, two-pass semantic analysis, intermediate representation (QIR), Cranelift native code generation, and standard output runtime—is fully operational.

However, advanced features such as user-defined composite types (\`struct\`, \`enum\`), heap collections (\`List<T>\`, \`Map<K, V>\`), foreign function interfaces (FFI), and multi-file module imports are actively scheduled for future milestones.
`,
    relatedLinks: [
      { title: 'Prerequisites & Installation', href: '/docs/installation' },
      { title: 'Your First Qura Program', href: '/docs/first-program' },
      { title: 'Roadmap & Future Milestones', href: '/roadmap' },
    ],
  },
  {
    id: 'installation',
    category: 'Getting Started',
    title: 'Prerequisites & Installation',
    summary: 'System requirements, linker detection, Windows SDK prerequisites, and step-by-step setup.',
    content: `
# Installation & Toolchain Prerequisites

Qura is an ahead-of-time (AOT) compiler that produces native COFF object files and invokes a host linker to produce standalone Windows executables (\`.exe\`).

### System Requirements
- **Operating System:** Windows 10 or Windows 11 (64-bit, x86_64).
- **Architecture:** \`x86_64-pc-windows-msvc\`.
- **Memory & Storage:** 200 MB free disk space for compiler and toolchain.

---

### Step 1: Install Host Linker & Windows SDK
Because Qura generates genuine machine code that links against Windows system libraries (such as \`kernel32.lib\`), your system requires either the Microsoft Visual C++ Build Tools or LLVM.

#### Option A: Visual Studio C++ Build Tools (Recommended)
You can install the official Microsoft C++ build tools in a single command using Windows Package Manager (\`winget\`):

\`\`\`powershell
winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools"
\`\`\`

*Note: If you already have Visual Studio 2019 or 2022 Community installed with the "Desktop development with C++" workload, you already possess all necessary tools.*

#### Option B: LLVM (\`lld-link.exe\`)
Qura natively detects and supports the LLVM linker \`lld-link.exe\`:

\`\`\`powershell
winget install LLVM.LLVM
\`\`\`

If \`kernel32.lib\` is not automatically located by LLVM, install the standalone Windows SDK:
\`\`\`powershell
winget install Microsoft.WindowsSDK.10.0.22621
\`\`\`

---

### Step 2: Download and Extract Qura
1. Download the verified distribution archive **\`qura-v0.1.0-alpha-windows-x64.zip\`** from the official download page or GitHub Releases.
2. Extract the archive to a permanent directory of your choice, such as \`C:\\qura\`.

The extracted distribution contains:
\`\`\`text
C:\\qura\\
├── bin\\
│   └── qura.exe       # Optimized release compiler executable
├── examples\\
│   ├── hello_world.qura
│   ├── hello_math.qura
│   ├── factorial.qura
│   └── collatz.qura
├── editors\\
│   └── vscode\\        # VS Code syntax extension (.vsix and sources)
├── README.md
├── LICENSE
└── QUICKSTART.md
\`\`\`

---

### Step 3: Add Qura to System PATH
To invoke \`qura\` from any terminal, add the \`bin\` directory to your user \`PATH\`:

\`\`\`powershell
# Add to User PATH permanently via PowerShell:
[Environment]::SetEnvironmentVariable(
    "Path",
    [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User) + ";C:\\qura\\bin",
    [EnvironmentVariableTarget]::User
)
\`\`\`

Restart your terminal, then verify the installation:
\`\`\`powershell
qura --version
# Output: qura v0.1.0
\`\`\`
`,
    relatedLinks: [
      { title: 'Environment Diagnostics (qura doctor)', href: '/docs/doctor' },
      { title: 'Your First Qura Program', href: '/docs/first-program' },
    ],
  },
  {
    id: 'doctor',
    category: 'Getting Started',
    title: 'Environment Verification (qura doctor)',
    summary: 'Using the built-in diagnostic tool to test linker detection and Windows SDK paths.',
    content: `
# Environment Diagnostic: \`qura doctor\`

Before compiling native programs, Qura provides a dedicated diagnostic command to inspect your host environment, check linker availability, and verify that the required Windows SDK libraries are accessible.

Run the following command in PowerShell or Command Prompt:

\`\`\`powershell
qura doctor
\`\`\`

### Successful Output Example
\`\`\`text
Qura Developer Environment Diagnostic
=======================================
[OK] Target Platform: Windows x86_64 (x86_64-pc-windows-msvc)
[OK] Native Linker: C:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\VC\\Tools\\MSVC\\14.44.35207\\bin\\Hostx64\\x64\\link.exe
[OK] Windows SDK Library: C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.26100.0\\um\\x64
---------------------------------------
Status: Environment ready. You can build and run native Qura programs!
\`\`\`

### Linker Discovery Strategy
The Qura driver employs a robust multi-tier search strategy:
1. **Explicit Environment Overrides:** Checks \`QURA_LINKER\` and \`QURA_SDK_LIB_DIR\` first.
2. **Visual Studio Discovery via \`vswhere.exe\`:** Detects MSVC installations (Build Tools, Community, Professional, Enterprise).
3. **Active Developer Shell:** Reads the \`LIB\` and \`PATH\` environment variables configured by Visual Studio developer command prompts.
4. **LLVM Fallback:** Searches for \`lld-link.exe\` in system \`PATH\` and default LLVM installation roots.
5. **Windows SDK Registry & Standard Paths:** Locates \`kernel32.lib\` under \`C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\...\`.

### Manual Overrides (Troubleshooting)
If your toolchain is in a custom location, specify explicit environment variables:
\`\`\`powershell
$env:QURA_LINKER = "C:\\Tools\\LLVM\\bin\\lld-link.exe"
$env:QURA_SDK_LIB_DIR = "C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.22621.0\\um\\x64"
\`\`\`
`,
    relatedLinks: [
      { title: 'CLI Reference', href: '/docs/cli' },
      { title: 'Troubleshooting Guide', href: '/docs/troubleshooting' },
    ],
  },
  {
    id: 'first-program',
    category: 'Getting Started',
    title: 'Your First Qura Program',
    summary: 'Write, check, compile, and run a complete Qura program from the terminal.',
    content: `
# Your First Qura Program

Let's create and execute your first program in Qura.

### 1. Create a Source File
Create a new file named \`hello.qura\` in your editor:

\`\`\`qura
fn main() -> i32 {
    println("Hello from Qura Language!");
    println(42);
    println(true);
    return 0;
}
\`\`\`

### 2. Syntax & Type Checking
To verify your code without generating machine code, use \`qura check\`:

\`\`\`powershell
qura check hello.qura
\`\`\`
If there are no errors, the command completes silently with exit code \`0\`.

### 3. Direct Execution with \`qura run\`
To compile and execute the program immediately in a single step:

\`\`\`powershell
qura run hello.qura
\`\`\`

**Terminal Output:**
\`\`\`text
Hello from Qura Language!
42
true
\`\`\`

The \`qura run\` command compiles the code to a temporary binary in your system temp directory, runs it, streams its output to your console, and propagates the program's return value as the process exit code.

### 4. Compiling to a Standalone Executable
To produce a standalone \`.exe\` that can be distributed and executed without the compiler:

\`\`\`powershell
qura build hello.qura -o my_hello.exe
\`\`\`

Execute the resulting binary directly:
\`\`\`powershell
.\\my_hello.exe
\`\`\`
`,
    relatedLinks: [
      { title: 'Language Fundamentals', href: '/docs/source-structure' },
      { title: 'CLI Command Reference', href: '/docs/cli' },
    ],
  },
  {
    id: 'troubleshooting',
    category: 'Getting Started',
    title: 'Troubleshooting & FAQ',
    summary: 'Common installation issues, missing linker errors, and how to resolve them.',
    content: `
# Troubleshooting & Common Issues

### Issue 1: "fatal: host linker (link.exe or lld-link.exe) not found"
**Cause:** Qura was unable to discover an installed C++ compiler toolchain on Windows.
**Solution:**
1. Run \`winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools"\`.
2. Ensure you have selected the "Desktop development with C++" workload if using Visual Studio Installer.
3. Or install LLVM via \`winget install LLVM.LLVM\`.
4. Run \`qura doctor\` to confirm resolution.

### Issue 2: "fatal: unable to locate Windows SDK library directory containing kernel32.lib"
**Cause:** The linker was found, but the Windows SDK import libraries are missing.
**Solution:**
Install the Windows SDK:
\`\`\`powershell
winget install Microsoft.WindowsSDK.10.0.22621
\`\`\`
Alternatively, define \`$env:QURA_SDK_LIB_DIR\` pointing to the directory containing \`kernel32.lib\`.

### Issue 3: "qura : The term 'qura' is not recognized"
**Cause:** The directory containing \`qura.exe\` has not been added to your system \`PATH\`, or your terminal was not restarted.
**Solution:**
Invoke the binary directly using its relative or absolute path (e.g. \`C:\\qura\\bin\\qura.exe doctor\`) or configure your user \`PATH\` variable and restart PowerShell.
`,
    relatedLinks: [
      { title: 'Environment Diagnostics (qura doctor)', href: '/docs/doctor' },
      { title: 'Installation Guide', href: '/docs/installation' },
    ],
  },

  // --- LANGUAGE FUNDAMENTALS ---
  {
    id: 'source-structure',
    category: 'Language Fundamentals',
    title: 'Source Structure & main',
    summary: 'Program entry point, exit codes, comments, and top-level item layout.',
    content: `
# Source File Structure & The \`main\` Entry Point

Every Qura source file has the \`.qura\` file extension and is encoded in UTF-8. A source file contains top-level function declarations.

### Entry Point
Execution starts at the \`main\` function. Qura supports two entry point signatures:

#### 1. With an Explicit Exit Code
\`\`\`qura
fn main() -> i32 {
    println("Exiting with status code 0");
    return 0;
}
\`\`\`
The returned \`i32\` value becomes the native process exit code (propagated directly to the operating system).

#### 2. Returning Unit (Void)
\`\`\`qura
fn main() {
    println("Exiting cleanly");
}
\`\`\`
When no return type is annotated, \`main\` returns unit \`()\`, and the runtime automatically exits with process code \`0\`.

### Comments
Qura supports both single-line and nested multi-line comments:

\`\`\`qura
// This is a single-line comment.

/* This is a multi-line
   block comment. */

/* Block comments can also /* be nested */ cleanly! */
\`\`\`
`,
    relatedLinks: [
      { title: 'Variables & Mutability', href: '/docs/variables' },
      { title: 'Primitive Types', href: '/docs/types' },
    ],
  },
  {
    id: 'variables',
    category: 'Language Fundamentals',
    title: 'Variables & Mutability',
    summary: 'Immutable let bindings, mutable let mut bindings, and scope assignment rules.',
    content: `
# Variables & Mutability

In Qura, bindings are immutable by default. This prevents accidental reassignment and encourages safe, predictable state management.

### Immutable Bindings (\`let\`)
To declare an immutable variable, use the \`let\` keyword:

\`\`\`qura
let x = 10;
let message = "Immutable message";
\`\`\`

Attempting to reassign an immutable variable produces compile error **\`E0102\`**:
\`\`\`qura
let count = 5;
count = 10; // Compile Error E0102: cannot assign to immutable variable 'count'
\`\`\`

---

### Mutable Bindings (\`let mut\`)
When you need to mutate a variable (such as an accumulator in a loop), you must explicitly mark it with \`mut\`:

\`\`\`qura
let mut counter = 0;
counter = counter + 1;
counter = counter + 5;
\`\`\`

### Type Annotations
Types can be inferred from the initialization expression, or explicitly annotated:

\`\`\`qura
let a: i32 = 42;
let b: bool = true;
let mut c: i64 = 1000;
\`\`\`

### Scope Rules & No Same-Scope Shadowing
Qura enforces strict lexical scoping. Redeclaring a variable with the same name in the exact same scope produces compile error **\`E0104\`** (symbol already declared):

\`\`\`qura
let val = 10;
let val = 20; // Error E0104: duplicate definition of 'val' in current scope
\`\`\`
Variables declared inside nested blocks (such as inside an \`if\` branch or \`while\` loop) are lexically isolated to that block.
`,
    relatedLinks: [
      { title: 'Primitive Types', href: '/docs/types' },
      { title: 'Functions', href: '/docs/functions' },
    ],
  },
  {
    id: 'types',
    category: 'Language Fundamentals',
    title: 'Primitive Types & Literals',
    summary: 'Detailed reference of scalar types: i32, i64, u32, u64, f64, bool, str, and unit ().',
    content: `
# Primitive Types & Literals

Qura v0.1.0-alpha provides a focused set of primitive scalar types, designed for native Cranelift machine code compilation:

| Type | Bit Width | Description | Example Literals |
| :--- | :--- | :--- | :--- |
| \`i32\` | 32-bit | Signed two's complement integer | \`0\`, \`-42\`, \`10_000\`, \`0xFF\`, \`0b1010\` |
| \`i64\` | 64-bit | 64-bit signed integer | \`9223372036854775807\` |
| \`u32\` | 32-bit | Unsigned 32-bit integer | \`100\`, \`4294967295\` |
| \`u64\` | 64-bit | Unsigned 64-bit integer | \`18446744073709551615\` |
| \`f64\` | 64-bit | IEEE 754 double precision float | \`3.14159\`, \`-0.5\`, \`1e-4\` |
| \`bool\` | 1-bit | Boolean truth value | \`true\`, \`false\` |
| \`str\` | Pointer | Immutable UTF-8 string literal | \`"Hello\\nWorld"\` |
| \`()\` | 0-bit | Unit type (empty return) | Omitted return type |

---

### Numeric Literals
- **Decimal:** Standard numbers like \`42\`. You can use underscores for readability, e.g. \`1_000_000\`.
- **Hexadecimal:** Prefixed with \`0x\` or \`0X\`, e.g. \`0xFF_00\`.
- **Binary:** Prefixed with \`0b\` or \`0B\`, e.g. \`0b1011_0001\`.
- **Floating-point:** Numbers containing a decimal point, e.g. \`12.34\` or \`5.0e2\`.

---

### Strings in v0.1.0-alpha
Strings in Qura are double-quoted string literals. The compiler stores string literals in a global read-only data section and generates static pointer-length descriptors.

Supported escape sequences:
- \`\\n\` — Line feed
- \`\\r\` — Carriage return
- \`\\t\` — Horizontal tab
- \`\\\\ \` — Literal backslash
- \`\\"\` — Double quote

*Limitation Note:* Dynamic heap allocation, string concatenation (\`+\`), and slice indexing are scheduled for Milestone 8. Currently, string literals can be passed to functions and printed via \`print\` and \`println\`.
`,
    relatedLinks: [
      { title: 'Standard Output Runtime', href: '/docs/output' },
      { title: 'Operators Reference', href: '/docs/operators' },
    ],
  },
  {
    id: 'functions',
    category: 'Language Fundamentals',
    title: 'Functions & Parameters',
    summary: 'Function declarations, typed arguments, mut parameters, return types, and call semantics.',
    content: `
# Functions & Parameters

Functions are the primary unit of code organization in Qura. They are declared using the \`fn\` keyword.

### Syntax
\`\`\`qura
fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
\`\`\`

- **Name:** Follows standard identifier rules (\`[a-zA-Z_][a-zA-Z0-9_]*\`).
- **Parameters:** Comma-separated list of \`name: Type\`.
- **Return Type:** Annotated with \`-> ReturnType\`. If omitted, the function returns unit \`()\`.

---

### Mutable Parameters
Function parameters are immutable by default. If a function needs to mutate a parameter within its local scope, declare it with \`mut\`:

\`\`\`qura
fn countdown(mut n: i32) -> i32 {
    while n > 0 {
        n = n - 1;
    }
    return n;
}
\`\`\`

---

### Forward Calls & Order Independence
In Qura, function declaration order does not matter. The compiler performs a 2-pass symbol resolution, allowing functions to call other functions declared later in the file:

\`\`\`qura
fn main() -> i32 {
    return helper(); // Calls helper declared below
}

fn helper() -> i32 {
    return 42;
}
\`\`\`
`,
    relatedLinks: [
      { title: 'Control Flow', href: '/docs/control-flow' },
      { title: 'Exit Codes and Returns', href: '/docs/source-structure' },
    ],
  },
  {
    id: 'control-flow',
    category: 'Language Fundamentals',
    title: 'Control Flow: if, else & while',
    summary: 'Branching logic, else if ladders, while loops, and loop-carried variables.',
    content: `
# Control Flow: Branching & Iteration

Qura supports structured control flow via \`if\` / \`else if\` / \`else\` expressions and \`while\` loops.

### 1. Conditional Branching (\`if\` / \`else\`)
Conditions must evaluate to a boolean (\`bool\`). Using a non-boolean expression produces compile error **\`E0107\`**.

\`\`\`qura
let x = 10;
if x > 5 {
    println("x is greater than 5");
} else {
    println("x is 5 or smaller");
}
\`\`\`

#### \`else if\` Ladders
\`\`\`qura
let score = 85;
if score >= 90 {
    println("Grade A");
} else if score >= 80 {
    println("Grade B");
} else {
    println("Grade C");
}
\`\`\`

---

### 2. While Loops
Iteration is expressed via the \`while\` loop. A loop repeatedly executes its block as long as its condition evaluates to \`true\`:

\`\`\`qura
let mut counter = 0;
while counter < 5 {
    println(counter);
    counter = counter + 1;
}
\`\`\`

#### Canonical Example: Iterative Factorial
\`\`\`qura
fn factorial(n: i32) -> i32 {
    let mut acc = 1;
    let mut i = 1;
    while i <= n {
        acc = acc * i;
        i = i + 1;
    }
    return acc;
}
\`\`\`
`,
    relatedLinks: [
      { title: 'Operators Reference', href: '/docs/operators' },
      { title: 'Examples Library', href: '/examples' },
    ],
  },
  {
    id: 'operators',
    category: 'Language Fundamentals',
    title: 'Operators & Precedence',
    summary: 'Arithmetic, comparison, logical, and unary operators with precedence tables.',
    content: `
# Operators & Expressions

Qura supports a full suite of typed binary and unary operators:

### Arithmetic Operators
Operate on integers (\`i32\`, \`i64\`, \`u32\`, \`u64\`) and floating-point values (\`f64\`):
- \`+\` : Addition
- \`-\` : Subtraction
- \`*\` : Multiplication
- \`/\` : Division (signed division for \`i32\`/\`i64\`, unsigned division for \`u32\`/\`u64\`)
- \`%\` : Remainder / Modulo

*Note: Operands must have identical types. Attempting to add an \`i32\` to an \`i64\` produces type mismatch error **\`E0100\`**.*

### Relational Comparison Operators
Produce a \`bool\` result:
- \`==\` : Equal
- \`!=\` : Not equal
- \`<\`  : Less than
- \`<=\` : Less than or equal
- \`>\`  : Greater than
- \`>=\` : Greater than or equal

### Logical Operators
Operate strictly on \`bool\` operands:
- \`&&\` : Logical AND
- \`||\` : Logical OR
- \`!\`  : Logical NOT (unary)

### Operator Precedence (Highest to Lowest)
1. Unary \`-\`, \`!\`
2. Multiplicative \`*\`, \`/\`, \`%\`
3. Additive \`+\`, \`-\`
4. Relational \`<\`, \`<=\`, \`>\`, \`>=\`
5. Equality \`==\`, \`!=\`
6. Logical AND \`&&\`
7. Logical OR \`||\`
8. Assignment \`=\`
`,
    relatedLinks: [
      { title: 'Primitive Types', href: '/docs/types' },
      { title: 'Control Flow', href: '/docs/control-flow' },
    ],
  },
  {
    id: 'output',
    category: 'Language Fundamentals',
    title: 'Standard Output (print & println)',
    summary: 'Built-in console formatting for strings, numbers, and booleans.',
    content: `
# Standard Output: \`print\` & \`println\`

Qura provides built-in functions for writing output directly to the standard output stream (terminal):

- **\`print(val)\`**: Prints the value without a trailing newline.
- **\`println(val)\`**: Prints the value followed by a standard newline (\`\\n\`).

### Supported Types
In v0.1.0-alpha, \`print\` and \`println\` accept single arguments of the following types:
- **Strings (\`str\`):** Outputs the literal string contents.
- **Signed Integers (\`i32\`, \`i64\`):** Formats as base-10 decimal integers (including negative values).
- **Unsigned Integers (\`u32\`, \`u64\`):** Formats as unsigned decimal integers.
- **Booleans (\`bool\`):** Outputs \`true\` or \`false\`.

\`\`\`qura
fn main() -> i32 {
    print("Welcome to ");
    println("Qura!");
    println(42);
    println(true);
    return 0;
}
\`\`\`

### Restrictions
- Multiple comma-separated arguments inside a single \`println()\` call are not currently supported. Call \`print\` or \`println\` sequentially.
- Formatting the unit type \`()\` or \`f64\` in \`println()\` is rejected by semantic analysis with error **\`E0108\`**.
`,
    relatedLinks: [
      { title: 'Your First Qura Program', href: '/docs/first-program' },
      { title: 'Primitive Types', href: '/docs/types' },
    ],
  },

  // --- COMPILER & TOOLING ---
  {
    id: 'architecture',
    category: 'Compiler & Tooling',
    title: 'Compiler Pipeline Architecture',
    summary: 'Deep dive into qura_syntax, qura_parser, qura_sema, qura_ir, and qura_codegen_cranelift.',
    content: `
# Compiler Pipeline Architecture

The Qura compiler is built as a multi-crate Rust workspace designed for modularity, strict phase separation, and rapid compilation.

\`\`\`text
Source Code (.qura)
       │
       ▼
[qura_syntax] ─── Lexer & Token Stream
       │
       ▼
[qura_parser] ─── Recursive Descent & Pratt Precedence Parser ───> AST
       │
       ▼
[qura_sema]   ─── 2-Pass Lexical Scoping & Type Checker ─────────> Typed AST
       │
       ▼
[qura_ir]     ─── SSA Intermediate Representation (QIR) ─────────> Validated SSA
       │
       ▼
[qura_codegen_cranelift] ─── Cranelift Native Backend ───────────> COFF Object (.obj)
       │
       ▼
[Host Linker] ─── link.exe / lld-link.exe + kernel32.lib ─────────> Native Windows EXE
\`\`\`

### Crate Breakdown
1. **\`qura_syntax\`**:
   Defines source code spans (\`Span\`), tokens (\`TokenKind\`), and raw Abstract Syntax Tree nodes. Implements a fast lexical scanner with escape handling and nested comment parsing.
2. **\`qura_diagnostics\`**:
   Error reporting engine. Renders ANSI-colored diagnostic messages, line/column coordinates, source code snippets with carets (\`^~~~~\`), notes, and error codes (\`E0001\`-\`E0109\`).
3. **\`qura_parser\`**:
   Constructs the AST using recursive descent for statements and Pratt parsing for binary/unary expressions with proper operator precedence.
4. **\`qura_sema\`**:
   Performs semantic analysis across two passes:
   - *Pass 1 (Symbol Declaration):* Registers all top-level function signatures in the global symbol table.
   - *Pass 2 (Body Verification):* Type checks statement blocks, verifies mutability constraints, ensures return type agreement, and validates condition types.
5. **\`qura_ir\`**:
   Translates AST into **QIR**, a Static Single Assignment (SSA) intermediate representation featuring explicit basic blocks, typed virtual values, and a dominator tree verifier that prevents use-before-def bugs.
6. **\`qura_codegen_cranelift\`**:
   Translates QIR into Cranelift IR, executes target-specific machine lowering for \`x86_64-pc-windows-msvc\`, generates COFF relocatable object files, embeds the standard I/O runtime, and invokes the host linker.
7. **\`qura_cli\`**:
   The user-facing binary (\`qura.exe\`) providing CLI commands (\`check\`, \`build\`, \`run\`, \`doctor\`).
`,
    relatedLinks: [
      { title: 'CLI Reference', href: '/docs/cli' },
      { title: 'Building from Source', href: '/docs/build-from-source' },
    ],
  },
  {
    id: 'cli',
    category: 'Compiler & Tooling',
    title: 'CLI Command Reference',
    summary: 'Full documentation for qura check, build, run, and doctor commands.',
    content: `
# Qura CLI Command Reference

The primary interface to Qura is the \`qura\` command-line executable.

\`\`\`powershell
qura <COMMAND> [OPTIONS] [FILE]
\`\`\`

### Commands

#### 1. \`qura check <file.qura>\`
Performs lexical analysis, syntax parsing, symbol table construction, and semantic type checking.
- **Exit Code:** \`0\` if valid, non-zero if syntax or type errors occur.
- **Use Case:** Instant feedback in editor watch modes and CI validation without invoking native code generation.

\`\`\`powershell
qura check examples/hello_world.qura
\`\`\`

---

#### 2. \`qura build <file.qura> [-o output.exe]\`
Compiles source code through all pipeline stages, generates machine code with Cranelift, links against Windows SDK libraries, and writes a standalone executable.
- **Options:**
  - \`-o, --output <PATH>\`: Specifies custom output binary name (defaults to source file basename with \`.exe\`).

\`\`\`powershell
# Default: creates factorial.exe in current directory
qura build examples/factorial.qura

# Explicit output:
qura build examples/factorial.qura -o bin/calc_factorial.exe
\`\`\`

---

#### 3. \`qura run <file.qura>\`
Compiles source code to a temporary native binary, executes it immediately, connects standard input/output/error streams to your console, and propagates the program's return value as the process exit code.

\`\`\`powershell
qura run examples/collatz.qura
Write-Host "Exit Code: $LASTEXITCODE" # 111
\`\`\`

---

#### 4. \`qura doctor\`
Audits host toolchain availability, target architecture, detected linker path (\`link.exe\` or \`lld-link.exe\`), and Windows SDK library directory containing \`kernel32.lib\`.

\`\`\`powershell
qura doctor
\`\`\`

---

#### 5. Flags
- \`-h, --help\`: Display help information.
- \`-V, --version\`: Display compiler version information.
`,
    relatedLinks: [
      { title: 'Environment Diagnostics', href: '/docs/doctor' },
      { title: 'VS Code Setup', href: '/docs/vscode' },
    ],
  },
  {
    id: 'vscode',
    category: 'Compiler & Tooling',
    title: 'VS Code Extension Setup',
    summary: 'Installing the official Qura extension for syntax highlighting and bracket matching.',
    content: `
# Visual Studio Code Extension

Qura provides an official Visual Studio Code extension located in \`editors/vscode\` and distributed as **\`qura-lang-0.1.0.vsix\`**.

### Extension Features
- **Syntax Highlighting:** Authentic TextMate grammar highlighting keywords (\`fn\`, \`let\`, \`mut\`, \`if\`, \`else\`, \`while\`, \`return\`), scalar types, string escape sequences, built-in functions (\`print\`, \`println\`), and numbers.
- **Bracket Matching & Auto-Closing:** Automatic pair completion for \`{}\`, \`()\`, \`[]\`, and \`""\`.
- **Comment Toggling:** Keybinding support for line (\`Ctrl+/\`) and block (\`Shift+Alt+A\`) comments.

---

### Installation Method 1: Install from VSIX
From the root of your extracted release archive or after downloading \`qura-lang-0.1.0.vsix\`:

\`\`\`powershell
code --install-extension qura-lang-0.1.0.vsix
\`\`\`

### Installation Method 2: Manual Folder Copy
You can also copy the extension folder directly into your personal VS Code extensions directory:

\`\`\`powershell
Copy-Item -Recurse "editors/vscode" "$HOME/.vscode/extensions/qura-lang"
\`\`\`

After installing, restart or reload VS Code (\`Ctrl+Shift+P\` → \`Developer: Reload Window\`). All \`.qura\` files will immediately render with syntax highlighting.
`,
    relatedLinks: [
      { title: 'Download Page', href: '/download' },
      { title: 'Syntax Explorer', href: '/syntax' },
    ],
  },
  {
    id: 'build-from-source',
    category: 'Compiler & Tooling',
    title: 'Building from Source',
    summary: 'Clone repository, build release binaries with Cargo, and execute automated test suites.',
    content: `
# Building Qura From Source

Developers wishing to contribute or inspect compiler internals can build Qura from source using the Rust toolchain.

### Prerequisites
1. **Rust:** Rust 1.87+ (stable MSVC toolchain: \`x86_64-pc-windows-msvc\`).
2. **Git:** For cloning the repository.
3. **C++ Linker:** Visual Studio C++ Build Tools or LLVM.

---

### Step 1: Clone the Repository
\`\`\`powershell
git clone https://github.com/vaibhavchaudharybca23-26-sys/qura-language.git
cd qura-language
\`\`\`

---

### Step 2: Build the Compiler
Build the compiler workspace with optimizations:

\`\`\`powershell
cargo build --release
\`\`\`

The compiled binary will be placed at \`target/release/qura.exe\`. You can test it immediately:
\`\`\`powershell
.\\target\\release\\qura.exe doctor
\`\`\`

---

### Step 3: Run the Test Suite
The compiler includes a comprehensive test suite across all crates (syntax, parser, sema, QIR verifier, codegen, and CLI):

\`\`\`powershell
cargo test --workspace
\`\`\`
All tests verify parsing correctness, error diagnostic codes, SSA dominance rules, and native executable execution.
`,
    relatedLinks: [
      { title: 'Compiler Pipeline Architecture', href: '/docs/architecture' },
      { title: 'Contribution Guidelines', href: '/contributing' },
    ],
  },

  // --- REFERENCE ---
  {
    id: 'grammar',
    category: 'Reference',
    title: 'Language Grammar (EBNF)',
    summary: 'Formal grammar specification for implemented v0.1.0-alpha language features.',
    content: `
# Language Grammar Specification (v0.1.0-alpha)

Below is the formal EBNF production rules implemented by \`qura_parser\`:

\`\`\`ebnf
Program        ::= FunctionDecl*

FunctionDecl   ::= "fn" Identifier "(" ParamList? ")" ("->" Type)? Block
ParamList      ::= Param ("," Param)*
Param          ::= "mut"? Identifier ":" Type

Type           ::= "i32" | "i64" | "u32" | "u64" | "f64" | "bool" | "str" | "()"

Block          ::= "{" Statement* "}"

Statement      ::= LetStmt
                 | AssignStmt
                 | WhileStmt
                 | IfStmt
                 | ReturnStmt
                 | ExprStmt

LetStmt        ::= "let" "mut"? Identifier (":" Type)? "=" Expr ";"
AssignStmt     ::= Identifier "=" Expr ";"
WhileStmt      ::= "while" Expr Block
IfStmt         ::= "if" Expr Block ("else" (IfStmt | Block))?
ReturnStmt     ::= "return" Expr? ";"
ExprStmt       ::= Expr ";"

Expr           ::= LogicalOr
LogicalOr      ::= LogicalAnd ("||" LogicalAnd)*
LogicalAnd     ::= Equality ("&&" Equality)*
Equality       ::= Relational (("==" | "!=") Relational)*
Relational     ::= Additive (("<" | "<=" | ">" | ">=") Additive)*
Additive       ::= Multiplicative (("+" | "-") Multiplicative)*
Multiplicative ::= Unary (("*" | "/" | "%") Unary)*
Unary          ::= ("-" | "!") Unary | Primary

Primary        ::= IntegerLiteral
                 | FloatLiteral
                 | StringLiteral
                 | BooleanLiteral
                 | Identifier
                 | FunctionCall
                 | "(" Expr ")"

FunctionCall   ::= Identifier "(" ArgList? ")"
ArgList        ::= Expr ("," Expr)*
\`\`\`
`,
    relatedLinks: [
      { title: 'Keywords Reference', href: '/docs/keywords' },
      { title: 'Diagnostic Error Codes', href: '/docs/error-codes' },
    ],
  },
  {
    id: 'keywords',
    category: 'Reference',
    title: 'Keywords & Built-ins',
    summary: 'Complete list of reserved keywords and built-in functions in Qura.',
    content: `
# Keywords & Built-in Functions

### Reserved Keywords
The following identifiers are reserved keywords in Qura v0.1.0-alpha:

| Keyword | Role | Example |
| :--- | :--- | :--- |
| \`fn\` | Function declaration | \`fn calculate() -> i32\` |
| \`let\` | Variable binding declaration | \`let x = 42;\` |
| \`mut\` | Mutability modifier for bindings & parameters | \`let mut counter = 0;\` |
| \`if\` | Conditional branch | \`if x > 0 { ... }\` |
| \`else\` | Alternative conditional branch | \`else { ... }\` |
| \`while\` | Iterative loop construct | \`while i < 10 { ... }\` |
| \`return\` | Early return or exit value | \`return result;\` |

### Built-in Primitive Types
- \`i32\`, \`i64\`: 32-bit and 64-bit signed integers
- \`u32\`, \`u64\`: 32-bit and 64-bit unsigned integers
- \`f64\`: 64-bit IEEE 754 floating-point number
- \`bool\`: Boolean value (\`true\` or \`false\`)
- \`str\`: Immutable string literal type

### Built-in Runtime Functions
- **\`print(val)\`**: Writes string, integer, or boolean representation to standard output without trailing newline.
- **\`println(val)\`**: Writes representation followed by standard newline.
`,
    relatedLinks: [
      { title: 'Primitive Types', href: '/docs/types' },
      { title: 'Standard Output', href: '/docs/output' },
    ],
  },
  {
    id: 'error-codes',
    category: 'Reference',
    title: 'Diagnostic Error Codes',
    summary: 'Comprehensive index of compiler diagnostic error codes E0001 through E0109.',
    content: `
# Diagnostic Error Codes Index

Qura emits structured compiler diagnostics complete with unique error codes, line/column coordinates, and source carets.

| Error Code | Category | Name | Description |
| :--- | :--- | :--- | :--- |
| **\`E0001\`** | Parser | Unexpected Token | Encountered an unexpected token in source stream. |
| **\`E0002\`** | Parser | Missing Semicolon | Statement missing closing \`;\` delimiter. |
| **\`E0004\`** | Parser | Expected Identifier | Expected an identifier name (e.g. function or variable name). |
| **\`E0006\`** | Parser | Expected Type Annotation | Missing type specification after \`:\`. |
| **\`E0010\`** | Parser | Malformed Function | Invalid syntax in function signature or parameter list. |
| **\`E0012\`** | Parser | Malformed Statement | Invalid statement structure. |
| **\`E0016\`** | Parser | Unclosed Block | Missing closing brace \`}\` for block. |
| **\`E0025\`** | Parser | Invalid Expression | Expression syntax is malformed. |
| **\`E0026\`** | Parser | Unterminated String | String literal missing closing quote. |
| **\`E0100\`** | Sema | Type Mismatch | Expression type does not match expected destination type. |
| **\`E0101\`** | Sema | Undefined Symbol | Variable or function identifier has not been declared. |
| **\`E0102\`** | Sema | Mutability Violation | Attempting to reassign an immutable \`let\` variable. |
| **\`E0103\`** | Sema | Invalid Operator | Operator is not valid for the operand types. |
| **\`E0104\`** | Sema | Duplicate Definition | Symbol with this name is already declared in the current scope. |
| **\`E0105\`** | Sema | Argument Count Mismatch | Number of arguments passed does not match function signature. |
| **\`E0106\`** | Sema | Return Type Mismatch | Returned value type does not match function return annotation. |
| **\`E0107\`** | Sema | Condition Not Boolean | \`if\` or \`while\` condition does not evaluate to \`bool\`. |
| **\`E0108\`** | Sema | Invalid Operand Type | Operand cannot be used with this unary or binary operation. |
| **\`E0109\`** | Sema | Unsupported Expression | Feature or type is not supported in current preview milestone. |

### Diagnostic Output Format
When an error occurs, Qura prints:
\`\`\`text
error[E0102]: cannot assign to immutable variable 'total'
 --> src/main.qura:4:5
  |
4 |     total = total + 1;
  |     ^^^^^ cannot assign twice to immutable variable
  |
  = help: consider making this binding mutable: 'let mut total = ...'
\`\`\`
`,
    relatedLinks: [
      { title: 'Syntax Explorer', href: '/syntax' },
      { title: 'Language Grammar', href: '/docs/grammar' },
    ],
  },
  {
    id: 'compatibility',
    category: 'Reference',
    title: 'Compatibility & System Matrix',
    summary: 'Hardware, operating system, compiler, and linker compatibility details.',
    content: `
# Compatibility Matrix

| Category | Supported in v0.1.0-alpha | Scheduled / Future |
| :--- | :--- | :--- |
| **OS Target** | Windows 10, Windows 11 (64-bit) | Linux (x86_64), macOS (ARM64) |
| **Architecture** | \`x86_64\` (Intel / AMD 64-bit) | \`aarch64\` (ARM64) |
| **Host Linker** | MSVC \`link.exe\` (VS 2019/2022), LLVM \`lld-link.exe\` | GNU \`ld\`, \`lld\` elf/mach-o |
| **SDK Libraries** | Windows SDK (\`kernel32.lib\`) | \`libc\`, system POSIX libraries |
| **Scalar Types** | \`i32\`, \`i64\`, \`u32\`, \`u64\`, \`f64\`, \`bool\`, \`str\`, \`()\` | Composite structs, enums, records |
| **Memory Model** | Native Stack + Read-only Data Section | Dynamic Heap Allocator, GC / RC |
| **Collections** | None (Prerequisites for Milestone 8) | \`List<T>\`, \`Map<K, V>\`, String buffers |
| **Modules** | Single-file compilation | Multi-file \`import\` and package manager |
`,
    relatedLinks: [
      { title: 'Prerequisites & Installation', href: '/docs/installation' },
      { title: 'Roadmap', href: '/roadmap' },
    ],
  },
];
