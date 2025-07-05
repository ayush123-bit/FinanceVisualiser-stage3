import TransactionForm from "@/components/TransactionForm"
import TransactionList from "@/components/TransactionList"
import MonthlyBarChart from "@/components/MonthlyBarChart"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Personal Finance Visualizer
        </h1>

       <TransactionForm />

       <TransactionList />

        <MonthlyBarChart />
      </div>
    </main>
  )
}
