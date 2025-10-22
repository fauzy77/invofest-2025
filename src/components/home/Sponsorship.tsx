import React, { useEffect } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import AOS from "aos";

export function Sponsorship() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="h-fit mt-4 sm:mt-8 lg:mt-16 py-10 sm:py-16 rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        {/* Judul Sponsor */}
        <h1
          data-aos="fade-up"
          data-aos-delay="150"
          className="mb-2 text-2xl font-bold text-slate-600 sm:text-[40px]/[48px] text-center"
        >
          Sponsor <span className="text-invofest">INVOFEST 2025</span>
        </h1>

        {/* Logo Scroller */}
        <InfiniteMovingCards
          items={sponsorLogo}
          direction="right"
          speed="slow"
        />

        {/* --- Bagian Open Sponsorship --- */}
        <div 
          data-aos="fade-up" 
          data-aos-delay="200" 
          className="text-center mt-10 sm:mt-16 px-4"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700">
            Open Sponsorship
          </h2>
          <p className="text-md sm:text-lg text-slate-500 mt-2 mb-6 max-w-xl mx-auto">
            Kami membuka peluang bagi brand dan perusahaan Anda untuk berkolaborasi 
            dan menjadi bagian dari kesuksesan INVOFEST 2025.
          </p>

          {/* --- [BARU] Wrapper untuk Tombol --- */}
          {/* Menggunakan flex-col untuk menyusun tombol ke bawah */}
          <div className="flex flex-col items-center gap-4">
            
            {/* Tombol 1: WhatsApp */}
            <a
              href="https://wa.me/62895605919551?text=Halo,%20saya%20tertarik%20untuk%20menjadi%20sponsor%20INVOFEST%202025."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-8 py-3 bg-invofest text-white font-bold rounded-lg shadow-lg hover:bg-invofest-dark transition-all duration-300 transform hover:scale-105"
              aria-label="Hubungi kami via WhatsApp untuk menjadi sponsor"
            >
              Hubungi Kami (WhatsApp)
            </a>

            {/* --- [BARU] Tombol 2: Proposal --- */}
            {/* Pastikan mengganti href dengan link ke file PDF proposal Anda */}
            <a
              href="https://drive.google.com/file/d/1JPE5JGNLjzBfSD0ifImGthXoiUQSTVV5/view?usp=drive_link" // <-- GANTI INI
              target="_blank"
              rel="noopener noreferrer"
              // Style sebagai tombol sekunder (outline)
              className="w-full sm:w-auto text-center px-8 py-3 bg-white text-invofest border border-invofest font-bold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              aria-label="Lihat atau unduh proposal sponsorship"
            >
              Lihat Proposal
            </a>
            {/* --- Akhir Bagian Baru --- */}
          </div>
          
        </div>
        {/* --- Akhir Bagian Open Sponsorship --- */}

      </div>
    </React.Fragment>
  );
}

const sponsorLogo = [
  {
    id: 1,
    img_path: "/assets/LOGO 1.png",
  },
  // ... sponsor lainnya
];