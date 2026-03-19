import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FortuneCookie } from "@/components/fortune";
import styles from "./page.module.scss";

export default function FortunePage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.page_header}>
            <h1 className={styles.title}>두근두근! 오늘의 운세</h1>
            <p className={styles.description}>오늘의 운세를 뽑아보세요</p>
          </div>
          <FortuneCookie />
        </div>
      </main>
      <Footer />
    </>
  );
}
