import React, { useState, useEffect } from "react";
import AOS from "aos"; // <-- Dihapus
import "aos/dist/aos.css"; // <-- Dihapus
// Mengaktifkan useNavigate untuk redirect
import { Link, useNavigate } from "react-router-dom"; 

// Menambahkan interface global untuk window.AOS agar TypeScript tidak error
declare global {
  interface Window {
    AOS: {
      init: (options?: any) => void;
      refresh: () => void;
      // tambahkan method AOS lain jika perlu
    };
  }
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // --- STATE BARU UNTUK HANDLER ---
  const [isLoading, setIsLoading] = useState(false); // <-- (1) State untuk loading
  const [error, setError] = useState<string | null>(null); // <-- (2) State untuk pesan error

  // Mengaktifkan hook useNavigate
  const navigate = useNavigate(); 

  // Inisialisasi AOS dari CDN
  useEffect(() => {
    // 1. Load AOS CSS
    const cssLink = document.createElement("link");
    cssLink.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);

    // 2. Load AOS Script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    script.async = true;
    script.onload = () => {
      // 3. Inisialisasi AOS setelah skrip dimuat
      if (window.AOS) {
        window.AOS.init({ duration: 1000, once: true });
      }
    };
    document.body.appendChild(script);

    // 4. Cleanup function untuk menghapus script dan link saat komponen di-unmount
    return () => {
      try {
        document.head.removeChild(cssLink);
        document.body.removeChild(script);
      } catch (e) {
        // Mencegah error jika elemen sudah terhapus
        console.warn("Gagal membersihkan AOS script/link.", e);
      }
    };
  }, []);

  // --- HANDLER YANG LEBIH BAIK ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // 1. Mulai proses loading & bersihkan error lama
    setIsLoading(true);
    setError(null);

    // 2. Simulasikan pemanggilan API (misalnya 2 detik)
    try {
      // --- Ini adalah bagian yang kamu ganti dengan API call (fetch/axios) ---
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "user@invofest.com" && password === "123456") {
            resolve("Login berhasil!");
          } else {
            reject(new Error("Email atau password yang Anda masukkan salah."));
          }
        }, 2000); // <-- Simulasi delay 2 detik
      });
      // ---------------------------------------------------------------------

      // 3. Handle jika Sukses
      console.log("Login Berhasil:", { email });
      // Di aplikasi nyata, kamu akan menyimpan token dan redirect
      // alert("Login Berhasil!");
      
      // PERMINTAAN ANDA: Redirect ke dashboard setelah sukses
      navigate("/dashboard"); 
      
    } catch (err: any) { // 4. Handle jika Error
      setError(err.message || "Terjadi kesalahan, silakan coba lagi.");
    
    } finally { // 5. Selesai (baik sukses atau error)
      setIsLoading(false); // <-- Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-slate-100 p-6">
      <div
        data-aos="fade-up"
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl"
      >
        {/* --- Header --- */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#852e4e]">
            Selamat Datang!
          </h1>
          <p className="mt-2 text-slate-500">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {/* --- Form Login --- */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* ... (Input Email & Password masih sama) ... */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm"
              placeholder="email@anda.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading} // <-- Nonaktifkan input saat loading
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              {/* Link ini masih dikomentari sesuai kode asli Anda */}
              {/* <Link
                to="/forgot-password"
                className="text-sm text-[#852e4e] hover:underline"
              >
                Lupa Password?
              </Link> */}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // <-- Nonaktifkan input saat loading
            />
          </div>

          {/* --- MENAMPILKAN PESAN ERROR --- */}
          {error && ( // <-- (3) Tampilkan box error jika state 'error' ada isinya
            <div 
              data-aos="zoom-in"
              className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
            >
              {error}
            </div>
          )}

          {/* --- TOMBOL SUBMIT --- */}
          <div>
            <button
              type="submit"
              disabled={isLoading} // <-- (4) Nonaktifkan tombol saat loading
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#852e4e] hover:bg-[#4c1d3d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#852e4e] font-semibold transition duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed" // <-- (5) Style saat disabled
            >
              {isLoading ? "Memproses..." : "Login"} {/* <-- (6) Ubah teks saat loading */}
            </button>
          </div>
        </form>

        {/* --- Footer (Link ke Register) --- */}
        {/* <div className="text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-medium text-[#852e4e] hover:underline"
          >
            Daftar di sini
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;

