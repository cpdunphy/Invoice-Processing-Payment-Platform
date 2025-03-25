"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { extractTextFromPDF } from "../invoices/extractTextFromPDF";

export default function PDFTextExtractor() {
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const invoiceText = await extractTextFromPDF(file);
      setText(invoiceText);
      const res = await fetch("/api/extract-invoice", {
        method: "POST",
        body: JSON.stringify({ invoiceText }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      setParsed(json);
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

      {loading ? (
        <p className="mt-2">Processing text...</p>
      ) : (
        Object.entries(parsed).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        ))
      )}
    </div>
  );
}
