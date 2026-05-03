export const runtime = 'nodejs'
import { NextResponse } from "next/server"
import pool from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password)
      return NextResponse.json({ error: "All fields required" }, { status: 400 })

    const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email])
    const user = rows[0]
    if (!user)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )
    const response = NextResponse.json({ message: "Login successful" })
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}