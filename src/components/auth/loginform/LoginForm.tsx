"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth";
import { loginSchema, type LoginFormData } from "@/lib/utils/validators";
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
      <div className={styles.title_section}>
        <h1 className={styles.title}>LOGIN</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <input
            type="email"
            placeholder="메일"
            className={`${styles.input} ${errors.email ? styles.input_error : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error_text}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="비밀번호"
            className={`${styles.input} ${errors.password ? styles.input_error : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error_text}>{errors.password.message}</p>
          )}
        </div>

        {error && <p className={styles.error_message}>{error}</p>}

        <button type="submit" disabled={isLoading} className={styles.submit_button}>
          {isLoading ? "로그인 중..." : "로그인하기"}
        </button>
      </form>

      <button
        type="button"
        onClick={loginWithKakao}
        disabled={isLoading}
        className={styles.kakao_button}
      >
        <svg className={styles.kakao_icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.058 5.892-.178.664-.644 2.406-.738 2.783-.116.464.17.457.356.333.146-.097 2.325-1.576 3.267-2.211.35.049.706.075 1.067.075 5.523 0 10-3.477 10-7.872C20 6.477 17.523 3 12 3z" />
        </svg>
        카카오 로그인
      </button>
    </div>
  );
};
