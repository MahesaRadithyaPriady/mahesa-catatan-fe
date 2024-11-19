// src/views/UserDashboard.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import GuestLayouts from "../../../layouts/guest/guestLayouts.jsx";
import { motion } from "framer-motion";
const LearnMore = () => {
  const scrollToLearnMore = () => {
    const learnMoreSection = document.getElementById("learnMore");
    if (learnMoreSection) {
      learnMoreSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <Helmet>
        <title>Learn More</title>
      </Helmet>
      <GuestLayouts>
        <div className="hero max-h-screen max-sm:mb-24">
          <div className="hero-content flex-col  lg:flex-row-reverse lg:min-h-screen max-sm:mb-24 max-md:mb-12 max-lg:mb-14 ">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl max-sm:text-2xl max-sm:text-center  max-md:text-3xl max-md:text-center  font-bold">
                Welcome to Website Cat GI | Catatan Digital
              </h1>
              <p className="py-6 font-semibold max-sm:p-5 max-md:p-6">
                Masih Belum Memahami Fitur Apa Saja Yang Ada Di Aplikasi Ini ?
                Silahkan Klik Tombol <q>Learn More</q> Di Bawah Untuk Mengetahui
                Dan Menjelajah Fungsi Aplikasi Ini | Catatan Digital Singkatnya
                Adalah Aplikasi Yang Dibuat Untuk Membantu Kalian Menyimpan
                Catatan Dan Berbagai Informasi Yang Ada Di Lingkungan Sekitar
                Kalian
              </p>
              <div className="">
                <button
                  onClick={scrollToLearnMore}
                  className="btn  btn-warning mr-4"
                >
                  Learn more
                </button>
                <Link to={"/register"}>
                  <button className="btn btn-primary">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="whatIsMyApp flex flex-col justify-center items-center"
          id="learnMore"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl max-sm:text-2xl font-bold max-md:text-3xl max-sm:mt-24  ">
            What is Cat GI Web App ?
          </h1>
          <p className="my-5 mb-10 max-sm:text-sm max-sm:text-center max-sm:p-5 max-md:text-md max-md:p-8 text-md font-semibold text-justify container">
            <span className="font-extrabold text-primary">
              Catatan Digital Singkatnya Adalah{" "}
            </span>
            <span>
              untuk membantu Anda menyimpan catatan dan berbagai informasi
              penting yang ada di sekitar Anda.
            </span>
            <span>
              Selain itu, aplikasi ini memungkinkan Anda untuk membuat,
              membagikan, dan membaca catatan dengan fleksibilitas penuh, baik
              secara pribadi maupun publik. Anda bisa memilih siapa saja yang
              dapat mengakses catatan Anda.
            </span>
            <span>
              Aplikasi ini juga memberikan kemudahan untuk menulis, membagikan,
              dan membaca berbagai pengalaman serta informasi di seluruh dunia,
              selama Anda terhubung dengan internet. Dengan demikian, aplikasi
              ini menjadi sarana yang efektif untuk berbagi pengetahuan dan
              informasi.
            </span>
          </p>
        </motion.div>
        <div className="feature mt-32 max-sm:mt-5  flex flex-col items-center gap-8 max-md:mt-12">
          <h1 className="text-4xl max-sm:text-3xl font-bold ml-8  ">
            Features Cat GI
          </h1>
          <div className="max-sm:justify-center max-md:items-center max-md:justify-center flex flex-wrap gap-5 justify-center my-5 ">
            {/* Card Feature 1 */}
            <motion.div
              className="card bg-base-100 max-md:w-72 max-sm:w-80 w-96 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-star fa-5x mt-6"></i>
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  Tampilan Yang Baru
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  Memperbaharui tampilan yang lebih menarik untuk meningkatkan
                  kualitas pengalaman pengguna
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Appearance</div>
                </div>
              </div>
            </motion.div>

            {/* Card Feature 2 */}
            <motion.div
              className="card bg-base-100 w-96 hover:shadow-2xl max-sm:w-80 hover:scale-105 transition-transform duration-300 max-md:w-72"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-user fa-5x mt-6"></i>
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  Mekanisme Public Yang Baru
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  Mekanisme Terutama Untuk Menyimpan Catatan Dan Berbagai
                  Informasi Agar Mudah Diakses Dan Dibaca
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Mekanisme</div>
                </div>
              </div>
            </motion.div>
            {/* Feature card 3 */}
            <motion.div
              className="card bg-base-100 w-96 hover:shadow-2xl max-sm:w-80 hover:scale-105 transition-transform duration-300 max-md:w-72"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-lock fa-5x mt-6"></i>
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  Catatan Private
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  Menambahkan Fitur Private Untuk Menyimpan Catatan Yang
                  Bersifat Rahasia Dan Tidak Dapat Diakses Oleh Orang Lain
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Mekanisme</div>
                </div>
              </div>
            </motion.div>
            {/* Feature Card 4 */}
            <motion.div
              className="card bg-base-100 w-96 hover:shadow-2xl max-sm:w-80 hover:scale-105 transition-transform duration-300 max-md:w-72"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-key fa-5x mt-6"></i>
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  Keamanan Aplikasi Yang Baru
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  Memperbaharui tampilan yang lebih menarik untuk meningkatkan
                  kualitas pengalaman pengguna
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Mekanisme</div>
                </div>
              </div>
            </motion.div>
            {/* Feature Card 5 */}
            <motion.div
              className="card bg-base-100 w-96 hover:shadow-2xl max-sm:w-80 hover:scale-105 transition-transform duration-300 max-md:w-72"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-group fa-5x mt-6"></i>
              </div>

              <div className="card-body">
                <h2 className="card-title">
                  Izinkan Beberapa Untuk Mengakses Catatan Privat
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Izinkan Beberapa Orang Untuk Mengakses Catatan Milik Mu </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Mekanisme</div>
                </div>
              </div>
            </motion.div>
            {/* Feature Card 6 */}
            <motion.div
              className="card bg-base-100 w-96 hover:shadow-2xl max-sm:w-80 hover:scale-105 transition-transform duration-300 max-md:w-72"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="imageFeature text-center ">
                <i className="fa fa-thin fa-bug fa-5x mt-6"></i>
              </div>
              <div className="card-body">
                <h2 className="card-title">
                  Feedback Yang Mudah
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>
                  Kami Harap Jika Ada Bug Langsung Saja Report Bug Di Menu
                  Setelah Login Atau Di Bagian Footer , Jika Guest Silahkan Klik{" "}
                  <a className="link text-primary font-bold link-hover" href="">
                    Disini
                  </a>
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Features</div>
                  <div className="badge badge-outline">Mekanisme</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </GuestLayouts>
    </>
  );
};

export default LearnMore;
