import { useState } from "react";

export default function ApiKeyInput({ onChange }: { onChange: (key: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="mb-4">
      <input
        type="password"
        className="w-80"
        placeholder="Clé API OpenAI"
        value={value}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{ fontFamily: "monospace" }}
      />
    </div>
  );
}
