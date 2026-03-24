import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { InquiryForm } from "@/components/inquiry";
import styles from "./page.module.scss";

export default function InquiryPage() {
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <InquiryForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
