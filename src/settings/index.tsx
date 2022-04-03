import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
