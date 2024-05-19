import dbConnect from '../../../lib/db'
import Expense from '../../../models/Expense'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  await dbConnect()
  const expenses = await Expense.find({}).exec()
  return NextResponse.json(expenses)
}

export async function POST(req: Request) {
  const { description, amount, date } = await req.json()
  await dbConnect()
  const newExpense = await Expense.create({ description, amount, date })
  return NextResponse.json(newExpense)
}

export async function PUT(req: Request) {
  const { id, description, amount, date } = await req.json()
  await dbConnect()
  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    { description, amount, date },
    { new: true }
  )
  return NextResponse.json(updatedExpense)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await dbConnect()
  await Expense.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Expense deleted successfully' })
}
