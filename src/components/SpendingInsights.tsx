"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function SpendingInsights() {
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    const fetchInsights = async () => {
      const [budgetRes, txRes] = await Promise.all([
        axios.get("/api/budgets"),
        axios.get("/api/transactions"),
      ])

      const budgets = budgetRes.data
      const transactions = txRes.data

      const currentMonth = new Date().toISOString().slice(0, 7)

      const categorySpent: { [key: string]: number } = {}
      transactions.forEach((tx: any) => {
        const txMonth = tx.date?.slice(0, 7)
        if (txMonth === currentMonth) {
          if (!categorySpent[tx.category]) categorySpent[tx.category] = 0
          categorySpent[tx.category] += tx.amount
        }
      })

      const newInsights: string[] = []

      budgets
        .filter((b: any) => b.month === currentMonth)
        .forEach((b: any) => {
          const spent = categorySpent[b.category] || 0
          const diff = spent - b.amount

          if (diff > 0) {
            newInsights.push(
              `🔴 You overspent in ${b.category} by ₹${diff.toFixed(2)}`
            )
          } else {
            newInsights.push(
              `🟢 You're within budget for ${b.category} (Remaining: ₹${Math.abs(diff).toFixed(2)})`
            )
          }
        })

      setInsights(newInsights)
    }

    fetchInsights()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-2">
      <h2 className="text-lg font-semibold mb-2">Spending Insights</h2>
      {insights.length === 0 ? (
        <p>No budgets set for this month</p>
      ) : (
        <ul className="list-disc list-inside text-sm space-y-1">
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
