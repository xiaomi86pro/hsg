'use client';

import { useEffect, useState } from 'react';
import { createClient, User } from '@supabase/supabase-js';

type ExamHistoryItem = {
  id: string;
  created_at: string;
  score: number | null;
  total_questions: number | null;
  status: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function StudentPage() {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<ExamHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadStudentData();
  }, []);

  const loadStudentData = async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      setError(authError?.message || 'Không tìm thấy thông tin người dùng.');
      setLoading(false);
      return;
    }

    setUser(authUser);

    const { data, error: examError } = await supabase
      .from('exams')
      .select('id, created_at, score, total_questions, status')
      .eq('student_id', authUser.id)
      .order('created_at', { ascending: false });

    if (examError) {
      setError(examError.message);
    } else {
      setHistory((data as ExamHistoryItem[]) || []);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>
      <h1>Student Dashboard</h1>

      {loading && <p>Đang tải dữ liệu...</p>}

      {!loading && error && (
        <p style={{ color: 'crimson' }}>Lỗi khi tải dữ liệu: {error}</p>
      )}

      {!loading && !error && (
        <>
          <section style={{ marginBottom: 24 }}>
            <h2>Thông tin sinh viên</h2>
            <p>
              <strong>User ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Email:</strong> {user?.email || 'N/A'}
            </p>
          </section>

          <section style={{ marginBottom: 24 }}>
            <h2>View history</h2>
            {history.length === 0 ? (
              <p>Chưa có bài thi nào đã submit.</p>
            ) : (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #ddd',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Exam ID</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>
                      Submitted at
                    </th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Score</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Total</th>
                    <th style={{ border: '1px solid #ddd', padding: 8 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((exam) => (
                    <tr key={exam.id}>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>{exam.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>
                        {new Date(exam.created_at).toLocaleString()}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>
                        {exam.score ?? '-'}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>
                        {exam.total_questions ?? '-'}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: 8 }}>
                        {exam.status || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section style={{ display: 'flex', gap: 12 }}>
            <button type="button" disabled title="Chưa làm generate exam">
              Generate exam (coming soon)
            </button>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </section>
        </>
      )}
    </main>
  );
}
