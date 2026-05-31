import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // 5 detik biar tidak terlalu berat

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      await api.patch(`/admin/orders/${orderId}`, {
        status,
      });

      await fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Gagal update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          📦 Orders Management
        </h1>

        <div className="text-sm text-gray-500">
          Auto refresh: 5s
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  Belum ada order
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* ORDER NUMBER */}
                  <td className="p-3 font-semibold">
                    #{order.order_number}
                  </td>

                  {/* CUSTOMER */}
                  <td className="p-3">
                    <div className="font-medium">
                      {order.customer_name}
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="p-3 text-gray-600">
                    {order.phone}
                  </td>

                  {/* TOTAL */}
                  <td className="p-3 font-semibold">
                    Rp{" "}
                    {Number(order.grand_total).toLocaleString(
                      "id-ID"
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${statusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="border p-2 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>

                    {updatingId === order.id && (
                      <div className="text-xs text-gray-400 mt-1">
                        updating...
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}