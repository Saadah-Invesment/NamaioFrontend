// pages/crypto-dashboard.tsx
import { useState } from 'react';


// Define types for our data
type TabId = 'dashboard-overview' | 'signal-overview' | 'pricing' |
    'how-to-connect';

interface VideoData {
    title: string;
    description: string;
    embedUrl: string;
}

interface Tab {
    id: TabId;
    label: string;
}

export default function HowToUse() {
    const [activeTab, setActiveTab] = useState<TabId>('dashboard-overview');

    const tabs: Tab[] = [
        { id: 'dashboard-overview', label: 'Dashboard Overview' },
        { id: 'signal-overview', label: 'Signal Overview' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'how-to-connect', label: 'How To Connect Apis' },
    ];

    // Use a type that ensures all TabId values are present
    const videos: Record<TabId, VideoData> = {
        'dashboard-overview': {
            title: 'Dashboard Overview',
            description: 'Learn how to navigate the main dashboard interface.',
            embedUrl: 'https://www.youtube.com/embed/your-video-id-1'
        },
        'signal-overview': {
            title: 'Signal Overview',
            description: 'Understanding Signal Overview patterns and how to use them.',
            embedUrl: 'https://www.youtube.com/embed/your-video-id-2'
        },
        'pricing': {
            title: 'Pricing',
            description: 'How the pricing works',
            embedUrl: 'https://www.youtube.com/embed/your-video-id-3'
        },
        'how-to-connect': {
            title: 'How To Connect API',
            description: 'How To Connect API with Tezcai',
            embedUrl: 'https://www.youtube.com/embed/64TPgJz69wA?si=69hvWIn4F0Ha9BCN'
        },
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <header className="mt-10">
                <div className="max-w-7xl mx-auto px-4 py-2 sm:px-3 lg:px-3">
                    <h1 className="text-3xl font-bold text-white">How To Use Tezcai Video Library</h1>
                    <p className="mt-2 text-lg text-gray-300">
                        Watch this quick series of videos to fully understand how each features and functions works.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-4 py-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar - Tabs */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
                            <h2 className="text-lg font-semibold mb-4 text-blue-400">Video Library</h2>
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === tab.id
                                            ? 'bg-blue-500 text-white font-medium'
                                            : 'text-gray-300 hover:bg-blue-400 hover:text-gray-900'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content - Videos */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-blue-400">
                                {videos[activeTab].title}
                            </h2>

                            <div className="aspect-w-16 aspect-h-9 mb-6">
                                <iframe
                                    src={videos[activeTab].embedUrl}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-96 rounded-lg border border-gray-700"
                                ></iframe>
                            </div>

                            <p className="text-gray-300 mb-6">
                                {videos[activeTab].description}
                            </p>

                            {/* <div className="flex space-x-4">
                                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Watch later
                                </button>
                                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                    </svg>
                                    Share
                                </button>
                            </div> */}
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
}