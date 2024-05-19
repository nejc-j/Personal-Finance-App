'use client'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      // Check if response is OK before attempting to parse JSON
      if (response.ok) {
        const data = await response.json()
        setMessage('Login successful!')
        // Store the JWT token in local storage or cookies
        localStorage.setItem('token', data.token)
      } else {
        const errorData = await response.json()
        setMessage(errorData.error)
      }
    } catch (error) {
      console.error('An error occurred:', error)
      setMessage('An error occurred while trying to login.')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login
