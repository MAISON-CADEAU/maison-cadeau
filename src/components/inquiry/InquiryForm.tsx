"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Textarea, FileInput } from "@/components/common/input";
import { Button } from "@/components/common/button";
import styles from "./InquiryForm.module.scss";
import { ChevronLeftIcon } from "../common";

const inquirySchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  email: z.string().email("메일 형식으로 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export const InquiryForm = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: InquiryFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("email", data.email);
    formData.append("content", data.content);
    if (selectedFile) formData.append("file", selectedFile);

    const res = await fetch("/api/inquiry", { method: "POST", body: formData });
    if (res.ok) {
      alert("문의가 성공적으로 전송되었습니다.");
      router.back();
    } else {
      const { error } = await res.json();
      alert(error ?? "전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.inquiry_form}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <div className={styles.title_icon}><ChevronLeftIcon width="28px" height="28px"/></div>
          문의하기</h1>
      </div>

      <p className={styles.description}>
        메종카도에 대해 궁금한 점이 있다면
        <br />
        편하게 문의해주세요
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.input_container}>
          <Input
            label="제목"
            variant="grey"
            placeholder="게시물 올리고 싶어요"
            error={errors.title?.message}
            {...register("title")}
          />
        
          <FileInput
            label="파일첨부"
            placeholder="파일을 선택해주세요"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />

          <Input
            label="메일"
            variant="grey"
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
        </div>

        <Button
          type="submit"
          variant="background-black-2xl"
          disabled={isSubmitting}
          style={{ width: "100%" }}
        >
          보내기
        </Button>
      </form>
    </div>
  );
};
