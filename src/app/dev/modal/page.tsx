"use client";

import { useState } from "react";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import styles from "../dev.module.scss";
import pageStyles from "./page.module.scss";

export default function ModalDevPage() {
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFeeds, setSelectedFeeds] = useState<number[]>([]);

  const toggleFeed = (index: number) => {
    setSelectedFeeds((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <>
      <h1 className={styles.page_title}>Modal</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>feed</h2>
        <p className={styles.group_label}>풀스크린 모달 — 뒤로가기 + 완료 버튼 헤더</p>
        <Button variant="background-black-sm" onClick={() => setIsFeedOpen(true)}>
          feed 모달 열기
        </Button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>default</h2>
        <p className={styles.group_label}>중앙 팝업 모달 — X 닫기 버튼 헤더</p>
        <Button variant="background-black-sm" onClick={() => setIsDefaultOpen(true)}>
          default 모달 열기
        </Button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>alert</h2>
        <p className={styles.group_label}>알림창 모달 — 제목만 있는 헤더 (버튼은 children)</p>
        <Button variant="background-black-sm" onClick={() => setIsAlertOpen(true)}>
          alert 모달 열기
        </Button>
      </div>

      {/* Feed Modal */}
      <Modal
        variant="feed"
        isOpen={isFeedOpen}
        title="피드 추가하기"
        onClose={() => setIsFeedOpen(false)}
        onComplete={() => setIsFeedOpen(false)}
      >
        <div className={pageStyles.feed_grid}>
          {Array.from({ length: 8 }, (_, i) => i).map((index) => {
            const isSelected = selectedFeeds.includes(index);
            return (
              <div
                key={index}
                className={`${pageStyles.feed_item} ${isSelected ? pageStyles.feed_item_selected : ""}`}
                onClick={() => toggleFeed(index)}
              >
                <img
                  src={`/imgs/feed-${index + 1}.png`}
                  alt={`feed-${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {isSelected && <div className={pageStyles.feed_overlay} />}
                {isSelected && (
                  <div className={pageStyles.feed_check_badge}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7L5.5 10L11.5 4"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Default Modal */}
      <Modal
        variant="default"
        isOpen={isDefaultOpen}
        title="새 컬렉션"
        onClose={() => setIsDefaultOpen(false)}
      >
        <div className={pageStyles.modal_input_group}>
          <span className={pageStyles.modal_input_title}>제목</span>
          <Input variant="grey" placeholder="제목을 입력해주세요" />
        </div>
        <Button variant="background-black-xl" onClick={() => setIsDefaultOpen(false)}>다음</Button>
      </Modal>

      {/* Alert Modal */}
      <Modal
        variant="alert"
        isOpen={isAlertOpen}
        title="피드가 완성되었습니다."
        onClose={() => setIsAlertOpen(false)}
      >
        <Button variant="background-black-sm" onClick={() => setIsAlertOpen(false)}>확인</Button>
      </Modal>
    </>
  );
}
