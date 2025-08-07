"use client";

import React from "react";
import {
  FaTimes,
  FaLeaf,
  FaShieldAlt,
  FaTruck,
  FaAward,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              About Our Herbal Store
            </h2>
            <p className="text-gray-600">
              Discover the power of nature&apos;s healing
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Our Story */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FaLeaf className="text-green-600 mr-3" />
            Our Story
          </h3>
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2020, our herbal store began as a passion project to
              bring the ancient wisdom of herbal medicine to modern wellness
              seekers. We believe that nature holds the key to optimal health
              and well-being.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our journey started when our founder, after struggling with
              chronic health issues, discovered the transformative power of
              herbal remedies. This personal experience ignited a mission to
              share these natural solutions with others seeking alternative
              paths to wellness.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            What Makes Us Different
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quality Sourcing */}
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="bg-blue-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Premium Quality
              </h4>
              <p className="text-gray-600 text-sm">
                We source our herbs from certified organic farms and conduct
                rigorous quality testing for purity and potency.
              </p>
            </div>

            {/* Expert Curation */}
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="bg-purple-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Expert Curation
              </h4>
              <p className="text-gray-600 text-sm">
                Our products are carefully selected by herbalists and wellness
                experts with decades of experience.
              </p>
            </div>

            {/* Global Reach */}
            <div className="bg-orange-50 rounded-2xl p-6 text-center">
              <div className="bg-orange-600 text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaGlobe className="text-2xl" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Global Heritage
              </h4>
              <p className="text-gray-600 text-sm">
                We combine traditional wisdom from various cultures with modern
                scientific research.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Our Promise to You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <FaShieldAlt />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Safety First</h4>
                <p className="text-gray-600 text-sm">
                  All our products undergo extensive testing for contaminants,
                  heavy metals, and microbials to ensure your safety.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <FaTruck />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Fast & Secure Delivery
                </h4>
                <p className="text-gray-600 text-sm">
                  Your products are carefully packaged and delivered quickly
                  while maintaining their potency and freshness.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <FaLeaf />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">100% Natural</h4>
                <p className="text-gray-600 text-sm">
                  No artificial additives, preservatives, or chemicals - just
                  pure, natural ingredients as nature intended.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                <FaUsers />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-gray-600 text-sm">
                  Our team of herbalists and wellness experts is always
                  available to guide you on your wellness journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-green-600 to-lime-600 rounded-2xl p-8 text-white mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-100">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-green-100">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-green-100">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Wellness Journey?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied customers who have transformed their
            health with our natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Explore Products
            </button>
            <button
              onClick={onClose}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
