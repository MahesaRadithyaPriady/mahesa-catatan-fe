import { useState } from "react";
import CardCenter from "../components/cardCenterWithMessage";
import NewCatatan from "../validation/newCatatan";
import { useNavigate } from "react-router-dom";

const NewCatatanCard = () => {
  const [namaCatatan, setNamaCatatan] = useState(null);
  const [isiCatatan, setIsiCatatan] = useState(null);
  const [message, setMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState(null);

  const navigate = useNavigate();

  const handleNewCatatan = async () => {
    const res = await NewCatatan(namaCatatan, isiCatatan);
    if (res.success) {
      setMessage(res.message);
      setTypeAlert("info");
      setNamaCatatan("");
      setIsiCatatan("");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 2000);
    } else {
      setMessage(res.message);
    }
  };

  return (
    <>
      <CardCenter title="New Catatan" message={message} typeAlert={typeAlert}>
        <label class="input input-bordered flex items-center ">
          <i className="fa fa-book fa-lg"></i>
          <div className="divider divider-horizontal"></div>
          <input
            type="text"
            class="grow"
            placeholder="Masukan Nama Catatan Anda"
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
            onChange={(e) => setIsiCatatan(e.target.value)}
          ></input>
        </label>
        <select
          className="select w-full max-w-xs border outline-2 mb-5"
          disabled
        >
          <option>Pilih Kategori | Belum Tersedia</option>
        </select>
        <button className="btn btn-primary" onClick={handleNewCatatan}>
          Buat Catatan Baru
        </button>
      </CardCenter>
    </>
  );
};

export default NewCatatanCard;
