'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    const roles = {
      admin: { password: 'admin123', route: '/admin' },
      user: { password: '123', route: '/user' }
    }
    if (roles[username] && password === roles[username].password) {
      localStorage.setItem('role', username)
      localStorage.setItem('isAuthenticated', 'true')
      router.push(roles[username].route)
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(6.5px)',
        WebkitBackdropFilter: 'blur(6.5px)',
        color: '#fff',
        width: '350px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: '600' }}>Login</h2>
        {error && <p style={{ color: 'tomato', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '6px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                outline: 'none'
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(90deg, #4CAF50 0%, #66bb6a 100%)',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
