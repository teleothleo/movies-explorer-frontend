import { useEffect, useRef } from "react";
import { WarnNoInput } from "../../utils/constants";
import { getSearchPromptLS, saveSearchPromptLS } from "../../utils/localStorageUtils";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ onSearchClick, isSaved, onToggle }) => {

  const queryRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSearchPromptLS(queryRef.current.value, isSaved)
    onSearchClick(queryRef.current.value)
  }

  const cleanInput = () => {
    if (isSaved) {
      queryRef.current.value = "";
    }
  }

  useEffect(() => {
    if (!isSaved) {
      queryRef.current.value = getSearchPromptLS(false);
    }
  }, [isSaved])

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} className="search-form__wrapper">
        <input ref={queryRef} className="search-form__input" placeholder="Фильм" required
          onInvalid={(e) => e.target.setCustomValidity(WarnNoInput)}
          onInput={(e) => e.target.setCustomValidity("")}
        ></input>
        <button className="search-form__btn btn-black" />
      </form>
      <FilterCheckbox isSaved={isSaved} onToggle={onToggle} onToggleCleanInput={cleanInput} />
    </section >
  );
}

export default SearchForm;
