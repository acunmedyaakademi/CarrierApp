export default function Layout({ children }) {
  return (
    <>
      {children}
      <nav>
        <ul>
          <li>
            <a href="/">Orders</a>
          </li>
          <li>
            <a href="/my-deliveries">My Deliveries</a>
          </li>
          <li>
            <a href="/profile">Account</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
