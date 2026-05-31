import Navbar from "../../components/Navbar";
import { useParams, Link } from "react-router-dom";

export default function Success() {
  const { orderNumber } = useParams();

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-5">
        <div className="bg-white shadow-sm rounded-2xl p-8 max-w-md w-full text-center border">

          {/* ICON SUCCESS */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-gray-800">
            Pesanan Berhasil
          </h1>

          <p className="text-gray-500 mt-2">
            Terima kasih! Pesanan kamu sedang diproses.
          </p>

          {/* ORDER NUMBER BOX */}
          <div className="mt-6 bg-gray-50 border rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Nomor Order
            </p>

            <p className="text-2xl font-bold tracking-widest text-gray-800 mt-1">
              #{orderNumber}
            </p>
          </div>

          {/* STATUS */}
          <div className="mt-5 text-sm">
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
              Menunggu diproses
            </span>
          </div>

          {/* BUTTON */}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/menu"
              className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Pesan Lagi
            </Link>

            <Link
              to="/"
              className="border py-2 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              Kembali ke Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}