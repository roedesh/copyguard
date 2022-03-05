import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("app"),
);
