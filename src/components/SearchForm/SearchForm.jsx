import { useEffect, useRef, useState } from "react";
import { WarnNoInput } from "../../utils/constants";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ onSearchClick, movies }) => {

  const queryRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    storeSearchPrompt(queryRef.current.value);
    onSearchClick(movies, queryRef);
  }

  const storeSearchPrompt = (searchPrompt) => {
    localStorage.setItem("searchPrompt", searchPrompt);
  }

  const loadSearchPrompt = () => {
    const newSearchPrompt = localStorage.getItem("searchPrompt");
    queryRef.current.value = newSearchPrompt;
  }

  useEffect(() => {
    loadSearchPrompt();
  }, [])

  return (
    <section className="search-form">
      <form onSubmit={handleSubmit} className="search-form__wrapper">
        <input ref={queryRef} className="search-form__input" placeholder="Фильм" required
          onInvalid={(e) => e.target.setCustomValidity(WarnNoInput)}
          onInput={(e) => e.target.setCustomValidity("")}
        ></input>
        <button className="search-form__btn btn-black" />
      </form>
      <FilterCheckbox />
    </section >
  );
}

export default SearchForm;
