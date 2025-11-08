"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { adminAPI } from "@/services/api";

interface WorkshopData {
  id?: number;
  fullName?: string;
  workshop?: string;
  category?: string;
  whatsapp?: string;
  institution?: string;
  paymentUrl?: string;
  igFollowUrl?: string;
}

interface ApiResponse {
  message: string;
  data?: WorkshopData[];
  error?: string;
}

export const PenWorkshop: React.FC = () => {
  const { token, isHydrated } = useAuth();
  const [workshopData, setWorkshopData] = useState<WorkshopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      if (!isHydrated || !token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log("[v0] Fetching workshop data...");
        const response = (await adminAPI.getWorkshop(token)) as
          | ApiResponse
          | WorkshopData[];

        if (Array.isArray(response)) {
          console.log("[v0] Workshop data (array):", response);
          setWorkshopData(response);
          setError(null);
        } else if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          Array.isArray(response.data)
        ) {
          console.log("[v0] Workshop data (wrapped):", response.data);
          setWorkshopData(response.data);
          setError(null);
        } else {
          console.error("[v0] Unexpected response format:", response);
          setWorkshopData([]);
          setError("Data format tidak valid");
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Gagal memuat data workshop";
        console.error("[v0] Error fetching workshop:", errorMsg);
        setWorkshopData([]);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, isHydrated]);

  const filteredData = workshopData.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.workshop?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.whatsapp?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.institution?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-1 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Daftar Peserta Workshop
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="w-full flex justify-end mt-3 mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && (
        <div className="text-center py-4 text-gray-500">Loading data...</div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full text-sm border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b text-left">No</th>
              <th className="px-4 py-3 border-b text-left">Nama</th>
              <th className="px-4 py-3 border-b text-left">Jenis Workshop</th>
              <th className="px-4 py-3 border-b text-left">Kategori</th>
              <th className="px-4 py-3 border-b text-left">WhatsApp</th>
              <th className="px-4 py-3 border-b text-left">Institusi</th>
              <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
              <th className="px-4 py-3 border-b text-left">Bukti Follow</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((workshop, index) => (
                <tr
                  key={workshop.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-2 border-b">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 border-b font-medium text-gray-800">
                    {workshop.fullName || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {workshop.workshop || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {workshop.category || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {workshop.whatsapp || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {workshop.institution || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {workshop.paymentUrl ? (
                      <a
                        href={workshop.paymentUrl}
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
                    {workshop.igFollowUrl ? (
                      <a
                        href={workshop.igFollowUrl}
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
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  {loading ? "Loading..." : "Tidak ada data ditemukan."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
