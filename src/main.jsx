import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import ProtectedDashboard from "./protectedRoute/protectedDashboard.jsx";
import ConsoleWarn from "./validation/server/consoleWarn.jsx";
import LearnMore from "./views/guest/pages/learnMore.jsx";
import "font-awesome/css/font-awesome.min.css";
import UserDashboard from "./views/user/userDashboard.jsx";
import ProtectedUserNewCatatan from "./views/user/userNewCatatan.jsx";
import NotFound from "./views/error/404.jsx";
import ViewCatatanPage from "./views/user/userViewCatatan.jsx";
import UserEditCatatanPage from "./views/user/userEditCatatan.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LearnMore />
      </motion.div>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "verify",
    element: <ProtectedDashboard />,
  },
  {
    path: "guest/learnMore",
    element: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LearnMore />
      </motion.div>
    ),
  },
  {
    path: "user/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "user/new-catatan",
    element: <ProtectedUserNewCatatan />,
  },
  {
    path: "user/edit-catatan",
    element: <UserEditCatatanPage />,
  },
  {
    path: "user/view-catatan",
    element: <ViewCatatanPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ConsoleWarn />
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
