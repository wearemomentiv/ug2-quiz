import { useEffect, useRef, useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Wrapper } from "@/components/Wrapper";
import { AnswerButton } from "@/components/question/AnswerButton";

interface QuestionScreenProps {
  index: number;
  question: string;
  answers: string[];
  onAnswer: (index: number) => void;
}

const SELECTION_HIGHLIGHT_MS = 450;

export function QuestionScreen({ index, question, answers, onAnswer }: QuestionScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSelect = (answerIndex: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(answerIndex);
    timeoutRef.current = setTimeout(() => onAnswer(answerIndex), SELECTION_HIGHLIGHT_MS);
  };

  return (
    <div className="flex flex-col h-full">
      <Wrapper className="bg-brand-slate">
        <PageHeader>
          <div className="flex items-center justify-between gap-x-4">
            <p className="text-lg text-white/50 font-medium uppercase tracking-widest">Question</p>
            <p className="bg-brand-warm-grey text-brand-burgundy px-4 py-2 font-mono tracking-tighter">{index} / 5</p>
          </div>
        </PageHeader>

        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-6xl text-white font-bold">{question}</h1>
        </div>
      </Wrapper>

      <Wrapper className="bg-brand-warm-grey h-full">
        <div className="grid grid-cols-2 gap-4 h-full">
          {answers.map((answer, answerIndex) => (
            <AnswerButton
              key={answer}
              index={answerIndex + 1}
              answer={answer}
              selected={selectedIndex === answerIndex}
              disabled={selectedIndex !== null && selectedIndex !== answerIndex}
              onClick={() => handleSelect(answerIndex)}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  )
}
