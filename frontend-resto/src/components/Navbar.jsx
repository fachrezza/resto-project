import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">

        <h1 className="font-bold text-xl text-gray-800">
          Resto App
        </h1>

        <div className="flex gap-6 text-gray-600 font-medium">
          <Link className="hover:text-black" to="/">Home</Link>
          <Link className="hover:text-black" to="/menu">Menu</Link>
          <Link className="hover:text-black" to="/reservation">Reservasi</Link>

          <Link className="hover:text-black relative" to="/cart">
            Keranjang
            {totalQty > 0 && (
              <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}