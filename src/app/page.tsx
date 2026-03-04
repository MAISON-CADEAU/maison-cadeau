"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/common/button";
import { Input, Textarea, Checkbox, validateEmail, validatePassword } from "@/components/common/input";
import * as Icons from "@/components/common/icons";
import styles from "./page.module.scss";
import { Modal } from "@/components/common/modal";

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

  // Modal state
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFeeds, setSelectedFeeds] = useState<number[]>([]);

  const toggleFeed = (index: number) => {
    setSelectedFeeds((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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

          {/* Modal Component */}
          <section className={styles.component_section}>
            <h2 className={styles.section_title}>Modal Component</h2>

            <div className={styles.button_showcase}>
              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>1. feed Modal</h3>
                <Button variant="background-black-sm" onClick={() => setIsFeedOpen(true)}>
                  feed 모달 열기
                </Button>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>2. default Modal</h3>
                <Button variant="background-black-sm" onClick={() => setIsDefaultOpen(true)}>
                  default 모달 열기
                </Button>
              </div>

              <div className={styles.button_group}>
                <h3 className={styles.button_group_title}>3. alert Modal</h3>
                <Button variant="background-black-sm" onClick={() => setIsAlertOpen(true)}>
                  alert 모달 열기
                </Button>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />

      <Modal
        variant="feed"
        isOpen={isFeedOpen}
        title="피드 추가하기"
        onClose={() => setIsFeedOpen(false)}
        onComplete={() => setIsFeedOpen(false)}
      >
        <div className={styles.feed_grid}>
          {Array.from({ length: 8 }, (_, i) => i).map((index) => {
            const isSelected = selectedFeeds.includes(index);
            return (
              <div
                key={index}
                className={`${styles.feed_item} ${isSelected ? styles.feed_item_selected : ""}`}
                onClick={() => toggleFeed(index)}
              >
                <img
                  src={`/imgs/feed-${index + 1}.png`}
                  alt={`feed-${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {isSelected && <div className={styles.feed_overlay} />}
                {isSelected && (
                  <div className={styles.feed_check_badge}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      <Modal
        variant="default"
        isOpen={isDefaultOpen}
        title="새 컬렉션"
        onClose={() => setIsDefaultOpen(false)}
      >
        <div className={styles.modal_input_group}>
          <span className={styles.modal_input_title}>제목</span>
          <Input variant="grey" placeholder="제목을 입력해주세요" />
        </div>

        <div>
        <Button variant="background-black-xl" onClick={() => setIsDefaultOpen(false)}>다음</Button>
        </div>
      </Modal>

      <Modal
        variant="alert"
        isOpen={isAlertOpen}
        title="피드가 완성되었습니다."
        onClose={() => setIsAlertOpen(false)}
      >
        <Button variant="background-black-sm" onClick={() => setIsAlertOpen(false)}>확인</Button>
      </Modal>
    </>
  );
}