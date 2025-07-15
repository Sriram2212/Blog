'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      height: '100vh',
      margin: 0,
      background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '10px' }}>
        Welcome to My  Blog Website 
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', maxWidth: '500px' }}>
Whatever you're looking for, start your journey here
      </p>
      <Link href="/login">
        <button style={{
          padding: '12px 30px',
          fontSize: '1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease, transform 0.2s ease'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#45a049'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Go to Login
        </button>
      </Link>
    </div>
  )
}
