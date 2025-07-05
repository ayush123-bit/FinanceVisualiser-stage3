import { connectDB } from "@/lib/mongodb"
import { Transaction } from "@/models/Transaction"
import { NextResponse } from "next/server"

export const runtime = 'nodejs' // ✅ use Node.js runtime (fixes context.params bug)

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB()
    const { id } = context.params

    const deleted = await Transaction.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 })
  }
}
