"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { ChevronLeftIcon } from "@/components/common/icons";
import styles from "./page.module.scss";

// TODO: Supabase에서 유저의 추천 이력 데이터 fetch로 대체
const MOCK_RECOMMENDATIONS: {
  date: string;
  products: {
    id: string;
    badge: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    price: string;
  }[];
}[] = [
  {
    date: "26.01.23",
    products: [
      { id: "1", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
      { id: "2", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
      { id: "3", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
    ],
  },
  {
    date: "26.01.14",
    products: [
      { id: "4", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
      { id: "5", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
      { id: "6", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
      { id: "7", badge: "recommand", imageSrc: "/imgs/product-flat.png", imageAlt: "아누 고블렛 도자기 잔", title: "아누 고블렛 도자기 잔", price: "18,000원" },
    ],
  },
];

export default function RecommendationsPage() {
  const router = useRouter();

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

          <div className={styles.groups}>
            {MOCK_RECOMMENDATIONS.map((group) => (
              <div key={group.date} className={styles.group}>
                <p className={styles.date}>{group.date}</p>
                <div className={styles.product_grid}>
                  {group.products.map((product) => (
                    <Card
                      key={product.id}
                      as="button"
                      variant="product-flat"
                      onClick={() => {}}
                      badge={product.badge}
                      imageSrc={product.imageSrc}
                      imageAlt={product.imageAlt}
                      title={product.title}
                      price={product.price}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
