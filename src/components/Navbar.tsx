"use client";
import Link from "next/link";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">HerbalStore 🌿</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/dashboard">Products</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/signup">signup</Link>
        </li>
      </ul>
    </nav>
  );
}
