"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { supabaseBrowser } from "@/lib/supabase/browser"

type ImportStatus =
  | "idle"
  | "parsing"
  | "validating"
  | "validation_failed"
  | "validation_success"
  | "importing"
  | "import_success"
  | "import_failed"

export default function ImportPassagePage() {

  const supabase = supabaseBrowser

  const [status, setStatus] = useState<ImportStatus>("idle")
  const [errors, setErrors] = useState<
    { index: number | null; message: string }[]
  >([])

  const [passagePayload, setPassagePayload] = useState<any>(null)
  const [questionsPayload, setQuestionsPayload] = useState<any[]>([])

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus("parsing")
    setErrors([])

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: "array" })

    const passageSheet = workbook.Sheets["passage"]
    const questionSheet = workbook.Sheets["questions"]

    if (!passageSheet || !questionSheet) {
      setStatus("validation_failed")
      setErrors([
        { index: null, message: "File must contain passage and questions sheets" },
      ])
      return
    }

    const passageRows = XLSX.utils.sheet_to_json<any>(passageSheet)
    const questionRows = XLSX.utils.sheet_to_json<any>(questionSheet)

    if (passageRows.length !== 1) {
      setStatus("validation_failed")
      setErrors([
        { index: null, message: "Passage sheet must contain exactly 1 row" },
      ])
      return
    }

    // ===== TRANSFORM TO BACKEND CONTRACT =====

    const pRow = passageRows[0]

    const passage = {
      title: pRow.title || null,
      grade_level: Number(pRow.grade_level),
      passage_type: pRow.passage_type,
      content: pRow.content,
      audio_url: pRow.audio_url || null,
    }

    const questions = questionRows.map((row, index) => {
      const type = row.type

      return {
        type,
        category_id: Number(row.category_id),
        difficulty: Number(row.difficulty),
        question_text: row.question_text,
        explanation: row.explanation || null,
        blank_index: row.blank_index
          ? Number(row.blank_index)
          : null,
        answer_key: row.answer_key || null,
        options:
          type === "multiple_choice"
            ? [
                {
                  label: "A",
                  content: row.option_A,
                  is_correct: row.correct_option === "A",
                },
                {
                  label: "B",
                  content: row.option_B,
                  is_correct: row.correct_option === "B",
                },
                {
                  label: "C",
                  content: row.option_C,
                  is_correct: row.correct_option === "C",
                },
                {
                  label: "D",
                  content: row.option_D,
                  is_correct: row.correct_option === "D",
                },
              ]
            : null,
      }
    })

    setPassagePayload(passage)
    setQuestionsPayload(questions)

    // ===== AUTO VALIDATE =====

    setStatus("validating")

    const { data: validateData, error } = await supabase.rpc(
      "validate_import_passage_with_questions",
      {
        p_passage: passage,
        p_questions: questions,
      }
    )

    if (error) {
      setStatus("validation_failed")
      setErrors([{ index: null, message: error.message }])
      return
    }

    if (validateData.status === "invalid") {
      setStatus("validation_failed")
      setErrors(validateData.errors || [])
      return
    }

    setStatus("validation_success")
  }

  const handleImport = async () => {
    if (!passagePayload || questionsPayload.length === 0) return

    setStatus("importing")

    const { error } = await supabase.rpc(
      "import_passage_with_questions_bulk",
      {
        p_passage: passagePayload,
        p_questions: questionsPayload,
      }
    )

    if (error) {
      setStatus("import_failed")
      setErrors([{ index: null, message: error.message }])
      return
    }

    setStatus("import_success")
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">
        Import Passage with Questions
      </h1>

      {/* Upload Box */}
      <div className="border-2 border-dashed p-8 rounded-xl text-center">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          disabled={status === "validating" || status === "importing"}
        />
      </div>

      {/* Status Messages */}
      {status === "parsing" && <p>Parsing file...</p>}
      {status === "validating" && <p>Validating...</p>}
      {status === "importing" && <p>Importing...</p>}

      {status === "validation_success" && (
        <div className="text-green-600 font-semibold">
          File is valid. Ready to import.
        </div>
      )}

      {status === "import_success" && (
        <div className="text-green-700 font-bold">
          ✅ Passage imported successfully
        </div>
      )}

      {status === "import_failed" && (
        <div className="text-red-600 font-semibold">
          Import failed
        </div>
      )}

      {/* Error List */}
      {status === "validation_failed" && errors.length > 0 && (
        <div className="border p-4 rounded bg-red-50">
          <p className="font-semibold text-red-700 mb-2">
            {errors.length} error(s) found:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-sm">
            {errors.map((err, i) => (
              <li key={i}>
                {err.index !== null
                  ? `Question ${err.index}: `
                  : ""}
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Import Button */}
      {status === "validation_success" && (
        <button
          onClick={handleImport}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Import
        </button>
      )}
    </div>
  )
}