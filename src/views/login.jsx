import LoginCard from "../fragments/cardAuth";
import LoginLayouts from "../layouts/AuthLayouts";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import LoginForm from "../fragments/loginForm";
const Login = () => {
  useEffect(() => {}, []);
  return (
    <LoginLayouts>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <LoginCard
        content={{
          img: "/img/loginBanner.jpg",
          title: "Login Page",
          heroTitle: "Hello My Friend",
          heroDescription:
            "Untuk menikmati semua fitur yang tersedia, silakan login terlebih dahulu. Jika anda belum mengetahui apa isi dari aplikasi ini, anda bisa melihat fitur fitur yang kami tawarkan dengan mengklik tombol dibawah ini",
          btnHeroText: "Learn More Features",
          btnHeroLink: "/guest/learnMore",
        }}
      >
        <LoginForm />
      </LoginCard>
    </LoginLayouts>
  );
};

export default Login;
