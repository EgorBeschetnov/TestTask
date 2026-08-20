"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";

export default function AddPostForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Что-то пошло не так");
      return;
    }

    setUrl("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Вставь ссылку на рилс из Instagram"
        className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-accent text-white px-5 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Plus size={18} />
        )}
        {loading ? "Тянем данные…" : "Добавить"}
      </button>
      {error && <p className="text-sm text-accent sm:ml-3 self-center">{error}</p>}
    </form>
  );
}
