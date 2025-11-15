"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SuccessModal from "@/components/common/SuccessModal"; // Import Modal
import { eventAPI } from "@/services/api"; // Import eventAPI

// --- Tipe Data (Enums) ---
type JenisKeikutsertaan = "mahasiswa" | "umum" | "";

// --- Opsi untuk Select ---
const jenisOptions = [
  { value: "mahasiswa", label: "Mahasiswa" }, // Tambahkan info harga di label
  { value: "umum", label: "Umum" },
];

// --- Interface untuk State ---
interface FormData {
  email: string;
  fullName: string;
  whatsapp: string;
  category: string;
  institution: string;
}

interface FormFiles {
  payment: File | null;
  igFollow: File | null;
}

// --- KOMPONEN REUSABLE (dimasukkan di sini agar mudah) ---
// (InputGroup, SelectGroup, FileUploadGroup tidak berubah)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}
const InputGroup: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm disabled:bg-slate-50"
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
}
const SelectGroup: React.FC<SelectProps> = ({
  label,
  id,
  options,
  placeholder,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <select
      id={id}
      {...props}
      className="block w-full mt-1 px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#852e4e] focus:border-[#852e4e] sm:text-sm disabled:bg-slate-50"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

interface FileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  description?: React.ReactNode;
}
const FileUploadGroup: React.FC<FileProps> = ({
  label,
  id,
  description,
  ...props
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    {description && (
      <div className="text-xs text-slate-500 mt-1">{description}</div>
    )}
    <input
      id={id}
      type="file"
      {...props}
      className="block w-full mt-2 text-sm text-slate-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-[#FFC0D3] file:text-[#852e4e]
                 hover:file:bg-[#f8a8c4] file:transition-colors file:cursor-pointer
                 disabled:opacity-50"
    />
  </div>
);

// --- KOMPONEN UTAMA HALAMAN REGISTRASI ---
const RegisterSeminarPage: React.FC = () => {
  // --- State Utama ---
  const [category, setCategory] = useState<JenisKeikutsertaan>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    whatsapp: "",
    category: "",
    institution: "",
  });

  const [files, setFiles] = useState<FormFiles>({
    payment: null,
    igFollow: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // --- Inisialisasi AOS ---
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // --- Handlers ---
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles && inputFiles.length > 0) {
      let mappedName = name;
      if (name === "bayar") mappedName = "payment";
      if (name === "follow") mappedName = "igFollow";

      setFiles((prev) => ({ ...prev, [mappedName]: inputFiles[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    data.append("email", formData.email);
    data.append("fullName", formData.fullName);
    data.append("category", category.toUpperCase() as string);
    data.append("whatsapp", formData.whatsapp);
    data.append("institution", formData.institution);

    if (files.payment) data.append("payment", files.payment);
    if (files.igFollow) data.append("igFollow", files.igFollow);

    try {
      await eventAPI.registerSeminar(data);
      setIsModalOpen(true);
    } catch (err: unknown) {
      const error = err as Error;
      const errorMessage =
        error.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.";
      setError(errorMessage);
      console.error("Registration error:", error.message as string | undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/seminar");
  };

  const showForm = category;

  const deskripsiBayarNode = (
    <div className="space-y-2 mt-1">
      <p className="font-semibold">
        Format deskripsi: "{formData.fullName || "[NamaLengkap]"}
        _Seminar_Invofest_2025"
      </p>
      <div className="text-slate-600">
        <p className="font-medium">
          Biaya Pendaftaran dapat dilakukan melalui:
        </p>
        <ul className="list-disc list-inside ml-1 text-xs">
          <li>
            <span className="font-bold">BCA:</span> 1330656138 (a.n Utiya
            Maylinah)
          </li>
          <li>
            <span className="font-bold">SEABANK:</span> 901680375767 (a.n Utiya
            Maylinah)
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="flex items-center justify-center min-h-screen w-full bg-slate-100 p-6">
        <div
          data-aos="fade-up"
          className="w-full max-w-lg p-6 sm:p-8 space-y-6 bg-white rounded-2xl shadow-xl"
        >
          {/* --- Header --- */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#852e4e]">
              Registrasi Seminar Invofest 2025
            </h1>
            <p className="mt-2 text-slate-500">
              Lengkapi data diri Anda untuk mendaftar.
            </p>
          </div>

          {/* --- FORM --- */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* --- PESAN ERROR --- */}
            {error && (
              <div
                data-aos="zoom-in"
                className="p-3 text-center text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg"
              >
                {error}
              </div>
            )}

            {/* --- Bagian 1: Category --- */}
            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="px-2 font-semibold text-slate-600">
                Detail Pendaftaran
              </legend>
              <SelectGroup
                label="Kategori"
                id="category"
                name="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as JenisKeikutsertaan)
                }
                options={jenisOptions}
                placeholder="Pilih kategori Anda..."
                disabled={isLoading}
                required
              />
            </fieldset>

            {/* --- Bagian 2: Form Dinamis --- */}
            {showForm && (
              <div data-aos="fade-in" className="space-y-6">
                {/* --- Fields Umum --- */}
                <fieldset className="space-y-4 p-4 border rounded-lg">
                  <legend className="px-2 font-semibold text-slate-600">
                    Data Peserta
                  </legend>
                  <InputGroup
                    label="Nama Lengkap"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleTextChange}
                    placeholder="Masukkan nama lengkap Anda"
                    disabled={isLoading}
                    required
                  />
                  <InputGroup
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    placeholder="Masukkan email aktif"
                    disabled={isLoading}
                    required
                  />
                  <InputGroup
                    label="No. WhatsApp"
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleTextChange}
                    placeholder="Contoh: 6281234567890"
                    disabled={isLoading}
                    required
                  />
                  <InputGroup
                    label="Institusi"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleTextChange}
                    placeholder="Nama Institusi / Perusahaan"
                    disabled={isLoading}
                    required
                  />
                </fieldset>

                {/* --- Fields Upload --- */}
                <fieldset className="space-y-5 p-4 border rounded-lg">
                  <legend className="px-2 font-semibold text-slate-600">
                    Berkas Pendaftaran
                  </legend>

                  <FileUploadGroup
                    label="Bukti Pembayaran"
                    id="payment"
                    name="payment"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    description={deskripsiBayarNode}
                    disabled={isLoading}
                    required
                  />
                  <FileUploadGroup
                    label="Bukti Follow Instagram"
                    id="igFollow"
                    name="igFollow"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    description="Upload screenshot bukti follow @invofest_harkatnegeri"
                    disabled={isLoading}
                    required
                  />
                </fieldset>

                {/* --- Tombol Submit --- */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-white bg-[#852e4e] hover:bg-[#4c1d3d] font-semibold transition duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Memproses..." : "Daftar Seminar"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* --- MODAL --- */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Pendaftaran Berhasil!"
      >
        Terima kasih telah mendaftar sebagai partisipan Invofest 2025. Panitia
        akan segera mengecek data anda. Dan Setelah itu anda akan di arahkan ke
        grub Whatsapp.
      </SuccessModal>
    </React.Fragment>
  );
};

export default RegisterSeminarPage;
