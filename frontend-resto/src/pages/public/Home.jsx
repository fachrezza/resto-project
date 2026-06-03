import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      title: "Nikmati Hidangan Terbaik",
      subtitle: "Makanan khas dengan cita rasa premium",
    },
    {
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9",
      title: "Suasana Restoran Nyaman",
      subtitle: "Cocok untuk keluarga dan teman",
    },
    {
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      title: "Reservasi Mudah",
      subtitle: "Pesan meja langsung dari website",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
      {/* HERO CAROUSEL */}
      <section className="relative">

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-[85vh]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>

              <div className="relative h-full">

                {/* IMAGE */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-center justify-center text-center px-5">

                  <div className="max-w-2xl text-white">

                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-5 text-lg text-gray-200">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                      <Link
                        to="/menu"
                        className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl font-medium"
                      >
                        Lihat Menu
                      </Link>

                      <Link
                        to="/reservation"
                        className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition px-6 py-3 rounded-xl font-medium"
                      >
                        Reservasi
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </section>
      

      {/* FEATURE SECTION */}
      <section className="container mx-auto px-5 py-16 grid md:grid-cols-3 gap-6">

       

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            ⚡ Order Cepat
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Sistem pemesanan real-time tanpa delay.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="font-bold text-lg text-gray-800">
            📍 Reservasi Mudah
          </h3>
          <p className="text-gray-500 mt-2 text-sm">
            Booking meja langsung dari website.
          </p>
        </div>

      </section>

      {/* FOOTER MINI */}
      <footer className="border-t bg-white py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Restoran Gorontalo. All rights reserved.
      </footer>

    </div>
  );
}