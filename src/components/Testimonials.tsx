"use client";

import React, { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import GradientButton from "./UI/GradientLinkButton";

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

const DEFAULT_TESTIMONIAL: Testimonial[] = [
    {
        id: 1,
        name: "Sarbjit Singh",
        role: "Backend Developer",
        company: "Sadaah Investment LLC",
        photo_url: "",
        social_url: "https://www.linkedin.com/in/sarabjit-d-567211107/",
        rating: 5.0,
        content: "Namaio completely changed how I trade Forex. The automation is smart, disciplined, and fully customizable. I can monitor everything in real-time, yet it takes care of the repetitive work for me. After just a month of using it, my efficiency and confidence in trading have skyrocketed!",
    },
];

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const savedTestimonials = localStorage.getItem("testimonials");
        if (savedTestimonials) {
            setTestimonials(JSON.parse(savedTestimonials));
        } else {
            // Set default testimonial in local storage if none exists
            localStorage.setItem(
                "testimonials",
                JSON.stringify(DEFAULT_TESTIMONIAL)
            );
            setTestimonials(DEFAULT_TESTIMONIAL);
        }
    }, []);

    return (
        <div className="px-6 py-16 lg:px-20  bg-gradient-to-tr from-blue-50 via-cyan-50 to-blue-100 ">
            {/* Heading */}

            <div className="flex items-center justify-center mb-6">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full border border-blue-300 shadow-sm">
                    <FiZap className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-bold text-primary">
                        Testimonials
                    </h2>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid gap-8 max-w-lg w-full mx-auto lg:grid-cols-3 lg:max-w-full auto-rows-fr">
                {testimonials.map((t) => (
                    <div
                        key={t.id}
                        className="p-6 rounded-xl border border-gray-100 bg-background shadow-sm flex flex-col justify-between h-full"
                    >
                        <p className="text-primary italic mb-6 flex-grow">
                            &quot;{t.content}&quot;
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center">
                                {t.photo_url ? (
                                    <img
                                        src={t.photo_url}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover border border-gray-600"
                                    />
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-600 text-white font-bold text-lg">
                                        {t.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-primary">{t.name}</h3>
                                    <p className="text-sm text-secondary">
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

                            {t.rating && (
                                <div className="flex items-center gap-1">
                                    <FaStar className="w-4 h-4 text-yellow-400" />
                                    <span className="text-base font-medium text-primary">
                                        {t.rating.toFixed(1)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Yours Button */}
            <div className="flex justify-center gap-4 mt-10">
                <GradientButton href="/testimonial">Add Yours</GradientButton>
            </div>
        </div>
    );
};

export default Testimonials;
