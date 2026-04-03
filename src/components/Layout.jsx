import Header from "./Header";

export default function Layout({ children, isLoggedIn }) {
  return (
    <div className="app-shell">
      <Header isLoggedIn={isLoggedIn} />
      <main className="page-container">{children}</main>
    </div>
  );
}