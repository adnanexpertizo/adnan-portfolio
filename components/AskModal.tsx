"use client"

import { useEffect, useState } from "react"
import { Send } from "lucide-react"

interface AskModalProps {
  question: string
  setQuestion: (val: string) => void
  openModal: boolean
  setOpenModal: (val: boolean) => void
}

export function AskModal({ openModal, setOpenModal }: AskModalProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
const fullAnswer = 
  "Adnan Rafiq is a NEBOSH Certified Safety Officer with 5+ years of professional experience. \n" +
  "Specialized in First Aid, Fire Safety, Risk Assessment, and Work at Height practices. \n" +
  "Skilled in conducting safety training, incident investigation, and compliance auditing. \n" +
  "Dedicated to creating safer workplaces through proactive risk management and awareness."

  const handleSend = () => {
    if (!question.trim()) return
    setAnswer("")
    setOpenModal(true)
  }

  useEffect(() => {
    if (openModal) {
      let i = 0
      const interval = setInterval(() => {
        setAnswer(fullAnswer.slice(0, i + 1))
        i++
        if (i >= fullAnswer.length) clearInterval(interval)
      }, 40) // typing speed
      return () => clearInterval(interval)
    }
  }, [openModal])

  const close = () => {
    setOpenModal(false)
    setQuestion("")
  }

  return (
    <>
      {/* Chat-style Input Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Ask Adnan anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full pr-12 pl-4 py-3 rounded-full border border-gray-300 bg-gray-50 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
        >
          <Send size={22} />
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-[fadeIn_0.3s_ease]">
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>

            <div className="p-6 space-y-4">
              <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 w-fit shadow-sm">
                {question}
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-gray-800 text-left whitespace-pre-line leading-relaxed shadow-inner">
                {answer}
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
