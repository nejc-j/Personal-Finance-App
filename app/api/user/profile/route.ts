import dbConnect from '../../../../lib/db'
import User from '../../../../models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function GET(req: Request) {
  await dbConnect()
  const user = await User.findById((req as any).user.userId).exec() // Assuming userId is set from middleware
  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const { email, password } = await req.json()
  await dbConnect()
  const hashedPassword = await bcrypt.hash(password, 10)
  const updatedUser = await User.findByIdAndUpdate(
    (req as any).user.userId,
    { email, password: hashedPassword },
    { new: true }
  )
  return NextResponse.json(updatedUser)
}
