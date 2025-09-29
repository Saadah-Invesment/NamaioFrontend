"use client";
import { useState } from "react";
import { FiMessageCircle, FiSend, FiX, FiMail, FiPhone } from "react-icons/fi";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // ✅ Same validation functions from HelpContactPage
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSubmitError("");
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.email && !formData.phone) {
            newErrors.email = "Email or phone is required";
            newErrors.phone = "Email or phone is required";
            valid = false;
        } else {
            if (formData.email && !validateEmail(formData.email)) {
                newErrors.email = "Please enter a valid email";
                valid = false;
            }
            if (formData.phone && !validatePhone(formData.phone)) {
                newErrors.phone = "Please enter a valid phone number";
                valid = false;
            }
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("/api/send-email/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to send message");
            }

            setSubmitSuccess(true);
            setFormData({ email: "", phone: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError("Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
                >
                    <FiMessageCircle size={24} />
                </button>
            )}

            {/* Chat Form */}
            {open && (
                <div className="fixed bottom-6 right-6 w-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white">
                        <span className="font-medium">Chat with us</span>
                        <button
                            onClick={() => {
                                setOpen(false);
                                setSubmitSuccess(false);
                            }}
                            className="hover:text-gray-200"
                        >
                            <FiX />
                        </button>
                    </div>

                    <div className="p-4 space-y-3">
                        {/* Error / Success */}
                        {submitError && (
                            <div className="p-2 bg-red-800/30 border border-red-600 rounded text-red-200 text-sm">
                                {submitError}
                            </div>
                        )}
                        {submitSuccess && (
                            <div className="p-2 bg-green-800/30 border border-green-600 rounded text-green-200 text-sm">
                                Thank you! Your message has been sent.
                            </div>
                        )}

                        {!submitSuccess && (
                            <>
                                {/* Email */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`bg-gray-700 border ${errors.email ? "border-red-500" : "border-gray-600"
                                            } text-white rounded-lg w-full pl-10 py-2 text-sm focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-400">{errors.email}</p>
                                )}

                                {/* Phone */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`bg-gray-700 border ${errors.phone ? "border-red-500" : "border-gray-600"
                                            } text-white rounded-lg w-full pl-10 py-2 text-sm focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Optional phone"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs text-red-400">{errors.phone}</p>
                                )}

                                {/* Message */}
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`bg-gray-700 border ${errors.message ? "border-red-500" : "border-gray-600"
                                        } text-white rounded-lg w-full px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Your message"
                                />
                                {errors.message && (
                                    <p className="text-xs text-red-400">{errors.message}</p>
                                )}

                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    {/* <h2 className="text-xl font-semibold text-white mb-3">Other Ways to Reach Us</h2> */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FiMail className="text-blue-400" />
                                            <a href="mailto:info@tezcai.com" className="text-sm hover:text-blue-400 transition-colors">
                                                info@tezcai.com
                                            </a>
                                        </div>

                                    </div>

                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : <><FiSend /> Send</>}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
