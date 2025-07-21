import CopyButton from "./CopyButton";
import type { CodeBlock } from "../utils/extractCodeBlocks";

export default function CodeBlockCard({ block }: { block: CodeBlock }) {
  return (
    <div className="my-4 code-block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase" style={{ opacity: 0.7 }}>
          {block.language || "code"}
        </span>
        <CopyButton value={block.code} />
      </div>
      <pre className="text-sm font-mono whitespace-pre overflow-x-auto">
        {block.code}
      </pre>
    </div>
  );
}
