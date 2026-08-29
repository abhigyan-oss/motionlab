import { motion } from "motion/react";
import PageTransition from "../components/PageTransition";
import "./Scroll.css";

const cards = [
  {
    number: "01",
    title: "Fade In",
    description: "Elements smoothly appear as they enter the viewport.",
    type: "fade",
  },
  {
    number: "02",
    title: "Slide Up",
    description: "Cards move upward with a smooth spring transition.",
    type: "slide",
  },
  {
    number: "03",
    title: "Scale",
    description: "Elements grow naturally as they become visible.",
    type: "scale",
  },
  {
    number: "04",
    title: "Rotate",
    description: "Cards rotate into position while scrolling.",
    type: "rotate",
  },
  {
    number: "05",
    title: "Stagger",
    description: "Multiple elements enter the screen one after another.",
    type: "stagger",
  },
];

function Scroll() {
  return (
    <PageTransition>
      <main className="scroll-page">
        <section className="scroll-hero">
          <div className="section-number">03 / SCROLL</div>

          <h1>
            Scroll <span>Animations</span>
          </h1>

          <p>
            Explore animations that respond naturally as elements enter
            the viewport.
          </p>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              ↓
            </motion.div>
          </div>
        </section>

        <section className="scroll-demo">
          {cards.map((card, index) => (
            <motion.div
              key={card.number}
              className={`scroll-card ${card.type}`}
              initial={
                card.type === "fade"
                  ? { opacity: 0 }
                  : card.type === "slide"
                  ? { opacity: 0, y: 100 }
                  : card.type === "scale"
                  ? { opacity: 0, scale: 0.6 }
                  : card.type === "rotate"
                  ? { opacity: 0, rotate: -12, y: 60 }
                  : { opacity: 0, y: 80 }
              }
              whileInView={
                card.type === "fade"
                  ? { opacity: 1 }
                  : card.type === "slide"
                  ? { opacity: 1, y: 0 }
                  : card.type === "scale"
                  ? { opacity: 1, scale: 1 }
                  : card.type === "rotate"
                  ? { opacity: 1, rotate: 0, y: 0 }
                  : { opacity: 1, y: 0 }
              }
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                duration: 0.8,
                delay: card.type === "stagger" ? index * 0.12 : 0,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <div className="card-number">{card.number}</div>

              <div className="card-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>

              <div className="card-arrow">↗</div>
            </motion.div>
          ))}
        </section>

        <section className="scroll-info">
          <div className="info-label">MOTION CONFIGURATION</div>

          <div className="code-window">
            <div className="code-header">
              <span>Scroll.tsx</span>
              <span>TypeScript</span>
            </div>

            <pre>
{`<motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 15
  }}
/>`}
            </pre>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

export default Scroll;