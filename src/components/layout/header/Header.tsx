"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/ai-recommend", label: "선물추천받기" },
  { href: "/feed", label: "피드 둘러보기" },
  { href: "/fortune", label: "오늘의 운세" },
  { href: "/contact", label: "문의하기" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {/* Top Banner */}
      <div className={styles.top_banner}>
        <button className={styles.banner_button}>
          <svg className={styles.banner_icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span>New customers save 10% with code GET10</span>
        <button className={styles.banner_button}>
          <svg className={styles.banner_icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Main Header */}
      <div className={styles.main_header}>
        <div className={styles.header_container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            MAISON CADEAU
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.nav_link} ${pathname === item.href ? styles.nav_link_active : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className={styles.icon_group}>
            <button className={styles.icon_button}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/login" className={styles.icon_button}>
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
