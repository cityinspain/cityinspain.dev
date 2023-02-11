import client from "@lib/sanityClient";
import PageTitle from "@components/PageTitle";
import BlogPostLink from "@/components/BlogPostLink";
import groq from "groq";

export default function BlogPage({ posts }) {
  posts = posts.map((post) => {
    const date = new Date(post.publishedAt);
    post.publishedAt = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return post;
  });

  return (
    <>
      <PageTitle>blog</PageTitle>
      <ul className="divide-y-0 divide-gray-900 py-8">
        {posts.map((post) => (
          <>
            <BlogPostLink key={post.slug.current} post={post} />
          </>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(
    groq`
        *[_type == "post"] | order(publishedAt desc) {
            title,
            slug,
            "name": author->name,
            
            publishedAt,
        }
        `
  );

  return {
    props: {
      posts,
    },
  };
}
