'use client'
import { useState } from 'react';
import { FiMail, FiPhone, FiMessageSquare, FiSend, FiMapPin, FiArrowLeft } from 'react-icons/fi';

export default function HelpCenter() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSubmitError("")
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.email && !formData.phone) {
            newErrors.email = 'Email or phone is required';
            newErrors.phone = 'Email or phone is required';
            valid = false;
        } else {
            if (formData.email && !validateEmail(formData.email)) {
                newErrors.email = 'Please enter a valid email';
                valid = false;
            }
            if (formData.phone && !validatePhone(formData.phone)) {
                newErrors.phone = 'Please enter a valid phone number';
                valid = false;
            }
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/send-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitSuccess(true);
            setFormData({ email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg my-10 ">
            <button
                onClick={() => window.history.back()}
                className="flex items-center text-white hover:text-blue-400 transition-colors mb-5">
                <FiArrowLeft className="mr-1" />
                Back
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">Help & Contact</h2>
            {submitError && (
                <div className="p-4 mb-6 bg-red-800/30 border border-red-600 rounded-lg text-red-200">
                    {submitError}
                </div>
            )}
            {submitSuccess ? (
                <div className="p-4 mb-6 bg-green-800/30 border border-green-600 rounded-lg text-green-200">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="your@email.com"
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
                                Phone Number
                            </label>
                            <span className="text-xs text-gray-400">Optional</span>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`bg-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="............."
                            />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                            Your Message
                        </label>
                        <div className="relative">
                            <div className="absolute top-3 left-3">
                                <FiMessageSquare className="text-gray-400" />
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className={`bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="How can we help you?"
                            />
                        </div>
                        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            'Sending...'
                        ) : (
                            <>
                                <FiSend />
                                Send Message
                            </>
                        )}
                    </button>
                </form>
            )}

            <div className="mt-8 pt-6 border-t border-gray-700">
                {/* <h2 className="text-xl font-semibold text-white mb-3">Other Ways to Reach Us</h2> */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <FiMail className="text-blue-400" />
                        <a href="mailto:info@tezcai.com" className="hover:text-blue-400 transition-colors">
                            info@tezcai.com
                        </a>
                    </div>
                    
                </div>
               
            </div>
            <div className="flex justify-center py-5">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}