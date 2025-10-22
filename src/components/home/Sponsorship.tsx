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
      {/* Menambahkan padding vertikal (py-10 sm:py-16) untuk memberi ruang bagi konten baru */}
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

        {/* --- Bagian Open Sponsorship (BARU) --- */}
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
          <a
            href="https://wa.me/62895605919551?text=Halo,%20saya%20tertarik%20untuk%20menjadi%20sponsor%20INVOFEST%202025."
            target="_blank" // Membuka di tab baru
            rel="noopener noreferrer" // Keamanan untuk target="_blank"
            className="px-8 py-3 bg-invofest text-white font-bold rounded-lg shadow-lg hover:bg-invofest-dark transition-all duration-300 transform hover:scale-105"
            aria-label="Hubungi kami via WhatsApp untuk menjadi sponsor"
          >
            Hubungi Kami (WhatsApp)
          </a>
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
  // {
  //   id: 2,
  //   img_path: "/assets/sponsor/indo_print.jpg",
  // },
  // {
  //   id: 3,
  //   img_path: "/assets/sponsor/bahari_inn.jpg",
  // },
  // {
  //   id: 4,
  //   img_path: "/assets/sponsor/dicoding_official.png",
  // },
  // {
  //   id: 5,
  //   img_path: "/assets/sponsor/plaza_hotel_tegal.jpg",
  // },
  // {
  //   id: 6,
  //   img_path: "/assets/sponsor/gilang.jpg",
  // },
];