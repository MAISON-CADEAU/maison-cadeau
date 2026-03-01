"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import styles from "./swiper.module.scss";
import type { ISwiperSectionProps } from "./swiper.types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { Button } from "../button";


export function SwiperSection({
  text,
  title,
  images,
  date,
  brand,
}: ISwiperSectionProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className={styles.swiper_section}>
      {/* top */}
      <header className={styles.header}>
        <p className={styles.main_text}>{text}</p>
        <h2 className={styles.title}>
          {title.split("|").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>
      </header>

      {/* center */}
      <div className={styles.slider_wrapper}>
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          thumbs={{ swiper: thumbsSwiper, multipleActiveThumbs: true }}
          className={styles.main_swiper}
          slidesPerView={2}
          // centeredSlides
          // centeredSlidesBounds  
          // initialSlide={0}        
          spaceBetween={12}
          // watchSlidesProgress
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (!swiper.params.navigation || typeof swiper.params.navigation === "boolean") return;
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}              
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className={styles.image_box}>
                <Image
                  src={src}
                  alt={`gift_image_${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        <Button
          ref={prevRef}
          type="button"
          className={styles.slider_prev}
          aria-label="slider prev"
          variant="arrow-left_bg"
        />

        <Button
          ref={nextRef}
          type="button"
          className={styles.slider_next}
          aria-label="slider next"
          variant="arrow-right_bg"
        />
      </div>

      {/* bottom */}
      <div className={styles.footer}>
        {/* left */}
        <div className={styles.info}>
          <p className={styles.date}>post date : {date}</p>
          <p className={styles.brand}>Brand : {brand}</p>
        </div>

        {/* center - thumbnail */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          spaceBetween={4}
          watchSlidesProgress
          slideToClickedSlide
          className={styles.thumb_swiper}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className={styles.thumb_wrapper}>
              <div className={styles.thumb_box}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="48px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* right */}
        <div className={styles.actions}>
          <Button variant="icon-group" type="button" className={styles.btn_save}/>
        </div>
      </div>
    </section>
  );
}