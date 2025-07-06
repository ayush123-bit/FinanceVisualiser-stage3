import TransactionForm from "@/components/TransactionForm"
import TransactionList from "@/components/TransactionList"
import MonthlyBarChart from "@/components/MonthlyBarChart"
import BudgetForm from "@/components/BudgetForm"
import BudgetChart from "@/components/BudgetChart"
import SpendingInsights from "@/components/SpendingInsights"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-black">
          Personal Finance Visualizer
        </h1>

        <TransactionForm />

        <TransactionList />

        <MonthlyBarChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BudgetForm />
          <SpendingInsights />
        </div>

        <BudgetChart />
      </div>
    </main>
  )
}
