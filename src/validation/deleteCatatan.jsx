const DeleteCatatanV = async (id) => {
  const deleteCatatanRes = await fetch(
    `${import.meta.env.VITE_API_URL}/catatan/${id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    }
  );
  const deleteCatatanResult = await deleteCatatanRes.json();

  return deleteCatatanResult;
};

export default DeleteCatatanV;
