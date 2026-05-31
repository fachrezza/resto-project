import { useState } from "react";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    table_id: 1,
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Keranjang kosong");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customer_name: form.customer_name,
        phone: form.phone,
        table_id: Number(form.table_id),
        items: cartItems.map((item) => ({
          menu_id: item.id,
          qty: item.qty,
        })),
      };

      const response = await api.post("/orders", payload);

      clearCart();

      navigate(`/success/${response.data.order_number}`);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error.response?.data || error);
      alert(error.response?.data?.message || "Gagal membuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto max-w-2xl px-5">

          <h1 className="text-3xl font-bold mb-6">
            Checkout
          </h1>

          {/* SUMMARY */}
          <div className="bg-white p-5 rounded-xl shadow-sm mb-5">
            <h2 className="font-semibold mb-3">
              Ringkasan Pesanan
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm py-1"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="font-bold flex justify-between">
              <span>Total</span>
              <span>
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-sm space-y-3"
          >
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Nama"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Nomor WA"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-3 rounded-lg"
              placeholder="Nomor Meja"
              value={form.table_id}
              onChange={(e) =>
                setForm({ ...form, table_id: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
            >
              {loading ? "Memproses..." : "Pesan Sekarang"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}