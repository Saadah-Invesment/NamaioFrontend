"use client"
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { PiShootingStarThin } from "react-icons/pi";
import GradientButton from './UI/GradientLinkButton';

const FinalCallSection = () => {
    return (
        <div className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-6 py-20 w-full">
                {/* Section Title */}
                <div className="text-center mb-16">
                    {/* <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full mb-6 mx-auto">
                        <PiShootingStarThin className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-bold">GET STARTED</span>
                    </div> */}
                    {/* <div className="flex items-center justify-center mb-10">
                        <div className="inline-flex items-center gap-3 bg-gray-800 px-6 py-3 rounded-full">
                            <PiShootingStarThin className="w-6 h-6 text-blue-400" /> 
                            <h2 className="text-2xl font-bold text-white">  Get Started</h2> 
                        </div>
                    </div> */}
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                        Trade Smarter. Earn More. Start Today.
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                       Namaio was built by a team of fintech and trading experts with experience in finance, automation, and AI.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GradientButton href='/login' variant='secondary'>
                        Start For Free ⚡
                    </GradientButton>

                </div>
            </div>
        </div>
    );
};

export default FinalCallSection;