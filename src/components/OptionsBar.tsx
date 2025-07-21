import { Moon, Sun, Trash2 } from "lucide-react";

export default function OptionsBar({
  dark,
  toggleDark,
  onReset,
  onClear,
  loading,
}: {
  dark: boolean;
  toggleDark: () => void;
  onReset: () => void;
  onClear: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex gap-2 mb-4 items-center">
      <button
        onClick={toggleDark}
        className="secondary flex items-center gap-1"
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
        {dark ? "Light" : "Dark"} mode
      </button>
      <button
        onClick={onReset}
        disabled={loading}
        className="primary"
      >
        Reset champ
      </button>
      <button onClick={onClear} className="primary flex items-center gap-1">
        <Trash2 size={16} /> Effacer historique
      </button>
    </div>
  );
}
