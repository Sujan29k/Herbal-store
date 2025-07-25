"use client";
import styles from "@/styles/Dashboard.module.css";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>🌿 HerbalAdmin</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Customers</li>
            <li>Analytics</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Welcome back 👋</h1>
          <div className={styles.profile}>
            <input type="text" placeholder="Search..." />
            <Image
              src="/user-avatar.png"
              alt="User"
              width={36}
              height={36}
              className={styles.avatar}
            />
          </div>
        </header>

        <section className={styles.productsSection}>
          <h2>Featured Herbal Products</h2>
          <div className={styles.productGrid}>
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className={styles.card}>
                <Image
                  src={`/products/product-${id}.jpg`}
                  alt={`Product ${id}`}
                  width={200}
                  height={150}
                />
                <h3>Herbal Product {id}</h3>
                <p>Natural remedy for wellness.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
