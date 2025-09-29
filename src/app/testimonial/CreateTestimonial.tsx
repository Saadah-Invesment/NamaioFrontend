"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface CreateTestimonialProps {
    onSuccess?: () => void;
}

const CreateTestimonial: React.FC<CreateTestimonialProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        photo_url: "",
        social_url: "",
        rating: 0,
        content: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error("Name is required");
            return false;
        }
        if (!formData.role.trim()) {
            toast.error("Role is required");
            return false;
        }
        if (!formData.content.trim()) {
            toast.error("Testimonial content is required");
            return false;
        }
        if (formData.content.trim().length > 500) {
            toast.error("Testimonial content must be 500 characters or less");
            return false;
        }
        if (formData.rating < 1 || formData.rating > 5) {
            toast.error("Rating must be between 1 and 5");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await axios.post("https://api.tezcai.com/api/testimonials/add/", formData);
            toast.success(" Testimonial added successfully!");

            // Reset form
            setFormData({
                name: "",
                role: "",
                company: "",
                photo_url: "",
                social_url: "",
                rating: 0,
                content: "",
            });

            // Call parent callback
            if (onSuccess) onSuccess();
        } catch (err: any) {
            console.error("Error submitting testimonial:", err);

            // Check if server returned validation errors
            if (err.response?.data) {
                const errors = err.response.data;
                // If errors is an object like { social_url: ["Enter a valid URL."] }
                Object.keys(errors).forEach((field) => {
                    errors[field].forEach((msg: string) => {
                        toast.error(`${field}: ${msg}`);
                    });
                });
            } else {
                toast.error(" Failed to submit testimonial. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center py-10 px-6">
            <Toaster position="top-right" />
            <div className="w-full lg:max-w-4xl bg-gray-900 p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                    Add a Testimonial
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Name + Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="role"
                            placeholder="Your Role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                        />
                    </div>

                    {/* Row 2: Company + Photo URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="company"
                            placeholder="Company (Optional)"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white"
                        />
                        <input
                            type="text"
                            name="photo_url"
                            placeholder="Photo URL (Optional)"
                            value={formData.photo_url}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white"
                        />
                    </div>

                    {/* Row 3: Social + Rating */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="social_url"
                            placeholder="LinkedIn / Social Profile URL"
                            required
                            value={formData.social_url}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white"
                        />
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-500"
                        >
                            <option value={0} disabled>
                                Rating
                            </option>
                            <option value={1}>1 </option>
                            <option value={2}>2 </option>
                            <option value={3}>3 </option>
                            <option value={4}>4 </option>
                            <option value={5}>5 </option>
                        </select>
                    </div>

                    {/* Content */}
                    <textarea
                        name="content"
                        placeholder="Write your testimonial..."
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-md bg-gray-800 text-white"
                    ></textarea>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md"
                    >
                        {loading ? "Submitting..." : "Submit Testimonial"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTestimonial;
