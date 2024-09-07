import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import route
import router from "./routes/publicRoutes";
// import styles
import "./styles/global/global.css";
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
