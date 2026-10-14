import { ExampleProgram } from '../types';

export const examplesData: ExampleProgram[] = [
  {
    id: 'hello-world',
    name: 'Hello World & Primitive Output',
    filename: 'hello_world.qura',
    category: 'Basics',
    description:
      'The foundational Qura program demonstrating standard output for strings, integers, and booleans, followed by clean exit code propagation.',
    code: `fn main() -> i32 {
    println("Hello from Qura Language!");
    println(42);
    println(true);
    return 0;
}`,
    verifiedOutput: `Hello from Qura Language!
42
true`,
    verifiedExitCode: 0,
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/blob/master/examples/hello_world.qura',
    highlights: [
      'Built-in println() runtime formatting',
      'String literals with UTF-8 support',
      'Integer and boolean value formatting',
      'Standard OS exit code return (0)',
    ],
  },
  {
    id: 'hello-math',
    name: 'Arithmetic & Function Calling',
    filename: 'hello_math.qura',
    category: 'Functions',
    description:
      'Defines a mathematical calculation function with multiple typed parameters and returns the resulting arithmetic value directly as the process exit code (42).',
    code: `// Qura Language — Hello Math Example
// Computes an arithmetic expression and returns the result as process exit code (42).

fn calculate(base: i32, multiplier: i32, offset: i32) -> i32 {
    let product = base * multiplier;
    return product + offset;
}

fn main() -> i32 {
    let result = calculate(10, 4, 2); // 10 * 4 + 2 = 42
    return result;
}`,
    verifiedOutput: '(Program executes arithmetic and returns 42 as process exit code)',
    verifiedExitCode: 42,
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/blob/master/examples/hello_math.qura',
    highlights: [
      'Multi-argument function declaration',
      'Immutable let bindings for intermediate expressions',
      'Arithmetic operators (+ and *)',
      'Return value propagated directly to OS exit code',
    ],
  },
  {
    id: 'factorial',
    name: 'Iterative Factorial (5!)',
    filename: 'factorial.qura',
    category: 'Loops & State',
    description:
      'Computes 5! (120) using an iterative while loop, mutable state variables (let mut), and returns 120 as the process exit code.',
    code: `// Qura Language — Factorial Example
// Computes factorial(5) using an iterative while loop and mutable state.
// Expected process exit code: 120.

fn factorial(n: i32) -> i32 {
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
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/blob/master/examples/factorial.qura',
    highlights: [
      'Explicit mutable bindings: let mut acc and let mut i',
      'While loop conditional iteration (i <= n)',
      'Accumulator pattern with state mutations',
      'Verified native Cranelift compilation and execution',
    ],
  },
  {
    id: 'collatz',
    name: 'Collatz Conjecture (n = 27)',
    filename: 'collatz.qura',
    category: 'Algorithms',
    description:
      'Implements the 3n + 1 Collatz sequence step counter starting from n = 27, demonstrating mutable function parameters, modulo arithmetic, and if/else branching. Yields 111 steps.',
    code: `// Qura Language — Collatz Conjecture Example
// Computes the number of steps to reach 1 starting from n = 27.
// Expected process exit code: 111.

fn collatz_steps(mut n: i32) -> i32 {
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
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language/blob/master/examples/collatz.qura',
    highlights: [
      'Mutable function parameter: mut n: i32',
      'Modulo operator: n % 2 == 0',
      'Conditional branching: if / else',
      'Non-trivial mathematical algorithm verifying SSA phi lowering in QIR',
    ],
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci Sequence Generator',
    filename: 'fibonacci.qura',
    category: 'Algorithms',
    description:
      'Iterative computation of the 10th Fibonacci number using loop-carried state variables, displaying intermediate numbers to the console.',
    code: `fn fibonacci(n: i32) -> i32 {
    if n <= 1 {
        return n;
    }
    let mut prev = 0;
    let mut curr = 1;
    let mut i = 2;
    while i <= n {
        let next_val = prev + curr;
        prev = curr;
        curr = next_val;
        i = i + 1;
    }
    return curr;
}

fn main() -> i32 {
    let answer = fibonacci(10); // fib(10) = 55
    print("Fibonacci(10) = ");
    println(answer);
    return 0;
}`,
    verifiedOutput: `Fibonacci(10) = 55`,
    verifiedExitCode: 0,
    githubUrl: 'https://github.com/vaibhavchaudharybca23-26-sys/qura-language',
    highlights: [
      'Early return on base condition (n <= 1)',
      'Multiple mutable tracking variables',
      'Console output combining print and println',
    ],
  },
];
