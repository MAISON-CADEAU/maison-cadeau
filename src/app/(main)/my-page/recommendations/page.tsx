"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { ChevronLeftIcon } from "@/components/common/icons";
import { createClient } from "@/lib/supabase/client";
import { FEED_ITEMS } from "@/app/(main)/feed/feed.data";
import { format } from "date-fns";
import styles from "./page.module.scss";

interface HistoryGroup {
  date: string;
  items: { id: string; title: string; src: string }[];
}

export default function RecommendationsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<HistoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any)
        .from("recommendation_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const grouped: HistoryGroup[] = data.map((row: any) => ({
          date: format(new Date(row.created_at), "yy.MM.dd"),
          items: (row.recommended_feed_ids as string[])
            .map((id) => {
              const feed = FEED_ITEMS.find((f) => f.id === id);
              return feed ? { id: feed.id, title: feed.title, src: feed.src } : null;
            })
            .filter(Boolean) as { id: string; title: string; src: string }[],
        }));
        setGroups(grouped);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.page_header}>
            <button
              type="button"
              className={styles.back_button}
              onClick={() => router.back()}
              aria-label="뒤로가기"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <h1 className={styles.title}>추천선물 다시보기</h1>
          </div>

          {isLoading ? (
            <p className={styles.date}>불러오는 중...</p>
          ) : groups.length === 0 ? (
            <p className={styles.date}>아직 추천 이력이 없습니다.</p>
          ) : (
            <div className={styles.groups}>
              {groups.map((group, idx) => (
                <div key={idx} className={styles.group}>
                  <p className={styles.date}>{group.date}</p>
                  <div className={styles.product_grid}>
                    {group.items.map((item) => (
                      <Card
                        key={item.id}
                        as="button"
                        variant="product-flat"
                        onClick={() => router.push(`/feed/${item.id}`)}
                        badge="RECOMMEND"
                        imageSrc={item.src}
                        imageAlt={item.title}
                        title={item.title}
                        price=""
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
