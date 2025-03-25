"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { extractTextFromPDF } from "@/app/invoices/extractTextFromPDF";
import { uploadToS3 } from "@/lib/s3";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function InvoiceUploader() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB");
      return;
    }

    setLoading(true);
    setUploading(true);

    try {
      //Extract text
      const extracted = await extractTextFromPDF(file);
      setText(extracted);

      // Upload to S3
      const s3Response = await uploadToS3(file);

      if (s3Response?.file_key) {
        toast.success("Invoice uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to process the invoice");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Button */}
      <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 w-fit">
        {uploading ? (
          <>
            <Loader2 className="animate-spin mr-2" /> Uploading...
          </>
        ) : (
          "Upload Invoice PDF"
        )}
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Extraction Result */}
      {loading ? (
        <p className="mt-2">Extracting text...</p>
      ) : (
        text && (
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
            {text}
          </pre>
        )
      )}
    </div>
  );
}