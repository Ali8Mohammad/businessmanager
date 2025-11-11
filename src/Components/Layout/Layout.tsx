import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-lg font-bold">Dashboard</h2>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none md:hidden text-2xl"
            >
              ☰
            </button>
            <ul className="hidden md:flex space-x-4 items-center">
              <li>
                <Link
                  to="/partners"
                  className="px-3 py-2 rounded hover:bg-blue-100 transition text-black no-underline"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="/currencies"
                  className="px-3 py-2 rounded hover:bg-blue-100 transition text-black no-underline"
                >
                  Currencies
                </Link>
              </li>
              <li>
                <Link
                  to="/channels"
                  className="px-3 py-2 rounded hover:bg-blue-100 transition text-black no-underline"
                >
                  Payment Channels
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="px-3 py-2 rounded hover:bg-blue-100 transition text-black no-underline"
                >
                  Transaction Logs
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {menuOpen && (
          <ul
            className="md:hidden flex flex-col space-y-2 px-4 pb-4 animate-slide-down"
            onClick={() => setMenuOpen(false)}
          >
            <li>
              <Link
                to="/partners"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Partners
              </Link>
            </li>
            <li>
              <Link
                to="/currencies"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Currencies
              </Link>
            </li>
            <li>
              <Link
                to="/channels"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Payment Channels
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Transaction Logs
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
