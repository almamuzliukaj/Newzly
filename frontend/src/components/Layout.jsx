// Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* Header component displayed on every page */}
      <Header />
      {/* Main content area where child routes will render */}
      <main className="main-content">
        <Outlet />
      </main>
      {/* Footer component displayed on every page */}
      <Footer />
    </>
  );
}

export default Layout;
