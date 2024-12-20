import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";

//provinding store for all reducers
const store = configureStore({
  reducer: rootReducer,
});

//ReactDOM.createRoot: This method is used to create a new root for a concurrent React tree. It takes a DOM element as an argument, specifying where the root of your React tree should be in the actual HTML document. The createRoot function returns a Root object.


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>


  </React.StrictMode>
);
