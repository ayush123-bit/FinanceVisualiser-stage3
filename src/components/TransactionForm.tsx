// src/components/TransactionForm.tsx

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import axios from "axios"

const formSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount is required" })
    .positive("Amount must be positive"),
  date: z.string().nonempty("Date is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof formSchema>

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      await axios.post("/api/transactions", data)
      reset()
    } catch (err) {
      console.error("Error submitting transaction:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Amount</Label>
            <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" {...register("date")} />
            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Input type="text" {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
