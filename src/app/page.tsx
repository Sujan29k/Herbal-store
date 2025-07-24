"use client";
import React from "react";
import styles from "@/styles/Home.module.css";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <div className={styles.imageContainer}>
          <img src="/herbal-product.jpg" alt="Herbal products" />
        </div>
        <div className={styles.textContainer}>
          <h2>
            Say no to limiting education <br />
            <span>by financial barriers.</span>
          </h2>
          <p>
            Your donation doesn't just fund studies; it's a catalyst for dreams,
            empowering aspiring scholars. Together, we break barriers, shape
            futures, and foster knowledge.
          </p>
        </div>
      </div>

      {/* Explore Products CTA */}
      <div className={styles.exploreSection}>
        <button>Explore Products</button>
      </div>
    </section>
  );
};

export default HeroSection;
