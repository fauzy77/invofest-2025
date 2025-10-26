// src/pages/RegisterUiUxPage.tsx

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "@/components/common/SuccessModal"; // <-- (1) Import Modal

// --- (2) KONSTANTA SPESIFIK UNTUK FORM INI ---
const NAMA_LOMBA = "Poster Design";
const HARGA_LOMBA = 50000;

// --- Tipe Data (Enums) ---
type JenisKeikutsertaan = "mahasiswa" | "siswa" | "";
type TipePendaftaran = "tim" | "individu" | "";

// --- Opsi untuk Select ---
const jenisOptions = [
  { value: "siswa", label: "Siswa" },
  { value: "mahasiswa", label: "Mahasiswa" },
];

const tipeOptions = [
  { value: "individu", label: "Individu" },
  { value: "tim", label: "Tim" },
];

// --- Interface untuk State ---
interface FormData {
  // Tim
  namaTim: string;
  namaKetua: string;
  emailKetua: string;
  noHpKetua: string;
  // Individu
  namaLengkap: string;
  email: string;
  noHp: string;
  // Anggota Tim
  anggota1: string;
  anggota2: string;
  // (Anggota 3 tidak ada di UI/UX)
  // Umum
  asalInstansi: string;
}

interface FormFiles {
  ktm: File | null;
  bayar: File | null;
  follow: File | null;
}

