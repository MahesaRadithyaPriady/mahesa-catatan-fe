import { useNavigate } from "react-router-dom";
import UserLayouts from "../../layouts/user/userLayouts";
import ProtectedDashboard from "../../protectedRoute/protectedDashboard";
import NewCatatan from "../../validation/newCatatan";
import { useState } from "react";
import NewCatatanCard from "../../fragments/cardNewCatatan";

const UserNewCatatan = () => {
  const [namaCatatan, setNamaCatatan] = useState("");
  const [isiCatatan, setIsiCatatan] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const handleCatatan = async () => {
    const res = await NewCatatan(namaCatatan, isiCatatan);
    if (res.success) {
      setResult(res);
      setNamaCatatan("");
      setIsiCatatan("");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    } else {
      setResult(res.message);
    }
  };

  return (
    <>
      <UserLayouts>
        <NewCatatanCard />
      </UserLayouts>
      ;
    </>
  );
};

const ProtectedUserNewCatatan = () => {
  return (
    <ProtectedDashboard>
      <UserNewCatatan />
    </ProtectedDashboard>
  );
};

export default ProtectedUserNewCatatan;
