'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        color: '#fff',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '0 20px'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to My Blog Website</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem' }}>
        Sign in to explore personalized features and get started with a seamless experience.
      </p>
      <button
        onClick={handleLogin}
        style={{
          padding: '12px 30px',
          fontSize: '18px',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Login
      </button>
    </main>
  );
}
