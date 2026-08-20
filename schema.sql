-- Пользователи (блогеры)
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  full_name text,
  created_at timestamptz default now()
);

-- Посты (рилсы)
create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  instagram_url text not null,
  short_code text,
  cover_url text,
  video_url text,
  views bigint default 0,
  likes bigint default 0,
  comments bigint default 0,
  caption text,
  owner_username text,
  posted_at timestamptz,
  added_at timestamptz default now()
);

create index idx_posts_user_id on posts(user_id);
