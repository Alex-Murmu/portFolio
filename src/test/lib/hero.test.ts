import { describe, it, expect } from 'vitest';
import { parseTemplate, parseBoldText } from '@/lib/hero';

const mockSkills = [
  { name: 'TypeScript', href: 'https://www.typescriptlang.org/', component: 'TypeScript' },
  { name: 'React', href: 'https://react.dev/', component: 'ReactIcon' },
  { name: 'Next.js', href: 'https://nextjs.org/', component: 'NextJs' },
];

describe('parseBoldText', () => {
  it('returns plain text when no bold tags', () => {
    const result = parseBoldText('hello world');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ text: 'hello world', bold: false });
  });

  it('parses bold tags', () => {
    const result = parseBoldText('hello <b>world</b>');
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ text: 'hello ', bold: false });
    expect(result[1]).toMatchObject({ text: 'world', bold: true });
    expect(result[2]).toMatchObject({ text: '', bold: false });
  });

  it('parses multiple bold tags', () => {
    const result = parseBoldText('<b>one</b> and <b>two</b>');
    expect(result).toHaveLength(5);
    expect(result[1]).toMatchObject({ text: 'one', bold: true });
    expect(result[2]).toMatchObject({ text: ' and ', bold: false });
    expect(result[3]).toMatchObject({ text: 'two', bold: true });
  });

  it('returns empty array for empty string', () => {
    const result = parseBoldText('');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ text: '', bold: false });
  });
});

describe('parseTemplate', () => {
  it('parses plain text without placeholders', () => {
    const result = parseTemplate('Hello World', mockSkills);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject({ type: 'text', text: 'Hello World' });
  });

  it('injects skill components at placeholder positions', () => {
    const result = parseTemplate('I use {skills:0}', mockSkills);
    expect(result.length).toBe(3);
    expect(result[0]).toMatchObject({ type: 'text' });
    expect(result[1]).toMatchObject({ type: 'skill', skill: mockSkills[0] });
  });

  it('parses mixed text, skills, and bold', () => {
    const result = parseTemplate(
      '{skills:0} and <b>love</b> it',
      mockSkills,
    );
    expect(result).toHaveLength(5);
    const skillParts = result.filter((p) => p.type === 'skill');
    const boldParts = result.filter((p) => p.type === 'bold');
    expect(skillParts).toHaveLength(1);
    expect(skillParts[0]).toMatchObject({ skill: mockSkills[0] });
    expect(boldParts).toHaveLength(1);
    expect(boldParts[0]).toMatchObject({ text: 'love' });
  });

  it('handles multiple skills', () => {
    const result = parseTemplate('{skills:0} + {skills:1} + {skills:2}', mockSkills);
    const skillParts = result.filter((p) => p.type === 'skill');
    expect(skillParts).toHaveLength(3);
    expect(skillParts[0]).toMatchObject({ skill: mockSkills[0] });
    expect(skillParts[1]).toMatchObject({ skill: mockSkills[1] });
    expect(skillParts[2]).toMatchObject({ skill: mockSkills[2] });
  });

  it('returns text as-is when skill index is out of bounds', () => {
    const result = parseTemplate('{skills:99}', mockSkills);
    expect(result).toHaveLength(3);
    expect(result[1]).toMatchObject({ type: 'text', text: '{skills:99}' });
  });

  it('handles empty template', () => {
    const result = parseTemplate('', mockSkills);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject({ type: 'text', text: '' });
  });
});
