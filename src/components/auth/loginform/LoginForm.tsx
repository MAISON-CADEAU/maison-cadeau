"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth";
import { loginSchema, type LoginFormData } from "@/lib/utils/validators";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const { login, loginWithKakao, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch {
      // 에러는 useLogin에서 처리됨
    }
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.title}>LOGIN</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

        {error && <p className={styles.error_message}>{error}</p>}

        <Button
          type="submit"
          variant="background-black-lg"
          disabled={isLoading}
          style={{ width: "100%" }}
        >
          {isLoading ? "로그인 중..." : "로그인하기"}
        </Button>
      </form>

      <Button
        type="button"
        variant="kakao"
        onClick={loginWithKakao}
        disabled={isLoading}
        style={{ width: "100%" }}
      >
        카카오 로그인
      </Button>
    </div>
  );
};
