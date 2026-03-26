import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";
import { FEED_ITEMS } from "@/app/(main)/feed/feed.data";
import { SwiperSection } from "@/components/common/swiper";
import Image from "next/image";
import Link from "next/link";

interface IFeedDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FeedDetailPage({ params }: IFeedDetailPageProps) {
  const { id } = await params;

  const currentItem = FEED_ITEMS.find(
    (feed) => String(feed.id) === String(id)
  );

  if (!currentItem) return <div>Not Found</div>;

  const relatedItems = FEED_ITEMS.filter(
    (feed) => feed.id !== currentItem.id && feed.category === currentItem.category
  );

  return (
    <>
      <Header theme="light" />

      <main className={styles.main}>
        <div className={styles.container}>
          <SwiperSection
            id={currentItem.id}
            text={currentItem.category}
            title={currentItem.title}
            images={currentItem.images}
            date={currentItem.date}
            brand={currentItem.category}
          />
          <div className={styles.feed_container}>
            <div className={styles.content}>
              <h1 className={styles.title}>
                <span className={styles.highlight}>O</span>ther posts
              </h1>

              <div className={styles.feed_items}>
                {relatedItems.map((feed) => (
                  <Link
                    key={feed.id}
                    href={`/feed/${feed.id}`}
                    className={styles.feed_item}
                  >
                    <Image
                      src={feed.src}
                      alt={feed.alt}
                      width={349}
                      height={465}
                      className={styles.feed_image}
                    />
                  </Link>
                ))}
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </>
  );
}