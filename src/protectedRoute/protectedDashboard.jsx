// src/views/verify.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedDashboard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verify = () => {
      if (!token) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    verify();
  }, [navigate, token]);

  if (!token) {
    return (
      <div className="flex h-screen justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Verify...</h1>
      </div>
    );
  }

  return children;
};

export default ProtectedDashboard;
