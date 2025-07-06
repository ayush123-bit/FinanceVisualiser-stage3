# 💸 Personal Finance Visualizer

A simple full-stack web application for tracking personal finances — including transactions, categories, budgeting, charts, and smart spending insights.

---

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, Shadcn UI  
- **State/Form**: React Hook Form, Zod  
- **Charts**: Recharts  
- **Backend/API**: Next.js App Router, MongoDB, Mongoose  
- **Deployment**: Vercel  

---

## ✨ Features

### ✅ Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions
- Transaction list view
- Monthly expenses bar chart
- Form validation using React Hook Form + Zod

### ✅ Stage 2: Categories
- Predefined categories (Food, Travel, Shopping, etc.)
- Category-wise pie chart
- Dashboard with:
  - Total expenses
  - Recent transactions
  - Category breakdown

### ✅ Stage 3: Budgeting
- Set monthly budgets by category
- Budget vs actual spending comparison chart
- Smart spending insights:
  - ✅ Under budget
  - ⚠️ Overspending warnings

---

## 📦 Installation & Setup

### 🌀 Clone the Repository

```bash
git clone https://github.com/ayush123-bit/FinanceVisualiser-stage3.git
cd personal-finance-visualizer
```

### 📦 Install All Dependencies

```bash
npm install
```

### ⚙️ Configure Environment Variable

Create a `.env.local` file in the root and add:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<your-db-name>?retryWrites=true&w=majority
```

> ⚠️ Make sure it starts with `mongodb+srv://` or `mongodb://`.

### 🚀 Start Development Server

```bash
npm run dev
```

App will run at: [http://localhost:3000](http://localhost:3000)

### 🏗 Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Folder Structure

```
personal-finance-visualizer/
│
├── public/
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── README.md
│
└── src/
    ├── app/
    │   ├── page.tsx
    │   └── api/
    │       ├── transactions/
    │       │   ├── route.ts
    │       │   └── [id]/route.ts
    │       └── budgets/
    │           └── route.ts
    │
    ├── components/
    │   ├── TransactionForm.tsx
    │   ├── TransactionList.tsx
    │   ├── MonthlyBarChart.tsx
    │   ├── CategoryPieChart.tsx
    │   ├── BudgetForm.tsx
    │   ├── BudgetChart.tsx
    │   └── SpendingInsights.tsx
    │
    ├── lib/
    │   └── mongodb.ts
    │
    ├── models/
    │   ├── Transaction.ts
    │   └── Budget.ts
```

---

## 🔄 API Routes

| Endpoint                          | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/api/transactions`              | GET    | Get all transactions               |
| `/api/transactions`              | POST   | Create new transaction             |
| `/api/transactions/[id]`         | DELETE | Delete transaction by ID           |
| `/api/budgets`                   | GET    | Fetch category budgets             |
| `/api/budgets`                   | POST   | Set or update monthly budgets      |

---

## 🌐 Live Demo

Deployed on **Vercel**:  
👉 [https://finance-visualiser-stage3.vercel.app/](https://finance-visualiser-stage3.vercel.app/)

---

## 📮 Submission Checklist

- [x] GitHub Repository ✅  
- [x] Vercel Deployment ✅  
- [x] All Stages Implemented (1 to 3) ✅  
- [x] No login/auth (per instructions) ✅  
- [x] README included ✅  
- [x] Responsive design with charts & error states ✅

---

## 👨‍💻 Author

**Ayush Rai**  
Crafted with 💙 using Next.js, React, MongoDB, and modern UI libraries.  
[GitHub](https://github.com/ayush123-bit) | [Portfolio](https://spiffy-biscotti-0bc36f.netlify.app/)
