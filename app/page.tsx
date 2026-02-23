"use client"

import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabase-client"

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabaseClient
        .from("profiles")   // đổi tên bảng nếu cần
        .select("*")
        .limit(1)

      setData(data)
      setError(error)
      console.log("Supabase data:", data)
      console.log("Supabase error:", error)
    }

    testConnection()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Supabase Test</h1>

      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h2>Error:</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  )
}