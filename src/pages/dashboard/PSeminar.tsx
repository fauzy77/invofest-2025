import React, { useState } from "react";

const seminarData = [
    { id: 1, name: "Ahmad Mashuri", category: "Umum", whatsApp: "081234567890", asalInstitusi: "Universitas Harkat Negeri", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 2, name: "Budi Santoso", category: "Mahasiswa", whatsApp: "082145678901", asalInstitusi: "Politeknik Negeri Bandung", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 3, name: "Citra Dewi", category: "Umum", whatsApp: "083156789012", asalInstitusi: "Universitas Negeri Jakarta", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 4, name: "Dimas Pratama", category: "Mahasiswa", whatsApp: "084267890123", asalInstitusi: "Universitas Airlangga", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 5, name: "Eka Lestari", category: "Umum", whatsApp: "085378901234", asalInstitusi: "Universitas Diponegoro", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 6, name: "Farhan Rizky", category: "Umum", whatsApp: "086489012345", asalInstitusi: "Universitas Indonesia", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 7, name: "Gita Anggraini", category: "Mahasiswa", whatsApp: "087590123456", asalInstitusi: "Institut Teknologi Sepuluh Nopember", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 8, name: "Hendra Kurnia", category: "Umum", whatsApp: "088601234567", asalInstitusi: "Universitas Gadjah Mada", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 9, name: "Indah Sari", category: "Mahasiswa", whatsApp: "089712345678", asalInstitusi: "Universitas Negeri Surabaya", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 10, name: "Joko Prasetyo", category: "Umum", whatsApp: "081823456789", asalInstitusi: "Universitas Hasanuddin", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 11, name: "Kiki Rahma", category: "Mahasiswa", whatsApp: "082934567890", asalInstitusi: "Universitas Brawijaya", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
    { id: 12, name: "Lina Hartati", category: "Umum", whatsApp: "083045678901", asalInstitusi: "Universitas Sebelas Maret", payment: "Transfer", buktiBayar: "/image/bukti-bayar" },
];

export const PenSeminar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const filteredData = seminarData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.whatsApp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.asalInstitusi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.payment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="p-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Daftar Peserta Seminar</h1>
            </div>

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

            <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <table className="min-w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 border-b text-left">No</th>
                            <th className="px-4 py-3 border-b text-left">Nama</th>
                            <th className="px-4 py-3 border-b text-left">Kategori</th>
                            <th className="px-4 py-3 border-b text-left">WhatsApp</th>
                            <th className="px-4 py-3 border-b text-left">Asal Institusi</th>
                            <th className="px-4 py-3 border-b text-left">Pembayaran</th>
                            <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((seminar, index) => (
                                <tr
                                    key={seminar.id + index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="px-4 py-2 border-b">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td className="px-4 py-2 border-b font-medium text-gray-800">{seminar.name}</td>
                                    <td className="px-4 py-2 border-b">{seminar.category}</td>
                                    <td className="px-4 py-2 border-b">{seminar.whatsApp}</td>
                                    <td className="px-4 py-2 border-b">{seminar.asalInstitusi}</td>
                                    <td className="px-4 py-2 border-b">{seminar.payment}</td>
                                    <td className="px-4 py-2 border-b">
                                        <a
                                            href={seminar.buktiBayar}
                                            className="text-blue-600 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Lihat Bukti
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    Tidak ada data ditemukan.
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
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                    Selanjutnya →
                </button>
            </div>
        </div>
    );
};
