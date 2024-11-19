import { useEffect, useState } from "react";
import Btn from "../components/btn";
import { useNavigate, useLocation } from "react-router-dom";
import GetInfoCatatanV from "../validation/getInfoCatatan";

const ViewCatatan = () => {
  const [namaCatatan, setNamaCatatan] = useState(null);
  const [isiCatatan, setIsiCatatan] = useState(null);
  const [owner, setOwner] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleFetch = async () => {
    const id = queryParams.get("id");
    const resGetMoreInfo = await GetInfoCatatanV(id);
    if (!resGetMoreInfo.success) {
      // Gmnaa
    }
    setNamaCatatan(resGetMoreInfo.data.name_catatan);
    setIsiCatatan(resGetMoreInfo.data.isi_catatan);
    setOwner(resGetMoreInfo.data.user.username);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    handleFetch();
  }, []);

  const handleBack = () => {
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Detail Catatan
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold text-gray-700">
                Nama Catatan
              </td>
              <td className="border px-4 py-2 text-gray-600">{namaCatatan}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold text-gray-700">
                Isi Catatan
              </td>
              <td className="border px-4 py-2 text-gray-600">{isiCatatan}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold text-gray-700">
                Owner
              </td>
              <td className="border px-4 py-2 text-gray-600">{owner}</td>
            </tr>
          </tbody>
        </table>
        <div className="tableFooter flex items-center justify-start p-2 cursor-pointer">
          <Btn onclickHandler={handleBack} typeBtn="primary">
            Kembali
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default ViewCatatan;
