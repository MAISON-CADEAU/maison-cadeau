"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import styles from "./page.module.scss";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/common/icons/ChevronDownIcon";
import { SearchIcon } from "@/components/common/icons/SearchIcon";

const FEED_ITEMS = [
  { id: "1", src: "/imgs/feed-1.png", alt: "feed_1" },
  { id: "2", src: "/imgs/feed-2.png", alt: "feed_2" },
  { id: "3", src: "/imgs/feed-3.png", alt: "feed_3" },
  { id: "4", src: "/imgs/feed-4.png", alt: "feed_4" },
  { id: "5", src: "/imgs/feed-5.png", alt: "feed_5" },
  { id: "6", src: "/imgs/feed-6.png", alt: "feed_6" },
  { id: "7", src: "/imgs/feed-7.png", alt: "feed_7" },
  { id: "8", src: "/imgs/feed-8.png", alt: "feed_8" },
  { id: "9", src: "/imgs/feed-9.png", alt: "feed_9" },
  { id: "10", src: "/imgs/feed-10.png", alt: "feed_10" },
  { id: "11", src: "/imgs/feed-11.png", alt: "feed_11" },
  { id: "12", src: "/imgs/feed-12.png", alt: "feed_12" },
];




const TABS = [
  { key: "all", label: "All" },
  { key: "me", label: "for me" },
  { key: "friend", label: "friend" },
  { key: "family", label: "family" },
]

export default function FeedPage() {
    const [activeTab, setActiveTab] = useState("all");
  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.text_container}>
            <h1 className={styles.title}>
              <span className={styles.highlight}>O</span>n your Gift
            </h1>
            <p className={styles.description}>좋은 선물은 마음을 읽는 것에서 시작됩니다. <br/> 상대방이 어떤 것을 좋아하는지 어떤 순간을 보내고 있는지 그 사람만의 취향과 라이프스타일을 담아 우리는 다양한 컬렉션을 준비했습니다. 여기, 누군가의 일상을 특별하게 만들 선물들을 천천히 구경하며 피드를 둘러보세요. 당신의 진심을 전할 선물이 기다리고 있습니다</p>
          </div>
          <div className={styles.feed_toolbar}>
            <div className={styles.feed_controls}>
              <div className={styles.feed_count}>12 Posts</div>
              <div className={styles.feed_sort}>
                <select className={styles.sort_select}>
                  <option value="newest">최신순</option>
                  <option value="oldest">오래된순</option>
                  <option value="most_liked">좋아요순</option>
                </select>
                <ChevronDownIcon size={20} color="#1B1B1B" className={styles.sort_icon} />
              </div>
              <div className={styles.feed_search}>
                <SearchIcon size={20} color="#1B1B1B" className={styles.search_icon} />
                <input type="text" placeholder="찾고싶은 선물을 검색해보세요" className={styles.search_input} />
              </div>
            </div>
            <div className={styles.feed_tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`${styles.tab_button} ${
                    activeTab === tab.key ? styles.active : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.feed_container}>
            {FEED_ITEMS.map((item) => (
              <div key={item.id} className={styles.feed_item}>
                <img src={item.src} alt={item.alt} className={styles.feed_image} />
          </div>
          ))}
        </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
