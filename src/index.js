import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App/App";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./utils/AuthContext";
import { MenuProvider } from "./utils/MenuContext";
import { UserProvider } from "./utils/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MenuProvider>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </MenuProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
