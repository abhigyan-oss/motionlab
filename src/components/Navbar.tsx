import { AnimatePresence, motion } from "motion/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Entrance", path: "/entrance" },
  { name: "Gesture", path: "/gesture" },
  { name: "Scroll", path: "/scroll" },
  { name: "Physics", path: "/spring" },
  { name: "Layout", path: "/layout" },
  { name: "Shared", path: "/shared" },
  { name: "Playground", path: "/playground" },
];

const exploreLinks = [
  { name: "Text Animation", path: "/text" },
  { name: "Transitions", path: "/transitions" },
  { name: "Advanced", path: "/advanced" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          Motion<span>Lab</span>
        </NavLink>

        {/* DESKTOP NAVIGATION */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}

          <div className="explore-wrapper">
            <span className="explore-label">
              Explore ▾
            </span>

            <div className="explore-menu">
              {exploreLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="navbar-actions">
          <motion.a
            href="https://github.com/abhigyan-oss/motionlab"
            target="_blank"
            rel="noreferrer"
            className="github-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub ↗
          </motion.a>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`menu-toggle ${
              menuOpen ? "open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={
                    location.pathname === link.path
                      ? "active"
                      : ""
                  }
                >
                  {link.name}
                  <span>→</span>
                </NavLink>
              ))}
            </div>

            <div className="mobile-menu-divider" />

            <div className="mobile-explore">
              <span>EXPLORE</span>

              {exploreLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={
                    location.pathname === link.path
                      ? "active"
                      : ""
                  }
                >
                  {link.name}
                  <span>↗</span>
                </NavLink>
              ))}
            </div>

            <a
              href="https://github.com/abhigyan-oss/motionlab"
              target="_blank"
              rel="noreferrer"
              className="mobile-github"
              onClick={closeMenu}
            >
              View GitHub ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;