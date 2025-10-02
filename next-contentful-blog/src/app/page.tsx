import { getAllPosts } from "@/lib/api";
import { BlogPost } from "../app/types/contentful";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const posts: BlogPost[] = await getAllPosts();

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">Posts</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.sys.id}
            href={`/posts/${post.fields.slug}`}
            className="group block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 bg-white"
          >
            {post.fields.heroImage && (
              <div className="relative w-full h-48 sm:h-60 md:h-48 lg:h-56 overflow-hidden">
                <Image
                  src={`https:${post.fields.heroImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {post.fields.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {post.fields.publishedDate
                  ? new Date(post.fields.publishedDate).toLocaleDateString(
                      "en-CA",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )
                  : "N/A"}
              </p>
              {post.fields.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(post.fields.tags)
                    ? post.fields.tags
                    : [post.fields.tags]
                  ).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 border border-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
