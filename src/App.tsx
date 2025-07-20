import { useState } from "react";
import MessageInput from "./components/MessageInput";
import TagNature from "./components/TagNature";
import ApiKeyInput from "./components/ApiKeyInput";
import CopyButton from "./components/CopyButton";
import CodeBlockCard from "./components/CodeBlockCard";
import HistoryPanel from "./components/HistoryPanel";
import { analyzeNature } from "./utils/analyzeNature";
import { extractCodeBlocks } from "./utils/extractCodeBlocks";
import { getOpenAI } from "./utils/openaiClient";
import type { Nature } from "./utils/analyzeNature";
import type { CodeBlock } from "./utils/extractCodeBlocks";
import type { HistoryItem } from "./components/HistoryPanel";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem("openai_api_key") || "");
  const [message, setMessage] = useState("");
  const [nature, setNature] = useState<Nature | null>(null);
  const [response, setResponse] = useState("");
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = localStorage.getItem("partnerreply_history");
    return raw ? JSON.parse(raw) : [];
  });

  function buildPrompt(message: string, nature: Nature) {
    if (nature === "Graphique") {
      return `Tu es chargé de support WiziShop. Génère une réponse professionnelle pour le partenaire, incluant la signature :
- Réponds à la demande graphique de façon claire et courtoise, explique la solution.
- Génère le code CSS/JS à copier si pertinent, et place-le dans un bloc markdown (ex: \`\`\`css ... \`\`\`).
- Ajoute "Vous pouvez consulter l’article : [Titre de la doc] (https://help.wizishop.fr/...)" avant la signature.
Signature :
Tristan
*Chargé de site e-commerce*

Message du partenaire :
${message}`;
    } else {
      return `Tu es chargé de support WiziShop. Génère une réponse professionnelle complète à cette demande fonctionnelle (hors modification graphique) :
- Réponds de façon claire, pédagogique, pro, et insère le bon lien de documentation WiziShop.
- Ajoute la signature.
Signature :
Tristan
*Chargé de site e-commerce*

Message du partenaire :
${message}`;
    }
  }

  const generateResponse = async () => {
    setError(null);
    setResponse("");
    setCodeBlocks([]);
    setLoading(true);
    const n = analyzeNature(message);
    setNature(n);

    try {
      if (!apiKey) throw new Error("Aucune clé API OpenAI définie.");
      const openai = getOpenAI(apiKey);

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant support e-commerce expert WiziShop, très professionnel et synthétique.",
          },
          {
            role: "user",
            content: buildPrompt(message, n),
          }
        ],
        max_tokens: 500,
        temperature: 0.25,
      });

      const text = completion.choices[0].message.content || "(Aucune réponse générée)";
      setResponse(text);
      const blocks = extractCodeBlocks(text);
      setCodeBlocks(blocks);

      // Historique
      const newItem: HistoryItem = {
        id: uuidv4(),
        date: Date.now(),
        nature: n,
        message,
        response: text,
        codeBlocks: blocks,
      };
      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("partnerreply_history", JSON.stringify(newHistory));
    } catch (e: any) {
      setError(e.message || "Erreur OpenAI");
    }
    setLoading(false);
  };

  function restoreHistory(item: HistoryItem) {
    setMessage(item.message);
    setNature(item.nature);
    setResponse(item.response);
    setCodeBlocks(item.codeBlocks);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">PartnerReply</h1>
      <ApiKeyInput onChange={setApiKey} />
      <MessageInput
        value={message}
        onChange={setMessage}
        onGenerate={generateResponse}
        loading={loading}
      />
      {nature && <TagNature nature={nature} />}
      {error && (
        <div className="text-red-600 font-bold mt-2">{error}</div>
      )}
      {response && (
        <div className="card">
          {/* Affiche la réponse texte sans les blocs code */}
          <div className="font-mono text-base whitespace-pre-line">
            {response.replace(/```([a-zA-Z]*)\n[\s\S]*?```/g, "[Bloc code séparé]")}
          </div>
          <div className="copy-btn">
            <CopyButton value={response} />
          </div>
          {/* Affiche les blocs code extraits */}
          {codeBlocks.length > 0 && (
            <div className="mt-4">
              <div className="text-xs text-gray-500 font-semibold mb-1">
                Bloc{codeBlocks.length > 1 ? "s" : ""} code à copier :
              </div>
              {codeBlocks.map((block, idx) => (
                <CodeBlockCard key={idx} block={block} />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Historique */}
      <HistoryPanel history={history} onRestore={restoreHistory} />
    </div>
  );
}
