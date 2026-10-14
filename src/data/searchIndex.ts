import { SearchItem } from '../types';
import { docsData } from './docsData';
import { syntaxData } from './syntaxData';
import { learnData } from './learnData';
import { examplesData } from './examplesData';

export const buildSearchIndex = (): SearchItem[] => {
  const items: SearchItem[] = [];

  // Documentation sections
  for (const doc of docsData) {
    items.push({
      id: `doc-${doc.id}`,
      title: doc.title,
      category: `Docs: ${doc.category}`,
      snippet: doc.summary,
      href: `/docs/${doc.id}`,
      keywords: [doc.id, doc.title, doc.category, ...doc.summary.split(' ')],
    });
  }

  // Syntax explorer topics
  for (const syn of syntaxData) {
    items.push({
      id: `syntax-${syn.id}`,
      title: syn.title,
      category: `Syntax: ${syn.category}`,
      snippet: syn.summary,
      href: `/syntax?topic=${syn.id}`,
      keywords: [syn.id, syn.title, syn.category, ...syn.summary.split(' ')],
    });
  }

  // Tutorial steps
  for (const step of learnData) {
    items.push({
      id: `learn-${step.id}`,
      title: step.title,
      category: 'Tutorials',
      snippet: step.objective,
      href: `/learn?step=${step.id}`,
      keywords: [step.id, step.title, 'learn', 'tutorial', ...step.objective.split(' ')],
    });
  }

  // Examples
  for (const ex of examplesData) {
    items.push({
      id: `example-${ex.id}`,
      title: `${ex.name} (${ex.filename})`,
      category: `Example: ${ex.category}`,
      snippet: ex.description,
      href: `/examples?sample=${ex.id}`,
      keywords: [ex.id, ex.name, ex.filename, ex.category, ...ex.highlights],
    });
  }

  // Key CLI Commands
  const cliCommands = [
    {
      name: 'qura doctor',
      snippet: 'Diagnostic command checking target platform, linker path, and Windows SDK libraries.',
      href: '/docs/doctor',
    },
    {
      name: 'qura check',
      snippet: 'Fast syntax and semantic type verification without invoking native codegen.',
      href: '/docs/cli',
    },
    {
      name: 'qura build',
      snippet: 'Compiles .qura source file to standalone native Windows x86_64 executable.',
      href: '/docs/cli',
    },
    {
      name: 'qura run',
      snippet: 'Compiles and executes program immediately, streaming stdout and exit code.',
      href: '/docs/cli',
    },
    {
      name: 'Download Windows x64 ZIP',
      snippet: 'Official release archive containing compiler binary, setup guide, examples, and VS Code extension.',
      href: '/download',
    },
    {
      name: 'VS Code Extension (.vsix)',
      snippet: 'Official Visual Studio Code extension with full syntax highlighting and bracket matching.',
      href: '/docs/vscode',
    },
  ];

  for (const cmd of cliCommands) {
    items.push({
      id: `cli-${cmd.name.replace(/[^a-zA-Z0-9]/g, '-')}`,
      title: cmd.name,
      category: 'Command / Tool',
      snippet: cmd.snippet,
      href: cmd.href,
      keywords: cmd.name.split(' '),
    });
  }

  return items;
};

export const searchIndex: SearchItem[] = buildSearchIndex();
