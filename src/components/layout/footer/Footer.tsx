import Link from "next/link";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: "/ai-recommend", label: "선물 추천받기" },
  { href: "/feed", label: "피드 둘러보기" },
  { href: "/fortune", label: "오늘의 운세" },
  { href: "/brand", label: "브랜드 이야기: 메종카도" },
  { href: "/contact", label: "문의하기" },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_grid}>
          {/* Left Content */}
          <div className={styles.left_content}>
            <h3 className={styles.tagline}>Gifts, refined and personalized</h3>
            <div className={styles.description}>
              <p>선물은 물건이 아니라, 마음의 선택입니다</p>
              <p>우리는 고민의 방향을 정리해주는 역할을 합니다</p>
              <p>관계와 취향, 그리고 순간을 읽어</p>
              <p>가장 어울리는 제안을 건넵니다</p>
            </div>
          </div>

          {/* Right Links */}
          <div className={styles.right_links}>
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.footer_link}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footer_bottom}>
          <div className={styles.slogan}>Find your Gift</div>
          <div className={styles.brand_info}>
            <div className={styles.brand_name}>MAISON CADEAU</div>
            <div className={styles.copyright}>© 2026 Gift Project. All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
