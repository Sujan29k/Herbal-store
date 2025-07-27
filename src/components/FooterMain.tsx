import React from "react";
import "@/styles/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function FooterMain() {
  return (
    <div className="footer-main">
      <div className="footer-columns">
        <div>
          <h3 className="text-black">Library</h3>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-black">Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Feedback Form</a>
            </li>
            <li>
              <a href="#">Our Products</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-black">Contact Us</h3>
          <p>
            <strong>Herbal Store</strong>
            <br />
            Herbal Store
          </p>
          <p>
            <strong>Location:</strong> Kalikanagar, Butwal
          </p>
          <p>
            <strong>Tel.:</strong> 061-470457, 470463
          </p>
          <p>
            <strong>E-mail:</strong> pramod123abcdz@gmail.com
          </p>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Facebook" className="text-blue-600 text-2xl">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Instagram" className="text-pink-500 text-2xl">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter" className="text-blue-400 text-2xl">
            <FaTwitter />
          </a>
          <a href="#" aria-label="WhatsApp" className="text-green-500 text-2xl">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
}
