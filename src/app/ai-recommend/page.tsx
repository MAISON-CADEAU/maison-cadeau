"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Banner } from "@/components/common/banner";
import { Card } from "@/components/common/card";
import * as Icons from "@/components/common/icons";
import { Button } from "@/components/common";
import { useRecommendStore } from "@/store/recommendStore";
import type { IRecommendAnswers } from "@/store/recommendStore";
import styles from "./page.module.scss";

const OPTIONS_PER_ROW = 4;

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

const TOTAL_STEPS = 4;

const SITUATION_OPTIONS_A = [
  "집들이 선물",
  "생일선물",
  "연인·배우자에게",
  "졸업선물",
  "직장동료에게",
  "부모님께 드리는",
  "작은 소소한 선물",
  "아무 상황도 없어요",
  "명절 인사선물",
  "크리스마스 기념선물",
  "마음을 전하고 싶어요",
  "가벼운 비즈니스 선물",
];

const SITUATION_OPTIONS_B = [
  "결혼기념일",
  "아이 선물",
  "스승의 날",
  "어버이날",
  "발렌타인/화이트데이",
  "친구에게",
  "형제·자매에게",
  "합격·취직 축하",
  "돌잔치 선물",
  "고마운 마음 전달",
  "특별한 날 없이",
  "새학기 선물",
];

const PREFERENCE_OPTIONS_A = [
  "귀여운/러블리한",
  "심플한/실용적인",
  "우아한/고급스러운",
  "힙한/트렌디한",
  "유니크한/개성있는",
  "아기자기한/키치한",
  "내추럴한/우디한",
  "빈티지한/레트로 감성",
  "홈카페러버",
  "건강한/운동을 좋아하는",
  "반려동물 집사",
  "테크기기 덕후",
];

const PREFERENCE_OPTIONS_B = [
  "미니멀/모던한",
  "클래식/전통적인",
  "로맨틱한",
  "스포티한/액티브한",
  "고요한/명상적인",
  "화려한/컬러풀한",
  "아웃도어/자연친화적",
  "독서/문화적 취향",
  "음식/요리를 좋아하는",
  "여행을 좋아하는",
  "예술/크리에이티브한",
  "음악을 좋아하는",
];

const STEPS: {
  step: number;
  question: string;
  key: keyof IRecommendAnswers;
  optionsA: string[];
  optionsB?: string[];
  extraLabel?: string;
  multiSelect?: boolean;
}[] = [
  {
    step: 1,
    question: "어떤 상황에서 선물하실 예정인가요?",
    key: "situation",
    optionsA: SITUATION_OPTIONS_A,
    optionsB: SITUATION_OPTIONS_B,
    extraLabel: "다른 상황이에요",
  },
  {
    step: 2,
    question: "받으시는 분은 어떤 취향이신가요?",
    key: "preference",
    optionsA: PREFERENCE_OPTIONS_A,
    optionsB: PREFERENCE_OPTIONS_B,
    extraLabel: "다른 취향이에요",
    multiSelect: true,
  },
  {
    step: 3,
    question: "선물받으시는 분의 성별은 무엇인가요?",
    key: "gender",
    optionsA: ["남성", "여성"],
  },
  {
    step: 4,
    question: "준비하실 선물의 예산이 어떻게 되시나요?",
    key: "budget",
    optionsA: [
      "만원 이하",
      "만원이상 ~ 3만원 이하",
      "3만원 이상 ~ 5만원 이하",
      "10만원 이하",
      "10~20만원대",
      "20~30만원대",
      "30~50만원대",
      "100만원 이하",
      "100만원 이상",
      "금액 상관없어요",
    ],
  },
];

function RecommendContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Math.min(Math.max(Number(searchParams.get("step") ?? "1"), 1), TOTAL_STEPS);
  const { setAnswer, ...answers } = useRecommendStore();
  const [useAlternate, setUseAlternate] = useState(false);

  const currentStep = STEPS[step - 1];
  const selectedValue = answers[currentStep.key];
  const currentOptions = useAlternate && currentStep.optionsB
    ? currentStep.optionsB
    : currentStep.optionsA;

  const isMultiSelect = currentStep.multiSelect === true;
  const isGenderStep = step === 3;

  const isOptionSelected = (option: string) => {
    if (isMultiSelect) {
      return Array.isArray(selectedValue) && selectedValue.includes(option);
    }
    return selectedValue === option;
  };

  const hasSelection = isMultiSelect
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : selectedValue !== null;

  const handleSelect = (value: string) => {
    setAnswer(currentStep.key, value);
  };

  const handleAlternateToggle = () => {
    setUseAlternate((prev) => !prev);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setUseAlternate(false);
      router.push(`/ai-recommend?step=${step + 1}`);
    } else {
      router.push("/ai-recommend/result");
    }
  };

  const handleSkip = () => {
    if (step < TOTAL_STEPS) {
      setUseAlternate(false);
      router.push(`/ai-recommend?step=${step + 1}`);
    } else {
      router.push("/ai-recommend/result");
    }
  };

  return (
    <>
      <Header theme="light" />
      <main className={styles.main}>
        <section className={styles.hero_section}>
          <Banner
            layout="overlay"
            title="Find your Gift"
            description="선물할 상대를 생각하며 키워드를 골라보세요"
            image={{ src: "/imgs/banner-image-overlay.png", alt: "Banner Image" }}
          />
        </section>

        <section className={styles.step_section}>
          <div className={styles.step_header}>
            <span className={styles.step_indicator}>
              {step}/{TOTAL_STEPS}
            </span>
            <h3 className={styles.step_question}>{currentStep.question}</h3>
            {isMultiSelect && (
              <p className={styles.multi_select_hint}>
                최대 3개까지 선택 가능
                {Array.isArray(selectedValue) && selectedValue.length > 0
                  ? ` (${selectedValue.length}/3)`
                  : ""}
              </p>
            )}
          </div>

          {isGenderStep ? (
            <div className={styles.gender_options}>
              <Card
                variant="gender"
                as="button"
                isActive={selectedValue === "여성"}
                onClick={() => handleSelect("여성")}
                title="여성"
                icon={<Icons.FemaleIcon width={100} height={100} />}
              />
              <Card
                variant="gender"
                as="button"
                isActive={selectedValue === "남성"}
                onClick={() => handleSelect("남성")}
                title="남성"
                icon={<Icons.MaleIcon width={100} height={100} />}
              />
            </div>
          ) : (
            <div className={styles.options}>
              {chunkArray(currentOptions, OPTIONS_PER_ROW).map((row, rowIndex) => (
                <div key={rowIndex} className={styles.option_row}>
                  {row.map((option) => (
                    <Button
                      key={option}
                      variant="house"
                      className={isOptionSelected(option) ? styles.selected : ""}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {currentStep.optionsB && currentStep.extraLabel && (
            <button className={styles.extra_button} onClick={handleAlternateToggle}>
              <Icons.ReplyIcon />
              {useAlternate ? "기본 목록으로" : currentStep.extraLabel}
            </button>
          )}

          <div className={styles.step_actions}>
            <Button variant="background-gray" onClick={handleSkip}>
              이 질문은 넘어갈래요
            </Button>
            <Button variant="background-black-xl" onClick={handleNext} disabled={!hasSelection}>
              다음 질문으로
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function AiRecommendPage() {
  return (
    <Suspense>
      <RecommendContent />
    </Suspense>
  );
}
