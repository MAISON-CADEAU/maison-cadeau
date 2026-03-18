import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/common/card";
import { EditPencilIcon } from "@/components/common/icons";
import styles from "./page.module.scss";

const MENU_CARDS = [
  {
    title: "추천선물 다시보기",
    description: "추천받은 선물들을 다시 볼 수 있어요",
    href: "/my-page/recommendations",
  },
  {
    title: "오늘의 운세",
    description: "오늘의 운세를 확인해보세요",
    href: "/fortune",
  },
  {
    title: "선물 보관함",
    description: "스크랩했던 선물리스트를 다시 확인할 수 있어요",
    href: "/my-page/saved",
  },
  {
    title: "문의하기",
    description: "선물 입점 | 선물 관련 문의합니다",
    href: "/inquiry",
  },
];

export default function MyPage() {
  return (
    <>
      <Header theme="light" isLoggedIn={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>마이페이지</h1>

          <div className={styles.content}>
            <Card
              as="a"
              variant="cta"
              ctaType="icon"
              imageSrc="/imgs/avatar-default.png"
              imageAlt="프로필 이미지"
              title="맛있는당근님"
              icon={<EditPencilIcon size={14} />}
              description="내 정보 수정하기"
              link={{ href: "/my-page/edit" }}
            />

            <div className={styles.menu_grid}>
              {MENU_CARDS.map((card) => (
                <Card
                  key={card.href}
                  as="a"
                  variant="cta"
                  ctaType="text"
                  title={card.title}
                  description={card.description}
                  link={{ href: card.href }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
