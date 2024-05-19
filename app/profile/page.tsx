'use client'
import { useAuth } from '../../contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchProfile()
    }
  }, [user, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      setEmail(data.email)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage('Profile updated successfully!')
      } else {
        setMessage(data.error)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('An error occurred while updating your profile.')
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Profile
