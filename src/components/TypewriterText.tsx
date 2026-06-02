import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ text, delay = 0, className = "" }: TypewriterTextProps) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { 
      opacity: 0,
      filter: "blur(4px)",
      y: 10
    },
    visible: { 
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4
      }
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      key={text}
    >
      {characters.map((char, index) => (
        <motion.span 
          key={`${text}-${index}`} 
          variants={child}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypewriterText;
