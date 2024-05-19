'use client'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { ReactNode } from 'react'
import Link from 'next/link'

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  )
}

const NavBar = () => {
  const { user, logout } = useAuth()

  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default ClientWrapper
