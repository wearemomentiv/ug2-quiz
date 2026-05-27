import { useMemo, useState } from "react"

import { determineArchetype } from "@/archetypes"
import { IntroScreen } from "@/components/intro/Screen"
import { QuestionScreen } from "@/components/question/Screen"
import { ResultScreen } from "@/components/result/Screen"

const QUESTIONS = [
  {
    label: "OOPS.",
    q: "You spot someone else's error in a critical report. You:",
    a: [
      { text: "Invite the person to join you in fixing it together.", archetype: "trust" },
      { text: "Make the correction, then mention it one-on-one to your colleague.", archetype: "commitment" },
      { text: "Send it to the person and ask them to correct it themselves.", archetype: "expertise" },
      { text: "Propose a fix and send it directly to the person who made the error.", archetype: "innovation" },
      { text: "Yell and wave your arms around.", archetype: "none" },
    ],
  },
  {
    label: "OUCH.",
    q: "In a meeting, a co-worker says something passive-aggressive about your idea. You:",
    a: [
      { text: "Approach them after the meeting to discuss one-on-one.", archetype: "trust" },
      { text: "Invite them to say more about their issue with your idea.", archetype: "commitment" },
      { text: "Ask them if they\u2019d like to share an idea of their own.", archetype: "expertise" },
      { text: "Pretend not to notice and calmly continue making your case.", archetype: "innovation" },
      { text: "Leave for the day.", archetype: "none" },
    ],
  },
  {
    label: "OH NO.",
    q: "Your most effective problem solving happens:",
    a: [
      { text: "During an informal chat with others.", archetype: "trust" },
      { text: "Collaborating with others who have different POVs.", archetype: "commitment" },
      { text: "In a formal meeting with an agenda.", archetype: "expertise" },
      { text: "On a solo walk or drive.", archetype: "innovation" },
      { text: "In a REM-sleep dream (or nightmare).", archetype: "none" },
    ],
  },
  {
    label: "AH HA.",
    q: "You are most excited by solutions and ideas that are:",
    a: [
      { text: "Rough sketches that need a team effort.", archetype: "trust" },
      { text: "Good but disruptive and require winning others over.", archetype: "commitment" },
      { text: "Tested and data-backed.", archetype: "expertise" },
      { text: "Breaking new ground.", archetype: "innovation" },
      { text: "None of the above. You\u2019re too tired to be excited.", archetype: "none" },
    ],
  },
  {
    label: "WOW.",
    q: "A customer mentions needing extra help with a major project \u2014 something that could be a great opportunity for you. You:",
    a: [
      { text: "Ask them more detailed questions about their needs.", archetype: "trust" },
      { text: "Acknowledge potential challenges as a way to build trust.", archetype: "commitment" },
      { text: "Return later with detailed recommendations.", archetype: "expertise" },
      { text: "Pitch them a creative solution on the spot.", archetype: "innovation" },
      { text: "Clap and say, \u201cNow I\u2019ve got you right where I want you.\u201d", archetype: "none" },
    ],
  },
];

function App() {
  const [answers, setAnswers] = useState<number[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)

  const isFinished = answers.length >= QUESTIONS.length
  const result = useMemo(
    () => (isFinished ? determineArchetype(answers) : null),
    [isFinished, answers]
  )

  const handleRestart = () => {
    setAnswers([])
    setCurrentQuestion(1)
    setIsStarted(false)
  }

  if (!isStarted) {
    return <IntroScreen onStart={() => setIsStarted(true)} />
  }

  if (isFinished && result) {
    return <ResultScreen result={result} onRestart={handleRestart} />
  }

  return (
    <QuestionScreen
      index={currentQuestion}
      label={QUESTIONS[currentQuestion - 1].label}
      question={QUESTIONS[currentQuestion - 1].q}
      answers={QUESTIONS[currentQuestion - 1].a.map((a) => a.text)}
      onAnswer={(index) => {
        setAnswers([...answers, index])
        setCurrentQuestion(currentQuestion + 1)
      }}
    />
  )
}

export default App
