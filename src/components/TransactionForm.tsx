"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FormSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  date: z.string(),
  category: z.string().min(1),
})

type FormValues = z.infer<typeof FormSchema>

export default function TransactionForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post("/api/transactions", data)
      reset()
      router.refresh()
    } catch (err) {
      console.error("Failed to submit transaction", err)
    }
  }

  return (
    <Card className="max-w-md mx-auto my-4">
      <CardContent className="p-4 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
            {errors.amount && <p className="text-red-500 text-sm">Amount is required</p>}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" {...register("date")} />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue=""
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {["Food", "Rent", "Travel", "Shopping", "Health", "Utilities", "Other"].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
          </div>

          <Button type="submit" className="w-full mt-4">
            Add Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
