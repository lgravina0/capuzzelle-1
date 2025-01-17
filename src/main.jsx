import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MetaMaskProvider } from "metamask-react";

import reportWebVitals from "./reportWebVitals.jsx";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";
import "./styles/reset.css";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <MetaMaskProvider>
    <App />
    </MetaMaskProvider>
  </Provider>
  </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();