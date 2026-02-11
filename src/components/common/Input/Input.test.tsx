"use client";

import { useState } from "react";
import { Input } from "./Input";
import styles from "./Input.test.module.scss";

export const InputTest = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Input Component</h2>

      <section className={styles.section}>
        <h3 className={styles.section_title}>Basic</h3>
        <div className={styles.column}>
          <div className={styles.item}>
            <Input
              placeholder="기본 인풋"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
            />
            <code>{`<Input placeholder="기본 인풋" />`}</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>With Label</h3>
        <div className={styles.column}>
          <div className={styles.item}>
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
            />
            <code>{`<Input label="이메일" type="email" />`}</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>With Helper Text</h3>
        <div className={styles.column}>
          <div className={styles.item}>
            <Input
              label="닉네임"
              placeholder="닉네임 입력"
              helperText="2-10자의 한글, 영문, 숫자"
            />
            <code>{`<Input helperText="..." />`}</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>Error State</h3>
        <div className={styles.column}>
          <div className={styles.item}>
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              error="올바른 이메일 형식이 아닙니다"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
            />
            <code>{`<Input error="..." />`}</code>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.section_title}>Disabled</h3>
        <div className={styles.column}>
          <div className={styles.item}>
            <Input label="비활성화" placeholder="입력 불가" disabled />
            <code>{`<Input disabled />`}</code>
          </div>
        </div>
      </section>
    </div>
  );
};
