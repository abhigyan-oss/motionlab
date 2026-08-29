import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="footer-container">
        {/* TOP */}

        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Motion<span>Lab</span>
            </Link>

            <p>
              An interactive playground for exploring beautiful,
              expressive and powerful animations with Motion.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <span className="footer-heading">EXPLORE</span>

              <Link to="/entrance">Entrance</Link>
              <Link to="/gesture">Gestures</Link>
              <Link to="/scroll">Scroll</Link>
              <Link to="/text">Text</Link>
            </div>

            <div className="footer-column">
              <span className="footer-heading">TOOLS</span>

              <Link to="/spring">Spring Physics</Link>
              <Link to="/transitions">Transitions</Link>
              <Link to="/layout">Layout</Link>
              <Link to="/shared">Shared Motion</Link>
            </div>

            <div className="footer-column">
              <span className="footer-heading">LAB</span>

              <Link to="/advanced">Advanced</Link>
              <Link to="/playground">Generator</Link>

              <a
                href="https://motion.dev"
                target="_blank"
                rel="noreferrer"
              >
                Motion Docs ↗
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}

        <div className="footer-cta">
          <div>
            <span>KEEP EXPERIMENTING</span>

            <h2>
              Build something that
              <br />
              <em>moves beautifully.</em>
            </h2>
          </div>

          <motion.div
            whileHover={{
              scale: 1.05,
              rotate: -3,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Link
              to="/playground"
              className="footer-cta-button"
            >
              Open Playground ↗
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">
          <span>
            © {currentYear} MotionLab. Built with React + Motion.
          </span>

          <div className="footer-bottom-links">
            <span>Interactive Motion Playground</span>

            <motion.div
              className="footer-status"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <i />
              <span>Live</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;