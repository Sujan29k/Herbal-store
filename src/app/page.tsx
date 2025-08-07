"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaLeaf, FaShieldAlt, FaTruck, FaStar } from "react-icons/fa";
import TestimonialsModal from "../components/TestimonialsModal";
import LearnMoreModal from "../components/LearnMoreModal";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const handleExplore = () => {
    localStorage.removeItem("guest");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-lime-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime-300/10 rounded-full blur-lg"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-green-600">
                <div className="p-2 bg-green-100 rounded-full">
                  <FaLeaf className="text-xl text-green-600" />
                </div>
                <span className="font-bold tracking-wider text-sm uppercase">
                  Natural Wellness
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                Discover the Power of
                <span className="bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent block">
                  Nature&apos;s Healing
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Experience authentic herbal remedies crafted from nature&apos;s
                finest ingredients. Transform your wellness journey with our
                premium collection of organic herbs and natural products.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={handleExplore}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 border border-emerald-500/20"
              >
                Explore Products
              </button>
              <button
                onClick={() => setIsLearnMoreOpen(true)}
                className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm bg-white/80 shadow-lg hover:shadow-xl"
              >
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-xl" />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold">
                  4.9/5 from 1000+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/herbal-product.jpg"
                alt="Premium herbal products"
                width={600}
                height={500}
                className="object-cover w-full h-[500px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-green-500/20"></div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl border border-emerald-100">
              <FaLeaf className="text-3xl text-emerald-600" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl p-5 shadow-2xl">
              <FaShieldAlt className="text-2xl" />
            </div>
            <div className="absolute top-1/2 -left-4 bg-amber-400 text-white rounded-xl p-3 shadow-lg">
              <FaStar className="text-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-semibold mb-6">
              <FaLeaf />
              <span>Our Promise</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Why Choose Our Herbal Store?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              We&apos;re committed to providing you with the highest quality
              natural products for your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaLeaf className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                100% Natural
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All our products are sourced from organic farms and contain no
                artificial additives or chemicals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-blue-100">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaShieldAlt className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quality Assured
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Each product undergoes rigorous testing to ensure purity,
                potency, and safety standards.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-amber-100">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FaTruck className="text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fast Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and secure delivery to your doorstep with careful
                packaging to preserve product quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold mb-6">
                <FaLeaf />
                <span>Transform Your Life</span>
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Ready to Transform Your Wellness?
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have discovered the
              power of natural healing. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleExplore}
                className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25"
              >
                Start Shopping Now
              </button>
              <button
                onClick={() => setIsTestimonialsOpen(true)}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                View Testimonials
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <TestimonialsModal
        isOpen={isTestimonialsOpen}
        onClose={() => setIsTestimonialsOpen(false)}
      />
      <LearnMoreModal
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
      />
    </div>
  );
};

export default HeroSection;
