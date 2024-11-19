import { useLocation } from "react-router-dom";
import CardCenter from "../components/cardCenterWithMessage";
import { useState, useEffect } from "react";
import EditCatatanV from "../validation/editCatatan";
import { useNavigate } from "react-router-dom";
import GetInfoCatatanV from "../validation/getInfoCatatan";

const CardEditCatatan = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [namaCatatan, setNamaCatatan] = useState(null);
  const [isiCatatan, setIsiCatatan] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState(null);
  const navigate = useNavigate();

  const handleFetchMoreInfo = async () => {
    setNamaCatatan("Loading...");
    setIsiCatatan("Loading...");
    const id = queryParams.get("id");
    const oldCatatan = await GetInfoCatatanV(id);
    if (oldCatatan.success) {
      setNamaCatatan(oldCatatan.data.name_catatan);
      setIsiCatatan(oldCatatan.data.isi_catatan);
    }
  };

  const handleEditCatatan = async () => {
    const id = queryParams.get("id");
    const EditResCatatan = await EditCatatanV(id, namaCatatan, isiCatatan);
    console.log(EditResCatatan);
    if (EditResCatatan.success) {
      setMessage(EditResCatatan.message);
      setTypeAlert("info");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    } else {
      setMessage(EditResCatatan.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleFetchMoreInfo();
  }, []);
  return (
    <>
      <CardCenter title="Edit Catatan" typeAlert={typeAlert} message={message}>
        <label class="input input-bordered flex items-center ">
          <i className="fa fa-book fa-lg"></i>
          <div className="divider divider-horizontal"></div>
          <input
            type="text"
            class="grow"
            placeholder="Masukan Nama Catatan Anda"
            value={namaCatatan}
            onChange={(e) => setNamaCatatan(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center  my-5">
          <i className="fa fa-pencil fa-lg"></i>
          <div className="divider divider-horizontal"></div>
          <input
            type="text"
            class="grow"
            placeholder="Isi Catatanya"
            value={isiCatatan}
            onChange={(e) => setIsiCatatan(e.target.value)}
          ></input>
        </label>
        <select
          className="select w-full max-w-xs border outline-2 mb-5"
          disabled
        >
          <option>Pilih Kategori | Belum Tersedia</option>
        </select>
        <button className="btn btn-primary" onClick={handleEditCatatan}>
          Edit Catatan
        </button>
      </CardCenter>
    </>
  );
};

export default CardEditCatatan;
