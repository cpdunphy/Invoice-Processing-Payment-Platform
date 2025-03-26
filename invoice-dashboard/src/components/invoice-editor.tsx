import React, { useState, useEffect } from "react";

interface InvoiceEditorProps {
  rawText: string;
  onChange?: (updatedText: string) => void;
}

export default function InvoiceEditor({ rawText, onChange }: InvoiceEditorProps) {
  const [editableText, setEditableText] = useState(rawText);

  useEffect(() => {
    setEditableText(rawText);
  }, [rawText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-200">Invoice Text (Editable)</label>
      <textarea
        value={editableText}
        onChange={handleChange}
        className="w-full min-h-[300px] p-4 bg-zinc-900 text-white text-sm rounded border border-zinc-700 resize-y shadow"
        placeholder="Edit extracted invoice text here before saving..."
      />
    </div>
  );
}
