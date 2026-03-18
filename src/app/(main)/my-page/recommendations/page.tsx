import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function RecommendationsPage() {
  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>추천선물 다시보기</h1>
          <p className={styles.description}>추천받은 선물들을 다시 볼 수 있어요</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
