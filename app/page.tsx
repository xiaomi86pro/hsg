"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase-client";

type AuthUserName = {
  displayName: string;
  email: string | null;
};

export default function HomePage() {
    const router = useRouter();
  const [userInfo, setUserInfo] = useState<AuthUserName | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      if (!user) {
        router.replace("/login");
        setLoading(false);
        return;
      }
      const metadataName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined);

      setUserInfo({
        displayName: metadataName || user.email || "Người dùng",
        email: user.email ?? null,
      });
      setLoading(false);
    };

    void getCurrentUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p>Đang tải thông tin người dùng...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-md rounded-xl border border-black/10 p-6 shadow-sm dark:border-white/20">
        <h1 className="text-2xl font-bold">Đăng nhập thành công</h1>
        <p className="mt-2 text-base">Xin chào, {userInfo?.displayName}!</p>
        {userInfo?.email ? (
          <p className="mt-1 text-sm opacity-70">Email: {userInfo.email}</p>
        ) : null}
      </section>
    </main>
  );
}