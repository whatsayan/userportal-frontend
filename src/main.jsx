import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster/>
    </AuthContextProvider>
  </StrictMode>
);
