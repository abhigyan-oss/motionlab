import { motion } from "motion/react";
import { useRef, useState } from "react";
import PageTransition from "../components/PageTransition";
import "./Spring.css";

function Spring() {
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [key, setKey] = useState(0);

  const playgroundRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setStiffness(100);
    setDamping(10);
    setMass(1);
    setKey((prev) => prev + 1);
  };

  return (
    <PageTransition>
      <main className="spring-page">
        <section className="spring-hero">
          <div className="spring-label">04 / PHYSICS</div>

          <h1>
            Spring <span>Physics</span>
          </h1>

          <p>
            Experiment with stiffness, damping and mass to understand
            how spring-based motion behaves.
          </p>
        </section>

        <section
          className="spring-playground"
          ref={playgroundRef}
        >
          <div className="playground-label">
            DRAG THE OBJECT
          </div>

          <motion.div
            key={key}
            className="spring-object"
            drag
            dragConstraints={playgroundRef}
            dragElastic={0.25}
            whileDrag={{
              scale: 1.15,
              cursor: "grabbing",
            }}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness,
              damping,
              mass,
            }}
          >
            <span>SPRING</span>
            <small>DRAG ME</small>
          </motion.div>
        </section>

        <section className="physics-panel">
          <div className="physics-heading">
            <div>
              <span>SPRING PHYSICS</span>
              <h2>Control the motion</h2>
            </div>

            <button onClick={reset}>Reset</button>
          </div>

          <div className="physics-controls">
            <div className="physics-control">
              <div className="control-top">
                <strong>Stiffness</strong>
                <b>{stiffness}</b>
              </div>

              <input
                type="range"
                min="20"
                max="300"
                value={stiffness}
                onChange={(e) =>
                  setStiffness(Number(e.target.value))
                }
              />

              <p>
                Controls how strongly the object moves toward its
                target.
              </p>
            </div>

            <div className="physics-control">
              <div className="control-top">
                <strong>Damping</strong>
                <b>{damping}</b>
              </div>

              <input
                type="range"
                min="1"
                max="40"
                value={damping}
                onChange={(e) =>
                  setDamping(Number(e.target.value))
                }
              />

              <p>
                Controls how much the spring resists bouncing.
              </p>
            </div>

            <div className="physics-control">
              <div className="control-top">
                <strong>Mass</strong>
                <b>{mass.toFixed(1)}</b>
              </div>

              <input
                type="range"
                min="0.2"
                max="5"
                step="0.1"
                value={mass}
                onChange={(e) =>
                  setMass(Number(e.target.value))
                }
              />

              <p>
                Controls the weight and momentum of the object.
              </p>
            </div>
          </div>
        </section>

        <section className="physics-explanation">
          <div className="explanation-card">
            <span>01</span>
            <h3>Stiffness</h3>
            <p>
              Higher stiffness makes the object react faster and
              snap toward its destination.
            </p>
          </div>

          <div className="explanation-card">
            <span>02</span>
            <h3>Damping</h3>
            <p>
              Higher damping reduces the amount of bounce and
              overshoot in the animation.
            </p>
          </div>

          <div className="explanation-card">
            <span>03</span>
            <h3>Mass</h3>
            <p>
              Increasing mass makes the object feel heavier and
              slower to respond.
            </p>
          </div>
        </section>

        <section className="spring-code">
          <div className="code-title">
            <span>SPRING CONFIGURATION</span>
            <b>TypeScript</b>
          </div>

          <pre>
{`transition={{
  type: "spring",
  stiffness: ${stiffness},
  damping: ${damping},
  mass: ${mass}
}}`}
          </pre>
        </section>
      </main>
    </PageTransition>
  );
}

export default Spring;