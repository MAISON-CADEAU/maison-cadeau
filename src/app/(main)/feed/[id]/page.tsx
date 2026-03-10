import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";

interface IFeedDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FeedDetailPage({ params }: IFeedDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>피드 상세 {id}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
