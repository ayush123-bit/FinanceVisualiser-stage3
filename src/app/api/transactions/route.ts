import { connectDB } from "@/lib/mongodb"
import { Transaction } from "@/models/Transaction"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const transactions = await Transaction.find().sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const transaction = await Transaction.create(body)
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("POST error:", error)
    return NextResponse.json({ message: "Failed to add transaction" }, { status: 500 })
  }
}
