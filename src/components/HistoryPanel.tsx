import CopyButton from "./CopyButton";
import CodeBlockCard from "./CodeBlockCard";
import type { CodeBlock } from "../utils/extractCodeBlocks";
import type { Nature } from "../utils/analyzeNature";

export interface HistoryItem {
  id: string;
  date: number;
  nature: Nature;
  message: string;
  response: string;
  codeBlocks: CodeBlock[];
}

export default function HistoryPanel({
  history,
  onRestore,
}: {
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
}) {
  return (
    <div className="w-full max-w-2xl mb-10">
      <div className="font-bold text-lg mb-2 text-gray-700">Historique récent</div>
      {history.length === 0 && <div className="text-gray-400 text-sm">Aucune réponse enregistrée.</div>}
      <div className="flex flex-col gap-3">
        {history.map(item => (
          <div className="card" key={item.id} style={{ marginBottom: 8 }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold"
                style={{ color: item.nature === "Graphique" ? "#facc15" : "#34d399" }}>
                {item.nature} – {new Date(item.date).toLocaleString()}
              </span>
              <button
                onClick={() => onRestore(item)}
                className="px-2 py-1 rounded border bg-gray-100 text-xs hover:bg-gray-200 font-semibold"
              >
                Réutiliser
              </button>
            </div>
            <div className="text-xs mb-1 text-gray-500">Message partenaire :</div>
            <div className="bg-gray-100 p-2 rounded text-xs mb-2">{item.message}</div>
            <div className="flex gap-2">
              <CopyButton value={item.response} />
              <span className="text-xs text-gray-400 pt-2">Copier la réponse</span>
            </div>
            {item.codeBlocks.length > 0 && (
              <div className="mt-3">
                {item.codeBlocks.map((block, idx) => (
                  <CodeBlockCard key={idx} block={block} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
