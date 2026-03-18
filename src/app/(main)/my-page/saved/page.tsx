import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function SavedPage() {
  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>선물 보관함</h1>
          <p className={styles.description}>스크랩했던 선물리스트를 다시 확인할 수 있어요</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
