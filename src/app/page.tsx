import { connectDB } from "@/lib/mongodb"
import { Transaction } from "@/models/Transaction"
import TransactionForm from "@/components/TransactionForm"
import TransactionList from "@/components/TransactionList"
import MonthlyBarChart from "@/components/MonthlyBarChart"
import CategoryPieChart from "@/components/CategoryPieChart"

export const dynamic = "force-dynamic"

export default async function Home() {
  await connectDB()
  const transactions = await Transaction.find().sort({ date: -1 })

  const totalExpense = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  const categoryData: { [key: string]: number } = {}

  transactions.forEach((tx) => {
    if (!categoryData[tx.category]) {
      categoryData[tx.category] = 0
    }
    categoryData[tx.category] += tx.amount
  })

  const chartData = Object.keys(categoryData).map((category) => ({
    category,
    amount: categoryData[category],
  }))

  const recentTransactions = transactions.slice(0, 5)

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          Personal Finance Visualizer
        </h1>

        {/* Total & Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-600">₹{totalExpense.toFixed(2)}</p>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
            <CategoryPieChart data={chartData} />
          </div>
        </div>

        {/* Add Transaction */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
          <TransactionForm />
        </div>

        {/* All Transactions */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">All Transactions</h2>
          <TransactionList />
        </div>

        {/* Monthly Chart */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
          <MonthlyBarChart />
        </div>

        {/* Recent Transactions */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <ul className="space-y-2">
            {recentTransactions.map((tx: any) => (
              <li key={tx._id} className="flex justify-between border-b pb-1">
                <span>{tx.description} ({tx.category})</span>
                <span className="text-red-600 font-medium">₹{tx.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
