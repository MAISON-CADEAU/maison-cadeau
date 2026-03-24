"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import styles from "./page.module.scss";
import { Button } from "@/components/common";

export default function AiRecommendResultPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <section className={styles.result_section}>
          <div className={styles.result_title_box}>
            <h3 className={styles.result_title}>Find your Gift</h3>
            <p className={styles.result_description}>메종카도가 추천하는 제품이에요</p>
          </div>

          <div className={styles.result_contents}>
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

            <div className={styles.result_button_box}>
              <Button variant="background-black-sm">선물 자세히보기</Button>
              <Button variant="icon-group" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
