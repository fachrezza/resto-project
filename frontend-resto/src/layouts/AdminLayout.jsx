import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-5">
        <h2 className="text-xl font-bold mb-6">🍽 Admin Panel</h2>

        <nav className="space-y-2 text-sm">
          <Link className="block p-2 rounded hover:bg-gray-100" to="/admin/dashboard">Dashboard</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/admin/orders">Orders</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/admin/reservations">Reservations</Link>
          <Link className="block p-2 rounded hover:bg-gray-100" to="/admin/menus">Menus</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-6 w-full text-sm text-red-500 hover:bg-red-50 p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}