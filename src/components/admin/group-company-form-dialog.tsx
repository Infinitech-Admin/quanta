"use client";

import { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Heading,
  ImageIcon,
  LayoutGrid,
  List,
  Loader2,
  Plus,
  Trash2,
  Type,
  X,
} from "lucide-react";
import {
  ApiUploadResponse,
  ContentBlock,
  GroupCompany,
  GroupCompanyFormValues,
} from "@/types/group-company";

type Props = {
  open: boolean;
  initialData: GroupCompany | null;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: GroupCompanyFormValues) => void;
};

const emptyValues: GroupCompanyFormValues = {
  short_name: "",
  full_name: "",
  tagline: "",
  content: [{ type: "paragraph", text: "" }],
  sort_order: 0,
  is_active: true,
};

const blockLabels: Record<
  ContentBlock["type"],
  { icon: typeof Type; label: string }
> = {
  paragraph: { icon: Type, label: "Paragraph" },
  bullets: { icon: List, label: "Bullet list" },
  cards: { icon: LayoutGrid, label: "Card grid" },
  heading: { icon: Heading, label: "Section heading" },
  image: { icon: ImageIcon, label: "Image" },
};

function buildFormValues(
  initialData: GroupCompany | null,
): GroupCompanyFormValues {
  if (!initialData) return emptyValues;
  return {
    short_name: initialData.short_name,
    full_name: initialData.full_name,
    tagline: initialData.tagline ?? "",
    content:
      Array.isArray(initialData.content) && initialData.content.length
        ? initialData.content
        : [{ type: "paragraph", text: "" }],
    sort_order: initialData.sort_order,
    is_active: initialData.is_active,
  };
}

