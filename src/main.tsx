import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import ThemeConfig from "./configs/ThemeConfig.tsx";
import PageRefreshWarning from "./components/ui/modals/PageRefreshWarning.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeConfig>
          {/* Top loading bar should be placed inside the RouterProvider */}
          {/* <TopLoadingProgressBar /> */}
          <RouterProvider router={Routes} />
          <Toaster />
          <PageRefreshWarning />
        </ThemeConfig>
      </Provider>
    </HelmetProvider>
  </React.Fragment>
);
