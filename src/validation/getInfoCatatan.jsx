const GetInfoCatatanV = async (id) => {
  const getInfoCatatanRes = await fetch(
    `${import.meta.env.VITE_API_URL}/catatan/${id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    }
  );
  const getInfoCatatan = await getInfoCatatanRes.json();
  return getInfoCatatan;
};

export default GetInfoCatatanV;
