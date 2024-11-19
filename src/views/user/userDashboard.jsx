import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedDashboard from "../../protectedRoute/protectedDashboard";
import UserLayouts from "../../layouts/user/userLayouts";
import { Helmet } from "react-helmet-async";
import BtnPrimaryEye from "../../fragments/btnPrimaryEye";
import BtnPenWarning from "../../fragments/btnWarningPen";
import BtnErrorTrash from "../../fragments/btnErrorTrash";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [catatan, setCatatan] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const handleFetchAllCatatan = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/catatan", {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "GET",
        });
        const result = await res.json();
        // console.log(result);
        if (!result.success) {
          throw new Error(result.message);
        }
        setCatatan(result.data);
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      }
    };
    handleFetchAllCatatan();
  }, [catatan]);

  return (
    <UserLayouts>
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>
      <div className="userDashboard my-10  flex flex-col p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Selamat Datang Di Aplikasi Catatan Digital
        </h1>
        <div className="notif shadow-lg rounded-full mb-12">
          <div role="alert" className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-semibold text-lg">
              Anda Sedang Menggunakan Versi Demo.
            </span>
          </div>
        </div>
        <div className="statApp flex flex-col">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">All Catatan</div>
              <div className="stat-value">-</div>
              <div className="stat-desc">Ini Semua Tidak Termasuk Private</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Users</div>
              <div className="stat-value text-secondary">-</div>
              <div className="stat-desc text-secondary">-</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">New Registers</div>
              <div className="stat-value">-</div>
              <div className="stat-desc">-</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-lg mt-24">
          <div className="titleCatatan">
            <h1 className="text-3xl font-bold text-center mb-12">
              Semua Catatan Public Terbaru
            </h1>
          </div>
          <table className="table table-md">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Catatan</th>
                <th>Isi Catatan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {errorMessage !== undefined ? (
                <>
                  <tr>
                    <td colSpan={4}>
                      <div role="alert" className="alert alert-error">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 stroke-current"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-lg">{errorMessage}</span>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                catatan.map((catatan, index) => (
                  <tr key={catatan.id}>
                    <th>{index + 1}</th>
                    <td>
                      {localStorage.getItem("username") == catatan.user.username
                        ? `${catatan.name_catatan}   (You)`
                        : catatan.name_catatan}
                    </td>
                    <td>{catatan.isi_catatan}</td>
                    <td>
                      <div className="action flex justify-start items-center gap-4">
                        {localStorage.getItem("username") ==
                        catatan.user.username ? (
                          <>
                            <BtnPrimaryEye id={catatan.id} />
                            <BtnPenWarning id={catatan.id} />
                            <BtnErrorTrash id={catatan.id} />
                          </>
                        ) : (
                          <div className=" flex">
                            <BtnPrimaryEye
                              singleAction="w-52"
                              id={catatan.id}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayouts>
  );
};

const ProtectedUserDashboard = () => {
  return (
    <ProtectedDashboard>
      <UserDashboard />
    </ProtectedDashboard>
  );
};

export default ProtectedUserDashboard;
