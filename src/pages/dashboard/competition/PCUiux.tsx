import React, { useState } from "react";

export const PenComUiUx: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"individu" | "tim">("individu");

    const individuData = [
        {
            id: 1,
            nama: "Asep Ramadhani yudha",
            asalSekolah : "Smk Nu 1 Kramat",
            email: "asepr@gmail.com",
            wa: "089767854321",
            kartuPelajar: "/images/kartu-pelajar/",
            bukti: "/bukti/1.jpg",
        },
    ];

    const timData = [
        {
            id: 1,
            namaTim: "Tech Warriors",
            asalSekolah : "Smk Nu 1 Kramat",
            namaKetua: "Asep Ramadhani",
            emailKetua: "asepr@gmail.com",
            waKetua: "089767854321",
            namaAnggota: "Maman Nur Hidayat",
            kartuPelajar: "/images/kartu-pelajar/",
            bukti: "/bukti/1.jpg",
        },
    ];


    const [searchTerm, setSearchTerm] = useState("");

    const filteredData =
        activeTab === "individu"
            ? individuData.filter(
                (individu) =>
                    individu.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    individu.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    individu.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    individu.wa.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : timData.filter(
                (tim) =>
                    tim.namaTim.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tim.namaKetua.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tim.namaAnggota.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tim.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tim.emailKetua.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tim.waKetua.toLowerCase().includes(searchTerm.toLowerCase())
            );

    return (
        <div className="p-6 w-full">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Daftar Peserta Competition Ui Ux Design
            </h1>

            <div className="flex justify-between items-center border-b border-gray-300 mb-6">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab("individu")}
                        className={`px-6 py-2 font-medium text-sm transition-colors ${activeTab === "individu"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        Individu
                    </button>
                    <button
                        onClick={() => setActiveTab("tim")}
                        className={`px-6 py-2 font-medium text-sm transition-colors ${activeTab === "tim"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        Team
                    </button>
                </div>

                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-72 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <table className="min-w-full text-sm border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        {activeTab === "individu" ? (
                            <tr>
                                <th className="px-4 py-3 border-b text-left">No</th>
                                <th className="px-4 py-3 border-b text-left">Nama</th>
                                <th className="px-4 py-3 border-b text-left">Asal Sekolah</th>
                                <th className="px-4 py-3 border-b text-left">Email</th>
                                <th className="px-4 py-3 border-b text-left">WhatsApp</th>
                                <th className="px-4 py-3 border-b text-left">Kartu Pelajar</th>
                                <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
                            </tr>
                        ) : (
                            <tr>
                                <th className="px-4 py-3 border-b text-left">No</th>
                                <th className="px-4 py-3 border-b text-left">Nama Tim</th>
                                <th className="px-4 py-3 border-b text-left">Asal Sekolah</th>
                                <th className="px-4 py-3 border-b text-left">Nama Ketua</th>
                                <th className="px-4 py-3 border-b text-left">Nama Anggota</th>
                                <th className="px-4 py-3 border-b text-left">Email</th>
                                <th className="px-4 py-3 border-b text-left">WhatsApp</th>
                                <th className="px-4 py-3 border-b text-left">Kartu Pelajar</th>
                                <th className="px-4 py-3 border-b text-left">Bukti Pembayaran</th>
                            </tr>
                        )}
                    </thead>

                    <tbody>
                        {filteredData.length > 0 ? (
                            activeTab === "individu" ? (
                                (filteredData as typeof individuData).map((individu, index) => (
                                    <tr key={individu.id} className="hover:bg-gray-50 border-b last:border-none">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{individu.nama}</td>
                                        <td className="px-4 py-2">{individu.asalSekolah}</td>
                                        <td className="px-4 py-2">{individu.email}</td>
                                        <td className="px-4 py-2">{individu.wa}</td>
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={individu.kartuPelajar}
                                                className="text-blue-600 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Kartu Pelajar
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={individu.bukti}
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
                                (filteredData as typeof timData).map((tim, index) => (
                                    <tr key={tim.id} className="hover:bg-gray-50 border-b last:border-none">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{tim.namaTim}</td>
                                        <td className="px-4 py-2">{tim.asalSekolah}</td>
                                        <td className="px-4 py-2">{tim.namaKetua}</td>
                                        <td className="px-4 py-2">{tim.namaAnggota}</td>
                                        <td className="px-4 py-2">{tim.emailKetua}</td>
                                        <td className="px-4 py-2">{tim.waKetua}</td>
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={tim.kartuPelajar}
                                                className="text-blue-600 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Kartu Pelajar
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <a
                                                href={tim.bukti}
                                                className="text-blue-600 hover:underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Lihat Bukti
                                            </a>
                                        </td>                                        
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan={activeTab === "tim" ? 7 : 6} className="text-center py-6 text-gray-500">
                                    Tidak ada data ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
