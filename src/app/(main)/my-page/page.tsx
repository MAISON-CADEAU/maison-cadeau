import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function MyPage() {
  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>마이페이지</h1>
          <p className={styles.description}>회원 정보를 관리하세요.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
