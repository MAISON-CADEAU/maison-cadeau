"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Checkbox } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { useSignup } from "@/features/auth";
import { signupSchema, type SignupFormData } from "@/lib/utils/validators";
import styles from "./SignupForm.module.scss";

export const SignupForm = () => {
  const { signup, isLoading, error, needsEmailConfirm } = useSignup();

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

  if (needsEmailConfirm) {
    return (
      <div className={styles.signup_container}>
        <h1 className={styles.title}>JOIN US</h1>
        <p className={styles.confirm_message}>
          입력하신 이메일로 인증 링크를 보내드렸습니다.<br />
          이메일에서 인증을 완료해야 회원가입이 완료됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.signup_container}>
      <h1 className={styles.title}>JOIN US</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.signup_input_box}>
          <Input
            variant="default"
            type="text"
            placeholder="이름"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            variant="default"
            type="email"
            placeholder="메일"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            variant="default"
            type="password"
            placeholder="비밀번호"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            variant="default"
            type="password"
            placeholder="비밀번호 확인"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className={styles.checkbox_wrapper}>
            <Checkbox
              label="이용약관에 동의합니다"
              {...register("termsAgreed")}
            />
            {errors.termsAgreed && (
              <p className={styles.error_text}>{errors.termsAgreed.message}</p>
            )}
          </div>

          <div className={styles.checkbox_wrapper}>
            <Checkbox
              label="개인정보 처리방침에 동의합니다"
              {...register("privacyAgreed")}
            />
            {errors.privacyAgreed && (
              <p className={styles.error_text}>{errors.privacyAgreed.message}</p>
            )}
          </div>
  
          {error && <p className={styles.error_message}>{error}</p>}
        </div>

        <Button
          type="submit"
          variant="background-black-lg"
          disabled={isLoading}
          style={{ width: "100%" }}
        >
          {isLoading ? "가입 중..." : "회원가입하기"}
        </Button>
      </form>
    </div>
  );
};
