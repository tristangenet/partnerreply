export interface CodeBlock {
  language: string;
  code: string;
}

export function extractCodeBlocks(text: string): CodeBlock[] {
  // Regex qui trouve tous les blocs ```lang\ncode\n```
  const regex = /```([a-zA-Z]*)\n([\s\S]*?)```/g;
  const blocks: CodeBlock[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || "texte",
      code: match[2].trim(),
    });
  }
  return blocks;
}
