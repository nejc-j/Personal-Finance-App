'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Expense {
  _id: string
  description: string
  amount: number
  date: string
}

interface Budget {
  _id: string
  category: string
  amount: number
  startDate: string
  endDate: string
}

const Dashboard = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [description, setDescription] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDate, setExpenseDate] = useState('')
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchExpenses()
      fetchBudgets()
    }
  }, [user, router])

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      console.log('Fetched expenses:', data)
      if (Array.isArray(data)) {
        setExpenses(data)
      } else {
        console.error('Expenses data is not an array:', data)
      }
    } catch (error) {
      console.error('Error fetching expenses:', error)
    }
  }

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets')
      const data = await response.json()
      console.log('Fetched budgets:', data)
      if (Array.isArray(data)) {
        setBudgets(data)
      } else {
        console.error('Budgets data is not an array:', data)
      }
    } catch (error) {
      console.error('Error fetching budgets:', error)
    }
  }

  const handleAddExpense = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(expenseAmount),
          date: expenseDate,
        }),
      })

      if (response.ok) {
        const newExpense = await response.json()
        console.log('Added expense:', newExpense)
        setExpenses([...expenses, newExpense])
        setDescription('')
        setExpenseAmount('')
        setExpenseDate('')
      } else {
        console.error('Failed to add expense')
      }
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const handleEditExpense = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/expenses/${editingExpense?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(expenseAmount),
          date: expenseDate,
        }),
      })

      if (response.ok) {
        const updatedExpense = await response.json()
        console.log('Updated expense:', updatedExpense)
        setExpenses(
          expenses.map((expense) =>
            expense._id === updatedExpense._id ? updatedExpense : expense
          )
        )
        setEditingExpense(null)
        setDescription('')
        setExpenseAmount('')
        setExpenseDate('')
      } else {
        console.error('Failed to update expense')
      }
    } catch (error) {
      console.error('Error updating expense:', error)
    }
  }

  const handleDeleteExpense = async (id: string) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log('Deleted expense:', id)
        setExpenses(expenses.filter((expense) => expense._id !== id))
      } else {
        console.error('Failed to delete expense')
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense)
    setDescription(expense.description)
    setExpenseAmount(expense.amount.toString())
    setExpenseDate(expense.date)
  }

  const handleAddBudget = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          amount: parseFloat(amount),
          startDate,
          endDate,
        }),
      })

      if (response.ok) {
        const newBudget = await response.json()
        console.log('Added budget:', newBudget)
        setBudgets([...budgets, newBudget])
        setCategory('')
        setAmount('')
        setStartDate('')
        setEndDate('')
      } else {
        console.error('Failed to add budget')
      }
    } catch (error) {
      console.error('Error adding budget:', error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <section>
        <h2>Account Summary</h2>
        <p>Balance: $XXXX</p>
        <p>Recent Transactions:</p>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.description}: ${expense.amount} ({expense.date})
              <button onClick={() => startEditing(expense)}>Edit</button>
              <button onClick={() => handleDeleteExpense(expense._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={editingExpense ? handleEditExpense : handleAddExpense}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
          <button type="submit">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
        </form>
      </section>
      <section>
        <h2>Budget Overview</h2>
        <ul>
          {budgets.map((budget, index) => (
            <li key={index}>
              {budget.category}: ${budget.amount}
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddBudget}>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit">Add Budget</button>
        </form>
      </section>
    </div>
  )
}

export default Dashboard
