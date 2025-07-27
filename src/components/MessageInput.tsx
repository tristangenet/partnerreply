export default function MessageInput({
  value,
  onChange,
  html,
  onChangeHtml,
  cssjs,
  onChangeCssjs,
  onFile,
  onGenerate,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
  html: string;
  onChangeHtml: (v: string) => void;
  cssjs: string;
  onChangeCssjs: (v: string) => void;
  onFile: (file: File | null) => void;
  onGenerate: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Colle ici le message du partenaire…"
        rows={5}
        className="font-mono text-base"
        disabled={loading}
      />
      <textarea
        value={html}
        onChange={e => onChangeHtml(e.target.value)}
        placeholder="Code HTML (optionnel)"
        rows={3}
        className="font-mono text-sm"
        disabled={loading}
      />
      <textarea
        value={cssjs}
        onChange={e => onChangeCssjs(e.target.value)}
        placeholder="Code CSS/JS (optionnel)"
        rows={3}
        className="font-mono text-sm"
        disabled={loading}
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => onFile(e.target.files ? e.target.files[0] : null)}
        disabled={loading}
      />
      <button
        onClick={onGenerate}
        disabled={!value || loading}
        className="primary flex items-center justify-center"
      >
        {loading ? (
          <span className="flex items-center gap-2"><span className="loader" />Génération…</span>
        ) : (
          "Analyser & Générer"
        )}
      </button>
    </div>
  );
}
