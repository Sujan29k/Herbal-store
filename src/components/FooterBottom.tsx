import React from "react";

export default function FooterBottom() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-lime-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-emerald-100 text-sm">
            © 2025 | Herbal Nepal | All rights reserved.
          </p>
          <p className="text-emerald-100 text-sm">
            Developed By:&nbsp;
            <a
              href="https://github.com/Sujan29k"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-200 transition-colors duration-200 font-medium"
            >
              Sujan Kharel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
