import { useState } from "react";
import { getCheckboxStateLS, saveCheckboxLS } from "../../utils/localStorageUtils";

const FilterCheckbox = ({ isSaved, onToggle, onToggleCleanInput }) => {
  const [showOnlyShortMovies, setShowOnlyShortMovies] = useState(false);

  const toggleCheckbox = () => {
    const state = !showOnlyShortMovies;
    saveCheckboxLS(state, isSaved)
    setShowOnlyShortMovies(state);
    onToggle(state);
    onToggleCleanInput();
  }

  useState(() => {
      setShowOnlyShortMovies(getCheckboxStateLS(isSaved));
  }, [])

  return (
    <div onClick={toggleCheckbox} className="filter-checkbox">
      <div className={`${showOnlyShortMovies
        ? "filter-checkbox__tumbler filter-checkbox__tumbler_active"
        : "filter-checkbox__tumbler"}`} />
      <p className={`${showOnlyShortMovies
        ? "filter-checkbox__caption filter-checkbox__caption_active"
        : "filter-checkbox__caption"}`}>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
