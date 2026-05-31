import { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // auto redirect kalau sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/admin/dashboard");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/admin/login", form);

      localStorage.setItem("token", response.data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login gagal, cek email/password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Masuk ke dashboard restoran
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Memproses..." : "Login"}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          © Resto System Admin Panel
        </p>

      </div>
    </div>
  );
}