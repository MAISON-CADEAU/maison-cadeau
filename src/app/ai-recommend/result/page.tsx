"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { Button } from "@/components/common";
import { useRecommendStore } from "@/store/recommendStore";
import { createClient } from "@/lib/supabase/client";
import { FEED_ITEMS } from "@/app/(main)/feed/feed.data";
import styles from "./page.module.scss";

interface RecommendedItem {
  id: string;
  title: string;
  category: string;
}

export default function AiRecommendResultPage() {
  const router = useRouter();
  const { situation, preference, gender, budget, reset } = useRecommendStore();
  const [items, setItems] = useState<RecommendedItem[]>([]);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

        // 로그인된 유저라면 히스토리 저장
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any).from("recommendation_history").insert({
            user_id: user.id,
            situation,
            preferences: preference,
            gender,
            budget,
            recommended_feed_ids: data.items?.map((item: RecommendedItem) => item.id) ?? [],
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
  }, [situation, preference, gender, budget]);

  const getFeedItem = (id: string) => FEED_ITEMS.find((f) => f.id === id);

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
            <div className={styles.loading}>추천 선물을 찾는 중...</div>
          ) : (
            <div className={styles.result_list}>
              {items.map((item) => {
                const feed = getFeedItem(item.id);
                return (
                  <div key={item.id} className={styles.result_contents}>
                    <Card
                      variant="product"
                      as="button"
                      onClick={() => router.push(`/feed/${item.id}`)}
                      badge="RECOMMEND"
                      imageSrc={feed?.src ?? "/imgs/product_image.png"}
                      imageAlt={item.title}
                      title={item.title}
                      price=""
                    />
                    <div className={styles.result_button_box}>
                      <Button
                        variant="background-black-sm"
                        onClick={() => router.push(`/feed/${item.id}`)}
                      >
                        선물 자세히보기
                      </Button>
                      <Button variant="icon-group" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Button variant="background-gray" onClick={handleRetry}>
            다시 추천받기
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
