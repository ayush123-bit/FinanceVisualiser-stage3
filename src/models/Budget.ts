import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true, 
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
)

export const Budget =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)
