import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

export default function InquiryPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>문의하기</h1>
          <p className={styles.description}>궁금한 사항을 문의해주세요.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
