"use client";

import { useRef, useState,useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import styles from "./Swiper.module.scss";
import type { ISwiperSectionProps } from "./Swiper.types";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "../button";


export function SwiperSection({
  id,
  text,
  title,
  images,
  date,
  brand,
}: ISwiperSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbSwiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mainSwiperRef.current) return;

    const swiper = mainSwiperRef.current;

    if (!swiper.params.navigation || typeof swiper.params.navigation === "boolean") return;
    if (!prevRef.current || !nextRef.current) return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();
  }, []);


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
      <div className={styles.slider_container}>
        {/* center */}
        <div className={styles.slider_wrapper}>
        <Swiper
            modules={[Navigation]}
            className={styles.main_swiper}
            slidesPerView={2}
            spaceBetween={12}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
              thumbSwiperRef.current?.slideTo(swiper.realIndex);
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
            <SwiperSlide key="dummy" aria-hidden="true">
              <div className={styles.image_box_dummy} />
            </SwiperSlide>
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
            modules={[]}
            onSwiper={(swiper) => { thumbSwiperRef.current = swiper; }}
            slidesPerView="auto"
            spaceBetween={4}
            className={styles.thumb_swiper}
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={index}
                className={styles.thumb_wrapper}
                onClick={() => {
                  mainSwiperRef.current?.slideTo(index);
                  setActiveIndex(index);
                }}
              >
                <div className={`${styles.thumb_box} ${index === activeIndex ? styles.thumb_active : ""}`}>
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
            <Button variant="icon-group" type="button" className={styles.btn_save} giftId={id} />
          </div>
        </div>
      </div>
    </section>
  );
}