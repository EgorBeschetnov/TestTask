import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-widest text-accent mb-2">
          Creators Board
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink">
          С возвращением
        </h1>
      </div>
      <AuthForm mode="login" />
      <p className="mt-6 text-sm text-ink-soft">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-accent font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </main>
  );
}
