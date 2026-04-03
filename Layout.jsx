import { Link, Outlet } from "react-router-dom";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="logo">Traffic AI</h2>

        <nav>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/upload">📤 Upload Video</Link>
          <Link to="/status">🚦 Status</Link>
        </nav>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;