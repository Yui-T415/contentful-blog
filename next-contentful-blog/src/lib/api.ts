import { createClient, Entry } from "contentful";
import { BlogPost } from "@/app/types/contentful";

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
});

export async function getAllPosts(): Promise<BlogPost[]> {
    const entries = await client.getEntries({ content_type: "blogPost" });
    return entries.items as unknown as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
    const entries = await client.getEntries({
        content_type: "blogPost",
        "fields.slug": slug,
        limit: 1,
    });

    if (!entries.items.length) {
        throw new Error(`Post with slug "${slug}" not found.`);
    }

    return entries.items[0] as unknown as BlogPost;
}
