"use client";
import styles from "@/styles/Auth.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <button className={styles.button}>Sign in</button>
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
