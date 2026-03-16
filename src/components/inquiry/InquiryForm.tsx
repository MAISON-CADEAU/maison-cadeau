"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Textarea } from "@/components/common/input";
import { Button } from "@/components/common/button";
import styles from "./InquiryForm.module.scss";

const inquirySchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  file: z.string().optional(),
  email: z.string().email("메일 형식으로 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export const InquiryForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: InquiryFormData) => {
    console.log(data);
    // TODO: API 연동
  };

  return (
    <div className={styles.inquiry_form}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.back_button}
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className={styles.title}>문의하기</h1>
      </div>

      <p className={styles.description}>
        메종카도에 대해 궁금한 점이 있다면
        <br />
        편하게 문의해주세요
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="제목"
          variant="default"
          placeholder="게시물 올리고 싶어요"
          error={errors.title?.message}
          {...register("title")}
        />

        <Input
          label="파일첨부"
          variant="default"
          placeholder="게시물 올리고 싶어요"
          error={errors.file?.message}
          {...register("file")}
        />

        <Input
          label="메일"
          variant="default"
          type="email"
          placeholder="메일 정보를 입력해주세요"
          error={errors.email?.message}
          {...register("email")}
        />

        <Textarea
          label="내용"
          placeholder="안녕하세요 게시물은 어떻게 올리나요?"
          error={errors.content?.message}
          rows={6}
          {...register("content")}
        />

        <Button
          type="submit"
          variant="background-black-lg"
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          보내기
        </Button>
      </form>
    </div>
  );
};
