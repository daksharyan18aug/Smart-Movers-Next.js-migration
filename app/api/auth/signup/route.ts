import { NextResponse } from "next/server"
import pool from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields required" }, { status: 400 })

    const [existing]: any = await pool.query("SELECT id FROM users WHERE email = ?", [email])
    if (existing.length > 0)
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
    return NextResponse.json({ message: "Account created successfully" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}