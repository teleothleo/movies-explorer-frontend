export const BFAPI_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const BF_URL = "https://api.nomoreparties.co/";
//export const API_URL = "https://api.lacatastrophe.nomoredomains.monster"
export const API_URL = "http://localhost:3000"
export const WarnNoInput = "Нужно ввести ключевое слово";

export const ErrNotFound = "Ничего не найдено";
export const ErrBadFetch = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
export const ErrServer = "На сервере произошла ошибка.";
export const ErrBadLink = "Страница по указанному маршруту не найдена.";

// SignUp & SignIn validation
export const ErrBadName = "Ваше имя должно длиной от 2 до 30 символов. Можно использовать латиницу, кириллицу, пробелы и дефисы.";
export const ErrBadEmail = "Пока непохоже на адрес электронной почты, если честно.";
export const ErrBadPsw = "Минимальная длина пароля — 2 символа.";

// SignUp API res
export const ErrRegConfilct = "Пользователь с таким email уже существует.";
export const ErrBadReg = "При регистрации пользователя произошла ошибка.";

// SignIn API res
export const ErrLoginBadNameOrPsw = "Вы ввели неправильный логин или пароль.";
export const ErrLoginBadTokenFormat = "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
export const ErrLoginWrongToken = "При авторизации произошла ошибка. Переданный токен некорректен.";

// Profile API res
export const ErrProfileConfilct = "Пользователь с таким email уже существует.";
export const ErrProfileBadQuery = "При обновлении профиля произошла ошибка.";

// Regex
export const nameRgx = /^[\u0020\u002D\u0041-\u005A\u0061-\u007A\u0410-\u044F]{2,30}$/;
export const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const pswRgx = /.{2,}/;