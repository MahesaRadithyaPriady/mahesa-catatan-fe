import { Link } from "react-router-dom";
import { useState } from "react";
import MainForm from "../components/mainForm";
import ValidasiRegister from "../validation/register";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrorMessage("Password and Confirm Password do not match.");
    }
    setLoading(true);
    const result = await ValidasiRegister({
      username,
      password,
      confirmPassword,
    });
    setLoading(false);
    if (result.success) {
      navigate("/user/dashboard");
    } else {
      setErrorMessage("Username already exists.");
    }
  };

  return (
    <>
      <MainForm handle={handleRegister} errorMessage={errorMessage}>
        <div className="form-control w-full ">
          <div className="label">
            <span className="label-text font-semibold">Username</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <div className="label">
            <span className="label-text font-semibold">Password</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="label">
            <span className="label-text font-semibold">Confirm Password</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <span className="loader mr-2"></span>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
          <div className="divider">OR</div>
          <Link to="/login">
            <button className="btn btn-outline w-full">Login</button>
          </Link>
        </div>
      </MainForm>
    </>
  );
};

export default RegisterForm;
