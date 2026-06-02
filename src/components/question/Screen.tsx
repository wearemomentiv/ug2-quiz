import { Heading } from "@/components/Heading";
import { PageHeader } from "@/components/PageHeader";
import { Wrapper } from "@/components/Wrapper";
import { AnswerButton } from "@/components/question/AnswerButton";

interface QuestionScreenProps {
  index: number;
  label: string;
  question: string;
  answers: string[];
  onAnswer: (index: number) => void;
}

export function QuestionScreen({ index, label, question, answers, onAnswer }: QuestionScreenProps) {
  return (
    <div className="flex flex-col h-full">
      <Wrapper className="bg-brand-slate">
        <PageHeader>
          <div className="flex items-center justify-between gap-x-4">
            <p className="text-lg text-brand-warm-grey/50 font-medium uppercase tracking-widest">Question</p>
            <p className="bg-brand-warm-grey text-brand-burgundy px-4 py-2 font-mono tracking-tighter">{index} / 5</p>
          </div>
        </PageHeader>

        <div className="flex flex-col gap-1 w-full">
          <Heading>{label}</Heading>
          <h1 className="text-6xl text-brand-warm-grey font-bold">{question}</h1>
        </div>
      </Wrapper>

      <Wrapper className="bg-brand-warm-grey h-full">
        <div className="grid grid-cols-2 gap-4 h-full">
          {answers.map((answer, index) => (
            <AnswerButton key={answer} index={index + 1} answer={answer} onClick={() => onAnswer(index)} />
          ))}
        </div>
      </Wrapper>
    </div>
  )
}
