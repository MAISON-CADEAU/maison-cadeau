"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/button";
import styles from "./FortuneCookie.module.scss";

// TODO: Supabase 연동 후 날짜별 운세 데이터로 교체
const FORTUNE_MESSAGES = [
  "오늘은 소중한 사람에게 마음을 전하기 좋은 날입니다.",
  "작은 선물 하나가 큰 기쁨을 만들어낼 거예요.",
  "오늘의 노력이 내일의 행복으로 돌아옵니다.",
  "뜻밖의 좋은 소식이 찾아올 것입니다.",
  "진심 어린 말 한마디가 누군가의 하루를 바꿔줄 수 있어요.",
];

const getRandomFortune = () =>
  FORTUNE_MESSAGES[Math.floor(Math.random() * FORTUNE_MESSAGES.length)];

export const FortuneCookie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [fortune, setFortune] = useState("");

  const handleOpen = () => {
    if (isOpen || isShaking) return;
    setFortune(getRandomFortune());
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
    }, 700);
    setTimeout(() => setShowFortune(true), 1200);
  };

  const handleReset = () => {
    setShowFortune(false);
    setTimeout(() => {
      setIsOpen(false);
      setFortune("");
    }, 300);
  };

  return (
    <div className={styles.wrapper}>
      {/* 쿠키 원 */}
      <motion.div
        className={styles.cookie_area}
        animate={isShaking ? {
          rotate: [0, -10, 10, -10, 10, -5, 5, 0],
          scale: [1, 1.06, 1.06, 1.06, 1.06, 1.02, 1.02, 1],
        } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        onClick={!isOpen && !isShaking ? handleOpen : undefined}
        style={{ cursor: !isOpen && !isShaking ? "pointer" : "default" }}
        whileHover={!isOpen && !isShaking ? { scale: 1.02 } : {}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? "open" : "closed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Image
              src={isOpen ? "/imgs/cookie-open.png" : "/imgs/cookie-unopen.png"}
              alt={isOpen ? "열린 포춘쿠키" : "포춘쿠키"}
              width={160}
              height={160}
              className={styles.cookie_img}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 운세 텍스트 — 고정 높이 영역 */}
      <div className={styles.fortune_area}>
        <AnimatePresence>
          {showFortune && (
            <motion.div
              className={styles.fortune_paper}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className={styles.fortune_text}>{fortune}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 버튼 — 고정 높이 영역 */}
      <div className={styles.button_area}>
        <AnimatePresence mode="wait">
          {!isOpen && !isShaking && (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="background-black-sm" onClick={handleOpen}>
                포춘쿠키 열기
              </Button>
            </motion.div>
          )}
          {isOpen && showFortune && (
            <motion.div
              key="reset"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="background-black-sm" onClick={handleReset}>
                다시 뽑기
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
