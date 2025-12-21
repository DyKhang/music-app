import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store, { persistor } from "./store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Toaster
        reverseOrder={true}
        gutter={8}
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              padding: "12px",
            },
            position: "bottom-left",
            iconTheme: {
              primary: "var(--purple-primary)",
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
            fontSize: "1.4rem",
            backgroundColor: "var(--primary-bg)",
            color: "var(--text-primary)",
          },
        }}
      />
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
