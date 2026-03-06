import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Header theme="dark" />
      <main className={styles.main}>
        <section className={styles.hero_section}>
          <h2 className={styles.hero_title}><span>F</span>ind your Gift</h2>
        </section>
      </main>
      <Footer />
    </>
  );
}
