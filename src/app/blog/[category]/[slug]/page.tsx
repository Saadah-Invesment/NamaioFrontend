import React from "react";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary: string;
  categories: { name: string; slug: string }[];
  meta_title: string;
  meta_description: string;
  image: string | null;
}

interface Params {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = params;
  let blog: Blog | null = null;

  try {
    const res = await axios.get(`https://api.tezcai.com/api/blog/blogs/${slug}`);
    blog = res.data;
  } catch (error) {
    console.error(error);
  }

  return {
    title: blog?.meta_title || "Blog",
    description: blog?.meta_description || "Tezcai Blog",
    openGraph: {
      title: blog?.meta_title,
      description: blog?.meta_description,
      images: blog?.image ? [{ url: blog.image }] : undefined,
    },
  };
}

export default async function BlogDetail({ params }: Params) {
  const { slug, category } = params;
  let blog: Blog | null = null;

  try {
    const res = await axios.get(`https://api.tezcai.com/api/blog/blogs/${slug}`);
    blog = res.data;
  } catch (error) {
    console.error(error);
  }

  if (!blog) return <p className="text-center text-gray-500 mt-20">Blog not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-200 flex items-center gap-2">
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>/</span>
        <Link href={`/blog/${category}`} className="hover:underline uppercase">
          {category}
        </Link>
        <span>/</span>
        <span className="text-gray-200 ">{blog.title}</span>
      </nav>
      <div className="flex justify-start gap-2 my-2 flex-wrap">
        {blog.categories.map((cat) => (
          <span
            key={cat.slug}
            className="px-3 py-1 text-xs border border-gray-600 rounded-full text-gray-300 bg-gray-900"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">{blog.summary}</p>

        {/* Tags */}

      </div>

      {/* Featured Image */}
      {blog.image && (
        <img
          width={600}
          height={400}
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 sm:h-72 md:h-[400px] lg:h-[500px] object-cover rounded-lg shadow mb-10"
        />
      )}


      {/* Content */}
      <div className="prose max-w-none prose-lg prose-headings:font-bold prose-a:text-blue-600">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Footer / Author */}
      <div className="mt-12 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <p>✍️ Written by <span className="font-medium">Tezcai Team</span></p>
        {/* <p>📅 Published: <span className="font-medium"> {new Date().toDateString()} </span></p> */}
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between text-blue-600 text-sm font-medium">
        <Link href="/blog">&larr; Back to Blogs</Link>
        {/* <Link href="/blog">Next Blog &rarr;</Link> */}
      </div>
    </div>
  );
}
