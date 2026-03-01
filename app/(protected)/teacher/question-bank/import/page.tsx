"use client"

import { useState } from "react"
import * as XLSX from "xlsx"

type Passage = {
  title: string
  grade_level: number
  content: string
}

type Question = {
  question_order: number
  type: string
  difficulty: number
  content: string
}

export default function ImportPassagePage() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [passage, setPassage] = useState<Passage | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".xlsx")) {
      setError("Only .xlsx files are allowed")
      return
    }

    setFileName(file.name)
    setError(null)

    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data, { type: "array" })

    // Sheet names must be EXACT
    const passageSheet = workbook.Sheets["passage"]
    const questionSheet = workbook.Sheets["questions"]

    if (!passageSheet || !questionSheet) {
      setError("File must contain 'passage' and 'questions' sheets")
      return
    }

    const passageData = XLSX.utils.sheet_to_json<any>(passageSheet)
    const questionData = XLSX.utils.sheet_to_json<any>(questionSheet)

    if (passageData.length !== 1) {
      setError("Passage sheet must contain exactly 1 row")
      return
    }

    const p = passageData[0]

    setPassage({
      title: p.title,
      grade_level: Number(p.grade_level),
      content: p.content,
    })

    const q = questionData.map((row: any) => ({
      question_order: Number(row.question_order),
      type: row.type,
      difficulty: Number(row.difficulty),
      content: row.content,
    }))

    setQuestions(q)
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">
        Import Passage with Questions
      </h1>

      {/* Upload Section */}
      <div className="border-2 border-dashed rounded-xl p-8 text-center">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
        />
        {fileName && (
          <p className="mt-2 text-sm text-gray-600">
            Uploaded: {fileName}
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Passage Preview */}
      {passage && (
        <div className="border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Passage Preview
          </h2>

          <div>
            <p>
              <strong>Title:</strong> {passage.title}
            </p>
            <p>
              <strong>Grade Level:</strong>{" "}
              {passage.grade_level}
            </p>
          </div>

          <div className="max-h-40 overflow-auto border p-3 rounded bg-gray-50">
            {passage.content}
          </div>

          <p>
            <strong>Total Questions:</strong>{" "}
            {questions.length}
          </p>
        </div>
      )}

      {/* Questions Preview */}
      {questions.length > 0 && (
        <div className="border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Questions Preview
          </h2>

          <div className="overflow-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Difficulty</th>
                  <th className="border p-2">Content</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q.question_order}>
                    <td className="border p-2">
                      {q.question_order}
                    </td>
                    <td className="border p-2">
                      {q.type}
                    </td>
                    <td className="border p-2">
                      {q.difficulty}
                    </td>
                    <td className="border p-2">
                      {q.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}