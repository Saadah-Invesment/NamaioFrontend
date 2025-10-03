'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from '@/components/Footer';
import Header from "@/components/Header";
import { usePathname } from 'next/navigation';



interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    summary: string;
    image: string | null;
    categories: { name: string; slug: string }[];
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [latestBlog, setLatestBlog] = useState<Blog | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, blogRes] = await Promise.all([
                    axios.get('https://api.namaio.com/api/blog/categories/'),
                    axios.get('https://api.namaio.com/api/blog/blogs/')
                ]);
                setCategories(catRes.data);
                if (blogRes.data.length > 0) {
                    setLatestBlog(blogRes.data[0]);
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchData();
    }, []);

    // split path -> [ '', 'blog', 'category', 'slug' ]
    const pathParts = pathname.split('/').filter(Boolean);
    const isIndividualBlog = pathParts.length === 3; // /blog/category/slug

    return (

        <div>
            <Header />

             <h1 className="text-white text-xs" > Namaio | Smart Forex Automation</h1>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className='text-3xl text-primary font-bold mb-5'>Namaio Blog</h2>
                {/* Featured Blog Section (only show on blog list & category pages) */}
                {!isIndividualBlog && latestBlog && (
                    <Link
                        href={`/blog/${latestBlog.categories[0]?.slug}/${latestBlog.slug}`}
                        className="flex flex-col md:flex-row gap-6 mt-10 mb-10  rounded-lg overflow-hidden "
                    >

                        {/* Left Side Image */}
                        {latestBlog.image && (
                            <img
                                width={600}
                                height={400}
                                src={latestBlog.image}
                                alt={latestBlog.title}
                                className="w-full md:w-1/2 h-40 sm:h-56 md:h-64 lg:h-80 object-cover rounded-lg"
                            />
                        )}


                        {/* Right Side Content */}
                        <div className="flex flex-col justify-center p-6 md:w-1/2">
                            <h2 className="text-2xl font-bold mb-3">{latestBlog.title}</h2>
                            <p className="text-gray-600 mb-4">{latestBlog.summary}</p>

                            {/* Categories as tags */}
                            <div className="flex flex-wrap gap-2">
                                {latestBlog.categories.map((cat) => (
                                    <span
                                        key={cat.slug}
                                        className="px-2 py-1 text-xs border border-gray-400 rounded-full text-gray-700 bg-gray-100"
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                )}

                {/* Category Selection */}
                {!isIndividualBlog && <aside className="mb-6">
                    <ul className="flex flex-wrap gap-2 mt-3">
                        {/* Default All category */}
                        <li>
                            <Link
                                href="/blog"
                                className={`px-3 py-1 border border-gray-700 rounded transition ${pathname === "/blog"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "border-gray-600 hover:bg-blue-600 hover:text-white"
                                    }`}
                            >
                                All
                            </Link>
                        </li>
                        {categories.map((cat) => {
                            const isActive = pathname === `/blog/${cat.slug}`;
                            return (
                                <li key={cat.id}>
                                    <Link
                                        href={`/blog/${cat.slug}`}
                                        className={`px-3 py-1 border border-gray-700 rounded transition ${isActive
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "border-gray-600 hover:bg-blue-600 hover:text-white"
                                            }`}
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>}

                {/* Blog Content */}
                <main>{children}</main>
                <br />
            </div>
            <Footer />
        </div>

    );
}
