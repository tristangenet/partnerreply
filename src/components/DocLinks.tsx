import { useEffect, useState } from "react";

interface DocLink {
  title: string;
  url: string;
}

export default function DocLinks() {
  const [docs, setDocs] = useState<DocLink[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/docs.json")
      .then(res => res.json())
      .then((data: DocLink[]) => setDocs(data))
      .catch(() => setDocs([]));
  }, []);

  const filtered = query
    ? docs.filter(d => d.title.toLowerCase().includes(query.toLowerCase()))
    : docs;

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
      <ul className="list-disc pl-5 space-y-1">
        {filtered.map(doc => (
          <li key={doc.url}>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => {
                e.preventDefault();
                navigator.clipboard.writeText(doc.url).catch(() => {});
              }}
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs mt-2 opacity-70">
        Cliquer sur un titre copie l\'URL dans le presse-papiers.
      </p>
    </div>
  );
}
