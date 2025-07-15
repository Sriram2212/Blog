export default function BuyerLayout({ children }) {
  return (
    <div>
      <nav style={{ background: 'lightblue', padding: '1rem' }}>
        <a href="/buyer">Home</a> | 
        <a href="/buyer/profile">Profile</a>
      </nav>
      {children}
    </div>
  );
}
