"use client";

import { useId, useRef, useState } from "react";
import { ImageIcon, Loader2, RotateCw, Upload, X } from "lucide-react";
import { getImageUrl } from "@/lib/image-url";

interface ImageDropzoneProps {
  label: string;
  helperText?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  uploadFolder: string;
  accept?: string;
  maxSizeMb?: number;
}

const DEFAULT_ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml";

// Same-origin Next.js route, which forwards to Laravel server-side with
// the auth headers attached (see app/api/admin/upload/route.ts). Don't
// call Laravel directly from the browser here — that route is behind
// auth:sanctum and the browser has no way to attach that auth itself.
const UPLOAD_ENDPOINT = "/api/admin/brands/upload";

export function ImageDropzone({
  label,
  helperText,
  value,
  onChange,
  uploadFolder,
  accept = DEFAULT_ACCEPT,
  maxSizeMb = 5,
}: ImageDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);

  async function uploadFile(file: File) {
    setError(null);
    setLastFile(file);

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Image must be smaller than ${maxSizeMb}MB.`);
      return;
    }

    // Show an instant local preview while the real upload happens.
    const localPreview = URL.createObjectURL(file);
    onChange(localPreview);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);

      const res = await fetch(UPLOAD_ENDPOINT, {
        method: "POST",
        body: formData,
        // If your Laravel app uses Sanctum session auth, you'll also need
        // credentials: "include" plus a matching CORS config.
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Upload failed (${res.status})`);
      }

      const data: { url: string } = await res.json();
      URL.revokeObjectURL(localPreview);
      onChange(data.url);
    } catch (err) {
      URL.revokeObjectURL(localPreview);
      onChange(null);
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't upload that image. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) void uploadFile(file);
  }

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    setError(null);
    setLastFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleRetry(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (lastFile) void uploadFile(lastFile);
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

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
        className={`relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed text-center transition ${
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
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />

        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getImageUrl(value) ?? undefined}
              alt=""
              className="h-full w-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
            {!isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label="Remove image"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">Uploading…</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-gray-400">
            {isDragging ? (
              <Upload className="h-6 w-6" />
            ) : (
              <ImageIcon className="h-6 w-6" />
            )}
            <span className="text-sm text-gray-500">
              Click to upload or drag an image here
            </span>
          </div>
        )}
      </div>

      {helperText && !error && (
        <span className="mt-1 block text-xs text-gray-400">{helperText}</span>
      )}
      {error && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-red-600">{error}</span>
          {lastFile && (
            <button
              type="button"
              onClick={handleRetry}
              className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              <RotateCw className="h-3 w-3" />
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}
