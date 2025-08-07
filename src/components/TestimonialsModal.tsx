"use client";

import React from "react";
import { FaStar, FaTimes, FaQuoteLeft } from "react-icons/fa";

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialsModal: React.FC<TestimonialsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment:
        "Amazing products! The herbal tea blend has completely transformed my sleep quality. I've been using it for 3 months now and feel more energized during the day.",
      product: "Herbal Sleep Tea",
      image: "/testimonials/sarah.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      comment:
        "The turmeric supplements are fantastic. My joint pain has significantly reduced, and I feel more active. The quality is top-notch and delivery was super fast.",
      product: "Organic Turmeric Capsules",
      image: "/testimonials/michael.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Austin, TX",
      rating: 5,
      comment:
        "I've tried many herbal stores, but this one stands out. The customer service is excellent, and the products are genuinely effective. Highly recommend!",
      product: "Immunity Booster Kit",
      image: "/testimonials/emily.jpg",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Seattle, WA",
      rating: 5,
      comment:
        "Natural stress relief formula works wonders! I was skeptical at first, but after using it for a month, I'm a believer. No side effects, just pure wellness.",
      product: "Stress Relief Blend",
      image: "/testimonials/david.jpg",
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Boston, MA",
      rating: 5,
      comment:
        "The digestive health supplements have been life-changing. My stomach issues are finally under control. Thank you for these amazing natural solutions!",
      product: "Digestive Health Kit",
      image: "/testimonials/lisa.jpg",
    },
    {
      id: 6,
      name: "James Miller",
      location: "Denver, CO",
      rating: 5,
      comment:
        "Fast shipping, great packaging, and most importantly - effective products. The herbal energy blend gives me natural energy without crashes.",
      product: "Natural Energy Blend",
      image: "/testimonials/james.jpg",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Customer Testimonials
            </h2>
            <p className="text-gray-600">
              See what our customers are saying about us
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Overall Rating */}
        <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-2xl text-yellow-400" />
              ))}
            </div>
            <span className="ml-3 text-3xl font-bold text-gray-900">4.9</span>
          </div>
          <p className="text-gray-600 font-medium">
            Based on 1000+ verified reviews
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-lime-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-green-600 text-xl mb-3 opacity-60" />
                <p className="text-gray-700 leading-relaxed mb-4 italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="bg-white rounded-lg px-3 py-2 inline-block">
                  <span className="text-sm font-medium text-green-600">
                    Purchased: {testimonial.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Start Your Wellness Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsModal;
