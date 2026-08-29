import { motion } from "motion/react";
import { useState } from "react";
import PageTransition from "../components/PageTransition";
import "./Text.css";

const characters = "MotionLab".split("");
const words = "Build beautiful motion".split(" ");

function Text() {
  const [replayKey, setReplayKey] = useState(0);

  const replay = () => {
    setReplayKey((previous) => previous + 1);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <PageTransition>
      <main className="text-page">
        <section className="text-hero">
          <div className="text-label">
            04 / TEXT ANIMATION
          </div>

          <h1>
            Motion <span>Typography</span>
          </h1>

          <p>
            Explore character reveals, staggered text, blur effects
            and interactive typography powered by Motion.
          </p>

          <button
            className="text-replay-button"
            onClick={replay}
          >
            ↻ Replay animations
          </button>
        </section>

        <section className="text-grid">
          {/* Character Reveal */}
          <div className="text-card character-card">
            <div className="text-card-header">
              <div>
                <span>01 / CHARACTER</span>
                <h2>Character Reveal</h2>
              </div>
            </div>

            <div className="text-demo">
              <motion.div
                key={`characters-${replayKey}`}
                className="character-text"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {characters.map((character, index) => (
                  <motion.span
                    key={`${character}-${index}`}
                    variants={characterVariants}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <p className="text-description">
              Each character enters independently using staggered
              animation timing.
            </p>
          </div>

          {/* Word Reveal */}
          <div className="text-card">
            <div className="text-card-header">
              <div>
                <span>02 / WORDS</span>
                <h2>Word Reveal</h2>
              </div>
            </div>

            <div className="text-demo">
              <motion.div
                key={`words-${replayKey}`}
                className="word-text"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {words.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <p className="text-description">
              Words appear one after another to create a smooth
              editorial-style reveal.
            </p>
          </div>

          {/* Slide Up */}
          <div className="text-card">
            <div className="text-card-header">
              <div>
                <span>03 / SLIDE</span>
                <h2>Slide Up</h2>
              </div>
            </div>

            <div className="text-demo">
              <motion.h3
                key={`slide-${replayKey}`}
                className="slide-text"
                initial={{
                  opacity: 0,
                  y: 70,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                Move with purpose.
              </motion.h3>
            </div>

            <p className="text-description">
              A simple vertical reveal useful for headings and
              section introductions.
            </p>
          </div>

          {/* Blur Reveal */}
          <div className="text-card">
            <div className="text-card-header">
              <div>
                <span>04 / BLUR</span>
                <h2>Blur Reveal</h2>
              </div>
            </div>

            <div className="text-demo">
              <motion.h3
                key={`blur-${replayKey}`}
                className="blur-text"
                initial={{
                  opacity: 0,
                  filter: "blur(20px)",
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              >
                Focus the motion.
              </motion.h3>
            </div>

            <p className="text-description">
              Blur combined with opacity and scale creates a
              cinematic entrance effect.
            </p>
          </div>

          {/* Stagger */}
          <div className="text-card wide-card">
            <div className="text-card-header">
              <div>
                <span>05 / STAGGER</span>
                <h2>Staggered Statement</h2>
              </div>
            </div>

            <div className="text-demo stagger-demo">
              <motion.div
                key={`stagger-${replayKey}`}
                className="stagger-text"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {["Design", "Motion", "Experience"].map(
                  (word, index) => (
                    <motion.span
                      key={word}
                      variants={wordVariants}
                      className={
                        index === 1 ? "accent-word" : ""
                      }
                    >
                      {word}
                    </motion.span>
                  )
                )}
              </motion.div>
            </div>

            <p className="text-description">
              Combine multiple words with staggered timing to create
              expressive hero typography.
            </p>
          </div>

          {/* Hover */}
          <div className="text-card wide-card">
            <div className="text-card-header">
              <div>
                <span>06 / INTERACTION</span>
                <h2>Interactive Typography</h2>
              </div>
            </div>

            <div className="text-demo interactive-demo">
              <motion.h3
                className="interactive-text"
                whileHover={{
                  scale: 1.08,
                  letterSpacing: "0.08em",
                  rotate: -2,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                Hover over me
              </motion.h3>
            </div>

            <p className="text-description">
              Typography can respond directly to user interaction
              using spring-based motion.
            </p>
          </div>
        </section>

        <section className="text-info">
          <span>TEXT MOTION</span>

          <h2>
            Small movements can make
            <span> interfaces feel alive.</span>
          </h2>

          <p>
            MotionLab uses Motion primitives such as variants,
            staggered children, spring transitions and interactive
            gestures to create expressive typography.
          </p>
        </section>
      </main>
    </PageTransition>
  );
}

export default Text;