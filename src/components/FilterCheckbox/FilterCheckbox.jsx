import { useState } from "react";

const FilterCheckbox = () => {
  const [showShortMovies, setShowShortMovies] = useState(false);

  const toggleCheckbox = () => {
    const state = !showShortMovies;
    setShowShortMovies(state);
    storeCheckboxState(state);
  }

  const storeCheckboxState = (newState) => {
    localStorage.setItem("checkboxState", newState.toString());
  }

  const loadCheckboxState = () => {
    if (localStorage.getItem("checkboxState")) {
      const stateString = localStorage.getItem("checkboxState");
      const state = stateString === "true";
      setShowShortMovies(state);
    }
  }

  useState(() => {
    loadCheckboxState();
  }, [])

  return (
    <div onClick={toggleCheckbox} className="filter-checkbox">
      <div className={`${showShortMovies
        ? "filter-checkbox__tumbler filter-checkbox__tumbler_active"
        : "filter-checkbox__tumbler"}`} />
      <p className={`${showShortMovies
        ? "filter-checkbox__caption filter-checkbox__caption_active"
        : "filter-checkbox__caption"}`}>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
