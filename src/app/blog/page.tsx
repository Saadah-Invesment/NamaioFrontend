"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string | null;
  categories: { name: string; slug: string }[];
}

export default function AllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://api.namaio.com/api/blog/blogs/");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>

      {loading ? (
        // Shimmer effect while loading
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-500 rounded mb-3"></div>
              <div className="h-6 bg-gray-500 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-500 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-500 rounded mb-2 w-5/6"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-gray-500 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.categories[0]?.slug}/${blog.slug}`}
              className="border border-gray-800 rounded p-4 hover:shadow-lg transition flex flex-col"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mb-3 w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="font-semibold text-xl">{blog.title}</h2>
              <p className="text-gray-600 mt-2 flex-grow line-clamp-2 ">{blog.summary}</p>

              {/* Tags Section */}
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.categories.map((cat) => (
                  <span
                    key={cat.slug}
                    className="px-2 py-1 text-xs border border-gray-400 rounded-full text-gray-700 bg-gray-100"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
