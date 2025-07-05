// src/components/MonthlyBarChart.tsx

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
  ResponsiveContainer,
} from "recharts"

type Transaction = {
  amount: number
  date: string
}

type MonthlyData = {
  month: string
  total: number
}

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export default function MonthlyBarChart() {
  const [data, setData] = useState<MonthlyData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/transactions")
        const transactions: Transaction[] = res.data

        const monthlyTotals: Record<number, number> = {}

        transactions.forEach(txn => {
          const date = new Date(txn.date)
          const month = date.getMonth()
          monthlyTotals[month] = (monthlyTotals[month] || 0) + txn.amount
        })

        const chartData: MonthlyData[] = monthNames.map((name, index) => ({
          month: name,
          total: monthlyTotals[index] || 0,
        }))

        setData(chartData)
      } catch (err) {
        console.error("Failed to load chart data:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
