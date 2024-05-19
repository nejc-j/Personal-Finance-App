import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
})

export default mongoose.models.Expense ||
  mongoose.model('Expense', ExpenseSchema)
