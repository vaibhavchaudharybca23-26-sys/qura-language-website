import { SyntaxTopic } from '../types';

export const syntaxData: SyntaxTopic[] = [
  {
    id: 'functions',
    category: 'Functions',
    title: 'Function Declarations & Calls',
    summary: 'Declaring functions with typed parameters, return types, and calling semantics.',
    code: `fn add(a: i32, b: i32) -> i32 {
    return a + b;
}

fn print_greeting(name: str) {
    print("Hello, ");
    println(name);
}

fn main() -> i32 {
    let result = add(20, 22);
    print_greeting("Qura Developer");
    return result; // Exit code: 42
}`,
    explanation:
      'Functions are declared with fn, followed by typed parameters (name: Type) and an optional return type arrow -> Type. If omitted, the return type defaults to unit (). Functions can be defined in any order; forward references are resolved automatically by the two-pass compiler.',
    restrictions: [
      'Functions cannot have duplicate parameter names.',
      'Arguments passed at call sites must strictly match the declared parameter types (Error E0100).',
      'Argument counts must match exactly (Error E0105).',
    ],
    correctExample: {
      code: `fn square(n: i32) -> i32 {
    return n * n;
}

fn main() -> i32 {
    return square(5); // Returns 25
}`,
      explanation: 'Argument 5 matches i32, return type matches i32.',
    },
    incorrectExample: {
      code: `fn square(n: i32) -> i32 {
    return n * n;
}

fn main() -> i32 {
    return square("five"); // ERROR E0100
}`,
      error: 'error[E0100]: type mismatch: expected i32, found str',
      explanation: 'Passing a string to a function expecting i32 is rejected during semantic analysis.',
    },
    docLink: '/docs/functions',
  },
  {
    id: 'variables',
    category: 'Variables & Mutability',
    title: 'Variables, Mutability & Scopes',
    summary: 'Immutable let bindings, mutable let mut bindings, and scope protection.',
    code: `fn main() -> i32 {
    // Immutable binding
    let speed_of_light = 299792458;
    
    // Explicit mutable binding
    let mut current_speed = 0;
    current_speed = current_speed + 100;
    current_speed = current_speed * 2;
    
    return 0;
}`,
    explanation:
      'Variables are declared with let and are strictly immutable by default. To allow reassignment, prefix the variable name with mut. Qura forbids variable shadowing within the exact same scope to prevent accidental bugs.',
    restrictions: [
      'Cannot assign to a non-mut variable (Error E0102).',
      'Cannot redeclare the same variable name within the same lexical block (Error E0104).',
      'Variables must be assigned a value when declared.',
    ],
    correctExample: {
      code: `let mut score = 10;
score = score + 5; // Valid: declared with mut`,
      explanation: 'Explicit mut modifier permits subsequent reassignments.',
    },
    incorrectExample: {
      code: `let score = 10;
score = score + 5; // ERROR E0102`,
      error: "error[E0102]: cannot assign to immutable variable 'score'",
      explanation: 'Assigning to an immutable variable is a compile-time error.',
    },
    docLink: '/docs/variables',
  },
  {
    id: 'scalars',
    category: 'Scalar Types',
    title: 'Primitive Scalar Types & Literals',
    summary: 'Integer, floating-point, boolean, and string primitives in v0.1.0-alpha.',
    code: `fn main() -> i32 {
    let a: i32 = -42;              // 32-bit signed integer
    let b: i64 = 9223372036854775807; // 64-bit signed integer
    let c: u32 = 4294967295;      // 32-bit unsigned integer
    let d: u64 = 100_000_000;     // 64-bit unsigned integer with separators
    let e: f64 = 3.1415926535;    // 64-bit floating-point
    let f: bool = true;           // Boolean literal
    let g: str = "Native\\nString"; // String literal with escapes
    
    return 0;
}`,
    explanation:
      'Qura features explicit scalar types mapped directly to machine registers via Cranelift. Numbers support underscores as digit separators, hexadecimal (0xFF), and binary (0b1010) prefixes.',
    restrictions: [
      'Implicit type coercion is not performed: adding i32 and i64 requires explicit casting (planned) or type matching.',
      'Strings are read-only literals in v0.1.0-alpha; dynamic string concatenation is scheduled for Milestone 8.',
      'println(f64) is currently rejected by sema (Error E0108); use integers or strings for console output in this preview.',
    ],
    correctExample: {
      code: `let x: i32 = 10;
let y: i32 = 20;
let z = x + y; // Inferred as i32`,
      explanation: 'Operands of matching type i32 produce valid arithmetic expression.',
    },
    incorrectExample: {
      code: `let x: i32 = 10;
let y: i64 = 20;
let z = x + y; // ERROR E0100`,
      error: 'error[E0100]: type mismatch: mismatched binary operands i32 and i64',
      explanation: 'Binary operations require identical operand types.',
    },
    docLink: '/docs/types',
  },
  {
    id: 'control-flow',
    category: 'Control Flow',
    title: 'Conditionals (if/else) & While Loops',
    summary: 'Branching logic, else if chains, and iterative while loops.',
    code: `fn classify(n: i32) -> i32 {
    if n > 0 {
        return 1;
    } else if n < 0 {
        return -1;
    } else {
        return 0;
    }
}

fn compute_sum(limit: i32) -> i32 {
    let mut sum = 0;
    let mut i = 1;
    while i <= limit {
        sum = sum + i;
        i = i + 1;
    }
    return sum;
}`,
    explanation:
      'Conditionals in Qura require boolean conditions. Loops use the while keyword, evaluating the condition prior to each iteration. State can be accumulated through loop-carried let mut variables.',
    restrictions: [
      'Conditions must strictly evaluate to bool. Integers or pointers cannot be treated as truthy (Error E0107).',
      'Parentheses around conditions are optional but allowed.',
      'Blocks must be enclosed in curly braces {}.',
    ],
    correctExample: {
      code: `let flag = true;
if flag {
    println("Passed!");
}`,
      explanation: 'Condition is a valid bool.',
    },
    incorrectExample: {
      code: `let count = 5;
if count { // ERROR E0107
    println("Count is non-zero");
}`,
      error: 'error[E0107]: condition must be of type bool, found i32',
      explanation: 'Numbers are not implicitly truthy. Use "if count != 0".',
    },
    docLink: '/docs/control-flow',
  },
  {
    id: 'operators',
    category: 'Operators',
    title: 'Arithmetic, Relational & Logical Operators',
    summary: 'Complete operator syntax and precedence rules.',
    code: `fn main() -> i32 {
    // Arithmetic
    let sum = 10 + 20;
    let diff = 50 - 8;
    let prod = 6 * 7;
    let quot = 100 / 4;
    let rem = 17 % 5;
    
    // Comparisons
    let is_equal = (sum == 30);
    let is_less = (diff < 50);
    
    // Logical
    let combined = is_equal && (!is_less || true);
    
    if combined {
        return 0;
    }
    return 1;
}`,
    explanation:
      'Arithmetic operators (+, -, *, /, %) perform machine-native math. Relational operators (==, !=, <, <=, >, >=) produce booleans. Logical operators (&&, ||, !) short-circuit as expected.',
    restrictions: [
      'Arithmetic operators cannot be applied to strings (Error E0108).',
      'Logical operators (&&, ||, !) require boolean operands (Error E0108).',
      'Bitwise operators (&, |, ^, <<, >>) are scheduled for subsequent milestones.',
    ],
    correctExample: {
      code: `let a = 10;
let b = 20;
let result = (a < b) && (b == 20);`,
      explanation: 'Logical AND connecting two boolean comparisons.',
    },
    incorrectExample: {
      code: `let text = "Hello " + "World"; // ERROR E0108`,
      error: "error[E0108]: binary operator '+' cannot be applied to type 'str'",
      explanation: 'String concatenation via + is not supported in v0.1.0-alpha.',
    },
    docLink: '/docs/operators',
  },
  {
    id: 'builtins',
    category: 'Standard Output',
    title: 'Standard Output: print & println',
    summary: 'Built-in output runtime for terminal output.',
    code: `fn main() -> i32 {
    // Printing strings
    print("Computing results... ");
    
    // Printing integers
    let answer = 42;
    println(answer);
    
    // Printing booleans
    let is_valid = true;
    print("Verification passed: ");
    println(is_valid);
    
    return 0;
}`,
    explanation:
      'Qura embeds an optimized Windows console output runtime. print() writes the representation of its argument to STDOUT without a newline, while println() appends a standard \\n newline.',
    restrictions: [
      'print and println accept exactly one argument.',
      'Supported argument types: str, i32, i64, u32, u64, and bool.',
      'Unit () and f64 are not printable in v0.1.0-alpha (Error E0108).',
    ],
    correctExample: {
      code: `println("Status code:");
println(200);`,
      explanation: 'Sequential calls to print individual items.',
    },
    incorrectExample: {
      code: `println("Status code: ", 200); // ERROR E0105`,
      error: 'error[E0105]: function println expects 1 argument, but 2 were provided',
      explanation: 'Multiple arguments in a single print call are not supported in this preview.',
    },
    docLink: '/docs/output',
  },
  {
    id: 'error-prevention',
    category: 'Error Prevention',
    title: 'Compiler Diagnostic Carets & Safety',
    summary: 'How Qura diagnostics guide developers to write correct code.',
    code: `// Example demonstrating diagnostic detection:
fn faulty_function() -> i32 {
    let uninitialized; // E0001: syntax error
    let x = 10;
    let x = 20;        // E0104: duplicate definition in scope
    return "string";   // E0106: return type mismatch
}`,
    explanation:
      'The compiler includes an expressive diagnostic emitter that pinpoints the exact line, column, and span of errors with carets (^~~~), severity labels, and helpful hints.',
    restrictions: [
      'Errors halt compilation before native code generation.',
      'Warnings and notes provide diagnostic context.',
    ],
    docLink: '/docs/error-codes',
  },
];
