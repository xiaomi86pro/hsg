"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase-client";

type Mode = "login" | "register";
type Role = "student" | "teacher" | "admin";

const ROLE_TO_PATH: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const actionLabel = useMemo(() => {
    return mode === "login" ? "Đăng nhập" : "Đăng ký";
  }, [mode]);

  const redirectByRole = async () => {
    const { data, error: roleError } = await supabaseClient.rpc("get_my_role");

    if (roleError) {
      router.replace("/");
      return;
    }

    const role = data as Role | null;
    if (!role || !(role in ROLE_TO_PATH)) {
      router.replace("/");
      return;
    }

    router.replace(ROLE_TO_PATH[role]);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (mode === "register") {
      const { data, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        setMessage(
          "Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập."
        );
        setMode("login");
        setLoading(false);
        return;
      }

      setMessage("Đăng ký thành công. Đang chuyển hướng...");
      await redirectByRole();
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setMessage("Đăng nhập thành công. Đang chuyển hướng...");
    await redirectByRole();
    setLoading(false);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <section className="w-full rounded-xl border border-black/10 p-6 shadow-sm dark:border-white/20">
        <h1 className="text-2xl font-bold">{actionLabel}</h1>
        <p className="mt-2 text-sm opacity-80">
          {mode === "login"
            ? "Đăng nhập để vào hệ thống làm bài thi."
            : "Tạo tài khoản mới để bắt đầu sử dụng hệ thống."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-black/20 bg-transparent px-3 py-2 outline-none focus:border-black dark:border-white/30 dark:focus:border-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-black/20 bg-transparent px-3 py-2 outline-none focus:border-black dark:border-white/30 dark:focus:border-white"
            />
          </div>

          {message ? (
            <p className="rounded-md bg-green-100 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
          >
            {loading ? "Đang xử lý..." : actionLabel}
          </button>
        </form>

        <button
          type="button"
          disabled={loading}
          onClick={() => {
            setError(null);
            setMessage(null);
            setMode((previousMode) =>
              previousMode === "login" ? "register" : "login"
            );
          }}
          className="mt-4 text-sm underline disabled:opacity-60"
        >
          {mode === "login"
            ? "Chưa có tài khoản? Đăng ký"
            : "Đã có tài khoản? Đăng nhập"}
        </button>
      </section>
    </main>
  );
}