import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButterflySVG from "../../assets/bf.svg";

const ButterflyGuide = ({ stage, userName }) => {
  const [dialogue, setDialogue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dialogues = {
    0: "Hello, traveler! 🦋 I'm your guide through this journey. Shall we begin?",
    1: `What shall I call you, dear friend?`,
    2: `Wonderful${userName ? `, ${userName}` : ""}! Every journey begins somewhere. Let me show you where mine took flight...`,
    3: `Through my travels, I've helped many gardens grow, ${userName || "dear friend"}. Come, let me show you the landscapes I've explored...`,
    4: `But the real magic happens when ideas take flight! These are the creations born from those adventures...`,
    5: `You've walked this journey with me${userName ? `, ${userName}` : ""}. Now, would you like to explore freely?`,
  };

  useEffect(() => {
    setDialogue(dialogues[stage] || "");
    setIsVisible(true);

    if (stage > 1) {
      const timer = setTimeout(() => setIsVisible(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [stage, userName]);

  // subtle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && dialogue && (
        <>
          {/* Butterfly */}
          <motion.div
            className="fixed top-20 right-20 z-50"
            initial={{ opacity: 0, y: -40, scale: 0.6, rotate: -180 }}
            animate={{
              opacity: 1,
              x: position.x,
              y: position.y,
              scale: 1,
              rotate: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <motion.img
              src={ButterflySVG}
              alt="butterfly guide"
              className="w-28 h-28 drop-shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Dialogue bubble */}
          <motion.div
            className="fixed top-35 right-35 z-40 max-w-sm"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl px-6 py-4 text-gray-800 border border-white/40">
              <TypewriterText text={dialogue} speed={30} />
            </div>

            {/* bubble tail */}
            <div className="w-4 h-4 bg-white/70 rotate-45 ml-8 -mt-2 backdrop-blur-lg"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const TypewriterText = ({ text, speed = 40 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [text]);

  return <span className="text-sm leading-relaxed">{displayText}</span>;
};

export default ButterflyGuide;
