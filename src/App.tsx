import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MessageInput from "./components/MessageInput";
import TagNature from "./components/TagNature";
import ApiKeyInput from "./components/ApiKeyInput";
import CopyButton from "./components/CopyButton";
import CodeBlockCard from "./components/CodeBlockCard";
import HistoryPanel from "./components/HistoryPanel";
import DocLinks from "./components/DocLinks";
import OptionsBar from "./components/OptionsBar";
import { analyzeNature } from "./utils/analyzeNature";
import { extractCodeBlocks } from "./utils/extractCodeBlocks";
import { getOpenAI } from "./utils/openaiClient";
import type { Nature } from "./utils/analyzeNature";
import type { CodeBlock } from "./utils/extractCodeBlocks";
import type { HistoryItem } from "./components/HistoryPanel";
import { v4 as uuidv4 } from "uuid";
import type { ChatCompletionContentPart } from "openai/resources/chat/completions";

export default function App() {
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem("openai_api_key") || "");
  const [message, setMessage] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssjsCode, setCssjsCode] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [nature, setNature] = useState<Nature | null>(null);
  const [response, setResponse] = useState("");
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const textOnly = response.replace(/```([a-zA-Z]*)\n[\s\S]*?```/g, "[Bloc code séparé]");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = localStorage.getItem("partnerreply_history");
    return raw ? JSON.parse(raw) : [];
  });

  const [dark, setDark] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function buildPrompt(
    message: string,
    nature: Nature,
    html: string,
    cssjs: string,
  ) {
    const htmlPart = html ? `\nCode HTML fourni :\n${html}` : "";
    const cssPart = cssjs ? `\nCode CSS/JS fourni :\n${cssjs}` : "";
    if (nature === "Graphique") {
      return `Tu es chargé de support WiziShop. Génère une réponse professionnelle pour le partenaire, incluant la signature :
- Réponds à la demande graphique de façon claire et courtoise, explique la solution.
- Génère le code CSS/JS à copier si pertinent, et place-le dans un bloc markdown (ex: \`\`\`css ... \`\`\`).
- Ajoute "Vous pouvez consulter l’article : [Titre de la doc] (https://help.wizishop.fr/...)" avant la signature.
Signature :
Tristan
*Chargé de site e-commerce*

Message du partenaire :
${message}${htmlPart}${cssPart}`;
    } else {
      return `Tu es chargé de support WiziShop. Génère une réponse professionnelle complète à cette demande fonctionnelle (hors modification graphique) :
- Réponds de façon claire, pédagogique, pro, et insère le bon lien de documentation WiziShop.
- Ajoute la signature.
Signature :
Tristan
*Chargé de site e-commerce*

Message du partenaire :
${message}${htmlPart}${cssPart}`;
    }
  }

  const generateResponse = async () => {
    setError(null);
    setResponse("");
    setCodeBlocks([]);
    setLoading(true);
    const n = analyzeNature(message + htmlCode + cssjsCode);
    setNature(n);

    try {
      const finalApiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || "";
      if (!finalApiKey) throw new Error("Aucune clé API OpenAI définie.");
      const openai = getOpenAI(finalApiKey);

      const userContent: ChatCompletionContentPart[] = [
        { type: "text", text: buildPrompt(message, n, htmlCode, cssjsCode) },
      ];
      if (screenshot) {
        userContent.push({ type: "image_url", image_url: { url: screenshot } });
      }
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Tu es un assistant support e-commerce expert WiziShop, très professionnel et synthétique.",
          },
          { role: "user", content: userContent },
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur OpenAI");
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

  function resetFields() {
    setMessage("");
    setHtmlCode("");
    setCssjsCode("");
    setScreenshot(null);
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("partnerreply_history");
  }

  return (
    <div className="app-wrapper">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">PartnerReply</h1>
      <div className={`card${dark ? ' dark' : ''}`}>
        <ApiKeyInput onChange={setApiKey} />
        <OptionsBar
          dark={dark}
          toggleDark={() => setDark(d => !d)}
          onReset={resetFields}
          onClear={clearHistory}
          loading={loading}
        />
        <MessageInput
          value={message}
          onChange={setMessage}
          html={htmlCode}
          onChangeHtml={setHtmlCode}
          cssjs={cssjsCode}
          onChangeCssjs={setCssjsCode}
          onFile={file => {
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setScreenshot(reader.result as string);
              reader.readAsDataURL(file);
            } else {
              setScreenshot(null);
            }
          }}
          onGenerate={generateResponse}
          loading={loading}
        />
        {nature && <TagNature nature={nature} />}
        {error && (
          <div className="text-red-500 font-bold mt-2">{error}</div>
        )}
      </div>
      {response && (
        <div className={`card${dark ? ' dark' : ''}`}>
          {/* Affiche la réponse texte sans les blocs code */}
          <div className="response-markdown">
            <ReactMarkdown>{textOnly}</ReactMarkdown>
          </div>
          <div className="copy-btn">
            <CopyButton value={response} />
          </div>
          {/* Affiche les blocs code extraits */}
          {codeBlocks.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-semibold mb-1" style={{ opacity: 0.7 }}>
                Bloc{codeBlocks.length > 1 ? "s" : ""} code à copier :
              </div>
              {codeBlocks.map((block, idx) => (
                <CodeBlockCard key={idx} block={block} />
              ))}
            </div>
          )}
        </div>
      )}
      <DocLinks />
      {/* Historique */}
      <HistoryPanel history={history} onRestore={restoreHistory} onClear={clearHistory} />
    </div>
  );
}
