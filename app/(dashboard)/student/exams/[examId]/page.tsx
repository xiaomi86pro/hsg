"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Option = {
  id: number;
  option_label: string;
  option_text: string;
};

type ExamQuestion = {
  id: number;
  question_text: string;
  question_type_id: number;
  question_order: number;
  options: Option[];
};

export default function ExamPage() {
  const params = useParams();
  const examId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExam = async () => {
      if (!examId) {
        setError("Invalid exam id");
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseBrowser
        .from("exam_questions")
        .select(`
          question_order,
          questions (
            id,
            question_text,
            question_type_id,
            options (
              id,
              option_label,
              option_text
            )
          )
        `)
        .eq("exam_id", examId)
        .order("question_order", { ascending: true });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const formatted: ExamQuestion[] =
        (data ?? []).map((item: any) => ({
          id: item.questions.id,
          question_text: item.questions.question_text,
          question_type_id: item.questions.question_type_id,
          question_order: item.question_order,
          options: item.questions.options ?? [],
        }));

      setQuestions(formatted);
      setLoading(false);
    };

    void loadExam();
  }, [examId]);

  const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleTextAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading exam...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center text-red-500">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Exam #{examId}
        </h1>

        {questions.length === 0 && (
          <p className="text-center text-slate-500">
            Không có câu hỏi nào.
          </p>
        )}

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="border-b pb-6">
              <p className="font-semibold mb-4">
                Câu {index + 1}: {q.question_text}
              </p>

              {/* TRẮC NGHIỆM */}
              {q.question_type_id === 3 && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === opt.id}
                        onChange={() =>
                          handleSelectOption(q.id, opt.id)
                        }
                      />
                      <span>
                        {opt.option_label}. {opt.option_text}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* TỰ LUẬN */}
              {q.question_type_id !== 3 && (
                <textarea
                  className="w-full border rounded p-3"
                  rows={4}
                  value={answers[q.id] ?? ""}
                  onChange={(e) =>
                    handleTextAnswer(q.id, e.target.value)
                  }
                  placeholder="Nhập câu trả lời..."
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            onClick={() => console.log("Answers:", answers)}
          >
            Nộp bài (chưa xử lý)
          </button>
        </div>
      </div>
    </main>
  );
}