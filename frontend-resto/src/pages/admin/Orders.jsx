import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/admin/orders/${id}`, { status });
      fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  const badge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">📦 Orders</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-semibold">#{o.order_number}</td>
                  <td className="p-3">{o.customer_name}</td>
                  <td className="p-3 font-medium">
                    Rp {Number(o.grand_total).toLocaleString("id-ID")}
                  </td>

                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${badge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={o.status}
                      disabled={updatingId === o.id}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                    >
                      <option>pending</option>
                      <option>processing</option>
                      <option>completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}