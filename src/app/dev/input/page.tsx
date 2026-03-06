"use client";

import { useState } from "react";
import { Input, Textarea, Checkbox, validateEmail, validatePassword } from "@/components/common/input";
import styles from "../dev.module.scss";
import pageStyles from "./page.module.scss";

export default function InputDevPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length === 0) {
      setEmailError("");
      setIsEmailValid(false);
    } else if (!validateEmail(value)) {
      setEmailError("메일주소 형식으로 입력해주세요");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length === 0) {
      setPasswordError("");
      setIsPasswordValid(false);
    } else if (!validatePassword(value)) {
      setPasswordError("비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  return (
    <>
      <h1 className={styles.page_title}>Input</h1>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Email (유효성 검사)</h2>
        <div className={pageStyles.input_wrap}>
          <Input
            type="email"
            variant="default"
            placeholder="메일주소를 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            isValid={isEmailValid}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Password (유효성 검사)</h2>
        <div className={pageStyles.input_wrap}>
          <Input
            type="password"
            variant="default"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            isValid={isPasswordValid}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Search</h2>
        <div className={pageStyles.input_wrap}>
          <Input variant="search" placeholder="찾고싶은 선물을 검색해보세요" />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Grey</h2>
        <div className={pageStyles.input_wrap}>
          <Input variant="grey" placeholder="글자를 입력해주세요" />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Textarea</h2>
        <div className={pageStyles.input_wrap}>
          <Textarea placeholder="글자를 입력해주세요" rows={6} />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.section_title}>Checkbox</h2>
        <div className={styles.col}>
          <Checkbox label="체크박스 옵션 1" />
          <Checkbox label="체크박스 옵션 2" defaultChecked />
          <Checkbox label="체크박스 옵션 3" />
        </div>
      </div>
    </>
  );
}
