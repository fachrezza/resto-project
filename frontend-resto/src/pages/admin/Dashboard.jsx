import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
      <div className="text-gray-500 text-sm">{title}</div>

      <div className={`text-2xl font-bold mt-2 ${color}`}>
        {value}
      </div>

      {subtitle && (
        <div className="text-xs text-gray-400 mt-1">
          {subtitle}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse text-gray-400">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          📊 Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Overview data restoran kamu
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card
          title="Total Orders"
          value={stats.total_orders}
          color="text-blue-600"
          subtitle="Semua order"
        />

        <Card
          title="Total Reservations"
          value={stats.total_reservations}
          color="text-green-600"
          subtitle="Semua reservasi"
        />

        <Card
          title="Today Orders"
          value={stats.today_orders}
          color="text-purple-600"
          subtitle="Order hari ini"
        />

        <Card
          title="Revenue"
          value={`Rp ${Number(stats.revenue).toLocaleString("id-ID")}`}
          color="text-emerald-600"
          subtitle="Total pendapatan"
        />

      </div>

      
    </div>
  );
}