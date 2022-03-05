import { FC } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";
import About from "./pages/About";

const Content = () =>
  useRoutes([
    { path: "/", element: <Settings /> },
    { path: "/insights", element: <Insights /> },
    { path: "/insights/:id", element: <Insights /> },
    { path: "/about", element: <About /> },
  ]);

const App: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;
