import { getPostBySlug } from "@/lib/api";
import { BlogPost } from "@/app/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: any) {
  const post: BlogPost = await getPostBySlug(params.slug);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.fields.title}</h1>

      {post.fields.heroImage && (
        <Image
          src={`https:${post.fields.heroImage.fields.file.url}`}
          alt={post.fields.title}
          width={1200}
          height={600}
          className="w-full h-auto rounded mb-6"
        />
      )}

      <p className="text-sm text-gray-500 mb-1">
        {post.fields.publishedDate
          ? new Date(post.fields.publishedDate).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "N/A"}
      </p>

      <div className="prose prose-lg max-w-none">
        {documentToReactComponents(post.fields.body)}
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
        >
          ← Back to Posts
        </Link>
      </div>
    </main>
  );
}
