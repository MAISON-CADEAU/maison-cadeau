"use client";

import { Suspense } from "react";
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

const STEPS: {
  step: number;
  question: string;
  key: keyof IRecommendAnswers;
  options: string[];
  extra?: string;
}[] = [
  {
    step: 1,
    question: "어떤 상황에서 선물하실 예정인가요?",
    key: "situation",
    options: [
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
    ],
    extra: "다른 상황이에요",
  },
  {
    step: 2,
    question: "받으시는 분은 어떤 취향이신가요?",
    key: "preference",
    options: [
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
    ],
    extra: "다른 취향이에요",
  },
  {
    step: 3,
    question: "선물받으시는 분의 성별은 무엇인가요?",
    key: "gender",
    options: ["남성", "여성"],
  },
  {
    step: 4,
    question: "준비하실 선물의 예산이 어떻게 되시나요?",
    key: "budget",
    options: [
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

  const currentStep = STEPS[step - 1];
  const selectedValue = answers[currentStep.key];

  const handleSelect = (value: string) => {
    setAnswer(currentStep.key, value);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      router.push(`/ai-recommend?step=${step + 1}`);
    } else {
      router.push("/ai-recommend/result");
    }
  };

  const handleSkip = () => {
    if (step < TOTAL_STEPS) {
      router.push(`/ai-recommend?step=${step + 1}`);
    } else {
      router.push("/ai-recommend/result");
    }
  };

  const isGenderStep = step === 3;

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
              {chunkArray(currentStep.options, OPTIONS_PER_ROW).map((row, rowIndex) => (
                <div key={rowIndex} className={styles.option_row}>
                  {row.map((option) => (
                    <Button
                      key={option}
                      variant="house"
                      className={selectedValue === option ? styles.selected : ""}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {currentStep.extra && (
            <button className={styles.extra_button}>{currentStep.extra}</button>
          )}

          <div className={styles.step_actions}>
            <Button variant="background-gray" onClick={handleSkip}>
              이 질문은 넘어갈래요
            </Button>
            <Button variant="background-black-xl" onClick={handleNext} disabled={!selectedValue}>
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
