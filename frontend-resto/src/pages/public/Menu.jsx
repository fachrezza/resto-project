import { useEffect, useState } from "react";
import api from "../../api/api";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await api.get("/menus");
      setMenus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SOFT */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
        <div className="container mx-auto px-5 py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Menu Restoran
          </h1>
          <p className="text-gray-500 mt-2">
            Pilih makanan favorit kamu dan tambahkan ke keranjang
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto p-5 flex-1">
        {menus.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Menu belum tersedia
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <div className="h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={`http://127.0.0.1:8000/storage/${menu.image}`}
                    alt={menu.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-gray-800">
                    {menu.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {menu.description || "Tidak ada deskripsi"}
                  </p>

                  <div className="mt-3 font-semibold text-emerald-600">
                    Rp {Number(menu.price).toLocaleString("id-ID")}
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => addToCart(menu)}
                      className="w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition"
                    >
                      + Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER SOFT */}
      <footer className="bg-white border-t mt-10">
        <div className="container mx-auto px-5 py-8 grid md:grid-cols-3 gap-6">

          <div>
            <h3 className="font-bold text-gray-800 text-lg">
              Resto App
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Sistem pemesanan makanan online modern dengan pengalaman cepat dan mudah.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Navigasi
            </h3>
            <ul className="text-sm text-gray-500 mt-2 space-y-1">
              <li>Home</li>
              <li>Menu</li>
              <li>Reservasi</li>
              <li>Keranjang</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">
              Kontak
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              support@resto-app.com
              <br />
              +62 812-0000-0000
            </p>
          </div>

        </div>

        <div className="text-center text-xs text-gray-400 py-4 border-t">
          © {new Date().getFullYear()} Resto App. All rights reserved.
        </div>
      </footer>

    </div>
  );
}