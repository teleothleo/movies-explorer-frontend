
export const saveSearchPromptLS = (searchPrompt, saved) => {
  if (saved) {
    localStorage.setItem("savedSearchPrompt", searchPrompt);
  } else {
    localStorage.setItem("searchPrompt", searchPrompt);
  }
}
export const getSearchPromptLS = (saved) => {
  if (saved) {
    return localStorage.getItem("savedSearchPrompt");
  } else {
    return localStorage.getItem("searchPrompt");
  }
}

export const saveCheckboxLS = (state, saved) => {
  if (saved) {
    localStorage.setItem("savedMoviesCheckbox", state.toString());
  } else {
    localStorage.setItem("moviesCheckbox", state.toString());
  }
}

export const getCheckboxStateLS = (saved) => {
  if (saved) {
    const newState = localStorage.getItem("savedMoviesCheckbox");
    return newState === "true";
  } else {
    const newState = localStorage.getItem("moviesCheckbox");
    return newState === "true";
  }
}