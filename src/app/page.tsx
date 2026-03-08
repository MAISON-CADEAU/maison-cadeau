"use client";

import { useRef } from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";
import { Banner } from "@/components/common/banner";
import { Button } from "@/components/common";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

const FEED_ITEMS = [
  { src: "/imgs/feed-1.png", alt: "feed_1" },
  { src: "/imgs/feed-2.png", alt: "feed_2" },
  { src: "/imgs/feed-3.png", alt: "feed_3" },
  { src: "/imgs/feed-4.png", alt: "feed_4" },
  { src: "/imgs/feed-5.png", alt: "feed_5" },
  { src: "/imgs/feed-6.png", alt: "feed_6" },
  { src: "/imgs/feed-7.png", alt: "feed_7" },
  { src: "/imgs/feed-8.png", alt: "feed_8" },
  { src: "/imgs/feed-9.png", alt: "feed_9" },
  { src: "/imgs/feed-10.png", alt: "feed_10" },
  { src: "/imgs/feed-11.png", alt: "feed_11" },
  { src: "/imgs/feed-12.png", alt: "feed_12" },
];

export default function Home() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Header theme="dark" />
      <main className={styles.main}>

        {/* Section 1: Hero */}
        <section className={styles.hero_section}>
          <div className={styles.hero_title_box}>
            <p className={styles.hero_title_top}>
              취향에 맞는 단 하나의 제품, <br />
              지금 바로 선물하세요
            </p>
            <h2 className={styles.hero_title_bottom}>
              <span>F</span>ind your Gift
            </h2>
          </div>
        </section>

        {/* Section 2: Banner CTA */}
        <section className={styles.section}>
          <Banner
            layout="cta"
            title="What's your favorite"
            description={`찾아볼 필요 없이,\n취향을 온전히 담은 제품을 빠르게 드려요`}
            image={{ src: "/imgs/banner-image-cta.png", alt: "Banner Image" }}
            cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
          />
        </section>

        {/* Section 3: Feed Swiper */}
        <section className={styles.contents_section}>
          <div className={styles.contents_header}>
            <h3 className={styles.contents_title}>
              <span>F</span>ind your Gift
            </h3>
            <div className={styles.contents_nav}>
              <Button
                ref={prevRef}
                type="button"
                aria-label="이전 슬라이드"
                variant="arrow-left_bg"
              />
              <Button
                ref={nextRef}
                type="button"
                aria-label="다음 슬라이드"
                variant="arrow-right_bg"
              />
            </div>
          </div>

          <Swiper
            modules={[Navigation, Grid]}
            grid={{ rows: 2, fill: "row" }}
            slidesPerView={4.2}
            spaceBetween={12}
            onBeforeInit={(swiper) => {
              if (
                typeof swiper.params.navigation !== "boolean" &&
                swiper.params.navigation
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (
                  !swiper.params.navigation ||
                  typeof swiper.params.navigation === "boolean"
                )
                  return;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className={styles.feed_swiper}
          >
            {FEED_ITEMS.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.feed_card}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.feed_card_image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className={styles.banner_top_section}>
          <div className={styles.banner_top_left}>
          </div>
          <div className={styles.banner_top_right}>
            <Banner
            layout="cta"
            title="What's your favorite"
            description={`찾아볼 필요 없이,\n취향을 온전히 담은 리스트가 궁금하다면`}
            align="left"
            cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
            />
          </div>
        </section>

        <section className={styles.banner_bottom_section}>
         <div className={styles.banner_bottom_wrapper}>
            <Banner
              layout="cta"
              textColor="white"
              title="What's your favorite"
              description={`찾아볼 필요 없이,\n취향을 온전히 담은 리스트가 궁금하다면`}
              align="left"
              cta={{ label: "바로 선물하기", href: "/", target: "_blank" }}
            />
         </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
