"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/button";
import { createClient } from "@/lib/supabase/client";
import styles from "./FortuneCookie.module.scss";

interface FortuneMessage {
  id: number;
  type: "love" | "luck" | "gift" | "friendship" | "growth";
  message: string;
  sub_message?: string;
}

const FORTUNE_MESSAGES: FortuneMessage[] = [
  { id: 1, type: "gift", message: "오늘은 소중한 사람에게 마음을 전하기 좋은 날이에요.", sub_message: "작은 선물 하나가 큰 기쁨이 됩니다." },
  { id: 2, type: "gift", message: "작은 선물 하나가 큰 기쁨을 만들어낼 거예요.", sub_message: "당신의 센스를 믿어보세요." },
  { id: 3, type: "luck", message: "뜻밖의 좋은 소식이 찾아올 것입니다.", sub_message: "오늘 하루 기대해도 좋아요." },
  { id: 4, type: "love", message: "진심 어린 말 한마디가 누군가의 하루를 바꿔줄 수 있어요.", sub_message: "용기 내어 전해보세요." },
  { id: 5, type: "growth", message: "오늘의 노력이 내일의 행복으로 돌아옵니다.", sub_message: "꾸준함이 빛을 발하는 날이에요." },
  { id: 6, type: "friendship", message: "오래된 친구에게 연락해보는 건 어떨까요?", sub_message: "반가운 재회가 기다리고 있어요." },
  { id: 7, type: "gift", message: "받는 사람보다 주는 사람이 더 행복한 하루가 될 거예요.", sub_message: "선물할 누군가를 떠올려보세요." },
  { id: 8, type: "luck", message: "오늘은 새로운 시작을 위한 최적의 날입니다.", sub_message: "망설임은 잠시 내려두어요." },
  { id: 9, type: "love", message: "사랑하는 사람과의 시간이 가장 소중한 선물이에요.", sub_message: "오늘 함께할 계획을 세워보세요." },
  { id: 10, type: "friendship", message: "당신 주변의 따뜻한 인연들을 소중히 여기세요.", sub_message: "좋은 관계가 행운을 부릅니다." },
  { id: 11, type: "growth", message: "작은 변화가 큰 결실로 이어지는 날이에요.", sub_message: "한 걸음씩, 충분합니다." },
  { id: 12, type: "luck", message: "오늘 당신의 선택은 모두 좋은 방향으로 흘러갈 거예요.", sub_message: "자신을 믿어도 좋아요." },
  { id: 13, type: "gift", message: "정성이 담긴 선물은 어떤 말보다 강하게 전달됩니다.", sub_message: "마음을 담아 고르면 충분해요." },
  { id: 14, type: "love", message: "오늘은 고마운 마음을 표현하기 딱 좋은 날이에요.", sub_message: "작은 감사가 큰 감동이 됩니다." },
  { id: 15, type: "luck", message: "기다리던 좋은 일이 곧 당신에게 찾아올 거예요.", sub_message: "조금만 더 기다려보세요." },
  { id: 16, type: "friendship", message: "누군가에게 먼저 손 내밀어 보는 날이에요.", sub_message: "당신의 따뜻함이 빛날 거예요." },
  { id: 17, type: "growth", message: "오늘의 고민은 내일의 성장으로 이어집니다.", sub_message: "지금 이 순간도 충분히 잘하고 있어요." },
  { id: 18, type: "gift", message: "선물을 고를 때의 설렘이 전해지는 날이에요.", sub_message: "그 마음이 가장 좋은 선물입니다." },
  { id: 19, type: "luck", message: "예상치 못한 즐거운 만남이 기다리고 있어요.", sub_message: "오늘 외출하면 좋은 일이 생겨요." },
  { id: 20, type: "love", message: "소중한 사람에게 '사랑해'라고 말하기 좋은 날이에요.", sub_message: "말로 전하는 마음도 선물이에요." },
];

const STORAGE_KEY = "fortune_today";

interface StoredFortune {
  date: string;
  fortune: FortuneMessage;
}

function hashFortune(seed: string, length: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % length;
  }
  return Math.abs(hash);
}

function getTodayString() {
  return new Date().toISOString().slice(0, 10); // "2026-03-29"
}

export const FortuneCookie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFortune, setShowFortune] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [fortune, setFortune] = useState<FortuneMessage | null>(null);
  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [userId, setUserId] = useState<string>("guest");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  useEffect(() => {
    const today = getTodayString();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: StoredFortune = JSON.parse(stored);
      if (parsed.date === today) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFortune(parsed.fortune);
         
        setAlreadyOpened(true);
         
        setIsOpen(true);
         
        setShowFortune(true);
      }
    }
  }, []);

  const handleOpen = () => {
    if (isOpen || isShaking) return;

    const today = getTodayString();
    const seed = userId + today;
    const idx = hashFortune(seed, FORTUNE_MESSAGES.length);
    const selected = FORTUNE_MESSAGES[idx];

    setFortune(selected);
    setIsShaking(true);

    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
    }, 700);

    setTimeout(() => {
      setShowFortune(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, fortune: selected }));
    }, 1200);
  };

  return (
    <div className={styles.wrapper}>
      {alreadyOpened && (
        <p className={styles.already_label}>오늘의 운세를 이미 확인했어요</p>
      )}

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

      <div className={styles.fortune_area}>
        <AnimatePresence>
          {showFortune && fortune && (
            <motion.div
              className={styles.fortune_paper}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className={styles.fortune_text}>{fortune.message}</p>
              {fortune.sub_message && (
                <p className={styles.fortune_sub}>{fortune.sub_message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
        </AnimatePresence>
      </div>
    </div>
  );
};
