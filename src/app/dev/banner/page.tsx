import { Banner } from "@/components/common/banner";
import styles from "../dev.module.scss";

export default function BannerDevPage() {
  return (
    <>
      <h1 className={styles.page_title}>Banner</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>overlay</h2>
        <Banner
          layout="overlay"
          title="Find your Gift"
          description="선물할 상대를 생각하며 키워드를 골라보세요"
          image={{ src: "/imgs/banner-image-overlay.png", alt: "Banner Image" }}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>cta (align: right)</h2>
        <Banner
          layout="cta"
          title="What's your favorite"
          description="찾아볼 필요 없어요"
          image={{ src: "/imgs/banner-image-cta.png", alt: "Banner Image" }}
          cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>cta (align: left)</h2>
        <Banner
          layout="cta"
          title="What's your favorite"
          description="취향을 온전히 담아 드려요"
          align="left"
          cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
        />
      </div>
    </>
  );
}
