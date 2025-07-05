// src/models/Transaction.ts

import mongoose, { Schema, models, model } from "mongoose"

const TransactionSchema = new Schema({
  amount: Number,
  date: String,
  description: String,
})

export const Transaction =
  models.Transaction || model("Transaction", TransactionSchema)
