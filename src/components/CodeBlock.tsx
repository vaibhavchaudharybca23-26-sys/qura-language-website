import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

// Tokenizer for Qura Language matching qura.tmLanguage.json
interface Token {
  text: string;
  type:
    | 'comment'
    | 'string'
    | 'keyword'
    | 'type'
    | 'builtin'
    | 'boolean'
    | 'number'
    | 'operator'
    | 'function'
    | 'text';
}

function tokenizeQura(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  // Simple sequential tokenization
  while (remaining.length > 0) {
    // 1. Single line comment
    const commentMatch = remaining.match(/^(\/\/.*)$/);
    if (commentMatch) {
      tokens.push({ text: commentMatch[1], type: 'comment' });
      break;
    }

    // 2. Block comment start/end or inline
    const blockCommentMatch = remaining.match(/^(\/\*[\s\S]*?\*\/)/);
    if (blockCommentMatch) {
      tokens.push({ text: blockCommentMatch[1], type: 'comment' });
      remaining = remaining.slice(blockCommentMatch[1].length);
      continue;
    }

    // 3. String literal
    const stringMatch = remaining.match(/^("([^"\\]|\\.)*")/);
    if (stringMatch) {
      tokens.push({ text: stringMatch[1], type: 'string' });
      remaining = remaining.slice(stringMatch[1].length);
      continue;
    }

    // 4. Function declaration (fn name)
    const fnDeclMatch = remaining.match(/^(fn\b)\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (fnDeclMatch) {
      tokens.push({ text: 'fn', type: 'keyword' });
      tokens.push({ text: ' ', type: 'text' });
      tokens.push({ text: fnDeclMatch[2], type: 'function' });
      remaining = remaining.slice(fnDeclMatch[0].length);
      continue;
    }

    // 5. Reserved Keywords
    const keywordMatch = remaining.match(/^(fn|let|mut|if|else|while|return)\b/);
    if (keywordMatch) {
      tokens.push({ text: keywordMatch[1], type: 'keyword' });
      remaining = remaining.slice(keywordMatch[1].length);
      continue;
    }

    // 6. Built-in functions
    const builtinMatch = remaining.match(/^(println|print)\b/);
    if (builtinMatch) {
      tokens.push({ text: builtinMatch[1], type: 'builtin' });
      remaining = remaining.slice(builtinMatch[1].length);
      continue;
    }

    // 7. Primitive types
    const typeMatch = remaining.match(/^(i32|i64|u32|u64|f64|bool|str)\b/);
    if (typeMatch) {
      tokens.push({ text: typeMatch[1], type: 'type' });
      remaining = remaining.slice(typeMatch[1].length);
      continue;
    }

    // 8. Booleans
    const boolMatch = remaining.match(/^(true|false)\b/);
    if (boolMatch) {
      tokens.push({ text: boolMatch[1], type: 'boolean' });
      remaining = remaining.slice(boolMatch[1].length);
      continue;
    }

    // 9. Numbers (hex, binary, float, decimal)
    const numMatch = remaining.match(/^(0[xX][0-9a-fA-F_]+|0[bB][01_]+|[0-9][0-9_]*\.[0-9][0-9_]*([eE][+-]?[0-9][0-9_]*)?|[0-9][0-9_]*)\b/);
    if (numMatch) {
      tokens.push({ text: numMatch[1], type: 'number' });
      remaining = remaining.slice(numMatch[1].length);
      continue;
    }

    // 10. Operators & Delimiters
    const opMatch = remaining.match(/^(->|==|!=|<=|>=|&&|\|\||[+\-*\/%=!<>&|])/);
    if (opMatch) {
      tokens.push({ text: opMatch[1], type: 'operator' });
      remaining = remaining.slice(opMatch[1].length);
      continue;
    }

    // 11. Function call (identifier followed by '(')
    const fnCallMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/);
    if (fnCallMatch) {
      tokens.push({ text: fnCallMatch[1], type: 'function' });
      remaining = remaining.slice(fnCallMatch[1].length);
      continue;
    }

    // 12. Standard words or whitespace
    const textMatch = remaining.match(/^(\s+|[a-zA-Z_][a-zA-Z0-9_]*|[^\s\w])/);
    if (textMatch) {
      tokens.push({ text: textMatch[1], type: 'text' });
      remaining = remaining.slice(textMatch[1].length);
      continue;
    }

    // Fallback: 1 char
    tokens.push({ text: remaining[0], type: 'text' });
    remaining = remaining.slice(1);
  }

  return tokens;
}

const tokenClasses: Record<Token['type'], string> = {
  comment: 'text-slate-400 dark:text-slate-500 italic',
  string: 'text-emerald-600 dark:text-emerald-400 font-medium',
  keyword: 'text-indigo-600 dark:text-indigo-400 font-semibold',
  type: 'text-amber-600 dark:text-amber-400 font-medium',
  builtin: 'text-sky-600 dark:text-sky-400 font-semibold',
  boolean: 'text-rose-600 dark:text-rose-400 font-semibold',
  number: 'text-orange-600 dark:text-orange-400',
  operator: 'text-cyan-600 dark:text-cyan-400 font-bold',
  function: 'text-blue-600 dark:text-blue-300 font-medium',
  text: 'text-slate-800 dark:text-slate-200',
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'qura',
  title,
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/5 dark:bg-slate-900/80 overflow-hidden shadow-xs backdrop-blur-xs my-4 ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-300">
            {language}
          </span>
          {title && <span className="text-slate-400 dark:text-slate-500 font-mono">({title})</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Copy code to clipboard"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-white/70 dark:bg-slate-950/80">
        <pre className="m-0 p-0 font-mono">
          {lines.map((line, idx) => {
            const isQura = language.toLowerCase() === 'qura';
            const tokens = isQura ? tokenizeQura(line) : [{ text: line, type: 'text' as const }];

            return (
              <div key={idx} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell select-none text-right pr-4 text-slate-400 dark:text-slate-600 text-xs w-8">
                    {idx + 1}
                  </span>
                )}
                <span className="table-cell">
                  {tokens.map((token, tIdx) => (
                    <span key={tIdx} className={tokenClasses[token.type]}>
                      {token.text}
                    </span>
                  ))}
                  {tokens.length === 0 && ' '}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
