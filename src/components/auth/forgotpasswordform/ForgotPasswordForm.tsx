"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/features/auth/api/authApi";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import styles from "./ForgotPasswordForm.module.scss";

const forgotPasswordSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await authApi.resetPassword(data.email);
      setIsSuccess(true);
    } catch {
      setError("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.forgot_container}>
        <h1 className={styles.title}>FORGOT PASSWORD</h1>
        <p className={styles.success_message}>
          비밀번호 재설정 링크를 이메일로 보내드렸습니다.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.forgot_container}>
      <h1 className={styles.title}>FORGOT PASSWORD</h1>
      <p className={styles.subtitle}>메일로 비밀번호 재설정 링크를 보내드립니다</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          variant="default"
          type="email"
          placeholder="메일"
          error={errors.email?.message}
          {...register("email")}
        />

        {error && <p className={styles.error_message}>{error}</p>}

        <Button
          type="submit"
          variant="background-black-lg"
          disabled={isLoading}
          style={{ width: "100%" }}
        >
          {isLoading ? "전송 중..." : "비밀번호 찾기"}
        </Button>
      </form>
    </div>
  );
};
