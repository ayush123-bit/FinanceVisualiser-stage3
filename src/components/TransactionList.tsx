"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Transaction = {
  _id: string
  amount: number
  date: string
  description: string
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions")
      setTransactions(res.data)
    } catch (err) {
      console.error("Failed to fetch transactions:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
     await axios.delete(`/api/transactions/delete/${id}`)

      setTransactions(prev => prev.filter(txn => txn._id !== id))
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="space-y-4">
      {transactions.length === 0 && (
        <Card>
          <CardContent className="p-4 text-gray-600">No transactions yet.</CardContent>
        </Card>
      )}

      {transactions.map(txn => (
        <Card key={txn._id}>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">₹{txn.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{txn.description}</p>
              <p className="text-xs text-gray-400">{new Date(txn.date).toLocaleDateString()}</p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(txn._id)}>
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
