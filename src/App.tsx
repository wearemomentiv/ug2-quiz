import { useState } from "react"

import { IntroScreen } from "@/components/intro/Screen"
import { QuestionScreen } from "@/components/question/Screen"

const QUESTIONS = [
  {
    label: "OOPS.",
    q: "You spot someone else's error in a critical report. You:",
    a: [
      { text: "Fix it yourself and don't mention it.", archetype: "commitment" },
      { text: "Make the correction, then mention it one-on-one to your colleague.", archetype: "trust" },
      { text: "Send it to the person and suggest they correct it themselves.", archetype: "expertise" },
      { text: "Yell and wave your arms around.", archetype: "innovation" },
    ],
  },
  {
    label: "OUCH.",
    q: "While discussing a problem, a co-worker says something passive-aggressive about your idea. You:",
    a: [
      { text: "Pretend not to notice and calmly move on.", archetype: "trust" },
      { text: "Act curious and invite them to say more.", archetype: "commitment" },
      { text: "Ask them what their own great idea is.", archetype: "innovation" },
      { text: "Leave for the day.", archetype: "expertise" },
    ],
  },
  {
    label: "OH NO.",
    q: "Your most effective problem solving happens:",
    a: [
      { text: "During an informal chat with others.", archetype: "trust" },
      { text: "On a solo walk or drive.", archetype: "innovation" },
      { text: "In a formal meeting with an agenda.", archetype: "expertise" },
      { text: "In a REM-sleep dream (or nightmare).", archetype: "commitment" },
    ],
  },
  {
    label: "AH HA.",
    q: "You are most excited by solutions and ideas that are:",
    a: [
      { text: "Complex and detailed.", archetype: "expertise" },
      { text: "Simple and straightforward.", archetype: "trust" },
      { text: "Proven and longstanding.", archetype: "commitment" },
      { text: "Innovative and new.", archetype: "innovation" },
    ],
  },
  {
    label: "WOW.",
    q: "A customer mentions needing extra help with a major project — something that could be a great opportunity for you. You:",
    a: [
      { text: "Nod, say little, and file it away to brainstorm a great pitch later.", archetype: "innovation" },
      { text: "Ask them more detailed questions about their needs.", archetype: "commitment" },
      { text: "Pitch them a detailed solution on the spot.", archetype: "expertise" },
      { text: "Clap and say, \u201cNow I've got you right where I want you.\u201d", archetype: "trust" },
    ],
  },
];

function App() {
  const [answers, setAnswers] = useState<number[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)

  return (
    <>
      {isStarted ?
        <QuestionScreen
          index={currentQuestion}
          label={QUESTIONS[currentQuestion - 1].label}
          question={QUESTIONS[currentQuestion - 1].q}
          answers={QUESTIONS[currentQuestion - 1].a.map((a) => a.text)}
          onAnswer={(index) => {
            setAnswers([...answers, index])
            setCurrentQuestion(currentQuestion + 1)
          }}
        /> :<IntroScreen onStart={() => setIsStarted(true)} />
      }
    </>
  )
}

export default App
