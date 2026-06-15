interface AnswerButtonProps {
  index: number;
  answer: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function indexToLetter(index: number) {
  return String.fromCharCode(64 + index);
}

export function AnswerButton({ index, answer, selected = false, disabled = false, onClick }: AnswerButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center px-4 py-2 font-medium text-2xl rounded-sm border-2 gap-x-4 transition-all duration-200 ${
        selected
          ? "bg-brand-burgundy text-white border-brand-burgundy ring-4 ring-brand-burgundy/30 scale-[1.02]"
          : "bg-white text-black border-black/20"
      } ${disabled && !selected ? "opacity-50" : ""}`}
    >
      <div
        className={`flex flex-none items-center justify-center border-2 h-14 w-14 rounded-sm transition-colors duration-200 ${
          selected ? "border-white bg-white text-brand-burgundy" : "border-brand-warm-grey"
        }`}
      >
        {indexToLetter(index)}
      </div>
      <p className="text-left">{answer}</p>
    </button>
  )
}
