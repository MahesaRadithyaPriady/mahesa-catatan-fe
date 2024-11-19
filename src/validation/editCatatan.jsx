const EditCatatanV = async (id, name_catatan, isi_catatan) => {
  const EditCatatanRes = await fetch(
    `${import.meta.env.VITE_API_URL}/catatan/${id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({
        name_catatan,
        isi_catatan,
      }),
    }
  );
  const EditCatatanResult = await EditCatatanRes.json();

  return EditCatatanResult;
};

export default EditCatatanV;
