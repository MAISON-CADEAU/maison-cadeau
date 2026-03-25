"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon, UserIcon } from "@/components/common";
import type { IHeaderProps } from "./Header.types";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import "swiper/css";

const navItems = [
  { href: "/ai-recommend", label: "선물추천받기" },
  { href: "/feed", label: "피드 둘러보기" },
  { href: "/fortune", label: "오늘의 운세" },
  { href: "/inquiry", label: "문의하기" },
];

const bannerMessages = [
  "New customers save 10% with code GET10",
  "Free shipping on orders over $50",
  "Limited time offer: Buy 2 Get 1 Free",
];

export const Header = ({ theme = "dark", isLoggedIn = false, profileImageSrc = "/imgs/avatar-default.png" }: IHeaderProps) => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const router = useRouter();
  const [supabaseLoggedIn, setSupabaseLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const devLogin = typeof window !== "undefined" ? localStorage.getItem("dev_isLoggedIn") === "true" : false;
  const effectiveIsLoggedIn = isLoggedIn || devLogin || supabaseLoggedIn;

  useEffect(() => {
    const supabase = createClient();
    const applyUser = (user: { user_metadata?: Record<string, string> } | null) => {
      if (!user) return;
      setSupabaseLoggedIn(true);
      const name = user.user_metadata?.name || user.user_metadata?.full_name || "";
      setUserName(name);
    };
    supabase.auth.getUser().then(({ data: { user } }) => applyUser(user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseLoggedIn(!!session);
      applyUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (theme !== "dark") return;

    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setScrolledPastHero(window.scrollY >= window.innerHeight - headerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const effectiveTheme = theme === "dark" && scrolledPastHero ? "light" : theme;
  const isDarkTheme = effectiveTheme === "dark";

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setSupabaseLoggedIn(false);
    setShowUserMenu(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header ref={headerRef} className={`${styles.header} ${isDarkTheme ? styles.dark : styles.light}`}>
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
              {effectiveIsLoggedIn ? (
                <div className={styles.user_menu_wrapper}>
                  <button
                    className={styles.icon_button}
                    aria-label="User profile"
                    onClick={() => setShowUserMenu((prev) => !prev)}
                  >
                    <div className={`${styles.profile_avatar} ${isDarkTheme ? styles.profile_avatar_dark : styles.profile_avatar_light}`}>
                      {userName.charAt(0).toUpperCase() || "U"}
                    </div>
                  </button>
                  {showUserMenu && (
                    <>
                      <div className={styles.user_menu_overlay} onClick={() => setShowUserMenu(false)} />
                      <div className={`${styles.user_menu} ${isDarkTheme ? styles.user_menu_dark : styles.user_menu_light}`}>
                        <span className={styles.user_menu_name}>{userName}</span>
                        <hr className={styles.user_menu_divider} />
                        <Link href="/my-page" className={styles.user_menu_item} onClick={() => setShowUserMenu(false)}>
                          마이페이지
                        </Link>
                        <button className={`${styles.user_menu_item} ${styles.user_menu_logout}`} onClick={handleLogout}>
                          로그아웃
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className={styles.icon_button} aria-label="User profile">
                  <UserIcon size={20} color={isDarkTheme ? "#ffffff" : "#1b1b1b"} />
                </Link>
              )}
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
