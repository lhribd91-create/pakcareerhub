import Link from "next/link";
import { getAll } from "@/lib/db";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPage() {
  const posts = getAll("blog");
  return (
    <div className="container-px max-w-5xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-[var(--muted)]">Tips, guides, and news for job seekers across Pakistan.</p>
      </div>
      {posts.length === 0 ? (
        <div className="card p-12 text-center text-[var(--muted)]">No blog posts yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="card p-6 flex flex-col gap-2">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-[var(--muted)]">{post.excerpt}</p>
              <span className="text-xs text-[var(--muted)] mt-2">{formatDate(post.date)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
