const NewCatatan = async (name, catatan) => {
  try {
    if (!name || !catatan) {
      throw new Error("Semua field harus diisi");
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/catatan`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        name_catatan: name,
        isi_catatan: catatan,
        user_id: localStorage.getItem("id"),
      }),
    });
    const result = await res.json();
    if (result.success) {
      return {
        success: true,
        message: "Catatan berhasil dibuat",
      };
    }
    throw new Error(result.message);
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export default NewCatatan;
