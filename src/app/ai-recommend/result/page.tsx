"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { Button } from "@/components/common";
import { useRecommendStore } from "@/store/recommendStore";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.scss";
import "swiper/css";

interface RecommendedItem {
  id: string;
  title: string;
  image: string;
  price: string;
  link: string;
  mallName: string;
}

export default function AiRecommendResultPage() {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const hasFetched = useRef(false);
  const { situation, preference, gender, budget, reset } = useRecommendStore();
  const [items, setItems] = useState<RecommendedItem[]>([]);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // StrictMode 이중 실행 방지
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchRecommendations = async () => {
      try {
        const res = await fetch("/api/ai-recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ situation, preference, gender, budget }),
        });
        const data = await res.json();
        setItems(data.items ?? []);
        setReason(data.reason ?? "");

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user && data.items?.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("recommendation_history").insert({
            user_id: user.id,
            situation,
            preferences: preference,
            gender,
            budget,
            recommended_feed_ids: data.items?.map((item: RecommendedItem) => item.id) ?? [],
            recommended_items: data.items ?? [],
            reason: data.reason,
          });
        }
      } catch (error) {
        console.error("추천 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentItem = items[activeIndex];

  const handleRetry = () => {
    reset();
    router.push("/ai-recommend?step=1");
  };

  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <section className={styles.result_section}>
          <div className={styles.result_title_box}>
            <h3 className={styles.result_title}>Find your Gift</h3>
            <p className={styles.result_description}>메종카도가 추천하는 제품이에요</p>
            {reason && <p className={styles.result_reason}>{reason}</p>}
          </div>

          {isLoading ? (
            <div className={styles.loading}>취향 저격 아이템 찾는 중...</div>
          ) : items.length === 0 ? (
            <div className={styles.loading}>
              <p>추천 결과를 가져오지 못했어요.</p>
              <Button variant="border-sm" onClick={handleRetry}>다시 시도하기</Button>
            </div>
          ) : (
            <div className={styles.result_contents}>
              <div className={styles.swiper_row}>
                <Button
                  variant="arrow-left"
                  onClick={() => swiperRef.current?.slidePrev()}
                />

                <Swiper
                  effect="cards"
                  grabCursor={true}
                  modules={[EffectCards]}
                  onSwiper={(swiper) => { swiperRef.current = swiper; }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="mySwiper"
                  style={{ overflow: "visible" }}
                >
                  {items.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Card
                        variant="product"
                        as="button"
                        onClick={() => window.open(item.link, "_blank")}
                        badge="recommend"
                        imageSrc={item.image}
                        imageAlt={item.title}
                        title={item.title}
                        price={item.price}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <Button
                  variant="arrow-right"
                  onClick={() => swiperRef.current?.slideNext()}
                />
              </div>

              <div className={styles.result_button_box}>
                <div className={styles.action_buttons}>
                  <Button variant="border-sm" onClick={handleRetry}>
                    다시 추천받기
                  </Button>
                  <Button
                    variant="background-black-sm"
                    onClick={() => currentItem && window.open(currentItem.link, "_blank")}
                  >
                    선물 자세히보기
                  </Button>
                </div>
                <Button variant="share-only" />
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
