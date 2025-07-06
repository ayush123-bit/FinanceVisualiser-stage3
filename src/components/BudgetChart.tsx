"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function BudgetChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [budgetRes, txRes] = await Promise.all([
        axios.get("/api/budgets"),
        axios.get("/api/transactions"),
      ])

      const budgets = budgetRes.data
      const transactions = txRes.data

      const currentMonth = new Date().toISOString().slice(0, 7)

      const categorySpending: { [key: string]: number } = {}
      transactions.forEach((tx: any) => {
        const txMonth = tx.date?.slice(0, 7)
        if (txMonth === currentMonth) {
          if (!categorySpending[tx.category]) categorySpending[tx.category] = 0
          categorySpending[tx.category] += tx.amount
        }
      })

      const chartData = budgets
        .filter((b: any) => b.month === currentMonth)
        .map((b: any) => ({
          category: b.category,
          budget: b.amount,
          spent: categorySpending[b.category] || 0,
        }))

      setData(chartData)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-96 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Budget vs Actual (This Month)</h2>
      {data.length === 0 ? (
        <p>No data for current month</p>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#8884d8" name="Budget" />
            <Bar dataKey="spent" fill="#ff6b6b" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
