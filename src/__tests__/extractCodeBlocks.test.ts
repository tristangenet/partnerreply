import { extractCodeBlocks } from '../utils/extractCodeBlocks';

describe('extractCodeBlocks', () => {
  it('returns all code blocks with language and code', () => {
    const text = `before
\`\`\`js
console.log('a');
\`\`\`
middle
\`\`\`css
body { color: red; }
\`\`\`
after`;
    const blocks = extractCodeBlocks(text);
    expect(blocks).toEqual([
      { language: 'js', code: "console.log('a');" },
      { language: 'css', code: 'body { color: red; }' },
    ]);
  });
});
