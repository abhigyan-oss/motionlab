import { useState } from "react";
import { motion, type Variants } from "motion/react";
import PageTransition from "../components/PageTransition";
import "./Entrance.css";

type AnimationType = "fade" | "slide" | "scale" | "rotate" | "bounce";

const animations: Record<AnimationType, Variants> = {
  fade: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },

  slide: {
    hidden: {
      opacity: 0,
      x: -150,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },

  scale: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },

  rotate: {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
  },

  bounce: {
    hidden: {
      opacity: 0,
      y: -150,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.6,
      },
    },
  },
};

const animationCode: Record<AnimationType, string> = {
  fade: `initial={{ opacity: 0 }}
animate={{ opacity: 1 }}`,

  slide: `initial={{ opacity: 0, x: -150 }}
animate={{ opacity: 1, x: 0 }}`,

  scale: `initial={{ opacity: 0, scale: 0 }}
animate={{ opacity: 1, scale: 1 }}`,

  rotate: `initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
animate={{ opacity: 1, rotate: 0, scale: 1 }}`,

  bounce: `initial={{ opacity: 0, y: -150 }}
animate={{ opacity: 1, y: 0 }}
transition={{ type: "spring", bounce: 0.6 }}`,
};

function Entrance() {
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationType>("fade");

  const [animationKey, setAnimationKey] = useState(0);

  const [duration, setDuration] = useState(0.8);
  const [delay, setDelay] = useState(0);

  const replayAnimation = () => {
    setAnimationKey((previous) => previous + 1);
  };

  const selectAnimation = (animation: AnimationType) => {
    setSelectedAnimation(animation);
    setAnimationKey((previous) => previous + 1);
  };

  return (
    <PageTransition>
      <main className="lab-page">
        <motion.div
          className="lab-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>01 / ENTRANCE</p>

          <h1>Entrance Animations</h1>

          <span>
            Experiment with different ways elements can enter the screen.
          </span>
        </motion.div>

        <div className="animation-controls">
          {(Object.keys(animations) as AnimationType[]).map((animation) => (
            <motion.button
              key={animation}
              className={
                selectedAnimation === animation
                  ? "control-button active"
                  : "control-button"
              }
              onClick={() => selectAnimation(animation)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {animation.charAt(0).toUpperCase() + animation.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="demo-box">
          <motion.div
            key={animationKey}
            className="demo-element"
            variants={animations[selectedAnimation]}
            initial="hidden"
            animate="visible"
            transition={{
              duration,
              delay,
              ease: "easeOut",
            }}
          >
            Motion
          </motion.div>
        </div>

        <div className="animation-settings">
          <div className="setting">
            <div className="setting-header">
              <label htmlFor="duration">Duration</label>
              <span>{duration.toFixed(1)}s</span>
            </div>

            <input
              id="duration"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={duration}
              onChange={(event) =>
                setDuration(Number(event.target.value))
              }
            />
          </div>

          <div className="setting">
            <div className="setting-header">
              <label htmlFor="delay">Delay</label>
              <span>{delay.toFixed(1)}s</span>
            </div>

            <input
              id="delay"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={delay}
              onChange={(event) =>
                setDelay(Number(event.target.value))
              }
            />
          </div>
        </div>

        <motion.button
          className="replay-button"
          onClick={replayAnimation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Replay ↻
        </motion.button>

        <motion.div
          className="code-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="code-header">
            <span>Motion Configuration</span>

            <span className="code-language">
              TypeScript
            </span>
          </div>

          <pre>
            <code>{animationCode[selectedAnimation]}</code>
          </pre>
        </motion.div>
      </main>
    </PageTransition>
  );
}

export default Entrance;