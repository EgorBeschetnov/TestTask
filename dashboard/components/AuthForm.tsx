"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      {mode === "register" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink-soft">Имя</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent transition-colors"
            placeholder="Как тебя зовут"
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-ink-soft">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-ink-soft">Пароль</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-accent transition-colors"
          placeholder="Минимум 6 символов"
        />
      </div>

      {error && (
        <p className="text-sm text-accent bg-accent-soft rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-ink text-white py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading
          ? "Секунду…"
          : mode === "login"
          ? "Войти"
          : "Создать аккаунт"}
      </button>
    </form>
  );
}
