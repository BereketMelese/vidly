import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Customers from "./Pages/Customers";
import Rentals from "./Pages/Rentals";
import Other from "./Pages/Other";
import NotFound from "./Pages/NotFound";
import LoginForm from "./Pages/LoginForm";
import RegisterForm from "./Pages/RegisterForm";
import MovieFormWrapper from "./components/MovieForm";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/movies/new" element={<MovieFormWrapper />} />
          <Route path="/movies/:id" element={<MovieFormWrapper />} />
          <Route path="/movies" element={<Other />}></Route>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
