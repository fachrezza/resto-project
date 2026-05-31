import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchReservations();

    const interval = setInterval(() => {
      fetchReservations();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/admin/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await api.patch(`/admin/reservations/${id}`, {
        status,
      });

      await fetchReservations();
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
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          📅 Reservations
        </h1>

        <div className="text-sm text-gray-500">
          Auto refresh: 5s
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Tamu</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Jam</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Loading reservations...
                </td>
              </tr>
            ) : reservations.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Belum ada reservasi
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{r.name}</td>

                  <td className="p-3 text-gray-600">{r.phone}</td>

                  <td className="p-3 text-gray-600">{r.email}</td>

                  <td className="p-3">
                    <span className="font-semibold">
                      {r.guest_count}
                    </span>
                  </td>

                  <td className="p-3">{r.reservation_date}</td>

                  <td className="p-3">{r.reservation_time}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) =>
                        updateStatus(r.id, e.target.value)
                      }
                      className="border p-2 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <div
                      className={`mt-1 inline-block px-2 py-1 text-xs rounded ${statusColor(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </div>

                    {updatingId === r.id && (
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