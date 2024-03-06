import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import "./config/axios.js";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import { Suspense } from "react";
import lazyLoading from "@/assets/loading-lazyload.png";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense
          fallback={
            <div className="img-loading">
              <img className="img" src={lazyLoading} />
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

