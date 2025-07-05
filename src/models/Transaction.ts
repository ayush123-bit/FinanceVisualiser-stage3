import { Schema, model, models } from "mongoose"

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Rent", "Travel", "Shopping", "Health", "Utilities", "Other"],
    },
  },
  {
    timestamps: true,
  }
)

export const Transaction = models.Transaction || model("Transaction", TransactionSchema)
