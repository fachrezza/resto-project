import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-24">
        <div className="container mx-auto px-5 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Restoran Gorontalo
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Nikmati makanan terbaik dengan cita rasa khas Gorontalo, dibuat dari bahan segar dan resep pilihan.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/menu"
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition"
            >
              Lihat Menu
            </Link>

            <Link
              to="/reservasi"
              className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-white transition"
            >
              Reservasi Meja
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="container mx-auto px-5 py-16 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            🍽️ Makanan Fresh
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Semua menu dimasak langsung setelah order masuk.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            ⚡ Order Cepat
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Sistem pemesanan real-time tanpa delay.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            📍 Reservasi Mudah
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Booking meja langsung dari website.
          </p>
        </div>

      </section>

      {/* FOOTER MINI */}
      <footer className="border-t bg-white py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Restoran Gorontalo. All rights reserved.
      </footer>

    </div>
  );
}