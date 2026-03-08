import { Button } from "@/components/common/button";
import styles from "../dev.module.scss";

export default function ButtonDevPage() {
  return (
    <>
      <h1 className={styles.page_title}>Button</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>1. Icon Group</h2>
        <Button variant="icon-group" />
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>2. Arrow</h2>
        <div className={styles.row}>
          <Button variant="arrow-left_bg" />
          <Button variant="arrow-right_bg" />
          <Button variant="arrow-left" />
          <Button variant="arrow-right" />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>3. House</h2>
        <Button variant="house">집들이 선물</Button>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>4. Primary and White</h2>
        <Button variant="primary">바로 선물하기</Button>
        <div>
          <Button variant="white">바로 선물하기</Button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>5. Secondary</h2>
        <div className={styles.col}>
          <Button variant="background-gray">이 질문은 넘어갈래요</Button>
          <Button variant="background-black-sm">다음 질문으로</Button>
          <Button variant="background-black-xl">다음</Button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>6. Kakao</h2>
        <Button variant="kakao">카카오 로그인</Button>
      </div>
    </>
  );
}
