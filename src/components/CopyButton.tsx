import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  }

  return (
    <button
      onClick={handleCopy}
      className={`ml-2 px-3 py-1 rounded transition border
        ${copied ? "bg-green-100 border-green-400 text-green-800" : "bg-gray-100 border-gray-300 hover:bg-gray-200"}
        flex items-center gap-2`}
      style={{ fontWeight: 600 }}
      title="Copier"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}
