import { useLocation } from "react-router-dom";


const Preloader = () => {
  const location = useLocation();

  return (
    <div className="preloader">
      {location.pathname === '/movies' && (
        <button className="preloader__load-btn btn-border">Ещё</button>
      )}
      {location.pathname === '/saved-movies' && (
        <div className="preloader__filler"></div>
      )}
    </div>
  );
}

export default Preloader;
