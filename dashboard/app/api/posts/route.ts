import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Actor: apify/instagram-reel-scraper — на вход принимает ссылки на рилсы
const APIFY_ACTOR_ID = "apify~instagram-reel-scraper";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { url } = await req.json();
  if (!url || !url.includes("instagram.com")) {
    return NextResponse.json(
      { error: "Дай нормальную ссылку на инста-рилс" },
      { status: 400 }
    );
  }

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "APIFY_TOKEN не настроен на сервере" },
      { status: 500 }
    );
  }

  try {
    const apifyRes = await fetch(
      `https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: [url] }),
      }
    );

    if (!apifyRes.ok) {
      const text = await apifyRes.text();
      return NextResponse.json(
        { error: `Apify вернул ошибку: ${text.slice(0, 300)}` },
        { status: 502 }
      );
    }

    const items = await apifyRes.json();
    const item = Array.isArray(items) ? items[0] : null;

    if (!item) {
      return NextResponse.json(
        { error: "Apify не вернул данные по этой ссылке" },
        { status: 502 }
      );
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        instagram_url: item.url || url,
        short_code: item.shortCode || null,
        cover_url: item.displayUrl || null,
        video_url: item.videoUrl || null,
        views: item.videoPlayCount || 0,
        likes: item.likesCount || 0,
        comments: item.commentsCount || 0,
        caption: item.caption || null,
        owner_username: item.ownerUsername || null,
        posted_at: item.timestamp || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Неизвестная ошибка";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
