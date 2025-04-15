"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { extractTextFromPDF } from "@/app/invoices/extractTextFromPDF";
import { uploadToS3 } from "@/lib/s3";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import InvoiceEditor from "@/components/invoice-editor";
import { Inbox } from "lucide-react";
import InvoiceForm from "@/components/invoice-form";
import { storeInvoice } from "@/app/actions/store-invoice";


export default function InvoiceUploader({
  onUploadSuccess,
}: {
  onUploadSuccess: (fileKey: string) => void;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isFromOCR, setIsFromOCR] = useState(false);

  const [parsed, setParsed] = useState({
    invoice_number: "",
    transaction_date: "",
    due_date: "",
    vendor: "",
    customer: "",
    total: "",
    currency: "USD",
  });
  
  const handleParsedChange = (field: string, value: string) => {
    setParsed((prev) => ({ ...prev, [field]: value }));
  };  

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
    setIsFromOCR(true);

    setLoading(true);
    try {
      const extracted = await extractTextFromPDF(selectedFile);
      setText(extracted);

      const parsedFields = await parseInvoiceText(extracted);
      setParsed(parsedFields);
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

  const handleConfirm = async () => {
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }
  
    setUploading(true);
    try {
      const s3Response = await uploadToS3(file);
  
      if (!s3Response?.file_key) {
        toast.error("Upload to S3 failed");
        return;
      }
  
      const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${s3Response.file_key}`;
  
      const result = await storeInvoice({
        vendorName: parsed.vendor,
        fileUrl,
        status: "complete", // maybe dynamic later
        totalAmount: parseFloat(parsed.total),
        dueDate: parsed.due_date,
        invoiceNumber: parsed.invoice_number,
      });
  
      if (result.success) {
        toast.success("Invoice submitted and saved");
        onUploadSuccess(s3Response.file_key); // optional
      } else {
        toast.error(result.error || "Failed to store invoice");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during confirmation");
    } finally {
      setUploading(false);
    }
  };  

  // API call to GPT
  const parseInvoiceText = async (text: string) => {
    const res = await fetch("/api/extract-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceText: text }),
    });
  
    if (!res.ok) throw new Error("Failed to parse invoice");
    return await res.json();
  };
  

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      {!previewUrl && (
        <div className="flex items-center justify-center min-h-[60vh] w-full">
          <label className="border-2 border-dashed dark:border-white/30 border-gray-400 rounded-2xl px-12 py-20 flex flex-col items-center justify-center gap-4 w-full max-w-xl bg-white dark:bg-[#111] cursor-pointer hover:shadow-lg transition-all">
            <Inbox className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 text-base font-medium">
              Drag and drop your Invoice here
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
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-6 h-[80vh]">
          <div className="flex-1 w-full h-[80vh]">
            <iframe
              src={`${previewUrl}#zoom=page-fit`}
              className="w-full h-full rounded-xl shadow-lg border border-gray-700"
              style={{ border: "none" }}
              title="PDF Preview"
            />
          </div>

          <div className="flex-1 w-full flex flex-col h-[80vh]">
            <InvoiceForm
              data={parsed}
              onChange={handleParsedChange}
              onSubmit={handleConfirm}
              submitting={uploading}
            />
            <div className="flex justify-between items-center mt-4">
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
            </div>
          </div>
        </div>
      )}
      {loading && <p className="mt-2">Processing Invoice...</p>}
    </div>
  );
}
