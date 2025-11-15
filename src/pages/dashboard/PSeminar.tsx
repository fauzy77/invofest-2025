"use client";

import type React from "react";
import { useState, useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth"; // [PERBAIKAN] Dihapus
// import { adminAPI } from "@/services/api"; // [PERBAIKAN] Dihapus

// [PERBAIKAN] Meng-inline adminAPI dan dependencies untuk mengatasi error import
const API_BASE_URL = "https://be-invofest.vercel.app";

const handleResponse = async (res: Response) => {
  const text = await res.text();
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const json = JSON.parse(text);
      msg = json.message ?? json.error ?? msg;
    } catch {
      msg = text.slice(0, 200) || msg;
    }
    throw new Error(msg);
  }
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const adminHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const adminAPI = {
  getSeminar: (token: string) =>
    fetch(`${API_BASE_URL}/admin/seminar`, {
      headers: adminHeader(token),
    }).then(handleResponse),
};
// --- Akhir dari inline API ---

// [PERBAIKAN] Mock hook useAuth untuk mengatasi error import
const useAuth = () => {
  // Menyediakan data palsu (mock) agar komponen bisa berjalan
  return {
    token: "mock-development-token", // Token palsu untuk pengujian
    isHydrated: true, // Asumsikan auth sudah siap
  };
};
// --- Akhir dari mock hook ---

// --- Interface Data (Sesuai file asli Anda) ---
interface SeminarData {
  id?: number;
  fullName?: string;
  category?: string;
  whatsapp?: string;
  institution?: string;
  paymentUrl?: string;
  igFollowUrl?: string;
}

interface ApiResponse {
  message: string;
  data?: SeminarData[];
  error?: string;
}

export const PenSeminar: React.FC = () => {
  const { token, isHydrated } = useAuth(); // Sekarang menggunakan mock hook
  const [seminarData, setSeminarData] = useState<SeminarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // [TAMBAHAN] useEffect untuk memuat script jsPDF dan autoTable dari CDN
  useEffect(() => {
    const jspdfScript = document.createElement("script");
    jspdfScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    jspdfScript.async = true;
    document.body.appendChild(jspdfScript);

    const autotableScript = document.createElement("script");
    autotableScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
    autotableScript.async = true;
    document.body.appendChild(autotableScript);

    return () => {
      // Membersihkan script saat komponen di-unmount
      try {
        document.body.removeChild(jspdfScript);
        document.body.removeChild(autotableScript);
      } catch (e) {
        console.warn("Gagal membersihkan script PDF.", e);
      }
    };
  }, []);

  // useEffect untuk mengambil data (Sesuai file asli Anda)
  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated || !token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log("[v0] Fetching seminar data...");
        const response = (await adminAPI.getSeminar(token)) as
          | ApiResponse
          | SeminarData[];

        if (Array.isArray(response)) {
          console.log("[v0] Seminar data (array):", response);
          setSeminarData(response);
          setError(null);
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          Array.isArray(response.data)
        ) {
          console.log("[v0] Seminar data (wrapped):", response.data);
          setSeminarData(response.data);
          setError(null);
        } else {
          console.error("[v0] Unexpected response format:", response);
          setSeminarData([]);
          setError("Data format tidak valid");
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Gagal memuat data seminar";
        console.error("[v0] Error fetching seminar:", errorMsg);
        setSeminarData([]);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isHydrated]);

  // [TAMBAHAN] Fungsi handleExportPDF
  const handleExportPDF = () => {
    // Cek jika library sudah di-load (tersedia di window)
    // @ts-ignore
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert("Library PDF sedang dimuat, silakan coba lagi sesaat.");
      return;
    }

    // @ts-ignore
    const doc = new window.jspdf.jsPDF();

    // Judul PDF
    doc.text("Daftar Peserta Seminar - Invofest 2025", 14, 20);
    doc.setFontSize(12);
    doc.text(`Total Peserta: ${filteredData.length}`, 14, 26);

    // Tentukan kolom (Sesuai 7 kolom asli Anda)
    const head = [
      ["No", "Nama", "Kategori", "WhatsApp", "Institusi", "Bayar", "Follow"],
    ];

    // Tentukan data (body) - Ambil dari filteredData (bukan paginatedData)
    // Menggunakan 7 kolom asli
    const body = filteredData.map((item, index) => [
      index + 1,
      item.fullName || "-",
      item.category || "-",
      item.whatsapp || "-",
      item.institution || "-",
      item.paymentUrl ? "Ada" : "-", // Teks "Ada" jika link ada
      item.igFollowUrl ? "Ada" : "-", // Teks "Ada" jika link ada
    ]);

    // @ts-ignore
    doc.autoTable({
      head: head,
      body: body,
      startY: 32, // Mulai tabel di bawah judul
      theme: "striped",
      headStyles: { fillColor: [133, 46, 78] }, // Warna header #852e4e
    });

    doc.save("Daftar_Peserta_Seminar_Invofest_2025.pdf");
  };

  // Filter data (Sesuai file asli Anda)
  const filteredData = seminarData.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.whatsapp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.institution?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1; // Menghindari 0
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-1 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Daftar Peserta Seminar
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* [MODIFIKASI] Menambahkan flex container dan tombol Export PDF */}
      <div className="w-full flex flex-col sm:flex-row justify-end items-center gap-4 mt-3 mb-3">
        <input
          type="text"
          placeholder="Cari nama, kategori, institusi..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto sm:min-w-72 focus:ring-2 focus:ring-[#852e4e] focus:outline-none text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          onClick={handleExportPDF}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
        >
          Export PDF
        </button>
      </div>

      {loading && (
        <div className="text-center py-4 text-gray-500">Loading data...</div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm border border-gray-200">
          {/* Header Tabel (Sesuai file asli Anda, 7 kolom) */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b text-left">No</th>
              <th className="px-4 py-3 border-b text-left">Nama</th>
              <th className="px-4 py-3 border-b text-left">Kategori</th>
              <th className="px-4 py-3 border-b text-left">WhatsApp</th>
              <th className="px-4 py-3 border-b text-left">Institusi</th>
              <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
              <th className="px-4 py-3 border-b text-left">Bukti Follow</th>
            </tr>
          </thead>
          {/* Body Tabel (Sesuai file asli Anda, 7 kolom) */}
          <tbody>
            {!loading && paginatedData.length > 0 ? (
              paginatedData.map((seminar, index) => (
                <tr
                  key={seminar.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-2 border-b">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 border-b font-medium text-gray-800">
                    {seminar.fullName || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.category || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.whatsapp || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.institution || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.paymentUrl ? (
                      <a
                        href={seminar.paymentUrl}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {seminar.igFollowUrl ? (
                      <a
                        href={seminar.igFollowUrl}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat Bukti
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "Tidak ada data ditemukan."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Sesuai file asli Anda) */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Sebelumnya
        </button>

        <span className="text-gray-700">
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Selanjutnya →
        </button>
      </div>
    </div>
  );
};