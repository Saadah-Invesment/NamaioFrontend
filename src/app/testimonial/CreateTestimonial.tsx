"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CreateTestimonialProps {
  onSuccess?: (newTestimonial: Testimonial) => void;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  photo_url?: string;
  social_url?: string;
  rating: number; // make rating required
  content: string;
}

const CreateTestimonial: React.FC<CreateTestimonialProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<Testimonial>({
    id: Date.now(),
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
    if (formData.social_url && !formData.social_url.trim()) {
      toast.error("Social Profile URL is required");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const existing = localStorage.getItem("testimonials");
      const testimonials: Testimonial[] = existing ? JSON.parse(existing) : [];

      const newTestimonial: Testimonial = { ...formData, id: Date.now() };

      const updatedTestimonials = [newTestimonial, ...testimonials];
      localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));

      toast.success("Testimonial added successfully!");

      // Reset form
      setFormData({
        id: Date.now(),
        name: "",
        role: "",
        company: "",
        photo_url: "",
        social_url: "",
        rating: 0,
        content: "",
      });

      if (onSuccess) onSuccess(newTestimonial);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center py-10 px-6">
      <Toaster position="top-right" />
      <div className="w-full lg:max-w-4xl bg-primary p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Add a Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary focus:ring focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Your Role *"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Company + Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="company"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary"
            />
            <input
              type="text"
              name="photo_url"
              placeholder="Photo URL (Optional)"
              value={formData.photo_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary"
            />
          </div>

          {/* Social + Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="social_url"
              placeholder="LinkedIn / Social Profile URL *"
              value={formData.social_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary"
              required
            />
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md text-primary focus:ring focus:ring-blue-500"
              required
            >
              <option value={0} disabled>
                Rating *
              </option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <textarea
            name="content"
            placeholder="Write your testimonial... *"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-md text-primary"
            required
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-secondary hover:bg-teal-400 text-primary font-semibold rounded-md shadow-md"
          >
            {loading ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTestimonial;
