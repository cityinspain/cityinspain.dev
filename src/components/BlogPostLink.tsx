import Link from "next/link";
import client from "../lib/sanityClient";

export default function BlogPostLink({ post }) {
  return (
    <li>
      <Link href={`/blog/posts/${post.slug.current}`}>
        <div className="flex justify-between py-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">{post.title}</h2>
          </div>
          <div>
            <p className="text-md text-gray-300">{post.publishedAt}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
