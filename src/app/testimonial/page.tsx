"use client";

import React, { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import CreateTestimonial from "./CreateTestimonial";


interface Testimonial {
    id: number;
    name: string;
    role: string;
    company?: string;
    photo_url?: string;
    social_url?: string;
    rating?: number;
    content: string;
}

const TestimonialsPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [visibleCount, setVisibleCount] = useState(6); // start with 6

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const { data } = await axios.get<Testimonial[]>(
                "https://api.tezcai.com/api/testimonials"
            );
            setTestimonials(data);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    if (error) return null;

    return (
        <section className="min-h-screen  pb-5">
            <div className="px-6 lg:px-20 my-10">
                {/* Heading */}
                <div className="flex items-center justify-center mb-10">
                    <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
                        <FiZap className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold text-white">Testimonials</h2>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <p className="text-center text-gray-400">Loading testimonials...</p>
                ) : testimonials.length === 0 ? (
                    <div className="text-center">
                        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow">
                            Add Testimonial
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid gap-8 max-w-lg w-full mx-auto lg:grid-cols-3 lg:max-w-full auto-rows-fr">
                            {testimonials.slice(0, visibleCount).map((t) => (
                                <div
                                    key={t.id}
                                    className="p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-sm flex flex-col justify-between h-full"
                                >
                                    {/* Content */}
                                    <p className="text-gray-300 italic mb-6 flex-grow">
                                        &quot;{t.content}&quot;
                                    </p>

                                    {/* Profile + Rating Row */}
                                    <div className="flex items-center justify-between mt-auto">
                                        {/* Profile */}
                                        <div className="flex items-center">
                                            {t.photo_url ? (
                                                <img
                                                    src={t.photo_url}
                                                    alt={t.name}
                                                    className="w-12 h-12 rounded-full object-cover border border-gray-600"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                                                    {t.name?.charAt(0)}
                                                </div>
                                            )}
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {t.role}
                                                    {t.company ? `, ${t.company}` : ""}
                                                </p>
                                                {t.social_url && (
                                                    <a
                                                        href={t.social_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 text-sm "
                                                    >
                                                        🔗 Profile
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        {t.rating && (
                                            <div className="flex items-center gap-1">
                                                <FaStar className="w-4 h-4 text-yellow-400" />
                                                <span className="text-base font-medium text-white">
                                                    {t.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCount < testimonials.length && (
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow"
                                >
                                    Load More
                                </button>
                            </div>
                        )}

                        {/* Add Testimonial Form */}
                        <div className="mt-10">
                            <CreateTestimonial onSuccess={fetchTestimonials} />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default TestimonialsPage;
