import { describe, it, expect } from 'vitest';
import { siteConfig } from '../data/siteConfig';
import { docsData } from '../data/docsData';
import { syntaxData } from '../data/syntaxData';
import { learnData } from '../data/learnData';
import { examplesData } from '../data/examplesData';
import { roadmapData } from '../data/roadmapData';
import { changelogData } from '../data/changelogData';
import { searchIndex } from '../data/searchIndex';

describe('Qura Website Data Integrity & Architecture Tests', () => {
  it('siteConfig has verified release, maintainer, and URLs', () => {
    expect(siteConfig.name).toBe('Qura Language');
    expect(siteConfig.maintainer).toBe('Vaibhav Chaudhary');
    expect(siteConfig.organization).toBe('Qura Technologies');
    expect(siteConfig.currentVersion).toBe('v0.1.0-alpha');
    expect(siteConfig.cliVersion).toBe('v0.1.0');
    expect(siteConfig.githubRepo).toContain('qura-language');
    expect(siteConfig.publishedRelease.assets.length).toBeGreaterThanOrEqual(2);
    expect(siteConfig.publishedRelease.assets[0].sha256).toBe(
      'b0820ed6d2ff03c4e5dd60ce6cf0f714bf5abfb8f5b27d41ed375f675645e8c8'
    );
  });

  it('docsData contains all four required categories with non-empty content', () => {
    const categories = new Set(docsData.map((d) => d.category));
    expect(categories.has('Getting Started')).toBe(true);
    expect(categories.has('Language Fundamentals')).toBe(true);
    expect(categories.has('Compiler & Tooling')).toBe(true);
    expect(categories.has('Reference')).toBe(true);

    const ids = new Set<string>();
    for (const doc of docsData) {
      expect(ids.has(doc.id)).toBe(false); // No duplicate doc IDs
      ids.add(doc.id);
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.content.length).toBeGreaterThan(50);
      expect(doc.summary.length).toBeGreaterThan(10);
    }
  });

  it('syntaxData contains verified topics with correct and incorrect examples', () => {
    expect(syntaxData.length).toBeGreaterThanOrEqual(6);
    for (const syn of syntaxData) {
      expect(syn.title.length).toBeGreaterThan(0);
      expect(syn.code).toContain('fn');
      if (syn.correctExample) {
        expect(syn.correctExample.code.length).toBeGreaterThan(0);
      }
      if (syn.incorrectExample) {
        expect(syn.incorrectExample.error).toContain('error');
      }
    }
  });

  it('learnData has exactly 12 sequential progressive tutorial lessons', () => {
    expect(learnData.length).toBe(12);
    for (let i = 0; i < 12; i++) {
      expect(learnData[i].step).toBe(i + 1);
      expect(learnData[i].title).toContain(`${i + 1}.`);
      expect(learnData[i].objective.length).toBeGreaterThan(10);
      expect(learnData[i].code.length).toBeGreaterThan(10);
      expect(learnData[i].commonMistakes.length).toBeGreaterThan(0);
    }
  });

  it('examplesData includes canonical examples with verified exit codes', () => {
    const filenames = examplesData.map((ex) => ex.filename);
    expect(filenames).toContain('hello_world.qura');
    expect(filenames).toContain('hello_math.qura');
    expect(filenames).toContain('factorial.qura');
    expect(filenames).toContain('collatz.qura');

    const helloMath = examplesData.find((ex) => ex.filename === 'hello_math.qura');
    expect(helloMath?.verifiedExitCode).toBe(42);

    const factorial = examplesData.find((ex) => ex.filename === 'factorial.qura');
    expect(factorial?.verifiedExitCode).toBe(120);

    const collatz = examplesData.find((ex) => ex.filename === 'collatz.qura');
    expect(collatz?.verifiedExitCode).toBe(111);
  });

  it('roadmapData has milestones 1 to 10 with clear deliverables', () => {
    expect(roadmapData.length).toBeGreaterThanOrEqual(10);
    const m1 = roadmapData.find((m) => m.number === 1);
    expect(m1?.status).toBe('Implemented');

    const m6 = roadmapData.find((m) => m.number === 6);
    expect(m6?.status).toBe('Implemented');

    const m7 = roadmapData.find((m) => m.number === 7);
    expect(m7?.status).toBe('In Progress');

    const m8 = roadmapData.find((m) => m.number === 8);
    expect(m8?.status).toBe('Planned');
  });

  it('searchIndex contains entries across docs, syntax, tutorials, examples, and CLI commands', () => {
    expect(searchIndex.length).toBeGreaterThan(25);

    // Test search query for doctor
    const doctorMatch = searchIndex.filter((item) =>
      item.title.toLowerCase().includes('doctor') || item.keywords.includes('doctor')
    );
    expect(doctorMatch.length).toBeGreaterThanOrEqual(1);

    // Test search query for while
    const whileMatch = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes('while') ||
        item.keywords.some((k) => k.toLowerCase().includes('while'))
    );
    expect(whileMatch.length).toBeGreaterThanOrEqual(1);
  });
});
