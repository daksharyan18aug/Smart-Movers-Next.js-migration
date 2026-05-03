import { NextResponse } from "next/server"

export async function GET() {
  const companies = [
    { id: 1, name: "Swift Movers", rating: 4.5, price: "$$" },
    { id: 2, name: "Safe Shift", rating: 4.8, price: "$$$" },
    { id: 3, name: "Easy Relocate", rating: 4.2, price: "$" },
  ]
  return NextResponse.json({ companies })
}