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
      className={`primary flex items-center gap-2 ${copied ? 'copied' : ''}`}
      style={{ marginLeft: 8 }}
      title="Copier"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}
