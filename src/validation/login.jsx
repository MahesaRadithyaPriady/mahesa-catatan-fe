// src/validation/ValidasiLogin.jsx
export const ValidasiLogin = async ({ username, password }) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();

    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("id", result.data.id);
      localStorage.setItem("id_role", result.data.id_role);
      return { success: true };
    } else {
      return { success: false, message: result.message };
    }
  } catch (err) {
    if (import.meta.env.VITE_NODE_ENV !== "production") {
      console.error(err);
    }
    return { success: false, message: "Login failed. Please try again." };
  }
};
