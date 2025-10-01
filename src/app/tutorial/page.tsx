
import UserJourney from '@/components/UserJourney';
import React from 'react';
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Namaio Tutorial | Connect Your API in Minutes",
    description:
        "Follow this quick  guide to connect your exchange API with Namaio. Learn how to set up automated crypto trading and start trading smarter instantly.",
    alternates: {
        canonical: "/tutorial",
    },
};
export default function Tutorial() {

    return (
        <div>
            <UserJourney />

        </div>
    );
};