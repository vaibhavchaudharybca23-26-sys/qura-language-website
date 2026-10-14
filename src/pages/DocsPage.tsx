import React, { useState, useMemo } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Search,
  ExternalLink,
  Hash,
  Terminal,
  Code,
  Layers,
  FileCode,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { docsData } from '../data/docsData';
import { DocSection } from '../types';
import { CodeBlock } from '../components/CodeBlock';
import { siteConfig } from '../data/siteConfig';

export const DocsPage: React.FC = () => {
  const [, params] = useRoute('/docs/:id');
  const [, setLocation] = useLocation();
  const [filterQuery, setFilterQuery] = useState('');

  const currentDocId = params?.id || 'intro';
  const currentDoc = docsData.find((d) => d.id === currentDocId) || docsData[0];

  const currentIndex = docsData.findIndex((d) => d.id === currentDoc.id);
  const prevDoc = currentIndex > 0 ? docsData[currentIndex - 1] : null;
  const nextDoc = currentIndex < docsData.length - 1 ? docsData[currentIndex + 1] : null;

  // Group documentation by category
  const categories: Array<DocSection['category']> = [
    'Getting Started',
    'Language Fundamentals',
    'Compiler & Tooling',
    'Reference',
  ];

  const filteredDocs = useMemo(() => {
    if (!filterQuery.trim()) return docsData;
    const q = filterQuery.toLowerCase();
    return docsData.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  // Parser helper to render markdown-like content cleanly with code blocks and headers
  const renderDocContent = (raw: string) => {
    const lines = raw.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLanguage = 'qura';
    let codeBuffer: string[] = [];
    let keyCounter = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start/end
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          elements.push(
            <CodeBlock
              key={`code-${keyCounter++}`}
              code={codeBuffer.join('\n')}
              language={codeLanguage}
              showLineNumbers={codeLanguage === 'qura'}
            />
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || 'qura';
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${keyCounter++}`} className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4 tracking-tight">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        const title = line.slice(3);
        const anchorId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2
            key={`h2-${keyCounter++}`}
            id={anchorId}
            className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 group"
          >
            <span>{title}</span>
            <a href={`#${anchorId}`} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-500 transition-opacity">
              <Hash className="w-4 h-4" />
            </a>
          </h2>
        );
      } else if (line.startsWith('### ')) {
        const title = line.slice(4);
        elements.push(
          <h3 key={`h3-${keyCounter++}`} className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6 mb-2">
            {title}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={`h4-${keyCounter++}`} className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mt-4 mb-2">
            {line.slice(5)}
          </h4>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={`li-${keyCounter++}`} className="text-slate-700 dark:text-slate-300 ml-4 list-disc text-sm sm:text-base leading-relaxed my-1">
            {formatInlineText(line.slice(2))}
          </li>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`bq-${keyCounter++}`} className="p-4 my-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-slate-700 dark:text-slate-300 text-sm">
            {formatInlineText(line.slice(2))}
          </blockquote>
        );
      } else if (line.startsWith('|') && line.endsWith('|')) {
        // Table row
        elements.push(
          <div key={`table-row-${keyCounter++}`} className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 py-1 border-b border-slate-100 dark:border-slate-800/80">
            {formatInlineText(line)}
          </div>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={`hr-${keyCounter++}`} className="my-8 border-slate-200 dark:border-slate-800" />);
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={`p-${keyCounter++}`} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base my-3">
            {formatInlineText(line)}
          </p>
        );
      }
    }

    return elements;
  };

  const formatInlineText = (text: string) => {
    // Basic inline code and bold formatting
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs sm:text-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* --- SIDEBAR NAVIGATION --- */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
          {/* Docs Filter Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter topics..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Categorized List */}
          <nav className="space-y-6">
            {categories.map((category) => {
              const docsInCategory = filteredDocs.filter((d) => d.category === category);
              if (docsInCategory.length === 0) return null;

              return (
                <div key={category} className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {docsInCategory.map((doc) => {
                      const isActive = doc.id === currentDoc.id;
                      return (
                        <li key={doc.id}>
                          <Link
                            href={`/docs/${doc.id}`}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{doc.title}</span>
                            {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="lg:col-span-9 min-w-0">
          {/* Breadcrumb Bar */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-indigo-500">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/docs" className="hover:text-indigo-500">
              Docs
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">{currentDoc.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">{currentDoc.title}</span>
          </div>

          {/* Doc Header Badge */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono">
              {currentDoc.category}
            </span>
          </div>

          {/* Rendered Document Content */}
          <article className="prose prose-slate dark:prose-invert max-w-none">
            {renderDocContent(currentDoc.content)}
          </article>

          {/* Related Links */}
          {currentDoc.relatedLinks && currentDoc.relatedLinks.length > 0 && (
            <div className="mt-12 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Related Topics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentDoc.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors flex items-center justify-between text-xs font-medium text-slate-800 dark:text-slate-200 group"
                  >
                    <span>{link.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Next Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            {prevDoc ? (
              <Link
                href={`/docs/${prevDoc.id}`}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-500" />
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono">Previous</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{prevDoc.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextDoc && (
              <Link
                href={`/docs/${nextDoc.id}`}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors ml-auto text-right"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase font-mono">Next</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{nextDoc.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-500" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
