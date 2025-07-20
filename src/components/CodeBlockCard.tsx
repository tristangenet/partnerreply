import CopyButton from "./CopyButton";
import type { CodeBlock } from "../utils/extractCodeBlocks";

export default function CodeBlockCard({ block }: { block: CodeBlock }) {
  return (
    <div className="my-4 bg-[#f3f4f6] border rounded-xl p-4 relative overflow-x-auto">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase text-gray-600">
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
