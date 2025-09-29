"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  photo?: string; // optional
  bio: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Hayder Moallem",
    role: "Founder & CEO, Tezcai",
    bio: [
      `Hayder Moallem is a seasoned entrepreneur with over two decades of experience across energy, aviation, investment, and technology. He holds dual Master’s degrees in Petroleum Engineering from Imperial College London and an MBA from Aberdeen Business School, Robert Gordon University, combining technical expertise with strategic business leadership.`,
      `Throughout his career, Hayder has led multimillion-dollar projects, spanning sectors from oil & gas to fintech.`,
      `At Tezcai, Hayder brings this depth of experience to the world of crypto trading. His vision is to make advanced trading tools accessible, transparent, and profitable for everyday users and institutions alike.`,
    ],
  },
];


interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function TeamCard({ member, index }: TeamCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Alternate layout
  const isEven = index % 2 === 0;

  // Check if text overflows 4 lines
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * 4; // 4 lines
      if (textRef.current.scrollHeight > maxHeight) {
        setIsClamped(true);
      }
    }
  }, [member.bio]);

  // Fallback initial if no photo
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const ProfileBlock = (
    <div className="flex flex-col items-center md:w-1/4 w-full mb-6 md:mb-0">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-700  text-blue-400 text-3xl font-bold">
          {getInitial(member.name)}
        </div>
      )}
      <h3 className="mt-3 text-lg font-semibold text-blue-400">
        {member.name}
      </h3>
      <p className="text-gray-400 text-sm">{member.role}</p>
    </div>
  );

  const DescriptionBlock = (
    <div className="md:w-3/4 w-full md:pl-6">
     <p
  ref={textRef}
  className={`text-gray-200 transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-4"}`}
>
  {Array.isArray(member.bio)
    ? member.bio.map((para, i) => (
        <span key={i} className="block mb-3">{para}</span>
      ))
    : member.bio}
</p>


      {isClamped && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-400 hover:underline text-sm"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-start bg-gray-900 border border-gray-700 rounded-xl p-6 w-full hover:border-blue-500 transition-all ">
      {isEven ? (
        <>
          {ProfileBlock}
          {DescriptionBlock}
        </>
      ) : (
        <>
          {DescriptionBlock}
          {ProfileBlock}
        </>
      )}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="my-28">
      <h2 className="text-4xl font-bold text-center text-blue-400 mb-12">
        Our Team
      </h2>
      <div className="space-y-6">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} index={index} />
        ))}
      </div>
    </section>
  );
}
