import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WhiteWaveTop from "/assets/wave-top.png";
import WhiteWaveBot from "/assets/wave-bot.png";

const UIDesignCompetition: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="w-full bg-white text-slate-700 overflow-hidden">
      {/* HERO SECTION */}
      <section className="max-w-screen-xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-center gap-10">
        <div
          data-aos="fade-right"
          data-aos-delay="300"
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/assets/competition-card/ui_ux.png"
            alt="UI/UX Design"
            className="rounded-2xl w-[350px] shadow-lg"
          />
        </div>

        <div data-aos="fade-left" className="w-full md:w-1/2 space-y-4">
          <h1 className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl">
            UI/UX Design Competition
          </h1>
          <p className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600">
            “AI Challenge: Gen Z’s Quest for Digital Transformation”
          </p>
          <p className="text-slate-500">Minggu, 1 September 2024</p>

          <div className="space-y-3 mt-5">
            <div className="bg-[#FFC0D3] border border-[#852e4e] text-center rounded-md py-3 font-semibold">
              Biaya Pendaftaran: Rp. 75.000
            </div>
            <button className="w-full bg-[#852e4e] hover:bg-[#4c1d3d] text-white font-semibold py-3 rounded-md transition duration-200">
              Register
            </button>
            <button className="w-full border border-[#852e4e] text-[#852e4e] font-semibold py-3 rounded-md hover:bg-[#FFC0D3] transition duration-200">
              Guidebook
            </button>
          </div>
        </div>
      </section>

      {/* DESKRIPSI LOMBA */}
      <section className="bg-invofest_secondary w-full relative">
        {/* Wave atas */}
        <img src={WhiteWaveTop} alt="wave" className="w-full relative top-0" />

        {/* Jarak nyata antara wave atas dan konten */}
        <div className="h-24 md:h-36"></div>

        <div className="w-full max-w-4xl mx-auto px-8 text-center">
          <h2
            data-aos="zoom-in"
            className="font-semibold text-invofest text-2xl sm:text-4xl lg:text-5xl mb-8"
          >
            DESKRIPSI LOMBA
          </h2>

          <div
            data-aos="fade-up"
            className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600"
          >
            <p className="mb-4">
              Salah satu perlombaan dalam kegiatan{" "}
              <b>Invofest (Informatics Vocational Festival) 2024</b> adalah{" "}
              <b>National UI/UX Design Competition</b> yang diadakan untuk
              mendorong peserta dalam persiapan diri menghadapi era digital,
              serta mengasah kemampuan dalam menciptakan solusi desain
              antarmuka yang inovatif dan berfokus pada pengalaman pengguna.
            </p>

            <p>
              Tema ini bertujuan untuk mendorong generasi muda dalam
              mengembangkan ide kreatif berbasis AI yang dapat membantu
              masyarakat menuju kehidupan yang lebih efisien dan berkelanjutan.
            </p>
          </div>
        </div>

        {/* Jarak antara konten & wave bawah */}
        <div className="h-24 md:h-36"></div>

        {/* Wave bawah */}
        <img src={WhiteWaveBot} alt="wave" className="w-full relative bottom-0" />
      </section>

      {/* KATEGORI HADIAH */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2
            data-aos="zoom-in"
            className="text-2xl md:text-3xl font-bold text-[#852e4e] mb-8"
          >
            KATEGORI HADIAH
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { title: "Juara I", prize: "Rp. 5.500.000" },
              { title: "Juara II", prize: "Rp. 3.500.000" },
              { title: "Juara III", prize: "Rp. 1.500.000" },
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="w-[220px] border-2 border-[#852e4e] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-5xl mb-3 text-[#852e4e]">🏆</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-slate-600 mt-2">{item.prize}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE EVENT */}
      <section className="bg-invofest_secondary w-full relative">
        {/* Wave atas */}
        <img src={WhiteWaveTop} alt="wave top" className="w-full relative top-0" />

        {/* Jarak antara wave atas dan konten */}
        <div className="h-24 md:h-36"></div>

        {/* Konten Timeline */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 text-center">
          <h2
            data-aos="zoom-in"
            className="font-semibold text-invofest text-2xl sm:text-4xl lg:text-5xl mb-8"
          >
            TIMELINE EVENT
          </h2>

          <div className="relative flex justify-center items-center min-h-[260px] overflow-x-auto">
            {/* Garis */}
            <div className="absolute top-1/2 left-0 w-full h-[4px] bg-[#852e4e]/25 -translate-y-1/2"></div>

            {/* Isi timeline */}
            <div className="flex flex-nowrap justify-center items-center gap-12 md:gap-20 z-10 px-4">
              {[
                { title: "Pendaftaran", date: "1–25 Agustus" },
                { title: "Pengumpulan Karya", date: "26–30 Agustus" },
                { title: "Penilaian", date: "31 Agustus" },
                { title: "Pengumuman", date: "1 September" },
              ].map((step, index) => (
                <div
                  key={index}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 200}
                  className="flex flex-col items-center min-w-[220px]"
                >
                  <div className="bg-[#852e4e] w-6 h-6 rounded-full mb-5 shadow-md border-4 border-[#FFC0D3]"></div>
                  <div className="bg-white border border-[#852e4e] px-6 py-5 rounded-xl shadow-md w-full hover:scale-105 transition duration-300">
                    <h4 className="font-semibold text-[#852e4e] text-lg">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 text-sm mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jarak antara konten & wave bawah */}
        <div className="h-24 md:h-40"></div>

        {/* Wave bawah */}
        <img src={WhiteWaveBot} alt="wave bottom" className="w-full relative bottom-0" />
      </section>
    </div>
  );
};

export default UIDesignCompetition;
