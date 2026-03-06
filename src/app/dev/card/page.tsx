"use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import * as Icons from "@/components/common/icons";
import styles from "../dev.module.scss";
import pageStyles from "./page.module.scss";

export default function CardDevPage() {
  const [activeGender, setActiveGender] = useState<"female" | "male" | null>(null);

  return (
    <>
      <h1 className={styles.page_title}>Card</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Gender Card</h2>
        <div className={pageStyles.gender_group}>
          <Card
            variant="gender"
            as="button"
            isActive={activeGender === "female"}
            onClick={() => setActiveGender("female")}
            title="여성"
            icon={<Icons.FemaleIcon width={100} height={100} />}
          />
          <Card
            variant="gender"
            as="button"
            isActive={activeGender === "male"}
            onClick={() => setActiveGender("male")}
            title="남성"
            icon={<Icons.MaleIcon width={100} height={100} />}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Product Card</h2>
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
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>CTA Card — text</h2>
        <Card
          variant="cta"
          ctaType="text"
          as="a"
          link={{ href: "/about" }}
          title="문의하기"
          description="선물 입점 | 선물 관련 문의함입니다"
          width={349}
          height={160}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>CTA Card — icon</h2>
        <Card
          variant="cta"
          ctaType="icon"
          as="a"
          link={{ href: "/", target: "_blank" }}
          imageSrc="/imgs/profile.png"
          imageAlt="profile"
          title="맛있는당근님"
          icon={<Icons.EditPencilIcon />}
          description="내 정보 수정하기"
          width={349}
          height={144}
        />
      </div>
    </>
  );
}
