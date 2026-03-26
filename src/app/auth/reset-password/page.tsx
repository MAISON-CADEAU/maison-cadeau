"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import styles from "./page.module.scss";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const supabase = createClient();

    // URL의 code 파라미터로 세션 교환
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            setError("유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해주세요.");
          } else {
            setIsValidSession(true);
          }
          setIsChecking(false);
        });
    } else {
      // 이미 recovery 세션이 있는 경우 (URL fragment 방식)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsValidSession(true);
        } else {
          setError("유효하지 않은 링크입니다. 비밀번호 찾기를 다시 시도해주세요.");
        }
        setIsChecking(false);
      });
    }
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header theme="light" />
      <div className={styles.auth_layout}>
        <div className={styles.image_section} />
        <div className={styles.form_section}>
          <div className={styles.reset_container}>
            <h1 className={styles.title}>RESET PASSWORD</h1>

            {isChecking ? (
              <p className={styles.subtitle}>인증 확인 중...</p>
            ) : isSuccess ? (
              <>
                <p className={styles.success_message}>
                  비밀번호가 변경되었습니다.
                </p>
                <p className={styles.subtitle}>로그인 페이지로 이동합니다...</p>
              </>
            ) : !isValidSession ? (
              <>
                <p className={styles.error_message}>{error}</p>
                <Button
                  variant="background-black-lg"
                  onClick={() => router.push("/forgot-password")}
                  style={{ width: "100%", marginTop: "1.5rem" }}
                >
                  비밀번호 찾기로 돌아가기
                </Button>
              </>
            ) : (
              <>
                <p className={styles.subtitle}>새 비밀번호를 입력해주세요</p>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.input_box}>
                    <Input
                      variant="default"
                      type="password"
                      placeholder="새 비밀번호"
                      error={errors.password?.message}
                      {...register("password")}
                    />
                    <Input
                      variant="default"
                      type="password"
                      placeholder="새 비밀번호 확인"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword")}
                    />
                    {error && <p className={styles.error_message}>{error}</p>}
                  </div>
                  <Button
                    type="submit"
                    variant="background-black-lg"
                    disabled={isLoading}
                    style={{ width: "100%" }}
                  >
                    {isLoading ? "변경 중..." : "비밀번호 변경하기"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
