import { createClient } from "@/lib/supabase-server";
import ViewsChart from "@/components/ViewsChart";
import PostCard from "@/components/PostCard";

function formatCount(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export default async function DashboardOverview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user?.id)
    .order("posted_at", { ascending: true });

  const totalViews = posts?.reduce((s, p) => s + (p.views || 0), 0) || 0;
  const totalLikes = posts?.reduce((s, p) => s + (p.likes || 0), 0) || 0;
  const totalPosts = posts?.length || 0;

  const chartData =
    posts?.map((p) => ({
      date: p.posted_at
        ? new Date(p.posted_at).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
          })
        : "—",
      views: p.views || 0,
    })) || [];

  const topPosts = [...(posts || [])]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold mb-2">Обзор</h1>
        <p className="text-ink-soft">
          Общая картина по всем твоим рилсам.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-surface border border-line p-6">
          <p className="text-sm text-ink-soft mb-1">Просмотры</p>
          <p className="font-display text-3xl font-semibold">
            {formatCount(totalViews)}
          </p>
        </div>
        <div className="rounded-2xl bg-surface border border-line p-6">
          <p className="text-sm text-ink-soft mb-1">Лайки</p>
          <p className="font-display text-3xl font-semibold">
            {formatCount(totalLikes)}
          </p>
        </div>
        <div className="rounded-2xl bg-surface border border-line p-6">
          <p className="text-sm text-ink-soft mb-1">Рилсов</p>
          <p className="font-display text-3xl font-semibold">{totalPosts}</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="rounded-2xl bg-surface border border-line p-6">
          <p className="text-sm text-ink-soft mb-4">Просмотры по датам публикации</p>
          <ViewsChart data={chartData} />
        </div>
      )}

      {topPosts.length > 0 && (
        <div>
          <p className="text-sm text-ink-soft mb-4">Топ рилсов</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {topPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {totalPosts === 0 && (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center text-ink-soft">
          Данных пока нет — добавь рилсы на странице «Мои рилсы».
        </div>
      )}
    </div>
  );
}
