import dbConnect from '../../../lib/db'
import Budget from '../../../models/Budget'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  await dbConnect()
  const budgets = await Budget.find({}).exec()
  return NextResponse.json(budgets)
}

export async function POST(req: Request) {
  const { category, amount, startDate, endDate } = await req.json()
  await dbConnect()
  const newBudget = await Budget.create({
    category,
    amount,
    startDate,
    endDate,
  })
  return NextResponse.json(newBudget)
}
