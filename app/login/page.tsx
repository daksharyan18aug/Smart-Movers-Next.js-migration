"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const text = await res.text()
    const data = text ? JSON.parse(text) : {}

    if (!res.ok) {
      setError(data.error || "Login failed")
      setLoading(false)
      return
    }

    window.dispatchEvent(new Event("loginStateChanged"))
    router.push("/")
  }

  return (
    <main>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm mb-6">Login to your SmartMovers account</p>

          {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}