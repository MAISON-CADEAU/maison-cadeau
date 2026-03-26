import { SwiperSection } from "@/components/common/swiper/Swiper";
import styles from "../dev.module.scss";

export default function SwiperDevPage() {
  return (
    <>
      <h1 className={styles.page_title}>Swiper</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>기본 슬라이더 + 썸네일</h2>
        <SwiperSection
          id="dev"
          text="gift"
          title="지금 딱 보내기 좋은 |카카오톡 선물하기 5"
          images={[
            "/imgs/swiper_1.png",
            "/imgs/swiper_2.png",
            "/imgs/swiper_3.png",
            "/imgs/swiper_4.png",
          ]}
          date="2024.01.01"
          brand="Maison Cadeau"
        />
      </div>
    </>
  );
}
