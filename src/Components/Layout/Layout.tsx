import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="bg-white shadow-md w-full p-4 flex  justify-center align-center flex-col">
        <nav className="flex justify-between w-full flex-col items-center">
          <h2 className="text-lg font-bold mb-4">Dashboard</h2>
          <ul className="space-y-2 flex align-center w-full list-none justify-center gap-2">
            <li className="px-5">
              <Link
                to="/currencies"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition text-black no-underline"
              >
                Currencies
              </Link>
            </li>
            <li className="no-underline text-black">
              <Link
                to="/payment-channels"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Payment Channels
              </Link>
            </li>
            <li>
              <Link
                to="/transaction-logs"
                className="block px-3 py-2 rounded hover:bg-blue-100 transition"
              >
                Transaction Logs
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white h-10 rounded mt-5 h-max w-max m-auto"
        >
          Logout
        </button>
      </div>


      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
