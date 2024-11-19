const ValidasiRegister = async ({ username, password }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      headers: {
        "content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    if (result.success) {
      // console.log("success");
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("id", result.data.id);
      localStorage.setItem("id_role", result.data.id_role);
      return result;
    }
    throw new Error(result.message.errors[0].message);
  } catch (err) {
    return { success: false, message: err };
    // console.log(err);
    // return { success: false, message: err.message ? message : err };
  }
};

export default ValidasiRegister;
