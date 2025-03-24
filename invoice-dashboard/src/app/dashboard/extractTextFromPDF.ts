"use client";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { createWorker } from "tesseract.js";

GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();

export async function extractTextFromPDF(file: File): Promise<string> {
  const worker = await createWorker("eng");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await getDocument({ data: typedArray }).promise;

        let extractedText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          const imageDataUrl = canvas.toDataURL("image/png");

          const result = await worker.recognize(imageDataUrl);
          extractedText += result.data.text + "\n";
        }

        await worker.terminate();
        resolve(extractedText);
      } catch (error) {
        await worker.terminate();
        reject(error);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
