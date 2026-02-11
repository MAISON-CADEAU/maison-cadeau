"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, UserIcon } from "@/components/common";
import styles from "./Header.module.scss";
import "swiper/css";

const navItems = [
  { href: "/recommendation", label: "선물추천받기" },
  { href: "/feed", label: "피드 둘러보기" },
  { href: "/fortune", label: "오늘의 운세" },
  { href: "/inquiry", label: "문의하기" },
];

const bannerMessages = [
  "New customers save 10% with code GET10",
  "Free shipping on orders over $50",
  "Limited time offer: Buy 2 Get 1 Free",
];

interface HeaderProps {
  theme?: "light" | "dark";
  isLoggedIn?: boolean;
}

export const Header = ({ theme = "dark", isLoggedIn = false }: HeaderProps) => {
  const pathname = usePathname();
  const isDarkTheme = theme === "dark";
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <>
      <header className={`${styles.header} ${isDarkTheme ? styles.dark : styles.light}`}>
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
          <h1 className={styles.logo}>
            <Link href="/">
              <Image
                src={isDarkTheme ? "/logo/logo-dark.svg" : "/logo/logo-light.svg"}
                alt="MAISON CADEAU"
                width={292}
                height={25}
                priority
              />
            </Link>
          </h1>

          {/* Navigation & Icons */}
          <div className={styles.nav_wrapper}>
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
              <button
                className={styles.icon_button}
                aria-label="Search"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <SearchIcon size={20} color={isDarkTheme ? "#ffffff" : "#1b1b1b"} />
              </button>
              <Link
                href={isLoggedIn ? "/my-page" : "/login"}
                className={styles.icon_button}
                aria-label="User profile"
              >
                <UserIcon size={20} color={isDarkTheme ? "#ffffff" : "#1b1b1b"} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className={styles.modal_overlay} onClick={() => setIsSearchModalOpen(false)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modal_text}>서비스 준비 중입니다.</p>
            <button
              className={styles.modal_button}
              onClick={() => setIsSearchModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};
