import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HEADER */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
        <div className="container mx-auto px-5 py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Keranjang Pesanan
          </h1>
          <p className="text-gray-500 mt-2">
            Review pesanan kamu sebelum checkout
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-5 py-10 grid lg:grid-cols-3 gap-6">

        {/* LEFT: ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cartItems.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
              Keranjang kamu masih kosong 🛒
              <div className="mt-4">
                <Link
                  to="/menu"
                  className="inline-block bg-emerald-500 text-white px-5 py-2 rounded-xl hover:bg-emerald-600 transition"
                >
                  Mulai Belanja
                </Link>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center"
              >

                {/* INFO */}
                <div>
                  <h3 className="font-bold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>

                  <p className="font-semibold text-emerald-600 mt-1">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                </div>

                {/* ACTION */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm border px-3 py-1 rounded-lg hover:bg-red-50 transition"
                >
                  Hapus
                </button>

              </div>
            ))
          )}

        </div>

        {/* RIGHT: SUMMARY */}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-5 h-fit sticky top-5">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ringkasan
            </h2>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Total Item</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total Harga</span>
              <span className="font-bold text-emerald-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
            >
              Checkout Sekarang
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}