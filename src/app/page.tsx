"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/common/button";
import * as Icons from "@/components/common/icons";
import styles from "./page.module.scss";

const iconList = [
  { name: "ArrowDownLeft", Component: Icons.ArrowDownLeftIcon },
  { name: "ArrowLeft", Component: Icons.ArrowLeftIcon },
  { name: "ArrowRight", Component: Icons.ArrowRightIcon },
  { name: "Box", Component: Icons.BoxIcon },
  { name: "Cart", Component: Icons.CartIcon },
  { name: "Chat", Component: Icons.ChatIcon },
  { name: "CheckLg", Component: Icons.CheckLgIcon },
  { name: "CheckSm", Component: Icons.CheckSmIcon },
  { name: "ChevronDown", Component: Icons.ChevronDownIcon },
  { name: "ChevronLeft", Component: Icons.ChevronLeftIcon },
  { name: "ChevronRight", Component: Icons.ChevronRightIcon },
  { name: "ChevronUp", Component: Icons.ChevronUpIcon },
  { name: "Close", Component: Icons.CloseIcon },
  { name: "Data", Component: Icons.DataIcon },
  { name: "Edit", Component: Icons.EditIcon },
  { name: "Facebook", Component: Icons.FacebookIcon },
  { name: "Filter", Component: Icons.FilterIcon },
  { name: "FolderPlus", Component: Icons.FolderPlusIcon },
  { name: "Grid", Component: Icons.GridIcon },
  { name: "Heart", Component: Icons.HeartIcon },
  { name: "InstaBlack", Component: Icons.InstaBlackIcon },
  { name: "InstaWhite", Component: Icons.InstaWhiteIcon },
  { name: "Kakao", Component: Icons.KakaoIcon },
  { name: "List", Component: Icons.ListIcon },
  { name: "Menu", Component: Icons.MenuIcon },
  { name: "Minus", Component: Icons.MinusIcon },
  { name: "Plus", Component: Icons.PlusIcon },
  { name: "Search", Component: Icons.SearchIcon },
  { name: "Share", Component: Icons.ShareIcon },
  { name: "Trash", Component: Icons.TrashIcon },
  { name: "Truck", Component: Icons.TruckIcon },
  { name: "Twitter", Component: Icons.TwitterIcon },
  { name: "User", Component: Icons.UserIcon },
];

export default function Home() {
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState("#17171B");
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(`.${styles.hero_section}`);
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Hero section이 화면을 벗어나면 light 테마로 변경
        setHeaderTheme(heroBottom > 76 ? "dark" : "light");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header theme={headerTheme} />
      <main className={styles.main}>
        <section  className={styles.hero_section}>
          <h2 className={styles.hero_title}>Find your Gift</h2>
        </section>

        <div className={styles.container}>
          <div className={styles.title_box}>
            <h3 className={styles.page_title}>Component Library</h3>
            <p className={styles.page_description}>
              모든 공통 컴포넌트를 확인할 수 있습니다
            </p>
          </div>

          {/* Icons Component */}
          <section className={styles.component_section}>
            <h2 className={styles.section_title}>Icons Component</h2>

            <div className={styles.icon_controls}>
              <div className={styles.icon_control}>
                <label className={styles.control_label}>Size: {iconSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className={styles.range_input}
                />
              </div>
              <div className={styles.icon_control}>
                <label className={styles.control_label}>Color: {iconColor}</label>
                <input
                  type="color"
                  value={iconColor}
                  onChange={(e) => setIconColor(e.target.value)}
                  className={styles.color_input}
                />
              </div>
            </div>

            <div className={styles.icon_grid}>
              {iconList.map(({ name, Component }) => (
                <div key={name} className={styles.icon_item}>
                  <div className={styles.icon_wrapper}>
                    <Component size={iconSize} color={iconColor} />
                  </div>
                  <span className={styles.icon_name}>{name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Button Component */}
          <section className={styles.component_section}>
            <h2 className={styles.section_title}>Button Component</h2>

            <div className={styles.button_showcase}>
              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>1. Icon Group Buttons</h3>
                <Button variant="icon-group" />
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>2. Arrow Buttons</h3>
                <div className={styles.background_button_box}>
                  <Button variant="black-arrow-left" />
                  <Button variant="black-arrow-right" />
                  <Button variant="red-arrow-left" />
                  <Button variant="red-arrow-right" />
                </div>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>3. House Button</h3>
                <Button variant="house">집들이 선물</Button>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>4. Primary Buttons</h3>
                  <Button variant="primary-filled">바로 선물하기</Button>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>5. Secondary Buttons</h3>
                  <div className={styles.background_button_box}>
                    <Button variant="background-gray">이 질문은 넘어갈래요</Button>
                    <Button variant="background-black-sm">포춘쿠키 열기</Button>
                    <Button variant="background-black-lg">로그인하기</Button>
                    <Button variant="background-black-xl">다음</Button>
                  </div>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>6. Kakao Button</h3>
                <Button variant="kakao">카카오 로그인</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
