import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function RecommendationPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>선물추천받기</h1>
          <p className={styles.description}>AI 기반 선물 추천 서비스 페이지입니다.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
