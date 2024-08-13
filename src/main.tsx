import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes} />
    </Provider>
  </React.StrictMode>
);
