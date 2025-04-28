import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/common/NavBar";
import Customers from "./Pages/Customers";
import Rentals from "./Pages/Rentals";
import Other from "./Pages/Other";
import NotFound from "./Pages/NotFound";
import LoginFormWrapper from "./Pages/LoginForm";
import RegisterFormWrapper from "./Pages/RegisterForm";
import MovieFormWrapper from "./components/MovieForm";
import Logout from "./components/Logout";
import * as authService from "./services/authService";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const info = authService.getCurrentUser();
      setUser(info);
    };

    fetchUserData();
  }, []);
  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <div className="content">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<LoginFormWrapper />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterFormWrapper />} />
          <Route
            path="/movies/:id"
            element={
              user ? (
                <MovieFormWrapper user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/movies" element={<Other user={user} />}></Route>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
