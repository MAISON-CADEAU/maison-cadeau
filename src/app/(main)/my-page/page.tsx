"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { EditPencilIcon } from "@/components/common/icons";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.scss";

const MENU_CARDS = [
  {
    title: "추천선물 다시보기",
    description: "추천받은 선물들을 다시 볼 수 있어요",
    href: "/my-page/recommendations",
  },
  {
    title: "오늘의 운세",
    description: "오늘의 운세를 확인해보세요",
    href: "/fortune",
  },
  {
    title: "선물 보관함",
    description: "스크랩했던 선물리스트를 다시 확인할 수 있어요",
    href: "/my-page/saved",
  },
  {
    title: "문의하기",
    description: "선물 입점 | 선물 관련 문의합니다",
    href: "/inquiry",
  },
];

export default function MyPage() {
  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const name =
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "";
      setUserName(name);
      const avatar =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;
      setProfileImageUrl(avatar);
    });
  }, []);

  const avatarLetter = userName.charAt(0).toUpperCase() || "U";

  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>마이페이지</h1>

          <div className={styles.content}>
            {/* 프로필 카드 */}
            <Link href="/my-page/edit" className={styles.profile_card}>
              <div className={styles.profile_card_inner}>
                {/* 아바타 */}
                <div className={styles.profile_avatar_wrap}>
                  {profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt="프로필 이미지"
                      fill
                      sizes="80px"
                      className={styles.profile_avatar_img}
                    />
                  ) : (
                    <span className={styles.profile_avatar_letter}>
                      {avatarLetter}
                    </span>
                  )}
                </div>

                {/* 이름 + 수정 링크 */}
                <div className={styles.profile_body}>
                  <span className={styles.profile_name}>{userName || "사용자"}</span>
                  <div className={styles.profile_edit}>
                    <EditPencilIcon size={14} />
                    <span className={styles.profile_edit_text}>내 정보 수정하기</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className={styles.menu_grid}>
              {MENU_CARDS.map((card) => (
                <Card
                  key={card.href}
                  as="a"
                  variant="cta"
                  ctaType="text"
                  title={card.title}
                  description={card.description}
                  link={{ href: card.href }}
                  width={421}
                  height={144}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
