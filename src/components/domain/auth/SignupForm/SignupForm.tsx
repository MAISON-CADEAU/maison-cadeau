"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useSignup, useLogin } from "@/features/auth";
import { signupSchema, type SignupFormData } from "@/lib/utils/validators";
import styles from "./SignupForm.module.scss";

export const SignupForm = () => {
  const { signup, isLoading, error } = useSignup();
  const { loginWithKakao, isLoading: isKakaoLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      marketingAgreed: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        name: data.name,
        marketingAgreed: data.marketingAgreed,
      });
    } catch {
      // 에러는 useSignup에서 처리됨
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.title_section}>
        <h1 className={styles.title}>회원가입</h1>
        <p className={styles.subtitle}>
          센스 있는 선물 큐레이터에 오신 것을 환영합니다
        </p>
      </div>

      <Button
        type="button"
        variant="kakao"
        fullWidth
        onClick={loginWithKakao}
        isLoading={isKakaoLoading}
      >
        <svg className={styles.kakao_icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.058 5.892-.178.664-.644 2.406-.738 2.783-.116.464.17.457.356.333.146-.097 2.325-1.576 3.267-2.211.35.049.706.075 1.067.075 5.523 0 10-3.477 10-7.872C20 6.477 17.523 3 12 3z" />
        </svg>
        카카오로 시작하기
      </Button>

      <div className={styles.divider}>
        <div className={styles.divider_line}>
          <div className={styles.divider_border} />
        </div>
        <div className={styles.divider_text}>
          <span className={styles.divider_label}>또는 이메일로 가입</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="8자 이상, 영문+숫자"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          error={errors.name?.message}
          {...register("name")}
        />

        <div className={styles.agreements}>
          <label className={styles.agreement_item}>
            <input
              type="checkbox"
              className={`${styles.checkbox} ${errors.termsAgreed ? styles.checkbox_error : ""}`}
              {...register("termsAgreed")}
            />
            <span className={styles.agreement_text}>
              <span className={styles.required}>*</span>{" "}
              <Link href="/terms" className={styles.link}>
                이용약관
              </Link>
              에 동의합니다
            </span>
          </label>
          {errors.termsAgreed && (
            <p className={styles.agreement_error}>{errors.termsAgreed.message}</p>
          )}

          <label className={styles.agreement_item}>
            <input
              type="checkbox"
              className={`${styles.checkbox} ${errors.privacyAgreed ? styles.checkbox_error : ""}`}
              {...register("privacyAgreed")}
            />
            <span className={styles.agreement_text}>
              <span className={styles.required}>*</span>{" "}
              <Link href="/privacy" className={styles.link}>
                개인정보 처리방침
              </Link>
              에 동의합니다
            </span>
          </label>
          {errors.privacyAgreed && (
            <p className={styles.agreement_error}>{errors.privacyAgreed.message}</p>
          )}

          <label className={styles.agreement_item}>
            <input
              type="checkbox"
              className={styles.checkbox}
              {...register("marketingAgreed")}
            />
            <span className={styles.agreement_text}>
              마케팅 정보 수신에 동의합니다 (선택)
            </span>
          </label>
        </div>

        {error && <p className={styles.error_message}>{error}</p>}

        <Button type="submit" fullWidth isLoading={isLoading}>
          가입하기
        </Button>
      </form>

      <div className={styles.login_section}>
        <span className={styles.login_text}>이미 계정이 있으신가요? </span>
        <Link href="/login" className={styles.login_link}>
          로그인
        </Link>
      </div>
    </div>
  );
};
