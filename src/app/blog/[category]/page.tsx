'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  image: string | null;
  categories: { name: string; slug: string }[];
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category || 'all'; // dynamic param

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          category === 'all'
            ? 'https://api.namaio.com/api/blog/'
            : `https://api.namaio.com/api/blog/categories/${category}`
        );

        // Normalize API response to array
        const data = res.data.blogs ? res.data.blogs : res.data;
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]); // fallback if not array
        }
      } catch (error) {
        console.error('Failed to fetch blogs', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  if (loading) return <div className="grid md:grid-cols-3 gap-6">
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
  </div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6  ">
        <span className='uppercase'>{category === 'all' ? 'All Blogs' : `${category} `}</span> Blogs
      </h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${category}/${blog.slug}`}
              className="border border-gray-800 rounded  p-4 hover:shadow-lg transition"
            >
              {blog.image && (
                <img
                  width={600}
                  height={400}
                  src={blog.image}
                  alt={blog.title}
                  className="mb-3 w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="font-semibold text-xl">{blog.title}</h2>
              <p className="text-gray-600 mt-2 line-clamp-2">{blog.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
