import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import BadWay from "../BadWay/BadWay";
import { useAuth } from "../../utils/AuthContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";

function App() {

  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} Component={
              Movies
            } />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} Component={
              SavedMovies
            } />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} Component={
              Profile
            } />
          }
        />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<BadWay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
