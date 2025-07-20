export default function MessageInput({
  value,
  onChange,
  onGenerate,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
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
        className="border rounded-lg p-3 font-mono text-base"
        disabled={loading}
      />
      <button
        onClick={onGenerate}
        disabled={!value || loading}
        className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-900 transition"
      >
        {loading ? "Génération en cours…" : "Analyser & Générer"}
      </button>
    </div>
  );
}
