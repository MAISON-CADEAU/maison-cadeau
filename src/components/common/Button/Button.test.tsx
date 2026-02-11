"use client";

import { useState } from "react";
import { Button } from "./Button";
import styles from "./Button.test.module.scss";

export const ButtonTest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Button Component</h2>

      <section className={styles.section}>
        <h3 className={styles.section_title}>Variants</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <Button variant="primary">Primary</Button>
            <code>variant="primary"</code>
          </div>
          <div className={styles.item}>
            <Button variant="secondary">Secondary</Button>
            <code>variant="secondary"</code>
          </div>
          <div className={styles.item}>
            <Button variant="outline">Outline</Button>
            <code>variant="outline"</code>
          </div>
          <div className={styles.item}>
            <Button variant="ghost">Ghost</Button>
            <code>variant="ghost"</code>
          </div>
          <div className={styles.item}>
            <Button variant="kakao">Kakao</Button>
            <code>variant="kakao"</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>Sizes</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <Button size="sm">Small</Button>
            <code>size="sm"</code>
          </div>
          <div className={styles.item}>
            <Button size="md">Medium</Button>
            <code>size="md"</code>
          </div>
          <div className={styles.item}>
            <Button size="lg">Large</Button>
            <code>size="lg"</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>States</h3>
        <div className={styles.grid}>
          <div className={styles.item}>
            <Button disabled>Disabled</Button>
            <code>disabled</code>
          </div>
          <div className={styles.item}>
            <Button isLoading={isLoading} onClick={handleLoadingClick}>
              {isLoading ? "Loading..." : "Click to Load"}
            </Button>
            <code>isLoading</code>
          </div>
          <div className={styles.item}>
            <Button fullWidth>Full Width</Button>
            <code>fullWidth</code>
          </div>
        </div>
      </section>
    </div>
  );
};
