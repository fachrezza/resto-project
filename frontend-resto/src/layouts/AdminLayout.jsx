import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r p-4">
        <h2 className="font-bold text-xl mb-4">
          Admin Panel
        </h2>

        <ul className="space-y-2">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/menus">Menus</Link></li>
          <li><Link to="/admin/reservations">Reservations</Link></li>
        </ul>

        <button
          onClick={logout}
          className="mt-6 text-red-500"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-5">
        <Outlet />
      </main>

    </div>
  );
}