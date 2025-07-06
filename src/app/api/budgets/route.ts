import { connectDB } from "@/lib/mongodb"
import { Budget } from "@/models/Budget"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"


export async function GET() {
  try {
    await connectDB()
    const budgets = await Budget.find()
    return NextResponse.json(budgets)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 })
  }
}


export async function POST(req: Request) {
  try {
    await connectDB()
    const { category, amount, month } = await req.json()

    const existing = await Budget.findOne({ category, month })

    if (existing) {
      existing.amount = amount
      await existing.save()
      return NextResponse.json({ message: "Budget updated" })
    } else {
      await Budget.create({ category, amount, month })
      return NextResponse.json({ message: "Budget created" })
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to set budget" }, { status: 500 })
  }
}
