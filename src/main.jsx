import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { UsersContextProvider } from "./context/UsersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsersContextProvider>
      <AuthContextProvider>
      <App />
      <Toaster/>
    </AuthContextProvider>
    </UsersContextProvider>
    
  </StrictMode>
);
