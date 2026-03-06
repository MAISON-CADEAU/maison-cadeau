import Link from "next/link";
import styles from "./layout.module.scss";

const navItems = [
  { href: "/dev/button", label: "Button" },
  { href: "/dev/input", label: "Input" },
  { href: "/dev/modal", label: "Modal" },
  { href: "/dev/card", label: "Card" },
  { href: "/dev/banner", label: "Banner" },
  { href: "/dev/swiper", label: "Swiper" },
  { href: "/dev/icons", label: "Icons" },
];

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <Link href="/dev" className={styles.logo}>Dev</Link>
        </div>
        <nav className={styles.nav}>
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.nav_link}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
