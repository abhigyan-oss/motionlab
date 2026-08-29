import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageTransition from "../components/PageTransition";
import "./Layout.css";

const initialItems = [
  { id: 1, title: "Design", icon: "✦" },
  { id: 2, title: "Develop", icon: "◈" },
  { id: 3, title: "Animate", icon: "✧" },
  { id: 4, title: "Deploy", icon: "◆" },
];

function Layout() {
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState(1);

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const addItem = () => {
    const nextId =
      items.length > 0
        ? Math.max(...items.map((item) => item.id)) + 1
        : 1;

    const names = ["Create", "Build", "Launch", "Scale"];

    setItems([
      ...items,
      {
        id: nextId,
        title: names[(nextId - 1) % names.length],
        icon: "●",
      },
    ]);
  };

  const resetItems = () => {
    setItems(initialItems);
    setSelected(1);
  };

  return (
    <PageTransition>
      <main className="layout-page">
        <section className="layout-hero">
          <div className="page-label">05 / LAYOUT</div>

          <h1>
            Layout <span>Animations</span>
          </h1>

          <p>
            Animate between layout changes and create smooth,
            responsive interfaces with Motion.
          </p>
        </section>

        <section className="layout-playground">
          <div className="playground-header">
            <div>
              <span className="small-label">
                LAYOUT TRANSITIONS
              </span>
              <h2>Rearrange the interface</h2>
            </div>

            <div className="layout-actions">
              <button onClick={addItem}>+ Add card</button>
              <button onClick={resetItems}>Reset</button>
            </div>
          </div>

          <motion.div layout className="layout-grid">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className={`layout-card ${
                    selected === item.id ? "selected" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  onClick={() => setSelected(item.id)}
                  whileHover={{ y: -6 }}
                >
                  <motion.div
                    layoutId={`icon-${item.id}`}
                    className="card-icon"
                  >
                    {item.icon}
                  </motion.div>

                  <div className="card-content">
                    <span>0{item.id}</span>
                    <h3>{item.title}</h3>
                  </div>

                  <button
                    className="remove-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      removeItem(item.id);
                    }}
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="selected-section">
          <div className="selected-content">
            <span className="small-label">
              ACTIVE ELEMENT
            </span>

            <h2>
              {items.find((item) => item.id === selected)?.title ||
                "Select a card"}
            </h2>

            <p>
              Click different cards to change the active element.
              Motion automatically animates the layout transition.
            </p>
          </div>

          <motion.div
            className="selected-orb"
            layout
            animate={{
              scale: selected ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.div
              layoutId={`icon-${selected}`}
              className="orb-inner"
            >
              ✦
            </motion.div>
          </motion.div>
        </section>

        <section className="code-panel">
          <div className="code-header">
            <span>Layout Configuration</span>
            <span className="typescript">TypeScript</span>
          </div>

          <pre>
{`<motion.div
  layout
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 30
  }}
/>

<AnimatePresence>
  {items.map((item) => (
    <motion.div layout key={item.id}>
      {item.title}
    </motion.div>
  ))}
</AnimatePresence>`}
          </pre>
        </section>
      </main>
    </PageTransition>
  );
}

export default Layout;