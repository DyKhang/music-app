import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        reverseOrder={true}
        gutter={8}
        containerClassName="text-red-200"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              padding: "12px",
            },
            position: "bottom-left",
            iconTheme: {
              primary: "#644646",
              secondary: "white",
            },
          },
          error: {
            style: {
              padding: "12px",
            },
            position: "bottom-left",
          },
          style: {
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            fontSize: "1.4rem",
          },
        }}
      />
    </Provider>
  </React.StrictMode>,
);
