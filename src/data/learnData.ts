import { TutorialStep } from '../types';

export const learnData: TutorialStep[] = [
  {
    step: 1,
    id: 'meet-qura',
    title: '1. Meet Qura',
    objective: 'Understand what Qura is, its architectural principles, and the developer preview scope.',
    prerequisites: ['Basic familiarity with programming concepts (variables, functions, control flow).'],
    explanation: `
Qura is an evolving general-purpose programming language developed by Qura Technologies.
It is engineered from first principles with a native compiler written in Rust, utilizing the Cranelift code generator to emit standalone native Windows x86_64 executables.

Unlike interpreted languages or virtual-machine platforms, Qura compiles directly to native COFF machine code and links with the host Windows SDK, resulting in tiny, self-contained binaries that execute without a runtime VM.
`,
    code: `// Qura Language philosophy:
// 1. Explicit syntax
// 2. Clear immutability by default
// 3. Native machine compilation

fn main() -> i32 {
    println("Welcome to Qura Language!");
    return 0;
}`,
    outputDescription: 'Compiles to a native .exe and prints greeting.',
    verifiedOutput: 'Welcome to Qura Language!',
    verifiedExitCode: 0,
    commonMistakes: [
      'Assuming Qura runs inside Node or Python: it is a standalone native compiler.',
      'Expecting dynamic typing: Qura is statically and strictly typed.',
    ],
    nextStepTitle: '2. Install the Compiler',
    nextStepId: 'install-compiler',
    referenceLink: '/docs/intro',
  },
  {
    step: 2,
    id: 'install-compiler',
    title: '2. Install the Compiler',
    objective: 'Install the native linker, download the Qura release, and configure your PATH.',
    prerequisites: ['Windows 10 or 11 (64-bit)', 'PowerShell or Command Prompt'],
    explanation: `
To compile native executables on Windows, Qura requires a native linker. You can install Microsoft Visual C++ Build Tools using winget:

winget install Microsoft.VisualStudio.2022.BuildTools --override "--passive --add Microsoft.VisualStudio.Workload.VCTools"

Next, download the verified release archive (qura-v0.1.0-alpha-windows-x64.zip), extract it to C:\\qura, and verify your environment with qura doctor.
`,
    code: `# Verify toolchain and linker availability
qura doctor

# Verify compiler version
qura --version`,
    outputDescription: 'Outputs diagnostic readiness for native compilation.',
    verifiedOutput: `Qura Developer Environment Diagnostic
=======================================
[OK] Target Platform: Windows x86_64 (x86_64-pc-windows-msvc)
[OK] Native Linker: link.exe
[OK] Windows SDK Library: kernel32.lib
---------------------------------------
Status: Environment ready. You can build and run native Qura programs!`,
    verifiedExitCode: 0,
    commonMistakes: [
      'Running qura without installing C++ Build Tools or LLVM first.',
      'Forgetting to restart the terminal after adding C:\\qura\\bin to PATH.',
    ],
    nextStepTitle: '3. Write Hello World',
    nextStepId: 'write-hello-world',
    referenceLink: '/docs/installation',
  },
  {
    step: 3,
    id: 'write-hello-world',
    title: '3. Write Hello World',
    objective: 'Create your first .qura source file and run it with the CLI.',
    prerequisites: ['Qura compiler installed and verified via qura doctor.'],
    explanation: `
Create a file named hello_world.qura. Every executable Qura program defines an entry function named main.
Within main, use the built-in println() function to print messages to standard output.
`,
    code: `fn main() -> i32 {
    println("Hello from Qura Language!");
    println(42);
    println(true);
    return 0;
}`,
    outputDescription: 'Direct execution via "qura run hello_world.qura"',
    verifiedOutput: `Hello from Qura Language!
42
true`,
    verifiedExitCode: 0,
    commonMistakes: [
      'Omitting the return statement when main is annotated with -> i32 (Error E0106).',
      'Forgetting the semicolon at the end of statements (Error E0002).',
    ],
    nextStepTitle: '4. Understand main & Exit Codes',
    nextStepId: 'understand-main',
    referenceLink: '/docs/first-program',
  },
  {
    step: 4,
    id: 'understand-main',
    title: '4. Understand main & Exit Codes',
    objective: 'Learn how return values from main become OS process exit codes.',
    prerequisites: ['Completed Step 3.'],
    explanation: `
When you declare fn main() -> i32, the value passed to return becomes the process exit code returned to Windows.
If you return 42, the OS records exit code 42.
Alternatively, you can declare fn main() without a return type annotation, which defaults to unit () and returns exit code 0.
`,
    code: `fn main() -> i32 {
    let exit_status = 42;
    return exit_status;
}`,
    outputDescription: 'Testing exit code in PowerShell via $LASTEXITCODE',
    verifiedOutput: '(No stdout output; process exits with code 42)',
    verifiedExitCode: 42,
    commonMistakes: [
      'Returning a negative number when the OS expects unsigned 8-bit or 32-bit exit codes.',
      'Returning a string from main: main must return either i32 or ().',
    ],
    nextStepTitle: '5. Printing Values & Formatting',
    nextStepId: 'print-values',
    referenceLink: '/docs/source-structure',
  },
  {
    step: 5,
    id: 'print-values',
    title: '5. Printing Values & Formatting',
    objective: 'Master print() and println() with strings, numbers, and booleans.',
    prerequisites: ['Completed Step 4.'],
    explanation: `
Qura embeds standard I/O runtime routines:
- print(val): Outputs without a newline.
- println(val): Outputs with a trailing \\n.

You can print strings (str), signed integers (i32, i64), unsigned integers (u32, u64), and booleans (bool).
`,
    code: `fn main() -> i32 {
    print("User ID: ");
    println(1024);
    
    print("Is Active: ");
    println(true);
    
    println("Line 1\\nLine 2\\tTabbed");
    return 0;
}`,
    outputDescription: 'Terminal display of strings and numbers.',
    verifiedOutput: `User ID: 1024
Is Active: true
Line 1
Line 2	Tabbed`,
    verifiedExitCode: 0,
    commonMistakes: [
      'Passing multiple arguments like println("A", "B"): println takes exactly 1 argument.',
      'Passing unit () or f64 to println: currently rejected by semantic analysis.',
    ],
    nextStepTitle: '6. Working with Scalar Types',
    nextStepId: 'scalar-types',
    referenceLink: '/docs/output',
  },
  {
    step: 6,
    id: 'scalar-types',
    title: '6. Working with Scalar & Primitive Types',
    objective: 'Declare and use i32, i64, u32, u64, f64, and bool types.',
    prerequisites: ['Completed Step 5.'],
    explanation: `
Qura provides machine-sized primitive scalar types. Types can be explicitly annotated or inferred.
Use underscores in long numbers for readability (e.g. 1_000_000).
Hexadecimal literals start with 0x; binary literals start with 0b.
`,
    code: `fn main() -> i32 {
    let signed_val: i32 = -15;
    let large_int: i64 = 1_000_000_000;
    let hex_mask: u32 = 0xFF;
    let binary_bits: u32 = 0b1010;
    let flag: bool = false;
    
    if !flag {
        println(signed_val);
        println(hex_mask);
        println(binary_bits);
    }
    return 0;
}`,
    outputDescription: 'Verified output of integer values.',
    verifiedOutput: `-15
255
10`,
    verifiedExitCode: 0,
    commonMistakes: [
      'Mixing i32 and i64 in an arithmetic expression without explicit conversion.',
      'Assigning a negative value to an unsigned integer (u32, u64).',
    ],
    nextStepTitle: '7. Defining & Calling Functions',
    nextStepId: 'defining-functions',
    referenceLink: '/docs/types',
  },
  {
    step: 7,
    id: 'defining-functions',
    title: '7. Defining & Calling Functions',
    objective: 'Write modular functions with typed parameters and return values.',
    prerequisites: ['Completed Step 6.'],
    explanation: `
Functions encapsulate logic and allow code reuse. Every parameter must have an explicit type annotation.
Parameters are immutable by default, but can be declared mut if modified locally.
Functions can be declared in any order because Qura resolves symbols across two passes.
`,
    code: `fn calculate_tax(amount: i32, rate_percent: i32) -> i32 {
    let tax = (amount * rate_percent) / 100;
    return tax;
}

fn compute_total(amount: i32, rate_percent: i32) -> i32 {
    let tax = calculate_tax(amount, rate_percent);
    return amount + tax;
}

fn main() -> i32 {
    let subtotal = 100;
    let total = compute_total(subtotal, 15);
    println("Total with 15% tax:");
    println(total);
    return 0;
}`,
    outputDescription: 'Terminal calculation output.',
    verifiedOutput: `Total with 15% tax:
115`,
    verifiedExitCode: 0,
    commonMistakes: [
      'Omitting the return type arrow -> i32 when returning a value.',
      'Calling a function with fewer or more arguments than declared.',
    ],
    nextStepTitle: '8. Conditional Branching (if / else)',
    nextStepId: 'conditional-branching',
    referenceLink: '/docs/functions',
  },
  {
    step: 8,
    id: 'conditional-branching',
    title: '8. Conditional Branching (if / else)',
    objective: 'Write conditional branching logic with if, else if, and else.',
    prerequisites: ['Completed Step 7.'],
    explanation: `
Conditional expressions in Qura require strict boolean expressions.
The condition can be a comparison (==, !=, <, <=, >, >=), a logical combination (&&, ||, !), or a boolean variable.
`,
    code: `fn max_of_three(a: i32, b: i32, c: i32) -> i32 {
    if a >= b && a >= c {
        return a;
    } else if b >= a && b >= c {
        return b;
    } else {
        return c;
    }
}

fn main() -> i32 {
    let highest = max_of_three(45, 92, 17);
    println(highest);
    return 0;
}`,
    outputDescription: 'Correctly selects and prints the maximum value.',
    verifiedOutput: '92',
    verifiedExitCode: 0,
    commonMistakes: [
      'Using an integer as a condition: "if count { ... }" is invalid in Qura; use "if count != 0".',
      'Forgetting braces: in Qura, the body of if/else must always be a block enclosed in {}.',
    ],
    nextStepTitle: '9. Iteration with while Loops',
    nextStepId: 'while-loops',
    referenceLink: '/docs/control-flow',
  },
  {
    step: 9,
    id: 'while-loops',
    title: '9. Iteration with while Loops',
    objective: 'Use while loops with mutable accumulator variables.',
    prerequisites: ['Completed Step 8.'],
    explanation: `
Loops in Qura are written with while. Because variables are immutable by default, loop counters and accumulators must be declared with let mut.
`,
    code: `fn sum_numbers(limit: i32) -> i32 {
    let mut sum = 0;
    let mut i = 1;
    while i <= limit {
        sum = sum + i;
        i = i + 1;
    }
    return sum;
}

fn main() -> i32 {
    let answer = sum_numbers(10); // 1 + 2 + ... + 10 = 55
    println(answer);
    return 0;
}`,
    outputDescription: 'Computes sum of numbers from 1 to 10.',
    verifiedOutput: '55',
    verifiedExitCode: 0,
    commonMistakes: [
      'Declaring a counter with "let i = 0;" instead of "let mut i = 0;": produces Error E0102.',
      'Forgetting to increment the loop counter, leading to an infinite loop.',
    ],
    nextStepTitle: '10. Build, Check, and Run Workflow',
    nextStepId: 'cli-workflow',
    referenceLink: '/docs/control-flow',
  },
  {
    step: 10,
    id: 'cli-workflow',
    title: '10. Build, Check, and Run Workflow',
    objective: 'Understand the difference between check, build, and run in the CLI.',
    prerequisites: ['Completed Step 9.'],
    explanation: `
The Qura CLI provides three distinct development modes:
1. qura check <file.qura>: Rapid syntax and type validation (sub-millisecond, ideal for IDE watchers).
2. qura run <file.qura>: Compiles to a temporary executable and immediately executes it.
3. qura build <file.qura> [-o out.exe]: Generates an optimized standalone executable for distribution.
`,
    code: `# 1. Fast verification
qura check examples/hello_math.qura

# 2. Direct run
qura run examples/hello_math.qura

# 3. Compile standalone binary
qura build examples/hello_math.qura -o math_app.exe
.\\math_app.exe`,
    outputDescription: 'Shows compilation commands.',
    verifiedOutput: '(Binary generated and executed successfully; exit code 42)',
    verifiedExitCode: 42,
    commonMistakes: [
      'Attempting to run a file with compile errors: check or build will halt and emit diagnostics.',
      'Expecting a separate build step before "qura run": "qura run" handles compilation automatically.',
    ],
    nextStepTitle: '11. Understanding Compiler Diagnostics',
    nextStepId: 'compiler-diagnostics',
    referenceLink: '/docs/cli',
  },
  {
    step: 11,
    id: 'compiler-diagnostics',
    title: '11. Understanding Compiler Diagnostics',
    objective: 'Read carets, source spans, and diagnostic error codes (E0001-E0109).',
    prerequisites: ['Completed Step 10.'],
    explanation: `
When your code has a syntax or type error, Qura emits an ANSI-styled diagnostic message with a specific error code and exact source carets.
For example, attempting to mutate an immutable variable produces E0102.
`,
    code: `// Deliberate error demonstration:
fn test_error() -> i32 {
    let fixed_val = 100;
    fixed_val = fixed_val + 1; // Error E0102
    return fixed_val;
}`,
    outputDescription: 'Diagnostic output printed to STDERR.',
    verifiedOutput: `error[E0102]: cannot assign to immutable variable 'fixed_val'
 --> test.qura:3:5
  |
3 |     fixed_val = fixed_val + 1;
  |     ^^^^^^^^^ cannot assign twice to immutable variable`,
    verifiedExitCode: 1,
    commonMistakes: [
      'Ignoring the diagnostic code: each code has detailed documentation under /docs/error-codes.',
      'Attempting to run when diagnostics are emitted: the compiler guarantees no invalid machine code is emitted.',
    ],
    nextStepTitle: '12. Use Qura in VS Code',
    nextStepId: 'vscode-workflow',
    referenceLink: '/docs/error-codes',
  },
  {
    step: 12,
    id: 'vscode-workflow',
    title: '12. Use Qura in VS Code',
    objective: 'Configure VS Code for syntax highlighting, bracket matching, and auto-closing.',
    prerequisites: ['Completed Step 11.'],
    explanation: `
The Qura release includes an official extension package: qura-lang-0.1.0.vsix.
Install it in your terminal with:
code --install-extension qura-lang-0.1.0.vsix

Once installed, opening any .qura file provides full TextMate syntax highlighting for keywords, primitive types, string escapes, and numbers, plus bracket pair colorization and comment toggling.
`,
    code: `// Open any .qura file in Visual Studio Code:
// Features enabled:
// - Syntax highlighting for fn, let, mut, if, while, return
// - String escape highlighting (\\n, \\r, \\t, \\\\, \\")
// - Auto-closing brackets and quotes
// - Block and line comment toggling (Ctrl+/ and Shift+Alt+A)`,
    outputDescription: 'Visual Studio Code ready for Qura development.',
    verifiedOutput: 'Extension installed successfully: qura-lang-0.1.0',
    verifiedExitCode: 0,
    commonMistakes: [
      'Forgetting to reload the VS Code window after installing a VSIX.',
      'Saving files with .txt instead of .qura extension.',
    ],
    referenceLink: '/docs/vscode',
  },
];
