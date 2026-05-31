export default function MenuCard({ menu, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* IMAGE */}
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img
          src={
            menu.image
              ? `http://127.0.0.1:8000/storage/${menu.image}`
              : "https://via.placeholder.com/300"
          }
          alt={menu.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {menu.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2">
          {menu.description}
        </p>

        <div className="flex justify-between items-center mt-3">

          <span className="font-bold text-black">
            Rp {Number(menu.price).toLocaleString("id-ID")}
          </span>

          <button
            onClick={() => onAdd(menu)}
            className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800"
          >
            + Keranjang
          </button>

        </div>

      </div>
    </div>
  );
}