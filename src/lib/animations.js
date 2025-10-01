// Animation variants and utilities for Framer Motion
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -30,
  },
};

export const slideInRight = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 30,
  },
};

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

// Page transition variants
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Card hover animations
export const cardHover = {
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
  },
};

// Button animations
export const buttonTap = {
  whileTap: {
    scale: 0.95,
  },
  whileHover: {
    scale: 1.05,
  },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17,
  },
};

// Loading animations
export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Smooth transition settings
export const smoothTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const quickTransition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

export const slowTransition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

// Utility function to create staggered animations
export const createStaggerVariants = (staggerDelay = 0.1, childDelay = 0) => ({
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  },
  item: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: smoothTransition,
    },
  },
});
