"use client";

import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlusIcon, ShareIcon, ArrowLeftIcon, ArrowRightIcon, KakaoIcon, InstaBlackIcon, TwitterIcon, ThreadsIcon } from "@/components/common/icons";
import { createClient } from "@/lib/supabase/client";
import type { IButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, children, style, giftId, ...props }, ref) => {
    const router = useRouter();
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [scrapDone, setScrapDone] = useState(false);

    const buttonClassNames = [
      styles.button,
      styles[`button_${variant.replace(/-/g, "_")}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const customStyle = {
      ...style,
    };

    // Icon group buttons
    if (variant === "icon-group") {
      const handleScrap = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }
        if (giftId) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { error } = await (supabase as any).from("scraps").insert({ user_id: user.id, gift_id: giftId });
          if (error) {
            console.error("스크랩 저장 오류:", error);
            return;
          }
        }
        setScrapDone(true);
        setTimeout(() => setScrapDone(false), 2000);
      };

      const handleSharePlatform = (platform: string) => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        const text = "메종카도에서 발견한 선물 아이디어를 공유해요!";
        const shareUrls: Record<string, string> = {
          kakao: `https://story.kakao.com/share?url=${encodeURIComponent(url)}`,
          instagram: `https://www.instagram.com/`,
          x: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${text} ${url}`)}`,
        };
        window.open(shareUrls[platform], "_blank");
        setShowShareMenu(false);
      };

      return (
        <div className={styles.icon_group_wrapper}>
          <button className={`${styles.button} ${styles.button_icon_item}`} onClick={handleScrap}>
            <FolderPlusIcon size={20} color="currentColor" />
            <span className={styles.label}>스크랩하기</span>
          </button>

          <div className={styles.share_container}>
            <button
              className={`${styles.button} ${styles.button_icon_item}`}
              onClick={() => setShowShareMenu((prev) => !prev)}
            >
              <ShareIcon size={20} color="currentColor" />
              <span className={styles.label}>공유하기</span>
            </button>

            {showShareMenu && (
              <>
                <div className={styles.share_overlay} onClick={() => setShowShareMenu(false)} />
                <div className={styles.share_menu}>
                  <button className={styles.share_item} onClick={() => handleSharePlatform("kakao")}>
                    <KakaoIcon size={20} />
                    <span>카카오톡</span>
                  </button>
                  <button className={styles.share_item} onClick={() => handleSharePlatform("instagram")}>
                    <InstaBlackIcon size={20} />
                    <span>인스타그램</span>
                  </button>
                  <button className={styles.share_item} onClick={() => handleSharePlatform("x")}>
                    <TwitterIcon size={20} />
                    <span>X</span>
                  </button>
                  <button className={styles.share_item} onClick={() => handleSharePlatform("threads")}>
                    <ThreadsIcon size={20} color="currentColor" />
                    <span>쓰레드</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {scrapDone && (
            <div className={styles.scrap_toast}>
              선물 보관함에 저장되었습니다.
            </div>
          )}
        </div>
      );
    }

    // Arrow buttons
    if (variant === "arrow-left_bg") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowLeftIcon size={20} color="currentColor" />
        </button>
      );
    }

    if (variant === "arrow-right_bg") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowRightIcon size={20} color="currentColor" />
        </button>
      );
    }

    if (variant === "arrow-left") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowLeftIcon size={20} color="currentColor" />
        </button>
      );
    }

    if (variant === "arrow-right") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <ArrowRightIcon size={20} color="currentColor" />
        </button>
      );
    }

    // House emoji button (3, 3-1)
    if (variant === "house") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <span className={styles.emoji}>🏠</span>
          <span className={styles.label}>{children}</span>
        </button>
      );
    }

    // Primary buttons (4, 4-1)
    if (variant === "primary" || variant === "white") {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        router.push("/ai-recommend");
      };
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props} onClick={handleClick}>
          {children}
        </button>
      );
    }

    // Secondary buttons (5, 5-1)
    if (variant === "background-gray" || variant === "background-black-sm" || variant === "background-black-lg" || variant === "background-black-xl" || variant === "background-black-2xl") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          {children}
        </button>
      );
    }

    //
    if (variant === "border-sm" || variant === "border-lg") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          {children}
        </button>
      );
    }

    // Kakao button (7)
    if (variant === "kakao") {
      return (
        <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
          <KakaoIcon size={24} color="currentColor" />
          <span className={styles.label}>{children}</span>
        </button>
      );
    }

    return (
      <button ref={ref} className={buttonClassNames} style={customStyle} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
