// src/app/api/transactions/[id]/route.ts

import { connectDB } from "@/lib/mongodb"
import { Transaction } from "@/models/Transaction"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB()
    const deleted = await Transaction.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 })
  } catch (error) {
    console.error("DELETE error:", error)
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 })
  }
}
