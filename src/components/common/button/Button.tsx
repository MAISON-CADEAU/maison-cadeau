"use client";

import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlusIcon, ShareIcon, ArrowLeftIcon, ArrowRightIcon, KakaoIcon, InstaBlackIcon, TwitterIcon } from "@/components/common/icons";
import type { IButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, children, style, ...props }, ref) => {
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
      const handleScrap = () => {
        const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("dev_isLoggedIn") === "true";
        if (!isLoggedIn) {
          router.push("/login");
          return;
        }
        // TODO: Supabase 연동 시 실제 저장 로직으로 대체
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
                    <svg width="20" height="20" viewBox="0 0 192 192" fill="currentColor">
                      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.05l13.204 9.07c5.73-8.695 14.724-10.548 21.916-10.548h.233c8.455.054 14.mazin 2.694 18.05 7.91 2.833 3.855 4.09 8.89 3.778 14.96a73.086 73.086 0 0 0-14.523-1.18c-20.956 0-34.44 11.728-33.558 30.81.45 9.655 5.35 17.972 13.793 23.426 7.146 4.666 16.353 6.964 25.877 6.488 12.91-.64 23.064-5.644 30.171-14.868 5.358-6.972 8.506-15.95 9.397-26.698.617.365 1.206.742 1.764 1.13 8.014 5.495 13.52 13.535 14.43 22.905 1.6 16.454-4.36 30.66-16.67 40.012-11.14 8.455-27.313 12.754-48.088 12.77-19.33-.019-34.98-4.752-46.532-14.073C62.94 154.31 57.4 141.6 57.4 126.4c0-15.2 5.54-27.91 16.472-37.827 10.97-9.95 26.57-15.032 46.37-15.117a89.23 89.23 0 0 1 21.295 2.532Zm-21.295 37.098c-8.79 0-14.89-3.974-15.257-10.04-.233-3.802 1.524-7.09 4.914-9.25 3.18-2.047 7.478-3.06 12.77-3.006.985.01 1.965.04 2.934.087 2.01.1 3.945.28 5.793.534-.617 12.293-4.733 21.675-11.154 21.675Z"/>
                    </svg>
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
