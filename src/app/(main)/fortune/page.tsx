import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function FortunePage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>오늘의 운세</h1>
          <p className={styles.description}>오늘의 운세를 확인해보세요.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
