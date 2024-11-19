import { Link } from "react-router-dom";
import LoginCard from "../fragments/cardAuth";
import RegisterLayouts from "../layouts/AuthLayouts";
import { Helmet } from "react-helmet-async";
import RegisterForm from "../fragments/registerForm";
import { b } from "framer-motion/client";
const Register = () => {
  return (
    <RegisterLayouts>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <LoginCard
        content={{
          img: "/img/loginBanner.jpg",
          title: "Register Page",
          heroTitle: "Hello My Friend",
          heroDescription:
            "Untuk menikmati semua fitur yang tersedia, silakan register terlebih dahulu. Jika anda belum mengetahui apa isi dari aplikasi ini, anda bisa melihat fitur fitur yang kami tawarkan dengan mengklik tombol dibawah ini",
          btnHeroText: "Learn More Features",
          btnHeroLink: "/guest/learnMore",
        }}
      >
        <RegisterForm />
      </LoginCard>
    </RegisterLayouts>
  );
};

export default Register;
