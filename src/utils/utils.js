
export const getUserId = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("userId=")) {
      return cookie.substring("userId=".length, cookie.length);
    }
  }
  return null;
};

export const convertMinutesToHours = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  }
  if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

export const adjustCardsQuantityBasedOnWindowWidth = (windowWidth) => {
  if (windowWidth > 768) {
    console.log(`InitialCardsQuantity: 12,
        width res: ${windowWidth}px`);
    return [12, 3]
  } else if (windowWidth <= 768 && windowWidth > 480) {
    console.log(`InitialCardsQuantity: 8,
        width res: ${windowWidth}px`);
    return [8, 2]
  } else if (windowWidth <= 480) {
    console.log(`InitialCardsQuantity: 5,
        width res: ${windowWidth}px`);
    return [5, 2]
  } else {
    console.log(`InitialCardsQuantity: 12,
        width res: what res??: ${windowWidth}px`);
    return [12, 3]
  }
}