import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
    }
    req.user = decoded as any // Add the user information to the request
    return NextResponse.next()
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// Apply middleware to the specific API routes
export const config = {
  matcher: [
    '/api/user/profile/:path*',
    '/api/expenses/:path*',
    '/api/budgets/:path*',
  ],
}
