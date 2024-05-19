import 'next/server'

declare module 'next/server' {
  interface NextRequest {
    user?: {
      userId: string
      email: string
      iat: number
      exp: number
    }
  }
}
