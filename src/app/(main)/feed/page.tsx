import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function FeedPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>피드 둘러보기</h1>
          <p className={styles.description}>다양한 선물 아이디어를 둘러보세요.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
