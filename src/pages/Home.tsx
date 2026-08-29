import { motion } from "motion/react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import "../App.css";

type AnimationCardProps = {
  number: string;
  title: string;
  description: string;
  path: string;
};

function Home() {
  return (
    <PageTransition>
      <main className="app">
        <section className="hero">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-dot" />
            Interactive Animation Playground
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            Motion<span>Lab</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            Explore modern web animations built with React,
            TypeScript and Motion.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
          >
            <Link to="/entrance" className="primary-button">
              Explore Animations →
            </Link>

            <motion.a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View GitHub
            </motion.a>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.div>
        </section>

        <section className="categories">
          <div className="section-heading">
            <p>EXPLORE</p>
            <h2>Animation Playground</h2>
          </div>

          <div className="card-grid">
            <AnimationCard
              number="01"
              title="Entrance"
              description="Fade, slide, scale and stagger animations."
              path="/entrance"
            />

            <AnimationCard
              number="02"
              title="Gestures"
              description="Hover, tap, drag and interactive gestures."
              path="/gesture"
            />

            <AnimationCard
              number="03"
              title="Scroll"
              description="Scroll-linked animations and parallax effects."
              path="/scroll"
            />

            <AnimationCard
              number="04"
              title="Text"
              description="Creative text reveals and character animations."
              path="/text"
            />

            <AnimationCard
              number="05"
              title="Transitions"
              description="Smooth page and layout transitions."
              path="/transitions"
            />

            <AnimationCard
              number="06"
              title="Advanced"
              description="Mouse tracking, SVG and 3D interactions."
              path="/advanced"
            />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function AnimationCard({
  number,
  title,
  description,
  path,
}: AnimationCardProps) {
  return (
    <Link to={path} className="animation-card-link">
      <motion.div
        className="animation-card"
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <span className="card-number">{number}</span>

        <h3>{title}</h3>

        <p>{description}</p>

        <span className="card-arrow">↗</span>
      </motion.div>
    </Link>
  );
}

export default Home;