export default function SellerLayout({ children }) {
  return (
    <div>
      <nav style={{ background: 'orange', padding: '1rem' }}>
        <a href="/seller">Dashboard</a> |
        <a href="/seller/products">Products</a>
      </nav>
      {children}
    </div>
  );
}
