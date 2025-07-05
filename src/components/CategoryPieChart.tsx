"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface Props {
  data: { category: string; amount: number }[]
}

const COLORS = [
  "#8884d8", // Food
  "#82ca9d", // Rent
  "#ffc658", // Travel
  "#ff8042", // Shopping
  "#a4de6c", // Health
  "#8dd1e1", // Utilities
  "#d0ed57", // Other
]

export default function CategoryPieChart({ data }: Props) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="amount"
            nameKey="category"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
