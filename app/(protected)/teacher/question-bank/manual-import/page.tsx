"use client"

import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/browser"

export default function ManualImportPage() {
  const supabase = supabaseBrowser

  const [message, setMessage] = useState<string | null>(null)

  // ===== PASSAGE =====
  const [passage, setPassage] = useState({
    title: "",
    content: "",
    passage_type: "reading",
    grade_level: 6,
    audio_url: "",
  })

  // ===== QUESTION FLOW =====
  const [totalQuestions, setTotalQuestions] = useState(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questions, setQuestions] = useState<any[]>([])

  const emptyQuestion = {
    type: "multiple_choice",
    category_id: 1,
    difficulty: 1,
    question_text: "",
    explanation: "",
    blank_index: "",
    answer_key: "",
    option_A: "",
    option_B: "",
    option_C: "",
    option_D: "",
    correct_option: "A",
  }

  const [question, setQuestion] = useState(emptyQuestion)

  function handleNextQuestion() {
    const updated = [...questions]
    updated[currentIndex] = question
    setQuestions(updated)

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1)
      setQuestion(emptyQuestion)
    }
  }

  async function handleSubmit() {
    setMessage(null)

    const finalQuestions = [...questions]
    finalQuestions[currentIndex] = question

    const payloadPassage = {
      ...passage,
      audio_url:
        passage.passage_type === "listening"
          ? passage.audio_url || null
          : null,
    }

    const payloadQuestions = finalQuestions.map((q) => ({
      type: q.type,
      category_id: Number(q.category_id),
      difficulty: Number(q.difficulty),
      question_text: q.question_text,
      explanation: q.explanation || null,
      blank_index: q.blank_index
        ? Number(q.blank_index)
        : null,
      answer_key: q.answer_key || null,
      options: [
        {
          label: "A",
          content: q.option_A,
          is_correct: q.correct_option === "A",
        },
        {
          label: "B",
          content: q.option_B,
          is_correct: q.correct_option === "B",
        },
        {
          label: "C",
          content: q.option_C,
          is_correct: q.correct_option === "C",
        },
        {
          label: "D",
          content: q.option_D,
          is_correct: q.correct_option === "D",
        },
      ],
    }))

    const { error } = await supabase.rpc(
      "import_passage_with_questions_bulk",
      {
        p_passage: payloadPassage,
        p_questions: payloadQuestions,
      }
    )

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Import success")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Manual Passage Import
      </h1>

      {/* PASSAGE */}
      <div className="border p-6 rounded space-y-4">
        <h2 className="font-semibold">Passage</h2>

        <div>
          <label>Passage Type *</label>
          <select
            className="border w-full p-2"
            value={passage.passage_type}
            onChange={(e) =>
              setPassage({
                ...passage,
                passage_type: e.target.value,
              })
            }
          >
            <option value="reading">reading</option>
            <option value="listening">listening</option>
          </select>
        </div>

        <div>
          <label>Audio URL (required if listening)</label>
          <input
            disabled={passage.passage_type === "reading"}
            className={`border w-full p-2 ${
              passage.passage_type === "reading"
                ? "bg-gray-200"
                : ""
            }`}
            value={passage.audio_url}
            onChange={(e) =>
              setPassage({
                ...passage,
                audio_url: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Grade Level (6–12) *</label>
          <input
            type="number"
            min={6}
            max={12}
            className="border w-full p-2"
            value={passage.grade_level}
            onChange={(e) =>
              setPassage({
                ...passage,
                grade_level: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label>Title</label>
          <input
            className="border w-full p-2"
            value={passage.title}
            onChange={(e) =>
              setPassage({
                ...passage,
                title: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Content *</label>
          <textarea
            className="border w-full p-2 h-32"
            value={passage.content}
            onChange={(e) =>
              setPassage({
                ...passage,
                content: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* QUESTION CONFIG */}
      <div className="border p-6 rounded space-y-4">
        <h2 className="font-semibold">Question Setup</h2>

        <div>
          <label>Total Questions *</label>
          <input
            type="number"
            min={1}
            className="border w-full p-2"
            value={totalQuestions}
            onChange={(e) =>
              setTotalQuestions(Number(e.target.value))
            }
          />
        </div>

        <p>
          Current Question: {currentIndex + 1} / {totalQuestions}
        </p>

        <div>
          <label>Question Text *</label>
          <textarea
            className="border w-full p-2"
            value={question.question_text}
            onChange={(e) =>
              setQuestion({
                ...question,
                question_text: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Category ID (from question_categories)</label>
          <input
            type="number"
            className="border w-full p-2"
            value={question.category_id}
            onChange={(e) =>
              setQuestion({
                ...question,
                category_id: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label>Difficulty (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            className="border w-full p-2"
            value={question.difficulty}
            onChange={(e) =>
              setQuestion({
                ...question,
                difficulty: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="space-y-2">
          <input
            placeholder="Option A"
            className="border w-full p-2"
            value={question.option_A}
            onChange={(e) =>
              setQuestion({
                ...question,
                option_A: e.target.value,
              })
            }
          />
          <input
            placeholder="Option B"
            className="border w-full p-2"
            value={question.option_B}
            onChange={(e) =>
              setQuestion({
                ...question,
                option_B: e.target.value,
              })
            }
          />
          <input
            placeholder="Option C"
            className="border w-full p-2"
            value={question.option_C}
            onChange={(e) =>
              setQuestion({
                ...question,
                option_C: e.target.value,
              })
            }
          />
          <input
            placeholder="Option D"
            className="border w-full p-2"
            value={question.option_D}
            onChange={(e) =>
              setQuestion({
                ...question,
                option_D: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Correct Option</label>
          <select
            className="border w-full p-2"
            value={question.correct_option}
            onChange={(e) =>
              setQuestion({
                ...question,
                correct_option: e.target.value,
              })
            }
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {currentIndex + 1 < totalQuestions && (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            OK – Next Question
          </button>
        )}

        {currentIndex + 1 === totalQuestions && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Submit All
          </button>
        )}
      </div>

      {message && (
        <div className="font-semibold">
          {message}
        </div>
      )}
    </div>
  )
}