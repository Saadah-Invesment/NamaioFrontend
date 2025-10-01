"use client"
import Link from 'next/link';
import React from 'react';

const FooterDisclaimer = () => {
    return (
        <footer className="bg-background">
            <div className="py-4 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-900/5 border border-gray-900/20 rounded-lg p-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            DISCLAIMER
                        </h3>
                        <p className="text-lg text-black mb-3">
                            Namaio is a technology provider. We are not a financial advisor, broker, or asset manager. Trading foreign exchange involves risk of loss. Past results do not guarantee future outcomes. Past performance does not indicate future results. You are solely responsible for your trading decisions. Use of Namaio constitutes acceptance of our <span><Link
                                href="/terms-and-conditions"
                                className="ml-1 mr-1   underline hover:text-blue-600"
                            >
                                Terms & Conditions
                            </Link></span> and
                            <span><Link
                                href="/risk-disclosure"
                                className="ml-2   underline hover:text-blue-600"
                            >
                                Risk Disclosure
                            </Link></span>.
                        </p>


                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterDisclaimer;