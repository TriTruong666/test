import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
// import route
import router from "./routes/publicRoutes";
// import styles
import "./styles/global/global.css";
// import redux
import store from "./redux/store";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
