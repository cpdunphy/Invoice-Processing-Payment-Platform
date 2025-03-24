"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { extractTextFromPDF } from "./extractTextFromPDF";

export default function PDFTextExtractor() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const extracted = await extractTextFromPDF(file);
      setText(extracted);
    } catch (err) {
      console.error("Failed to extract text:", err);
      setText("Failed to extract text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
      />

      {loading ? <p className="mt-2">Extracting text...</p> : <pre className="mt-2">{text}</pre>}
    </div>
  );
}