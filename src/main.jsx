import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import route
import router from "./routes/combineRoutes";
// import styles
import "./styles/global/global.css";
// import redux
import store from "./redux/store";
const cilent = new QueryClient({});
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider cilent={cilent}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
