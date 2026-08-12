import { getById } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = getById("blog", id);
  if (!post) notFound();

  return (
    <div className="container-px max-w-3xl mx-auto py-12">
      <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--green)] mb-6 inline-block">
        &larr; Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-[var(--muted)] mb-8">{formatDate(post.date)}</p>
      <p className="text-[var(--muted)] leading-relaxed whitespace-pre-line">
        {post.content || post.excerpt}
      </p>
    </div>
  );
}
