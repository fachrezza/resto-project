import { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/api";

export default function Reservation() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    guest_count: 1,
    reservation_date: "",
    reservation_time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/reservations", form);

      alert("Reservasi berhasil");

      setForm({
        name: "",
        phone: "",
        email: "",
        guest_count: 1,
        reservation_date: "",
        reservation_time: "",
      });
    } catch (error) {
      console.error(error);
      alert("Reservasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 py-12 border-b">
        <div className="container mx-auto px-5">
          <h1 className="text-4xl font-bold text-gray-800">
            Reservasi Meja
          </h1>
          <p className="text-gray-500 mt-2">
            Booking meja kamu dengan mudah dan cepat
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="container mx-auto px-5 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-2xl mx-auto p-6 rounded-2xl shadow-sm"
        >

          <div className="grid md:grid-cols-2 gap-4">

            {/* NAME */}
            <input
              className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="Nama lengkap"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* PHONE */}
            <input
              className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="No WhatsApp"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {/* EMAIL */}
            <input
              className="border p-3 rounded-xl w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="Email (opsional)"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* GUEST */}
            <input
              type="number"
              min="1"
              className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="Jumlah tamu"
              value={form.guest_count}
              onChange={(e) =>
                setForm({
                  ...form,
                  guest_count: e.target.value,
                })
              }
            />

            {/* DATE */}
            <input
              type="date"
              className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-emerald-300"
              value={form.reservation_date}
              onChange={(e) =>
                setForm({
                  ...form,
                  reservation_date: e.target.value,
                })
              }
            />

            {/* TIME */}
            <input
              type="time"
              className="border p-3 rounded-xl w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              value={form.reservation_time}
              onChange={(e) =>
                setForm({
                  ...form,
                  reservation_time: e.target.value,
                })
              }
            />

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="mt-6 w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Reservasi Sekarang"}
          </button>

        </form>
      </div>
    </div>
  );
}