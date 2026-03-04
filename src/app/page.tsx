"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/common/button";
import { Banner } from "@/components/common/banner";
import { Input, Textarea, Checkbox, validateEmail, validatePassword } from "@/components/common/input";
import { Card } from "@/components/common/card";
import * as Icons from "@/components/common/icons";
import styles from "./page.module.scss";
import { SwiperSection } from "@/components/common/swiper/Swiper";


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
  // gender card
  const [activeGender, setActiveGender] = useState<"female" | "male" | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(`.${styles.hero_section}`);
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setHeaderTheme(heroBottom > 76 ? "dark" : "light");
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
        <section  className={styles.hero_section}>
          <h2 className={styles.hero_title}><span>F</span>ind your Gift</h2>
        </section>

        <div className={styles.container}>
          <div className={styles.title_box}>
            <h3 className={styles.page_title}>Component Library</h3>
            <p className={styles.page_description}>
              모든 공통 컴포넌트를 확인할 수 있습니다
            </p>
          </div>

        {/* Banner Component - overlay 버전 */}
          <Banner
            layout="overlay"
            title="Find your Gift"
            description="선물할 상대를 생각하며 키워드를 골라보세요"
            image={{ src: "/imgs/banner-image-overlay.png", alt: "Banner Image" }}
            />

        {/* Banner Component - cta ver.1 */}
        <Banner
            layout="cta"
            title="What's your favorite"
            description="찾아볼 필요 없어요"
            image={{ src: "/imgs/banner-image-cta.png", alt: "Banner Image" }}
            cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
          />
        {/* Banner Component - cta ver.2 */}
          <Banner
            layout="cta"
            title="What's your favorite"
            description="취향을 온전히 담아 드려요"
            align="left"
            cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
          />

        {/* swiper Component */}
                  <SwiperSection
                    text="gift"
                    title="지금 딱 보내기 좋은 |카카오톡 선물하기 5"
                    images={[
                      "/imgs/swiper_1.png",
                      "/imgs/swiper_2.png",
                      "/imgs/swiper_3.png",
                      "/imgs/swiper_4.png",
                    ]}
                    date="2024.01.01"
                    brand="Maison Cadeau"
                  />

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
                <div style={{ display: "flex", gap: "16px" }}>
                  <Button variant="arrow-left_bg" />
                  <Button variant="arrow-right_bg" />
                  <Button variant="arrow-left" />
                  <Button variant="arrow-right"/>
                </div>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>3. House Button</h3>
                <Button variant="house">집들이 선물</Button>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>4. Primary Buttons</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Button variant="primary">바로 선물하기</Button>
                </div>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>5. Secondary Buttons</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Button variant="background-gray">이 질문은 넘어갈래요</Button>
                  <Button variant="background-black-sm">다음 질문으로</Button>
                </div>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>6. Kakao Button</h3>
                <Button variant="kakao">카카오 로그인</Button>
              </div>
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

          {/* Card Component */}
          <section className={styles.component_section}>
            <h2 className={styles.section_title}>Card Component</h2>
            {/* grnder card */}
              <div className={styles.card_gender_group}>
              <Card
                  variant="gender"
                  as="button"
                  isActive={activeGender === "female"}
                  onClick={() => setActiveGender("female")}
                  title="여성"
                  icon={<Icons.FemaleIcon width={100} height={100}/>}
                />
              <Card
                  variant="gender"
                  as="button"
                  isActive={activeGender === "male"}
                  onClick={() => setActiveGender("male")}
                  title="남성"
                  icon={<Icons.MaleIcon width={100} height={100}/>}
                />
              </div>
              {/* product card */}
                <Card
                  variant="product"
                  as="button"
                  onClick={() => {}}
                  badge="NEW"
                  imageSrc="/imgs/product_image.png"
                  imageAlt="아누 고블렛 도자기 잔"
                  title="아누 고블렛 도자기 잔"
                  price="29,000원"
                  
                />
              {/* cta card - text */}
                <Card
                  variant="cta"
                  ctaType="text"
                  as="a"
                  link={{ href: "/about" }}
                  title="문의하기"
                  description="선물 입점 | 선물 관련 문의함입니다"
                  width={349}
                  height={160}
                />
              {/* cta */}
                <Card
                  variant="cta"
                  ctaType="icon"
                  as="a"
                  link={{ href: "/", target: "_blank" }}
                  imageSrc="/imgs/profile.png"
                  imageAlt="profile"
                  title="맛있는당근님"
                  icon={<Icons.EditPencilIcon />}
                  description="내 정보 수정하기"
                  width={349}
                  height={144}
                />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}