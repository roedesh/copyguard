import { FC } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";
import InsightsDetail from "./pages/InsightsDetail";
import About from "./pages/About";
import StorageProvider from "./providers/StorageProvider";

const Content = () =>
  useRoutes([
    { path: "/", element: <Settings /> },
    { path: "/insights", element: <Insights /> },
    { path: "/insights/:id", element: <InsightsDetail /> },
    { path: "/about", element: <About /> },
  ]);

const App: FC = () => {
  return (
    <StorageProvider>
      <Header />
      <Container>
        <Content />
      </Container>
      <ToastContainer />
    </StorageProvider>
  );
};

export default App;
