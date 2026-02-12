"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input, Textarea, Checkbox, validateEmail, validatePassword } from "@/components/common/input";
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

  // Email validation state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Password validation state
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Header theme change on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(`.${styles.hero_section}`);
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setHeaderTheme(heroBottom > 0 ? "dark" : "light");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length === 0) {
      setEmailError("");
      setIsEmailValid(false);
    } else if (!validateEmail(value)) {
      setEmailError("메일주소 형식으로 입력해주세요");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length === 0) {
      setPasswordError("");
      setIsPasswordValid(false);
    } else if (!validatePassword(value)) {
      setPasswordError("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  return (
    <>
      <Header theme={headerTheme} />
      <main className={styles.main}>
        <section className={styles.hero_section}>
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

          {/* Input Component */}
          <section className={styles.component_section}>
            <h2 className={styles.section_title}>Input Component</h2>

            <div className={styles.input_showcase}>
              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>이메일</h3>
                <Input
                  type="email"
                  variant="default"
                  placeholder="메일주소를 입력해주세요"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  isValid={isEmailValid}
                />
              </div>

              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>비밀번호</h3>
                <Input
                  type="password"
                  variant="default"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  isValid={isPasswordValid}
                />
              </div>

              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>검색</h3>
                <Input
                  variant="search"
                  placeholder="찾고싶은 선물을 검색해보세요"
                />
              </div>

              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>회색 배경</h3>
                <Input variant="grey" placeholder="글자를 입력해주세요" />
              </div>

              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>체크박스</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Checkbox label="체크박스 옵션 1" />
                  <Checkbox label="체크박스 옵션 2" defaultChecked />
                  <Checkbox label="체크박스 옵션 3" />
                </div>
              </div>

              <div className={styles.input_group}>
                <h3 className={styles.input_group_title}>Textarea</h3>
                <Textarea placeholder="글자를 입력해주세요" rows={6} />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
