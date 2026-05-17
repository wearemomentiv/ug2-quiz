interface AnswerButtonProps {
  index: number;
  answer: string;
  onClick: () => void;
}

function indexToLetter(index: number) {
  return String.fromCharCode(64 + index);
}

export function AnswerButton({ index, answer, onClick }: AnswerButtonProps) {
  return (
    <button className="flex items-center bg-white text-black px-4 py-2 font-medium text-2xl rounded-sm border-2 border-black/20 gap-x-4" onClick={onClick}>
      <div className="flex flex-none items-center justify-center border-2 border-brand-warm-grey h-14 w-14 rounded-sm">{indexToLetter(index)}</div>
      <p className="text-left">{answer}</p>
    </button>
  )
}
