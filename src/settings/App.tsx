import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import About from "./pages/About";

const App: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
