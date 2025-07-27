"use client";

import styles from "@/styles/Auth.module.css";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      localStorage.removeItem("guest");
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGuest = () => {
    localStorage.setItem("guest", "true");
    router.push("/dashboard");
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <div className={styles.leftPane}>
          <Image src="/herbal.avif" alt="study" width={300} height={300} />
          <h2>Exam Mastery Hub</h2>
          <p>Log in to continue your learning journey.</p>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.logo}>MASTERY HUB</div>
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
          <button className={styles.button} onClick={handleLogin}>
            Sign in
          </button>

          <button
            onClick={handleGuest}
            className={`${styles.button} mt-2 bg-gray-500 hover:bg-gray-600`}
          >
            Continue as Guest
          </button>

          <button className={styles.googleBtn}>
            <Image src="/google.png" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>

          <div className={styles.altText}>
            Are you new? <Link href="/signup">Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
