"use client";
import styles from "@/styles/Auth.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Account created! Please log in.");
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <div className={styles.leftPane}>
          <Image src="/herbal.avif" alt="study" width={300} height={300} />
          <h2>Exam Mastery Hub</h2>
          <p>Create your account and start mastering exams.</p>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.logo}>MASTERY HUB</div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button className={styles.button} onClick={handleSignup}>
            Create Account
          </button>
          <button className={styles.googleBtn}>
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Sign up with Google
          </button>
          <div className={styles.altText}>
            Already have an account? <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
