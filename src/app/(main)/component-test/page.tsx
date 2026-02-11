"use client";

import { ButtonTest } from "@/components/common/Button/Button.test";
import { InputTest } from "@/components/common/Input/Input.test";
import { IconsTest } from "@/components/common/icons/Icons.test";
import styles from "./page.module.scss";

export default function ComponentTestPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Component Test Page</h1>
        <p>모든 공통 컴포넌트를 한 페이지에서 테스트할 수 있습니다</p>
      </header>

      <div className={styles.components}>
        <ButtonTest />
        <InputTest />
        <IconsTest />
      </div>
    </main>
  );
}
