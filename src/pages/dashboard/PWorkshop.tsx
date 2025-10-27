import React, { useState } from "react";

const seminarData = [
    { id: 1, name: "Muhammad Muqtasid Roziq", jenis: "Artificial Intelegence", category: "Mahasiswa", whatsApp: "081234567890", nim: "23090068",semKel: "5B", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 1, name: "Ahmad Maman Budiyanto", jenis: "Mobile Development", category: "Mahasiswa", whatsApp: "081234567890", nim: "23090068",semKel: "5B", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
    { id: 1, name: "Septian agus", jenis: "Cyber Security", category: "Mahasiswa", whatsApp: "081234567890", nim: "23090068",semKel: "5B", payment: "Cash", buktiBayar: "/image/bukti-bayar" },
];

export const PenWorkshop: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const filteredData = seminarData.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.whatsApp.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.semKel.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.payment.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className="p-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Daftar Peserta Workshop</h1>
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
                            <th className="px-4 py-3 border-b text-left">Jenis Workshop</th>
                            <th className="px-4 py-3 border-b text-left">Kategori</th>
                            <th className="px-4 py-3 border-b text-left">WhatsApp</th>
                            <th className="px-4 py-3 border-b text-left">Nim</th>
                            <th className="px-4 py-3 border-b text-left">Kelas</th>
                            <th className="px-4 py-3 border-b text-left">Pembayaran</th>
                            <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((workshop, index) => (
                                <tr
                                    key={workshop.id + index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                                >
                                    <td className="px-4 py-2 border-b">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td className="px-4 py-2 border-b font-medium text-gray-800">{workshop.name}</td>
                                    <td className="px-4 py-2 border-b">{workshop.jenis}</td>
                                    <td className="px-4 py-2 border-b">{workshop.category}</td>
                                    <td className="px-4 py-2 border-b">{workshop.whatsApp}</td>
                                    <td className="px-4 py-2 border-b">{workshop.nim}</td>
                                    <td className="px-4 py-2 border-b">{workshop.semKel}</td>
                                    <td className="px-4 py-2 border-b">{workshop.payment}</td>
                                    <td className="px-4 py-2 border-b">
                                        <a
                                            href={workshop.buktiBayar}
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

            {/* Pagination */}
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
