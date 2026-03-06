import Link from "next/link";
import styles from "./dev.module.scss";
import pageStyles from "./page.module.scss";

const components = [
  { href: "/dev/button", label: "Button", description: "icon-group, arrow, house, primary, secondary, kakao" },
  { href: "/dev/input", label: "Input", description: "default, grey, search, underline, textarea, checkbox" },
  { href: "/dev/modal", label: "Modal", description: "feed, default, alert variant" },
  { href: "/dev/card", label: "Card", description: "gender, product, cta variant" },
  { href: "/dev/banner", label: "Banner", description: "overlay, cta variant" },
  { href: "/dev/swiper", label: "Swiper", description: "이미지 슬라이더 + 썸네일" },
  { href: "/dev/icons", label: "Icons", description: "size / color 조절 가능한 아이콘 목록" },
];

export default function DevPage() {
  return (
    <>
      <h1 className={styles.page_title}>Component Library</h1>
      <div className={pageStyles.grid}>
        {components.map(({ href, label, description }) => (
          <Link key={href} href={href} className={pageStyles.card}>
            <span className={pageStyles.card_label}>{label}</span>
            <span className={pageStyles.card_desc}>{description}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
