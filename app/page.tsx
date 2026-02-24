"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // TẠM FIX ROLE
  const role = "student"; // sau này thay bằng logic thật

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="grid grid-cols-12 gap-6 h-[85vh]">
        
        {/* LEFT - LEADERBOARD */}
        <div className="col-span-3 bg-white rounded-xl shadow p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-center">
            🏆 Leaderboard
          </h2>

          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Chưa có dữ liệu
          </div>
        </div>

        {/* CENTER - MAIN AREA */}
        <div className="col-span-6 bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">
            Khu vực chính
          </h2>

          <div className="w-full max-w-md bg-yellow-100 border border-yellow-300 rounded-lg p-6 text-center">
            <p className="mb-4 font-medium">
              Bạn có bài thi chưa hoàn thành
            </p>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Làm tiếp
            </button>
          </div>
        </div>

        {/* RIGHT - USER PANEL */}
        <div className="col-span-3 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-slate-300 mb-4" />

          {/* Name */}
          <h3 className="text-lg font-semibold">Tên người dùng</h3>

          {/* Level */}
          <p className="text-sm text-slate-500 mb-6">
            Level 1
          </p>

          <div className="w-full flex flex-col gap-3">
            
            <button
              onClick={() => router.push(`/${role}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Thông tin
            </button>

            <button
              onClick={() => router.push(`/${role}/history`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            >
              Lịch sử làm bài
            </button>

            <button
              onClick={() => router.push("/login")}
              className="bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}