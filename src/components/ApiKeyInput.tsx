import { useState } from "react";

export default function ApiKeyInput({ onChange }: { onChange: (key: string) => void }) {
  const [value, setValue] = useState(localStorage.getItem("openai_api_key") || "");

  const handleSave = () => {
    localStorage.setItem("openai_api_key", value);
    onChange(value);
  };

  return (
    <div className="mb-4">
      <input
        type="password"
        className="w-80"
        placeholder="Clé API OpenAI"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ fontFamily: "monospace" }}
      />
      <button
        onClick={handleSave}
        className="ml-2 primary"
        disabled={!value}
      >
        Sauver
      </button>
    </div>
  );
}
