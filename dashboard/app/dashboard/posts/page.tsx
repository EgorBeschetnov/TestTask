import { createClient } from "@/lib/supabase-server";
import AddPostForm from "@/components/AddPostForm";
import PostCard from "@/components/PostCard";

export default async function PostsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user?.id)
    .order("added_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-semibold mb-2">
          Мои рилсы
        </h1>
        <p className="text-ink-soft mb-6">
          Вставь ссылку — просмотры, обложка и дата подтянутся сами.
        </p>
        <AddPostForm />
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center text-ink-soft">
          Пока пусто — добавь первый рилс по ссылке выше.
        </div>
      )}
    </div>
  );
}
