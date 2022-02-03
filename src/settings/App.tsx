import { FC } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
