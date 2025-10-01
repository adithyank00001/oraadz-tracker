import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";

export function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
