"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Exam = {
  id: number;
  created_at: string;
};

export default function StudentHistoryPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabaseBrowser
        .from("exams")
        .select("id, created_at")
        .order("created_at", { ascending: false });

      if (data) {
        setExams(data);
      }

      setLoading(false);
    };

    void init();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">
          Lịch sử làm bài
        </h1>

        {exams.length === 0 ? (
          <p className="text-slate-500">
            Bạn chưa có bài thi nào.
          </p>
        ) : (
          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    Exam #{exam.id}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(exam.created_at).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/student/exam/${exam.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => router.push("/student")}
          className="mt-6 bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded"
        >
          Quay lại
        </button>
      </div>
    </main>
  );
}