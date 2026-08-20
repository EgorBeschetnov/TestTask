import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-widest text-accent mb-2">
          Creators Board
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink">
          Создать кабинет
        </h1>
      </div>
      <AuthForm mode="register" />
      <p className="mt-6 text-sm text-ink-soft">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-accent font-medium">
          Войти
        </Link>
      </p>
    </main>
  );
}
