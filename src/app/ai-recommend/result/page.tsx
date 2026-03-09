import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function AiRecommendResultPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        {/* TODO: 결과 페이지 구현 */}
      </main>
      <Footer />
    </>
  );
}
