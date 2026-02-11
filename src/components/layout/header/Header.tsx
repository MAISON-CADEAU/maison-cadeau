"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/common";
import styles from "./Header.module.scss";
import "swiper/css";

const navItems = [
  { href: "/ai-recommend", label: "선물추천받기" },
  { href: "/feed", label: "피드 둘러보기" },
  { href: "/fortune", label: "오늘의 운세" },
  { href: "/contact", label: "문의하기" },
];

const bannerMessages = [
  "New customers save 10% with code GET10",
  "Free shipping on orders over $50",
  "Limited time offer: Buy 2 Get 1 Free",
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      {/* Top Banner */}
      <div className={styles.top_banner}>
        <button className={`${styles.banner_button} swiper-button-prev-custom`} aria-label="Previous banner">
          <ChevronLeftIcon size={16} color="rgba(255, 255, 255, 0.7)" />
        </button>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className={styles.banner_swiper}
        >
          {bannerMessages.map((message, index) => (
            <SwiperSlide key={index}>
              <span className={styles.banner_text}>{message}</span>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={`${styles.banner_button} swiper-button-next-custom`} aria-label="Next banner">
          <ChevronRightIcon size={16} color="rgba(255, 255, 255, 0.7)" />
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
