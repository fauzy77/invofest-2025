import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WhiteWaveTop from "/assets/wave-top.png";
import WhiteWaveBot from "/assets/wave-bot.png";
import { MediaPartner } from "@/components/competition/MediaPartner";
import FAQ from "@/components/home/FAQ";
import { Sponsorship } from "@/components/home/Sponsorship";

const Poster: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <React.Fragment>
      <div className="w-full bg-white text-slate-700 overflow-hidden">
        {/* HERO SECTION */}
        <section className="max-w-screen-xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-center gap-10">
          <div
            data-aos="fade-right"
            data-aos-delay="300"
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src="/assets/competition-card/poster.png"
              alt="UI/UX Design"
              className="rounded-2xl w-[350px] shadow-lg"
            />
          </div>

          <div data-aos="fade-left" className="w-full md:w-1/2 space-y-4">
            <h1 className="font-semibold text-invofest text-3xl sm:text-4xl lg:text-5xl">
              Poster Design Competition
            </h1>
            <p className="text-sm md:text-base lg:text-[1.35rem] sm:leading-[1.5rem] lg:leading-[2rem] text-slate-600">
              “From Creation to Innovation”
            </p>
            <p className="text-slate-500">Kamis, 27 November 2025</p>

            <div className="space-y-3 mt-5">
              <div className="bg-[#FFC0D3] border border-[#852e4e] text-center rounded-md py-3 font-semibold">
                Biaya Pendaftaran Gelombang 1: Rp. 50.000
              </div>

              {/* Tombol Register */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScdjXXvLnnlLlOTgpn4SP-oMkvUfBXO0gcJeEr8Oa9-fDuh1Q/viewform?usp=preview"
                rel="noopener noreferrer"
                className="block w-full bg-[#852e4e] hover:bg-[#4c1d3d] text-white font-semibold py-3 rounded-md text-center transition duration-200"
              >
                Registrasi
              </a>

              {/* Tombol Guidebook */}
              <a
                href="https://drive.google.com/drive/folders/1vOIIfJinlm5aalbp3QDbiTVn8DQSh43K?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-[#852e4e] text-[#852e4e] font-semibold py-3 rounded-md text-center hover:bg-[#FFC0D3] transition duration-200"
              >
                Dokumen Peserta
              </a>
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
                <b>Invofest (Informatics Vocational Festival) 2025</b> adalah{" "}
                <b>National Poster Design Competition</b>. Kegiatan ini menjadi wadah bagi siswa untuk menyalurkan kreativitas,
                ide, dan kemampuan berpikir kritis dalam bidang desain visual, khususnya dalam menciptakan karya poster yang
                komunikatif dan inspiratif di era digital.
              </p>

              <p>
                Tahun ini, lomba mengusung tema <b>“From Creation to Innovation”</b>, yang menggambarkan proses perjalanan dari menciptakan
                ide hingga mengubahnya menjadi inovasi yang memiliki nilai dan dampak nyata bagi masyarakat. Melalui tema ini, peserta
                diharapkan dapat menuangkan gagasan kreatif mereka dalam bentuk visual yang tidak hanya menarik secara estetika, tetapi
                juga mengandung pesan yang kuat, relevan, dan mendorong semangat inovasi di bidang teknologi dan kehidupan sosial.
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
                {
                  title: "Juara I",
                  prize: "Rp. 500.000",
                  bonus: ["🏆 Trophy", "📜 e-Sertifikat"],
                },
                {
                  title: "Juara II",
                  prize: "Rp. 400.000",
                  bonus: ["🏆 Trophy", "📜 e-Sertifikat"],
                },
                {
                  title: "Juara III",
                  prize: "Rp. 300.000",
                  bonus: ["🏆 Trophy", "📜 e-Sertifikat"],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="w-[220px] border-2 border-[#852e4e] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="text-5xl mb-3 text-[#852e4e]">🏆</div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-slate-600 mt-2 font-medium">{item.prize}</p>

                  {/* Bonus tambahan seperti Trophy & Sertifikat */}
                  {item.bonus.length > 0 && (
                    <ul className="mt-3 text-sm text-slate-600 space-y-1">
                      {item.bonus.map((bonus, i) => (
                        <li key={i}>{bonus}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* TIMELINE EVENT */}
        <section className="bg-invofest_secondary w-full relative overflow-hidden">
          <img src={WhiteWaveTop} alt="wave top" className="w-full relative top-0" />
          <div className="h-24 md:h-36"></div>

          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 text-center">
            <h2
              data-aos="zoom-in"
              className="font-semibold text-invofest text-2xl sm:text-4xl lg:text-5xl mb-12"
            >
              TIMELINE EVENT
            </h2>

            <div className="relative flex flex-wrap justify-center items-center gap-x-16 gap-y-20 md:gap-x-20 md:gap-y-24 px-6 md:px-12">
              <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#852e4e]/25 -translate-x-1/2"></div>

              {[
                { title: "Pendaftaran Gelombang 1", date: "21–31 Oktober" },
                { title: "Pengumpulan Karya Gelombang 1", date: "31 Oktober" },
                { title: "Pendaftaran Gelombang 2", date: "1–15 November" },
                { title: "Pengumpulan Karya Gelombang 2", date: "15 November" },
                { title: "Pengumuman Finalis", date: "20 November" },
                { title: "Technical Meeting Finalis", date: "21 November" },
                { title: "Presentasi Finalis", date: "21 November" },
                { title: "Pengumuman Juara", date: "27 November" },
              ].map((step, index) => (
                <div
                  key={index}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 150}
                  className={`relative w-full md:w-[45%] flex flex-col items-center ${index % 2 === 0 ? "md:items-end text-right" : "md:items-start text-left"
                    }`}
                >
                  <div
                    className={`absolute top-1/2 w-5 h-5 bg-[#852e4e] border-4 border-[#FFC0D3] rounded-full shadow-md ${index % 2 === 0 ? "md:right-[-1.6rem]" : "md:left-[-1.6rem]"
                      } transform -translate-y-1/2`}
                  ></div>

                  <div className="bg-white border border-[#852e4e] px-6 py-5 rounded-xl shadow-md hover:scale-105 transition duration-300 w-full md:w-[80%]">
                    <h4 className="font-semibold text-[#852e4e] text-lg">{step.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-24 md:h-40"></div>
          <img src={WhiteWaveBot} alt="wave bottom" className="w-full relative bottom-0" />
        </section>
      </div>
      {/* FAQ Section */}
      <FAQ />

      {/* Sponsorship */}
      <Sponsorship />

      {/* MEDIA PARTNER */}
      <MediaPartner />
    </React.Fragment>
  );
};

export default Poster;
