import { Eye, Heart, MessageCircle } from "lucide-react";

type Post = {
  id: string;
  instagram_url: string;
  cover_url: string | null;
  views: number;
  likes: number;
  comments: number;
  caption: string | null;
  posted_at: string | null;
};

function formatCount(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <a
      href={post.instagram_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-surface border border-line overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="aspect-[9/16] bg-accent-soft relative overflow-hidden">
        {post.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_url}
            alt={post.caption || "Обложка рилса"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="p-4">
        {post.caption && (
          <p className="text-sm text-ink line-clamp-2 mb-3">{post.caption}</p>
        )}
        <div className="flex items-center gap-4 text-ink-soft text-sm">
          <span className="flex items-center gap-1">
            <Eye size={14} /> {formatCount(post.views)}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={14} /> {formatCount(post.likes)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={14} /> {formatCount(post.comments)}
          </span>
        </div>
        {post.posted_at && (
          <p className="text-xs text-ink-soft mt-2">
            {new Date(post.posted_at).toLocaleDateString("ru-RU")}
          </p>
        )}
      </div>
    </a>
  );
}
