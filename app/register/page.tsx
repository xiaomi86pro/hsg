"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
        setErrorMessage("Mật khẩu không khớp.");
        return;
    }

    setLoading(true);

    const { data, error } = await supabaseBrowser.auth.signUp({
        email,
        password,
    });

    if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
    }

    setLoading(false);

    // Nếu có session → user được login ngay
    if (data.session) {
        router.replace("/");
        return;
    }

    // Nếu không có session → cần xác thực email
    setSuccessMessage("Đăng ký thành công. Vui lòng kiểm tra email để xác thực.");

    setTimeout(() => {
        router.replace("/login");
    }, 2000);
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Đăng ký tài khoản
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-4 py-2"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-4 py-2"
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded px-4 py-2"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:underline"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </main>
  );
}