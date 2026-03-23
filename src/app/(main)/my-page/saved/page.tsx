"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Modal } from "@/components/common/modal";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { ChevronLeftIcon, CheckSmIcon, EditPencilIcon, TrashIcon, PlusIcon } from "@/components/common/icons";
import styles from "./page.module.scss";

interface Folder {
  id: string;
  name: string;
  feedIds: string[];
}

// TODO: Supabase 연동 시 실제 사용자 스크랩 데이터로 대체
const MOCK_SCRAPED_FEEDS = [
  { id: "1", imageSrc: "/imgs/scraped-1.png" },
  { id: "2", imageSrc: "/imgs/scraped-2.png" },
  { id: "3", imageSrc: "/imgs/scraped-3.png" },
  { id: "4", imageSrc: "/imgs/scraped-1.png" },
  { id: "5", imageSrc: "/imgs/scraped-2.png" },
  { id: "6", imageSrc: "/imgs/scraped-3.png" },
  { id: "7", imageSrc: "/imgs/scraped-1.png" },
  { id: "8", imageSrc: "/imgs/scraped-2.png" },
];

const INITIAL_FOLDERS: Folder[] = [
  { id: "1", name: "생일 선물 모음", feedIds: ["1", "2"] },
  { id: "2", name: "2025 연말 선물", feedIds: ["3"] },
];

