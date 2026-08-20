import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="font-display text-xl font-semibold">
            Creators <span className="text-accent">Board</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              Обзор
            </Link>
            <Link
              href="/dashboard/posts"
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              Мои рилсы
            </Link>
            <div className="w-px h-4 bg-line" />
            <span className="text-sm text-ink-soft hidden sm:block">
              {user?.user_metadata?.full_name || user?.email}
            </span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
