import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Entrance from "./pages/Entrance";
import Gesture from "./pages/Gesture";
import Scroll from "./pages/Scroll";
import Spring from "./pages/Spring";
import Layout from "./pages/Layout";
import Shared from "./pages/Shared";
import Playground from "./pages/Playground";
import Text from "./pages/Text";
import Transitions from "./pages/Transitions";
import Advanced from "./pages/Advanced";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route path="/" element={<Home />} />

        <Route
          path="/entrance"
          element={<Entrance />}
        />

        <Route
          path="/gesture"
          element={<Gesture />}
        />

        <Route
          path="/scroll"
          element={<Scroll />}
        />

        <Route
          path="/spring"
          element={<Spring />}
        />

        <Route
          path="/layout"
          element={<Layout />}
        />

        <Route
          path="/shared"
          element={<Shared />}
        />

        <Route
          path="/playground"
          element={<Playground />}
        />

        <Route
          path="/text"
          element={<Text />}
        />

        <Route
          path="/transitions"
          element={<Transitions />}
        />

        <Route
          path="/advanced"
          element={<Advanced />}
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <AnimatedRoutes />

      <Footer />
    </BrowserRouter>
  );
}

export default App;