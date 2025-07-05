import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#1e293b', fontWeight: 'bold' }}>Welcome to Palugada</h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b' }}>Your one-stop solution for everything you need.</p>
      </header>
      <main>
        <button style={{ padding: '1rem 2rem', fontSize: '1.25rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.15)' }}>
          Get Started
        </button>
      </main>
    </div>
  );
};

export default LandingPage;