export default function SavedPage() {
  const router = useRouter();

  // 뷰 상태
  const [view, setView] = useState<"all" | "folder">("all");
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

  // 폴더 목록
  const [folders, setFolders] = useState<Folder[]>(INITIAL_FOLDERS);

  // 편집 모드
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);

  // 모달 단계: 0=닫힘, 1=새 컬렉션 이름 입력, 2=피드 선택
  const [modalStep, setModalStep] = useState<0 | 1 | 2>(0);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFeedIds, setSelectedFeedIds] = useState<string[]>([]);
  const [isAddingToFolder, setIsAddingToFolder] = useState(false);

  // Alert 모달 (단순 알림)
  const [alertModal, setAlertModal] = useState({ isOpen: false, message: "" });

  // Confirm 모달 (확인/취소)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, message: "", onConfirm: () => {} });

  const handleFolderClick = (folder: Folder) => {
    setView("folder");
    setCurrentFolder(folder);
    setIsEditMode(false);
    setSelectedForDelete([]);
  };

  const handleBackToAll = () => {
    setView("all");
    setCurrentFolder(null);
    setIsEditMode(false);
    setSelectedForDelete([]);
  };

  const handleNewFolderClick = () => {
    setNewFolderName("");
    setSelectedFeedIds([]);
    setIsAddingToFolder(false);
    setModalStep(1);
  };

  const handleNextStep = () => {
    if (!newFolderName.trim()) return;
    setSelectedFeedIds([]);
    setModalStep(2);
  };

  const handleFeedSelect = (feedId: string) => {
    setSelectedFeedIds((prev) =>
      prev.includes(feedId) ? prev.filter((id) => id !== feedId) : [...prev, feedId]
    );
  };

  const handleFeedModalComplete = () => {
    // 피드를 하나도 선택하지 않으면 완료 불가
    if (selectedFeedIds.length === 0) return;

    if (isAddingToFolder && currentFolder) {
      const updated: Folder = {
        ...currentFolder,
        feedIds: [...new Set([...currentFolder.feedIds, ...selectedFeedIds])],
      };
      setFolders((prev) => prev.map((f) => (f.id === currentFolder.id ? updated : f)));
      setCurrentFolder(updated);
      setIsAddingToFolder(false);
      setModalStep(0);
      setAlertModal({ isOpen: true, message: "피드가 추가되었습니다." });
    } else {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName,
        feedIds: selectedFeedIds,
      };
      setFolders((prev) => [...prev, newFolder]);
      setModalStep(0);
      setAlertModal({ isOpen: true, message: "컬렉션이 생성되었습니다." });
    }
  };

  const handleAddToFolder = () => {
    setSelectedFeedIds([]);
    setIsAddingToFolder(true);
    setModalStep(2);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setSelectedForDelete([]);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedForDelete([]);
  };

  const handleFeedDeleteClick = () => {
    if (selectedForDelete.length === 0) return;
    setConfirmModal({
      isOpen: true,
      message: "선택한 피드를 삭제하시겠어요?",
      onConfirm: () => {
        if (currentFolder) {
          const updated: Folder = {
            ...currentFolder,
            feedIds: currentFolder.feedIds.filter((id) => !selectedForDelete.includes(id)),
          };
          setFolders((prev) => prev.map((f) => (f.id === currentFolder.id ? updated : f)));
          setCurrentFolder(updated);
        }
        setIsEditMode(false);
        setSelectedForDelete([]);
        setConfirmModal({ isOpen: false, message: "", onConfirm: () => {} });
        setAlertModal({ isOpen: true, message: "피드가 삭제되었습니다." });
      },
    });
  };

  const handleFolderDeleteClick = () => {
    setConfirmModal({
      isOpen: true,
      message: "폴더를 삭제하시겠어요?",
      onConfirm: () => {
        if (currentFolder) {
          setFolders((prev) => prev.filter((f) => f.id !== currentFolder.id));
        }
        setConfirmModal({ isOpen: false, message: "", onConfirm: () => {} });
        handleBackToAll();
        setAlertModal({ isOpen: true, message: "폴더가 삭제되었습니다." });
      },
    });
  };

  const handleDeleteSelect = (feedId: string) => {
    setSelectedForDelete((prev) =>
      prev.includes(feedId) ? prev.filter((id) => id !== feedId) : [...prev, feedId]
    );
  };

  const currentFeeds =
    view === "all"
      ? MOCK_SCRAPED_FEEDS
      : MOCK_SCRAPED_FEEDS.filter((f) => currentFolder?.feedIds.includes(f.id));

  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* 페이지 헤더 */}
          <div className={styles.page_header}>
            <div className={styles.page_header_left}>
              <button
                type="button"
                onClick={view === "all" ? () => router.push("/my-page") : handleBackToAll}
                className={styles.back_button}
              >
                <ChevronLeftIcon size={28} />
              </button>
              <h1 className={styles.title}>
                {view === "all" ? "선물 보관함" : currentFolder?.name}
              </h1>
            </div>

            <div className={styles.page_header_right}>
              {view === "all" ? (
                <button type="button" onClick={handleNewFolderClick} className={styles.action_button}>
                  <PlusIcon size={14} />
                  폴더추가
                </button>
              ) : isEditMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleFeedDeleteClick}
                    disabled={selectedForDelete.length === 0}
                    className={`${styles.action_button} ${styles.action_button_danger} ${selectedForDelete.length === 0 ? styles.action_button_disabled : ""}`}
                  >
                    <TrashIcon size={14} />
                    피드 삭제
                  </button>
                  <button
                    type="button"
                    onClick={handleFolderDeleteClick}
                    className={`${styles.action_button} ${styles.action_button_danger}`}
                  >
                    <TrashIcon size={14} />
                    폴더 삭제
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={styles.action_button}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={handleAddToFolder} className={styles.action_button}>
                    <PlusIcon size={14} />
                    피드 추가
                  </button>
                  <button type="button" onClick={handleEditClick} className={styles.action_button}>
                    <EditPencilIcon size={14} />
                    편집
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 탭 */}
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${view === "all" ? styles.tab_active : ""}`}
              onClick={handleBackToAll}
            >
              전체 보기
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                className={`${styles.tab} ${currentFolder?.id === folder.id ? styles.tab_active : ""}`}
                onClick={() => handleFolderClick(folder)}
              >
                {folder.name}
              </button>
            ))}
          </div>

          {/* 피드 그리드 */}
          {currentFeeds.length === 0 ? (
            <p className={styles.empty_message}>스크랩된 피드가 없습니다.</p>
          ) : (
            <div className={styles.feed_grid}>
              {currentFeeds.map((feed) => (
                <div
                  key={feed.id}
                  className={styles.feed_item}
                  onClick={() => {
                    if (isEditMode) {
                      handleDeleteSelect(feed.id);
                    } else {
                      router.push(`/feed/${feed.id}`);
                    }
                  }}
                >
                  <Image
                    src={feed.imageSrc}
                    alt="스크랩 피드"
                    width={270}
                    height={270}
                    className={styles.feed_image}
                  />
                  {isEditMode && (
                    <div
                      className={`${styles.feed_overlay} ${selectedForDelete.includes(feed.id) ? styles.feed_overlay_selected : ""}`}
                    >
                      <div
                        className={`${styles.feed_checkbox} ${selectedForDelete.includes(feed.id) ? styles.feed_checkbox_checked : ""}`}
                      >
                        {selectedForDelete.includes(feed.id) && (
                          <CheckSmIcon size={16} color="#ffffff" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* 모달 1단계: 새 컬렉션 이름 */}
      <Modal
        isOpen={modalStep === 1}
        variant="default"
        title="새 컬렉션"
        onClose={() => setModalStep(0)}
      >
        <div className={styles.modal_body}>
          <div className={styles.modal_field}>
            <label className={styles.modal_label}>제목</label>
            <Input
              variant="grey"
              placeholder="집들이 선물"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <Button
            variant="background-black-2xl"
            type="button"
            onClick={handleNextStep}
            style={{ width: "100%" }}
          >
            다음
          </Button>
        </div>
      </Modal>

      {/* 모달 2단계: 피드 선택 */}
      <Modal
        isOpen={modalStep === 2}
        variant="feed"
        title="피드 추가하기"
        onClose={() => {
          setModalStep(0);
          setIsAddingToFolder(false);
        }}
        onComplete={handleFeedModalComplete}
        completeLabel="완료"
      >
        <div className={styles.feed_select_grid}>
          {MOCK_SCRAPED_FEEDS.map((feed) => {
            const isSelected = selectedFeedIds.includes(feed.id);
            return (
              <div
                key={feed.id}
                className={`${styles.feed_select_item} ${isSelected ? styles.feed_select_item_selected : ""}`}
                onClick={() => handleFeedSelect(feed.id)}
              >
                <img
                  src={feed.imageSrc}
                  alt="피드"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                {isSelected && <div className={styles.feed_select_overlay} />}
                {isSelected && (
                  <div className={styles.feed_select_check}>
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

      {/* Confirm 모달 (삭제 확인) */}
      <Modal
        isOpen={confirmModal.isOpen}
        variant="alert"
        title={confirmModal.message}
        onClose={() => setConfirmModal({ isOpen: false, message: "", onConfirm: () => {} })}
      >
        <div className={styles.confirm_body}>
          <Button
            variant="background-black-2xl"
            type="button"
            onClick={confirmModal.onConfirm}
            style={{ width: "100%" }}
          >
            삭제
          </Button>
          <Button
            variant="border-lg"
            type="button"
            onClick={() => setConfirmModal({ isOpen: false, message: "", onConfirm: () => {} })}
            style={{ width: "100%" }}
          >
            취소
          </Button>
        </div>
      </Modal>

      {/* Alert 모달 */}
      <Modal
        isOpen={alertModal.isOpen}
        variant="alert"
        title={alertModal.message}
        onClose={() => setAlertModal({ isOpen: false, message: "" })}
      >
        <div className={styles.alert_body}>
          <Button
            variant="background-black-2xl"
            type="button"
            onClick={() => setAlertModal({ isOpen: false, message: "" })}
            style={{ width: "100%" }}
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
}
