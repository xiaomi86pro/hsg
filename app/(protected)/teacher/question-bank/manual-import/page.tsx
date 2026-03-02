"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/browser"

type Section = {
  id: number
  code: string
  name: string
}

type Category = {
  id: number
  code: string
  name: string
  default_question_type_code: string | null
  section: Section | null
}

type QuestionType = {
  id: number
  code: string
  name: string
}

type QuestionForm = {
  category_id: number | null
  question_type_id: number | null
  difficulty: number
  question_text: string
  explanation: string
  blank_index: string
  answer_key: string
  option_A: string
  option_B: string
  option_C: string
  option_D: string
  correct_option: string
}

export default function ManualImportPage() {
  const supabase = supabaseBrowser

  const [passageType, setPassageType] =
    useState<"reading" | "listening">("reading")

  const [categories, setCategories] =
    useState<Category[]>([])

  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>([])

  const [questionTypes, setQuestionTypes] =
    useState<QuestionType[]>([])

  const [search, setSearch] = useState("")

  const [question, setQuestion] =
    useState<QuestionForm>({
      category_id: null,
      question_type_id: null,
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

  // =============================
  // LOAD DATA
  // =============================
  useEffect(() => {
    async function loadData() {
      const { data: catData } = await supabase
        .from("question_categories")
        .select(`
          id,
          code,
          name,
          default_question_type_code,
          section:sections (
            id,
            code,
            name
          )
        `)
        .order("section_id", { ascending: true })
        .order("display_order", { ascending: true })

      const { data: typeData } = await supabase
        .from("question_types")
        .select("id, code, name")

      if (catData) setCategories(catData)
      if (typeData) setQuestionTypes(typeData)
    }

    loadData()
  }, [])

  // =============================
  // FILTER CATEGORY BY PASSAGE
  // =============================
  useEffect(() => {
    const sectionCode =
      passageType === "reading"
        ? "reading"
        : "listening"

    const filtered = categories.filter(
      (c) => c.section?.code === sectionCode
    )

    setFilteredCategories(filtered)
  }, [passageType, categories])

  // =============================
  // SEARCH FILTER
  // =============================
  useEffect(() => {
    const lower = search.toLowerCase()

    const sectionCode =
      passageType === "reading"
        ? "reading"
        : "listening"

    const filtered = categories.filter(
      (c) =>
        c.section?.code === sectionCode &&
        (c.name.toLowerCase().includes(lower) ||
          c.code.toLowerCase().includes(lower))
    )

    setFilteredCategories(filtered)
  }, [search, passageType, categories])

  const selectedType = questionTypes.find(
    (t) => t.id === question.question_type_id
  )

  const isMC = selectedType?.code === "MC"
  const isOpen = selectedType?.code === "OPEN"
  const isTrueFalse =
    selectedType?.code === "TRUE_FALSE"

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Manual Question Import
      </h1>

      {/* Passage Type */}
      <div>
        <label className="block mb-1 font-medium">
          Passage Type
        </label>
        <select
          className="border w-full p-2"
          value={passageType}
          onChange={(e) =>
            setPassageType(
              e.target.value as "reading" | "listening"
            )
          }
        >
          <option value="reading">Reading</option>
          <option value="listening">Listening</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">
          Category
        </label>

        <input
          type="text"
          className="border w-full p-2 mb-2"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border w-full p-2"
          value={question.category_id ?? ""}
          onChange={(e) => {
            const selectedId = Number(
              e.target.value
            )

            const selectedCategory =
              filteredCategories.find(
                (c) => c.id === selectedId
              )

            if (!selectedCategory) {
              setQuestion((prev) => ({
                ...prev,
                category_id: null,
                question_type_id: null,
              }))
              return
            }

            const matchedType =
              questionTypes.find(
                (t) =>
                  t.code ===
                  selectedCategory.default_question_type_code
              )

            setQuestion((prev) => ({
              ...prev,
              category_id: selectedId,
              question_type_id:
                matchedType?.id ?? null,
            }))
          }}
        >
          <option value="">
            -- Select Category --
          </option>

          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.code} → {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Question Text */}
      <div>
        <label className="block mb-1 font-medium">
          Question Text
        </label>
        <textarea
          className="border w-full p-2"
          rows={4}
          value={question.question_text}
          onChange={(e) =>
            setQuestion((prev) => ({
              ...prev,
              question_text: e.target.value,
            }))
          }
        />
      </div>

      {/* Multiple Choice */}
      {isMC && (
        <div className="space-y-2">
          <h2 className="font-semibold">
            Options
          </h2>

          {(["A", "B", "C", "D"] as const).map(
            (opt) => (
              <input
                key={opt}
                className="border w-full p-2"
                placeholder={`Option ${opt}`}
                value={
                  question[
                    `option_${opt}` as keyof QuestionForm
                  ] as string
                }
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...prev,
                    [`option_${opt}`]:
                      e.target.value,
                  }))
                }
              />
            )
          )}

          <select
            className="border w-full p-2"
            value={question.correct_option}
            onChange={(e) =>
              setQuestion((prev) => ({
                ...prev,
                correct_option:
                  e.target.value,
              }))
            }
          >
            <option value="A">
              Correct: A
            </option>
            <option value="B">
              Correct: B
            </option>
            <option value="C">
              Correct: C
            </option>
            <option value="D">
              Correct: D
            </option>
          </select>
        </div>
      )}

      {/* True / False */}
      {isTrueFalse && (
        <div>
          <select
            className="border w-full p-2"
            value={question.answer_key}
            onChange={(e) =>
              setQuestion((prev) => ({
                ...prev,
                answer_key:
                  e.target.value,
              }))
            }
          >
            <option value="">
              Select Answer
            </option>
            <option value="True">
              True
            </option>
            <option value="False">
              False
            </option>
          </select>
        </div>
      )}

      {/* Open Answer */}
      {isOpen && (
        <div>
          <label className="block mb-1 font-medium">
            Answer
          </label>
          <input
            className="border w-full p-2"
            value={question.answer_key}
            onChange={(e) =>
              setQuestion((prev) => ({
                ...prev,
                answer_key:
                  e.target.value,
              }))
            }
          />
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() =>
          console.log(question)
        }
      >
        Save (Debug)
      </button>
    </div>
  )
}