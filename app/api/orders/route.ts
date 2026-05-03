import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
  const { from_address, to_address, package_type } = await req.json()
  await pool.query(
    "INSERT INTO orders (user_id, from_address, to_address, package_type) VALUES (?, ?, ?, ?)",
    [userId, from_address, to_address, package_type]
  )
  return NextResponse.json({ message: "Order placed!" })
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
  const [orders]: any = await pool.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  )
  return NextResponse.json({ orders })
}