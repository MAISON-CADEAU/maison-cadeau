"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { createClient } from "@/lib/supabase/client";
import { ChevronLeftIcon } from "@/components/common/icons";
import styles from "./page.module.scss";

export default function MyPageEditPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 비밀번호
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 상태
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const name =
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "";
      setUserName(name);
      const avatar =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;
      setProfileImageUrl(avatar);
    });
  }, [router]);

  const avatarLetter = userName.charAt(0).toUpperCase() || "U";
  const displayImage = previewUrl || profileImageUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 이름 저장
  const handleNameSave = async () => {
    if (!userName.trim()) {
      setNameError("이름을 입력해주세요.");
      return;
    }
    setNameError("");
    setIsLoading(true);
    try {
      const supabase = createClient();

      // 프로필 사진 업로드 (선택된 경우)
      let avatarUrl = profileImageUrl;
      if (selectedFile) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const ext = selectedFile.name.split(".").pop();
          const path = `avatars/${user.id}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(path, selectedFile, { upsert: true });
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from("avatars")
              .getPublicUrl(path);
            avatarUrl = publicUrl;
          }
        }
      }

      const { error } = await supabase.auth.updateUser({
        data: { name: userName.trim(), avatar_url: avatarUrl },
      });

      if (error) {
        setNameError("저장 중 오류가 발생했습니다.");
      } else {
        setProfileImageUrl(avatarUrl);
        setSelectedFile(null);
        setSuccessMessage("프로필이 저장되었습니다.");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 비밀번호 변경
  const handlePasswordSave = async () => {
    if (!newPassword) {
      setPasswordError("새 비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    setPasswordError("");
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordError("비밀번호 변경 중 오류가 발생했습니다.");
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccessMessage("비밀번호가 변경되었습니다.");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <div className={styles.container}>
        <div className={styles.page_header}>
            <button
              type="button"
              className={styles.back_button}
              onClick={() => router.back()}
              aria-label="뒤로가기"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <h1 className={styles.title}>내 정보 수정하기</h1>
          </div>

          {successMessage && (
            <div className={styles.success_toast}>{successMessage}</div>
          )}

          <div className={styles.sections}>
            {/* 프로필 섹션 */}
            <section className={styles.section}>
              <h2 className={styles.section_title}>프로필</h2>

              {/* 아바타 */}
              <div className={styles.avatar_area}>
                <div
                  className={styles.avatar_wrap}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt="프로필 이미지"
                      fill
                      sizes="100px"
                      className={styles.avatar_img}
                    />
                  ) : (
                    <span className={styles.avatar_letter}>{avatarLetter}</span>
                  )}
                  <div className={styles.avatar_overlay}>
                    <span className={styles.avatar_overlay_text}>변경</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className={styles.file_input_hidden}
                  onChange={handleFileChange}
                />
                <p className={styles.avatar_hint}>클릭하여 사진 변경</p>
              </div>

              {/* 이름 */}
              <div className={styles.field_group}>
                <Input
                  label="이름"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  error={nameError}
                  placeholder="이름을 입력해주세요"
                />
                <Button
                  variant="background-black-lg"
                  onClick={handleNameSave}
                  disabled={isLoading}
                >
                  저장
                </Button>
              </div>
            </section>

            {/* 비밀번호 섹션 */}
            <section className={styles.section}>
              <h2 className={styles.section_title}>비밀번호 변경</h2>
              <div className={styles.password_fields}>
                <Input
                  label="새 비밀번호"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호 (6자 이상)"
                  error={passwordError}
                />
                <Input
                  label="새 비밀번호 확인"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호를 다시 입력해주세요"
                  isValid={
                    !!confirmPassword && newPassword === confirmPassword
                  }
                />
                <Button
                  variant="background-black-lg"
                  onClick={handlePasswordSave}
                  disabled={isLoading}
                >
                  비밀번호 변경
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