export function GroupCompanyFormDialog({
  open,
  initialData,
  isSubmitting,
  onCancel,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<GroupCompanyFormValues>(emptyValues);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Adjust form state during render when the dialog opens or the record
  // being edited changes — the React-recommended alternative to resetting
  // state in an effect. See: https://react.dev/learn/you-might-not-need-an-effect
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevInitialData, setPrevInitialData] = useState(initialData);

  if (open !== prevOpen || initialData !== prevInitialData) {
    setPrevOpen(open);
    setPrevInitialData(initialData);

    if (open) {
      setValues(buildFormValues(initialData));
    }
  }

  if (!open) return null;

  function updateBlock(index: number, block: ContentBlock) {
    setValues((prev) => {
      const next = [...prev.content];
      next[index] = block;
      return { ...prev, content: next };
    });
  }

  function removeBlock(index: number) {
    setValues((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setValues((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.content.length) return prev;
      const next = [...prev.content];
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, content: next };
    });
  }

  function addParagraphBlock() {
    setValues((prev) => ({
      ...prev,
      content: [...prev.content, { type: "paragraph", text: "" }],
    }));
  }

  function addBulletsBlock() {
    setValues((prev) => ({
      ...prev,
      content: [...prev.content, { type: "bullets", items: [""] }],
    }));
  }

  function addCardsBlock() {
    setValues((prev) => ({
      ...prev,
      content: [...prev.content, { type: "cards", items: [""] }],
    }));
  }

  function addHeadingBlock() {
    setValues((prev) => ({
      ...prev,
      content: [...prev.content, { type: "heading", eyebrow: "", text: "" }],
    }));
  }

  function addImageBlock() {
    setValues((prev) => ({
      ...prev,
      content: [...prev.content, { type: "image", url: "", alt: "" }],
    }));
  }

  function updateItem(blockIndex: number, itemIndex: number, value: string) {
    setValues((prev) => {
      const block = prev.content[blockIndex];
      if (block.type !== "bullets" && block.type !== "cards") return prev;
      const items = [...block.items];
      items[itemIndex] = value;
      const next = [...prev.content];
      next[blockIndex] = { ...block, items };
      return { ...prev, content: next };
    });
  }

  function addItem(blockIndex: number) {
    setValues((prev) => {
      const block = prev.content[blockIndex];
      if (block.type !== "bullets" && block.type !== "cards") return prev;
      const next = [...prev.content];
      next[blockIndex] = { ...block, items: [...block.items, ""] };
      return { ...prev, content: next };
    });
  }

  function removeItem(blockIndex: number, itemIndex: number) {
    setValues((prev) => {
      const block = prev.content[blockIndex];
      if (block.type !== "bullets" && block.type !== "cards") return prev;
      const next = [...prev.content];
      next[blockIndex] = {
        ...block,
        items: block.items.filter((_, i) => i !== itemIndex),
      };
      return { ...prev, content: next };
    });
  }

  async function handleImageFileSelected(
    blockIndex: number,
    file: File | undefined,
  ) {
    if (!file) return;
    setUploadingIndex(blockIndex);
    try {
      const formData = new FormData();
      formData.append("image", file);

      // NOTE: no manual Authorization header here — this relies on
      // Laravel Sanctum's cookie/session auth (credentials: "include"),
      // matching however the rest of the admin UI is authenticated.
      // If your app actually uses a stored bearer token instead, swap
      // `credentials: "include"` for
      //   headers: { Authorization: `Bearer ${yourRealTokenVariable}` }
      // using whatever variable/hook the rest of your admin fetches use.
      const res = await fetch("/api/admin/group-companies/upload-image", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      // Parse defensively: a failed request may return an empty body,
      // an HTML error page, or a redirect — never assume it's JSON.
      const raw = await res.text();
      let json: ApiUploadResponse | null = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        // not JSON — fall through, handled below
      }

      if (!res.ok || !json || !json.success) {
        console.error("Upload failed", res.status, raw);
        throw new Error(
          json?.message ||
            `Image upload failed (HTTP ${res.status}). Check server logs.`,
        );
      }

      setValues((prev) => {
        const block = prev.content[blockIndex];
        if (block.type !== "image") return prev;
        const next = [...prev.content];
        next[blockIndex] = { ...block, url: json!.data.url };
        return { ...prev, content: next };
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingIndex(null);
    }
  }

  function handleSubmit() {
    const cleaned: GroupCompanyFormValues = {
      ...values,
      tagline: values.tagline.trim(),
      content: values.content
        .map((block): ContentBlock | null => {
          if (block.type === "paragraph") {
            const text = block.text.trim();
            return text ? { type: "paragraph", text } : null;
          }
          if (block.type === "bullets" || block.type === "cards") {
            const items = block.items.map((i) => i.trim()).filter(Boolean);
            return items.length ? { type: block.type, items } : null;
          }
          if (block.type === "heading") {
            const text = block.text.trim();
            const eyebrow = block.eyebrow?.trim();
            return text
              ? { type: "heading", text, eyebrow: eyebrow || undefined }
              : null;
          }
          if (block.type === "image") {
            const url = block.url.trim();
            const alt = block.alt?.trim();
            return url ? { type: "image", url, alt: alt || undefined } : null;
          }
          return null;
        })
        .filter((b): b is ContentBlock => b !== null),
    };
    onSubmit(cleaned);
  }

  const canSubmit =
    !isSubmitting &&
    Boolean(values.short_name) &&
    Boolean(values.full_name) &&
    Array.isArray(values.content) &&
    values.content.length > 0 &&
    uploadingIndex === null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Company" : "New Company"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Short Name
              </label>
              <input
                type="text"
                value={values.short_name}
                onChange={(e) =>
                  setValues((p) => ({ ...p, short_name: e.target.value }))
                }
                placeholder="Quanta Foundation, Inc."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={values.full_name}
                onChange={(e) =>
                  setValues((p) => ({ ...p, full_name: e.target.value }))
                }
                placeholder="Quanta Foundation, Inc."
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Tagline (optional)
            </label>
            <input
              type="text"
              value={values.tagline}
              onChange={(e) =>
                setValues((p) => ({ ...p, tagline: e.target.value }))
              }
              placeholder="Big dreams come in small packages."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          {/* Content blocks */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={addParagraphBlock}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Type className="h-3.5 w-3.5" /> Paragraph
                </button>
                <button
                  type="button"
                  onClick={addBulletsBlock}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <List className="h-3.5 w-3.5" /> Bullets
                </button>
                <button
                  type="button"
                  onClick={addCardsBlock}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> Cards
                </button>
                <button
                  type="button"
                  onClick={addHeadingBlock}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Heading className="h-3.5 w-3.5" /> Heading
                </button>
                <button
                  type="button"
                  onClick={addImageBlock}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <ImageIcon className="h-3.5 w-3.5" /> Image
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {values.content.map((block, index) => {
                const { icon: Icon, label } = blockLabels[block.type];
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 bg-gray-50/60 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        <Icon className="h-3.5 w-3.5" /> {label}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, -1)}
                          disabled={index === 0}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Move block up"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 1)}
                          disabled={index === values.content.length - 1}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Move block down"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(index)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove block"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {block.type === "paragraph" && (
                      <textarea
                        value={block.text}
                        onChange={(e) =>
                          updateBlock(index, {
                            type: "paragraph",
                            text: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Write a paragraph…"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                      />
                    )}

                    {(block.type === "bullets" || block.type === "cards") && (
                      <div className="space-y-2">
                        {block.items.map((item, itemIndex) =>
                          block.type === "cards" ? (
                            <div
                              key={itemIndex}
                              className="flex items-start gap-2"
                            >
                              <textarea
                                value={item}
                                onChange={(e) =>
                                  updateItem(index, itemIndex, e.target.value)
                                }
                                rows={2}
                                placeholder="Card text…"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(index, itemIndex)}
                                className="mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="text"
                                value={item}
                                onChange={(e) =>
                                  updateItem(index, itemIndex, e.target.value)
                                }
                                placeholder="Bullet item…"
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(index, itemIndex)}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ),
                        )}
                        <button
                          type="button"
                          onClick={() => addItem(index)}
                          className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add item
                        </button>
                      </div>
                    )}

                    {block.type === "heading" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={block.eyebrow ?? ""}
                          onChange={(e) =>
                            updateBlock(index, {
                              type: "heading",
                              eyebrow: e.target.value,
                              text: block.text,
                            })
                          }
                          placeholder="Eyebrow label (e.g. THE QUANTA EDUCATIONAL SUPPORT FUND)"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                        <input
                          type="text"
                          value={block.text}
                          onChange={(e) =>
                            updateBlock(index, {
                              type: "heading",
                              eyebrow: block.eyebrow,
                              text: e.target.value,
                            })
                          }
                          placeholder="Headline (e.g. Big dreams come in small packages.)"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                    )}

                    {block.type === "image" && (
                      <div className="space-y-2">
                        {block.url && (
                          // Preview of a freshly-uploaded image; the URL's domain depends
                          // on your storage config, so next/image would need every
                          // possible upload host allow-listed in next.config.js
                          // remotePatterns first.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={block.url}
                            alt={block.alt ?? ""}
                            className="h-40 w-full rounded-lg border border-gray-200 object-cover"
                          />
                        )}
                        <div className="flex items-center gap-2">
                          <input
                            ref={(el) => {
                              fileInputRefs.current[index] = el;
                            }}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileSelected(
                                index,
                                e.target.files?.[0],
                              )
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              fileInputRefs.current[index]?.click()
                            }
                            disabled={uploadingIndex === index}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {uploadingIndex === index ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Uploading…
                              </>
                            ) : block.url ? (
                              "Replace image"
                            ) : (
                              "Upload image"
                            )}
                          </button>
                          {block.url && (
                            <span className="truncate text-xs text-gray-400">
                              {block.url}
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={block.alt ?? ""}
                          onChange={(e) =>
                            updateBlock(index, {
                              type: "image",
                              url: block.url,
                              alt: e.target.value,
                            })
                          }
                          placeholder="Alt text (optional, for accessibility)"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {values.content.length === 0 && (
                <p className="text-xs text-gray-400">
                  No content blocks yet. Add one above.
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <input
                type="number"
                value={values.sort_order}
                onChange={(e) =>
                  setValues((p) => ({
                    ...p,
                    sort_order: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div className="flex items-end pb-2.5">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={values.is_active}
                  onChange={(e) =>
                    setValues((p) => ({ ...p, is_active: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                Active (shown on public page)
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Saving…"
              : initialData
                ? "Save Changes"
                : "Create Company"}
          </button>
        </div>
      </div>
    </div>
  );
}
