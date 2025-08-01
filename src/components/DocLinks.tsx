import { useEffect, useState } from "react";

interface DocLink {
  title: string;
  url: string;
}

export default function DocLinks() {
  const [docs, setDocs] = useState<DocLink[]>([]);
  const [customDocs, setCustomDocs] = useState<DocLink[]>([]);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const CUSTOM_KEY = "custom_doc_links";
  const REMOVE_KEY = "removed_doc_links";

  useEffect(() => {
    fetch("/docs.json")
      .then(res => res.json())
      .then((data: DocLink[]) => setDocs(data))
      .catch(() => setDocs([]));

    const stored = localStorage.getItem(CUSTOM_KEY);
    if (stored) {
      try {
        setCustomDocs(JSON.parse(stored));
      } catch {
        setCustomDocs([]);
      }
    }

    const removed = localStorage.getItem(REMOVE_KEY);
    if (removed) {
      try {
        setRemovedUrls(JSON.parse(removed));
      } catch {
        setRemovedUrls([]);
      }
    }
  }, []);

  function saveCustom(newDocs: DocLink[]) {
    setCustomDocs(newDocs);
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(newDocs));
  }

  function saveRemoved(newUrls: string[]) {
    setRemovedUrls(newUrls);
    localStorage.setItem(REMOVE_KEY, JSON.stringify(newUrls));
  }

  function handleAdd() {
    if (!newTitle.trim() || !newUrl.trim()) return;
    const updated = [...customDocs, { title: newTitle.trim(), url: newUrl.trim() }];
    saveCustom(updated);
    setNewTitle("");
    setNewUrl("");
  }

  function handleRemove(url: string) {
    if (customDocs.some(d => d.url === url)) {
      const updated = customDocs.filter(d => d.url !== url);
      saveCustom(updated);
    } else if (!removedUrls.includes(url)) {
      const updated = [...removedUrls, url];
      saveRemoved(updated);
    }
  }

  function handleClear() {
    saveCustom([]);
  }

  function handleRestoreDefaults() {
    saveRemoved([]);
  }

  const allDocs = [...docs, ...customDocs];
  const visibleDocs = allDocs.filter(d => !removedUrls.includes(d.url));
  const filtered = query
    ? visibleDocs.filter(d =>
        d.title.toLowerCase().includes(query.toLowerCase())
      )
    : visibleDocs;

  return (
    <div className="doc-links card">
      <h2 className="text-lg font-semibold mb-2">Liens documentation WiziShop</h2>
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="mb-2 w-full"
      />
      <ul className="list-disc pl-5 space-y-1 mb-2">
        {filtered.map(doc => (
          <li key={doc.url} className="flex items-center gap-2">
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(doc.url).catch(() => {});
              }}
              className="flex-grow"
            >
              {doc.title}
            </a>
            <button
              onClick={() => handleRemove(doc.url)}
              className="secondary text-xs"
              title="Supprimer"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Titre..."
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="flex-grow"
        />
        <input
          type="text"
          placeholder="URL..."
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          className="flex-grow"
        />
        <button onClick={handleAdd} className="primary text-xs">
          Ajouter
        </button>
      </div>
      {customDocs.length > 0 && (
        <button onClick={handleClear} className="primary text-xs mb-2">
          Réinitialiser liens perso
        </button>
      )}
      {removedUrls.length > 0 && (
        <button onClick={handleRestoreDefaults} className="primary text-xs mb-2">
          Réinitialiser liens par défaut
        </button>
      )}
      <p className="text-xs mt-2 opacity-70">
        Cliquer sur un titre copie l'URL dans le presse-papiers.
      </p>
    </div>
  );
}
