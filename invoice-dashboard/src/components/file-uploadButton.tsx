"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { extractTextFromPDF } from "@/app/invoices/extractTextFromPDF";
import { uploadToS3 } from "@/lib/s3";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import InvoiceEditor from "@/components/invoice-editor";

export default function InvoiceUploader({ onUploadSuccess }: { onUploadSuccess: (fileKey: string) => void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setFile(selectedFile);
    setFileName(selectedFile.name);

    setLoading(true);
    try {
      const extracted = await extractTextFromPDF(selectedFile);
      setText(extracted);
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to extract text");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const s3Response = await uploadToS3(file);
      if (s3Response?.file_key) {
        toast.success("Invoice uploaded successfully!");
        setFileKey(s3Response.file_key);
        onUploadSuccess(s3Response.file_key);
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      {!previewUrl && (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <label className="border border-gray-300 bg-gray px-6 py-4 rounded-xl shadow-md flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-all">
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-4-4m4 4l4-4m-4 4V3"
        />
      </svg>
      <span className="text-white font-medium text-base">
        Upload Invoice PDF
      </span>
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  </div>
)}


{previewUrl && (
  <div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
    {/* PDF Preview */}
    <div className="flex-1 w-full h-[80vh]">
      <iframe
        src={`${previewUrl}#zoom=page-fit`}
        className="w-full h-full rounded-xl shadow-lg border border-gray-700"
        style={{ border: "none" }}
        title="PDF Preview"
      />
    </div>

    {/* Extracted Text + Buttons */}
    <div className="flex-1 w-full flex flex-col h-[80vh]">
    <InvoiceEditor rawText={text} onChange={setText} />

      {/* Bottom Row: Change Document + Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* Left: Change Document */}
        {file && (
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center px-4 py-2 bg-gray-800 text-sm text-white rounded cursor-pointer hover:bg-gray-700 transition">
              Change Document
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <span className="text-sm text-gray-400 truncate max-w-xs">
              Current file: <span className="font-medium text-white">{file.name}</span>
            </span>
          </div>
        )}

        {/* Right: Save & Submit */}
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
            onClick={() => console.log("Save clicked:", text)}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      



      {loading && <p className="mt-2">Extracting text...</p>}
    </div>
  );
}
