"use client"

import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/browser"

export default function ManualImportPage() {
  const supabase = supabaseBrowser

  const [message, setMessage] = useState<string | null>(null)

  const [passage, setPassage] = useState({
    title: "",
    content: "",
    passage_type: "reading",
    grade_level: 6,
    audio_url: "",
  })

  const [question, setQuestion] = useState({
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
  })

  async function handleSubmit() {
    setMessage(null)

    const payloadPassage = {
      ...passage,
      audio_url: passage.audio_url || null,
    }

    const payloadQuestions = [
      {
        type: question.type,
        category_id: Number(question.category_id),
        difficulty: Number(question.difficulty),
        question_text: question.question_text,
        explanation: question.explanation || null,
        blank_index: question.blank_index
          ? Number(question.blank_index)
          : null,
        answer_key: question.answer_key || null,
        options: [
          {
            label: "A",
            content: question.option_A,
            is_correct: question.correct_option === "A",
          },
          {
            label: "B",
            content: question.option_B,
            is_correct: question.correct_option === "B",
          },
          {
            label: "C",
            content: question.option_C,
            is_correct: question.correct_option === "C",
          },
          {
            label: "D",
            content: question.option_D,
            is_correct: question.correct_option === "D",
          },
        ],
      },
    ]

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
        Manual Passage Import (Test UI)
      </h1>

      <div className="border p-6 rounded space-y-4">
        <h2 className="font-semibold">Passage</h2>

        <div>
          <label>Title (optional)</label>
          <input
            className="border w-full p-2"
            value={passage.title}
            onChange={(e) =>
              setPassage({ ...passage, title: e.target.value })
            }
          />
        </div>

        <div>
          <label>
            Passage Type (enum: reading | listening) *
          </label>
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
          <label>Audio URL (required if listening)</label>
          <input
            className="border w-full p-2"
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

      <div className="border p-6 rounded space-y-4">
        <h2 className="font-semibold">
          Sample Question (for testing)
        </h2>

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
          <label>Difficulty (1–5) *</label>
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

        <div>
          <label>Options *</label>
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
            className="border w-full p-2 mt-2"
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
            className="border w-full p-2 mt-2"
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
            className="border w-full p-2 mt-2"
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
          <label>Correct Option (A–D)</label>
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
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Submit Test Import
      </button>

      {message && (
        <div className="mt-4 font-semibold">
          {message}
        </div>
      )}
    </div>
  )
}