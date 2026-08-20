"use client";

import { useId, useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { getImageUrl } from "@/lib/image-url";

interface MultiImageDropzoneProps {
  value: string[];
  onChange: (urls: string[]) => void;
  uploadFolder: string;
  accept?: string;
  maxSizeMb?: number;
  maxFiles?: number;
}

const DEFAULT_ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";

// Same pattern as ImageDropzone: same-origin Next.js route that forwards
// to Laravel with auth headers attached server-side.
const UPLOAD_ENDPOINT = "/api/admin/brands/upload";

export function MultiImageDropzone({
  value,
  onChange,
  uploadFolder,
  accept = DEFAULT_ACCEPT,
  maxSizeMb = 5,
  maxFiles = 10,
}: MultiImageDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: File[]) {
    setError(null);

    if (value.length + files.length > maxFiles) {
      setError(`You can add up to ${maxFiles} images.`);
      return;
    }
    const invalid = files.find((f) => !f.type.startsWith("image/"));
    if (invalid) {
      setError("Please choose image files only.");
      return;
    }
    const tooBig = files.find((f) => f.size > maxSizeMb * 1024 * 1024);
    if (tooBig) {
      setError(`Each image must be smaller than ${maxSizeMb}MB.`);
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files[]", file));
      formData.append("folder", uploadFolder);

      const res = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Upload failed (${res.status})`);
      }

      const data: { urls: string[] } = await res.json();
      onChange([...value, ...data.urls]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't upload those images. Please try again.",
      );
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    void uploadFiles(Array.from(files));
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`flex min-h-[7rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 text-center transition ${
          isDragging
            ? "border-gray-500 bg-gray-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">Uploading…</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            {isDragging ? (
              <Upload className="h-6 w-6" />
            ) : (
              <ImageIcon className="h-6 w-6" />
            )}
            <span className="text-sm text-gray-500">
              Click to upload or drag images here
            </span>
            <span className="text-xs text-gray-400">
              Up to {maxFiles} images, {maxSizeMb}MB each
            </span>
          </div>
        )}
      </div>

      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}

      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-black/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(url) ?? undefined}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label="Remove image"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
