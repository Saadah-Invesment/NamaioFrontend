'use client';
import HeaderAbout from '@/components/HeaderAbout';
import Header from "@/components/Header";
import Image from 'next/image';
import {
  FaBrain,
  FaEye,
  FaShieldAlt,
  FaStar,
  FaRocket,
  FaHandshake,
  FaUsers,
  FaBlog,
  FaNewspaper,
  FaArrowLeft,
  FaChartLine,
  FaLightbulb
} from 'react-icons/fa';
import Link from 'next/link';
import Footer from '@/components/Footer';
import TeamSection from './TeamSection';

export default function CompanyPageComponrnt() {
  return (
    <div
      className="relative min-h-screen text-white bg-gray-900"
    // style={{
    //   backgroundImage: 'url("/images/bg2.jpeg")',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   backgroundAttachment: 'fixed',
    // }}
    >
      {/* 🔹 Overlay for opacity */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-80"></div> */}

      {/* 🔹 Page content */}
      <div className="relative z-10">
        <Header />
         <h1 className="text-gray-900 text-xs" > Tezcai | Automated Crypto Trading</h1>
        <div className="container mx-auto px-4 py-16 max-w-7xl">
         
          {/* About Section */}
          <section id="aboutus" className="bg-gray-900 py-5 px-5 mb-10 grid md:grid-cols-2 gap-10 items-center rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="w-full flex justify-center  rounded-xl ">
              <Image
                src="/images/tezcai-logo.png" // JPG/WEBP office/team image
                alt="Tezcai crypto trading automation team illustration"
                width={500}
                height={500}
                loading='lazy'
              // fill
              // className="object-cover"
              />
            </div>
            <div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-secondary">Tezcai</span>
              </h2>

              <p className="text-lg leading-relaxed mb-4 text-gray-200">
                At Tezcai, we believe technology should work for you, not against you. Founded with a vision to simplify trading through intelligent automation, we bring together expertise in finance, artificial intelligence, and risk management to create tools that empower traders of all levels.
              </p>
              <p className="text-lg leading-relaxed text-gray-200">
                Our team has decades of combined experience across fintech, software engineering, and investment strategy. With our solutions, we aim to level the playing field and make advanced trading accessible, transparent, and profitable for everyone.
              </p>
            </div>
          </section>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {/* Vision */}
            <section className="bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all p-8">
              <div className="flex items-center mb-6">
                <FaEye className="text-3xl text-blue-400 mr-4" />
                <h2 className="text-3xl font-semibold text-blue-400">Vision</h2>
              </div>
              <div className="flex justify-center  mb-6">
                <Image src="/images/vision.webp" height={350} width={350} alt="Vision Image"
                  className="rounded-xl shadow-lg"
                  loading='lazy'
                />
              </div>
              <p className="text-lg text-gray-200 leading-relaxed">
                To become the most trusted name in AI-driven trading technology, empowering individuals
                and institutions worldwide with intelligent tools that deliver results consistently,
                securely, and transparently.
              </p>
            </section>

            {/* Mission */}
            <section className="bg-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all  p-8">
              <div className="flex items-center mb-6">
                <FaRocket className="text-3xl text-secondary mr-4" />
                <h2 className="text-3xl font-semibold text-secondary">Mission</h2>
              </div>
              <div className="flex justify-center mb-6">
                <Image src="/images/misson.png" height={150} width={150} alt="Secure crypto trading bot mission" loading='lazy' />
              </div>
              <div className="space-y-4 text-gray-200">
                <div className="flex items-start">
                  <FaChartLine className="text-secondary mt-1 mr-3" />
                  <p>To simplify trading with intuitive, Smart Software solutions.</p>
                </div>
                <div className="flex items-start">
                  <FaChartLine className="text-secondary mt-1 mr-3" />
                  <p>To empower our clients with automation that saves time, minimizes risk, and maximizes opportunity.</p>
                </div>
                <div className="flex items-start">
                  <FaShieldAlt className="text-secondary mt-1 mr-3" />
                  <p>To set new benchmarks of trust and transparency in the fintech industry.</p>
                </div>
                <div className="flex items-start">
                  <FaLightbulb className="text-secondary mt-1 mr-3" />
                  <p>To continuously innovate, ensuring our users always stay ahead of the market.</p>
                </div>
              </div>
            </section>
          </div>
          {/* Values */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center text-blue-400 mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Integrity */}
              <div className="bg-gray-900 border border-blue-400 rounded-xl p-6">
                <FaShieldAlt className="text-3xl text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                <p className="text-gray-200">We operate with honesty and transparency in everything we do.</p>
              </div>
              {/* Excellence */}
              <div className="bg-gray-900 border border-secondary rounded-xl p-6">
                <FaStar className="text-3xl text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-200">We strive for the highest standards in technology, performance, and client service.</p>
              </div>
              {/* Innovation */}
              <div className="bg-gray-900 border border-blue-400 rounded-xl p-6">
                <FaBrain className="text-3xl text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-200"> We embrace cutting-edge technologies to stay ahead of the curve.</p>
              </div>
              {/* Trust */}
              <div className="bg-gray-900 border border-secondary rounded-xl p-6">
                <FaHandshake className="text-3xl text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-gray-200">We build long-term relationships based on reliability and accountability.</p>
              </div>
              {/* Accessibility */}
              <div className="bg-gray-900 border border-blue-400 rounded-xl p-6">
                <FaUsers className="text-3xl text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-200">We make advanced trading tools available to everyone, not just professionals.</p>
              </div>
              {/* Growth */}
              <div className="bg-gray-900 border border-secondary rounded-xl p-6">
                <FaRocket className="text-3xl text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growth</h3>
                <p className="text-gray-200">We continuously evolve to serve clients better.</p>
              </div>
            </div>
          </section>
          <TeamSection />

          {/* Blog & News */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {/* Blog */}
            <section className="relative bg-gray-900 border border-blue-400 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <FaBlog className="text-3xl text-blue-400 mr-4" />
                <h2 className="text-3xl font-semibold text-blue-400">Blog</h2>
              </div>
              <p className="text-gray-200 mb-4">
                Stay informed, inspired, and ahead of the curve. Our blog shares practical insights on trading strategies, AI innovations, fintech trends, and personal finance tips. Whether you’re new to trading or an experienced investor, our content is designed to educate, empower, and guide you through every step of your financial journey.
              </p>
              <Link href="/blog">

                <button className="text-blue-400 font-semibold hover:underline">
                  Explore Blog →
                </button></Link>
            </section>

            {/* News */}
            <section className="relative bg-gray-900 border border-secondary rounded-xl p-8">
              <div className="flex items-center mb-6">
                <FaNewspaper className="text-3xl text-secondary mr-4" />
                <h2 className="text-3xl font-semibold text-secondary">News</h2>
              </div>
              <p className="text-gray-200 mb-4">
                Follow the latest updates, milestones, and announcements from Tezcai. From product launches to industry partnerships, this is where we share our progress, achievements, and the exciting future we are building. Stay connected as we continue to grow, innovate, and set new standards in automated trading.
              </p>
              {/* <button className="text-secondary font-semibold hover:underline">
                View News →
              </button> */}
            </section>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center px-6 py-3 bg-gray-900 border border-blue-400 text-blue-400 rounded-lg hover:bg-gray-800 transition"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
