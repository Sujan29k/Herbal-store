import React from "react";
import { FaLeaf, FaGlobe, FaUsers, FaSeedling } from "react-icons/fa";

const highlights = [
  {
    icon: <FaSeedling className="text-green-600 text-2xl" />,
    title: "Organic Sourcing",
    desc: "We partner with organic farms to ensure every product is pure, safe, and effective.",
  },
  {
    icon: <FaGlobe className="text-green-600 text-2xl" />,
    title: "Global Wellness",
    desc: "Our mission is to make natural wellness accessible to everyone, everywhere.",
  },
  {
    icon: <FaUsers className="text-green-600 text-2xl" />,
    title: "Community First",
    desc: "We believe in building a supportive community focused on holistic health.",
  },
];

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16 px-4 relative overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-0 w-48 h-48 bg-green-200/30 rounded-full blur-2xl -z-10" />
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl -z-10" />

    {/* Hero Section */}
    <div className="max-w-2xl mx-auto text-center mb-12">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <span className="p-4 bg-gradient-to-r from-green-400 to-lime-500 rounded-full shadow-lg">
          <FaLeaf className="text-white text-4xl" />
        </span>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
          About Us
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        HerbalStore is dedicated to bringing you the finest herbal products for your health and wellness journey. Our mission is to make natural remedies accessible, affordable, and trustworthy for everyone.
      </p>
    </div>

    {/* Highlights Section */}
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {highlights.map((item, idx) => (
        <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <div className="mb-4">{item.icon}</div>
          <h2 className="text-xl font-bold text-green-700 mb-2">{item.title}</h2>
          <p className="text-gray-700">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* Story Section */}
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Our Story</h2>
      <p className="text-gray-700 text-lg mb-4">
        Founded by a team of wellness enthusiasts, HerbalStore was born from a passion for holistic health and a desire to make herbal remedies accessible to all. We believe in the power of nature to heal, restore, and rejuvenate.
      </p>
      <p className="text-gray-700 text-lg mb-4">
        Every product in our store is carefully selected and tested to meet our high standards. We are committed to sustainability, transparency, and customer satisfaction.
      </p>
      <p className="text-gray-700 text-lg">
        Thank you for choosing HerbalStore as your partner in wellness!
      </p>
    </div>
  </div>
);

export default AboutPage;