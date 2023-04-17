import { useLocation } from "react-router-dom";


const LoadCardList = () => {
  const location = useLocation();

  return (
    <div className="load-card-list">
      {location.pathname === '/movies' && (
        <button className="load-card-list__load-btn btn-border">Ещё</button>
      )}
      {location.pathname === '/saved-movies' && (
        <div className="load-card-list__filler"></div>
      )}
    </div>
  );
}

export default LoadCardList;
