import { useState } from "react";

const FilterCheckbox = () => {
  const [showShortMovies, setShowShortMovies] = useState(false);

  return (
    <button onClick={() => setShowShortMovies(!showShortMovies)} className="filter-checkbox">
      <div className={`${showShortMovies
        ? "filter-checkbox__tumbler"
        : "filter-checkbox__tumbler filter-checkbox__tumbler_active"}`} />
      <p className={`${showShortMovies
        ? "filter-checkbox__caption"
        : "filter-checkbox__caption filter-checkbox__caption_active"}`}>Короткометражки</p>
    </button>
  );
}

export default FilterCheckbox;
