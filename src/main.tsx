import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={Routes} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
