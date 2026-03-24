"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecommendStore } from "@/store/recommendStore";
import styles from "./DevTestSection.module.scss";

export const DevTestSection = () => {
  const router = useRouter();
  const { setAnswer } = useRecommendStore();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("dev_isLoggedIn") === "true"
  );

  const toggleLogin = () => {
    const next = !isLoggedIn;
    localStorage.setItem("dev_isLoggedIn", String(next));
    setIsLoggedIn(next);
    window.location.reload();
  };

  const testRecommendResult = () => {
    setAnswer("situation", "생일");
    setAnswer("preference", "실용적인");
    setAnswer("gender", "여성");
    setAnswer("budget", "3-5만원");
    router.push("/ai-recommend/result");
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>테스트 도구</h2>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${isLoggedIn ? styles.button_active : ""}`}
          onClick={toggleLogin}
        >
          {isLoggedIn ? "🟢 로그인 상태 (클릭 시 로그아웃)" : "⚪ 비로그인 상태 (클릭 시 로그인)"}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={testRecommendResult}
        >
          🎁 추천결과 페이지 테스트
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => router.push("/my-page")}
        >
          👤 마이페이지 테스트
        </button>
      </div>
    </div>
  );
};
