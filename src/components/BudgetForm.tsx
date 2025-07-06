"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

const categories = ["Food", "Travel", "Shopping", "Health", "Other"]

export default function BudgetForm() {
  const [category, setCategory] = useState("Food")
  const [amount, setAmount] = useState("")
  const [month, setMonth] = useState("") // Format: yyyy-mm
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("/api/budgets", {
        category,
        amount: Number(amount),
        month,
      })
      setMessage("Budget saved successfully!")
      setAmount("")
      setMonth("")
    } catch (err) {
      console.error(err)
      setMessage("Failed to save budget.")
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <Label>Budget Amount (₹)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div>
            <Label>Month</Label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Set Budget</Button>
        </form>

        {message && <p className="text-sm text-center">{message}</p>}
      </CardContent>
    </Card>
  )
}