// --- KOMPONEN REUSABLE (dimasukkan di sini agar mudah) ---
// (InputGroup, SelectGroup, FileUploadGroup... copy-paste dari kode lama)
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
const RegisterUiUxPage: React.FC = () => {
  // --- State Utama ---
//   const [jenis, setJenis] = useState<JenisKeikutsertaan>("");
  const [tipe, setTipe] = useState<TipePendaftaran>("");
  // (State 'lomba' dan 'harga' dihapus, karena sudah fix)

  const [formData, setFormData] = useState<FormData>({
    namaTim: "",
    namaKetua: "",
    emailKetua: "",
    noHpKetua: "",
    namaLengkap: "",
    email: "",
    noHp: "",
    anggota1: "",
    anggota2: "",
    asalInstansi: "",
  });

  const [files, setFiles] = useState<FormFiles>({
    ktm: null,
    bayar: null,
    follow: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- (3) State dan Handler untuk Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // window.location.reload(); // Reset form
    // atau
     navigate("/competition/poster"); // Pindah ke home
  };
  // ----------------------------------------

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
      setFiles((prev) => ({ ...prev, [name]: inputFiles[0] }));
    }
  };

  // --- (4) handleSubmit di-update ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    data.append("jenisKeikutsertaan", "siswa"); // <-- Data fix
    data.append("tipePendaftaran", tipe);
    data.append("kompetisi", NAMA_LOMBA); // <-- Data fix
    data.append("biaya", HARGA_LOMBA.toString()); // <-- Data fix

    // Tambahkan data teks
    if (tipe === "tim") {
      data.append("namaTim", formData.namaTim);
      data.append("namaKetua", formData.namaKetua);
      data.append("emailKetua", formData.emailKetua);
      data.append("noHpKetua", formData.noHpKetua);
      data.append("anggota1", formData.anggota1);
      data.append("anggota2", formData.anggota2);
    } else {
      // Individu
      data.append("namaLengkap", formData.namaLengkap);
      data.append("email", formData.email);
      data.append("noHp", formData.noHp);
    }
    data.append("asalInstansi", formData.asalInstansi);

    // Tambahkan file
    if (files.ktm) data.append("file_ktm", files.ktm);
    if (files.bayar) data.append("file_bayar", files.bayar);
    if (files.follow) data.append("file_follow", files.follow);

    console.log("Data siap dikirim:", Object.fromEntries(data.entries()));

    // --- SIMULASI API CALL ---
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // throw new Error("Simulasi error: Gagal mendaftar.");
      
      // Ganti alert dengan modal
      // alert("Pendaftaran Berhasil!");
      setIsModalOpen(true); // <-- Tampilkan modal

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Variabel bantu untuk JSX ---
  const showForm = tipe; // <-- Disederhanakan

  // --- (5) deskripsiBayarNode di-update ---
  const namaUntukBayar =
    tipe === "tim" ? formData.namaTim : formData.namaLengkap;

  const deskripsiFormat = `Format deskripsi: "${
    namaUntukBayar || (tipe === "tim" ? "[NamaTim]" : "[NamaLengkap]")
  }_${NAMA_LOMBA}"`; // <-- Pakai NAMA_LOMBA

  const deskripsiBayarNode = (
    <div className="space-y-2 mt-1">
      <p className="font-semibold text-sm text-[#852e4e]">
        Total Biaya: Rp {HARGA_LOMBA.toLocaleString("id-ID")}
      </p>
      <p className="font-semibold">{deskripsiFormat}</p>
      <div className="text-slate-600">
        <p className="font-medium">Biaya Pendaftaran dapat dilakukan melalui:</p>
        <ul className="list-disc list-inside ml-1 text-xs">
          <li>
            <span className="font-bold">BCA:</span> 1330656138 (a.n Utiya Maylinah)
          </li>
          <li>
            <span className="font-bold">SEABANK:</span> 901680375767 (a.n Utiya Maylinah)
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
              Formulir Pendaftaran: {NAMA_LOMBA}
            </h1>
            <p className="mt-2 text-slate-500">
              Silakan lengkapi data di bawah ini.
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

            {/* --- Bagian 1: Setup Pendaftaran --- */}
            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="px-2 font-semibold text-slate-600">
                Detail Pendaftaran
              </legend>
              {/* <SelectGroup
                label="Jenis Keikutsertaan"
                id="jenis"
                name="jenis"
                // value={jenis}
                onChange={(e) => setJenis(e.target.value as JenisKeikutsertaan)}
                options={jenisOptions} // <-- UI/UX punya 2 opsi
                placeholder="Pilih jenis keikutsertaan..."
                disabled={isLoading}
                required
              /> */}
              <SelectGroup
                label="Tipe Pendaftaran"
                id="tipe"
                name="tipe"
                value={tipe}
                onChange={(e) => setTipe(e.target.value as TipePendaftaran)}
                options={tipeOptions}
                placeholder="Pilih tipe pendaftaran..."
                // disabled={isLoading || !jenis}
                required
              />
              
              {/* --- Dropdown Lomba Dihapus --- */}
              
              {/* --- Tampilkan Harga Fix --- */}
              <div
                data-aos="zoom-in"
                className="p-3 text-center text-lg font-bold text-[#852e4e] bg-[#FFC0D3]/50 border border-[#852e4e]/30 rounded-lg"
              >
                Biaya Pendaftaran: Rp {HARGA_LOMBA.toLocaleString("id-ID")}
              </div>
            </fieldset>

            {/* --- Bagian 2: Form Dinamis --- */}
            {showForm && (
              <div data-aos="fade-in" className="space-y-6">
                
                {/* --- FIELDS UNTUK TIM --- */}
                {tipe === "tim" && (
                  <fieldset className="space-y-4 p-4 border rounded-lg">
                    <legend className="px-2 font-semibold text-slate-600">
                      Data Tim
                    </legend>
                    <InputGroup
                      label="Nama Tim"
                      id="namaTim"
                      name="namaTim"
                      value={formData.namaTim}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="Nama Ketua"
                      id="namaKetua"
                      name="namaKetua"
                      value={formData.namaKetua}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="Email Ketua"
                      id="emailKetua"
                      name="emailKetua"
                      type="email"
                      value={formData.emailKetua}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="No. WhatsApp Ketua"
                      id="noHpKetua"
                      name="noHpKetua"
                      type="tel"
                      value={formData.noHpKetua}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="Nama Anggota 1"
                      id="anggota1"
                      name="anggota1"
                      value={formData.anggota1}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="Nama Anggota 2"
                      id="anggota2"
                      name="anggota2"
                      value={formData.anggota2}
                      onChange={handleTextChange}
                      required
                    />
                    {/* --- Anggota 3 TIDAK ADA --- */}
                  </fieldset>
                )}

                {/* --- FIELDS UNTUK INDIVIDU --- */}
                {tipe === "individu" && (
                  <fieldset className="space-y-4 p-4 border rounded-lg">
                    <legend className="px-2 font-semibold text-slate-600">
                      Data Peserta
                    </legend>
                    <InputGroup
                      label="Nama Lengkap"
                      id="namaLengkap"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleTextChange}
                      required
                    />
                    <InputGroup
                      label="No. WhatsApp"
                      id="noHp"
                      name="noHp"
                      type="tel"
                      value={formData.noHp}
                      onChange={handleTextChange}
                      required
                    />
                  </fieldset>
                )}

                {/* --- FIELDS UMUM UNTUK SEMUA --- */}
                <fieldset className="space-y-5 p-4 border rounded-lg">
                  <legend className="px-2 font-semibold text-slate-600">
                    Data Umum & Berkas
                  </legend>
                  <InputGroup
                    label="Asal Sekolah / Perguruan Tinggi"
                    id="asalInstansi"
                    name="asalInstansi"
                    value={formData.asalInstansi}
                    onChange={handleTextChange}
                    required
                  />
                  <FileUploadGroup
                    label="Foto Kartu Pelajar / Mahasiswa"
                    id="ktm"
                    name="ktm"
                    accept=".pdf"
                    onChange={handleFileChange}
                    description={
                      tipe === "tim"
                        ? "Jadikan 1 file .pdf (ketua & semua anggota)"
                        : "Format .pdf"
                    }
                    required
                  />
                  <FileUploadGroup
                    label="Bukti Pembayaran"
                    id="bayar"
                    name="bayar"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    description={deskripsiBayarNode}
                    required
                  />
                  <FileUploadGroup
                    label="Bukti Follow Instagram"
                    id="follow"
                    name="follow"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    description="Upload screenshot bukti follow @invofest_harkatnegeri"
                    required
                  />
                </fieldset>
                
                {/* --- Tombol Submit --- */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-white bg-[#852e4e] hover:bg-[#4c1d3d] font-semibold transition duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Memproses..." : `Daftar Lomba ${NAMA_LOMBA}`}
                  </button>
                </div>
              </div>
            )}
            
            {/* Link Login (jika form belum muncul)
            {!showForm && (
              <div className="text-center text-sm text-slate-500 pt-4">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#852e4e] hover:underline"
                >
                  Login di sini
                </Link>
              </div>
            )} */}
            
          </form>
        </div>
      </div>

      {/* --- (7) RENDER MODAL DI SINI --- */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Pendaftaran Lomba Berhasil!"
      >
        Terima kasih telah mendaftar sebagai peserta lomba. 
        Panitia akan segera mengecek data anda. Dan Setelah itu anda 
        akan di masukan ke grub wa.
      </SuccessModal>
    </React.Fragment>
  );
};

export default RegisterUiUxPage;