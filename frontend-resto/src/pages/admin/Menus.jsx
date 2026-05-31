import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    is_available: true,
    image: null,
  });

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    const res = await api.get("/admin/menus");
    setMenus(res.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category_id", form.category_id);
    data.append("name", form.name);
    data.append("description", form.description || "");
    data.append("price", form.price);
    data.append("is_available", form.is_available ? 1 : 0);

    if (form.image) {
      data.append("image", form.image);
    }

    if (editingId) {
      data.append("_method", "PUT");
      await api.post(`/admin/menus/${editingId}`, data);
    } else {
      await api.post("/admin/menus", data);
    }

    resetForm();
    fetchMenus();
  };

  const deleteMenu = async (id) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;
    await api.delete(`/admin/menus/${id}`);
    fetchMenus();
  };

  const toggleStatus = async (menu) => {
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("category_id", menu.category_id);
    data.append("name", menu.name);
    data.append("description", menu.description || "");
    data.append("price", menu.price);
    data.append("is_available", menu.is_available ? 0 : 1);

    await api.post(`/admin/menus/${menu.id}`, data);
    fetchMenus();
  };

  const editMenu = (menu) => {
    setEditingId(menu.id);
    setForm({
      category_id: menu.category_id,
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
      is_available: menu.is_available,
      image: null,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      category_id: "",
      name: "",
      description: "",
      price: "",
      is_available: true,
      image: null,
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-gray-500 text-sm">
            Kelola menu restoran kamu
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          + Tambah Menu
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Menu</p>
          <h2 className="text-xl font-bold">{menus.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active</p>
          <h2 className="text-xl font-bold text-green-600">
            {menus.filter(m => m.is_available).length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Inactive</p>
          <h2 className="text-xl font-bold text-red-500">
            {menus.filter(m => !m.is_available).length}
          </h2>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >

          <div className="grid grid-cols-2 gap-4">

            <select
              className="border p-2 rounded"
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
            >
              <option>Pilih Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              className="border p-2 rounded"
              placeholder="Nama Menu"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="border p-2 rounded"
              placeholder="Harga"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />

            <input
              type="file"
              className="border p-2 rounded"
              onChange={handleImage}
            />
          </div>

          <textarea
            className="border p-2 rounded w-full mt-4"
            placeholder="Deskripsi"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="flex gap-2 mt-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              {editingId ? "Update" : "Simpan"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="border px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-t">

                <td className="p-3">
                  {menu.image && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${menu.image}`}
                      className="w-12 h-12 rounded object-cover"
                    />
                  )}
                </td>

                <td className="p-3 font-medium">{menu.name}</td>

                <td className="p-3">
                  Rp {Number(menu.price).toLocaleString("id-ID")}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(menu)}
                    className={`px-2 py-1 text-xs rounded ${
                      menu.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {menu.is_available ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => editMenu(menu)}
                    className="border px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMenu(menu.id)}
                    className="border px-2 py-1 rounded text-red-500"
                  >
                    Hapus
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}