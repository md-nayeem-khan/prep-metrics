import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInFromTop: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const cardHover: Variants = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: {
    scale: 1,
    y: -4,
    boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.2), 0 10px 10px -5px rgba(124, 58, 237, 0.1)",
  },
};

export const cardHoverTilt: Variants = {
  rest: { 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.05,
    rotateX: 5,
    rotateY: 10,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
  },
  pressed: {
    scale: 0.95,
  },
};

export const shimmer: Variants = {
  shimmer: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.2,
    },
  }),
};

export const progressRing: Variants = {
  hidden: { pathLength: 0 },
  visible: (progress: number) => ({
    pathLength: progress / 100,
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3,
    },
  }),
};

export const countUp = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const numberCountUp = (value: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const pulseGlow: Variants = {
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(168, 85, 247, 0.4)",
      "0 0 0 15px rgba(168, 85, 247, 0)",
      "0 0 0 0 rgba(168, 85, 247, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glowPulse: Variants = {
  glow: {
    boxShadow: [
      "0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.1)",
      "0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.2)",
      "0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.1)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const floatAnimation: Variants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const spinnerRotate: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// New Premium Animations

export const springBounce: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  },
};

export const elasticScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  pressed: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 20,
    },
  },
};

export const magneticHover: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    x: 0,
    y: 0,
  },
};

export const slideUpFadeIn: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const slideDownFadeOut: Variants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: {
    opacity: 0,
    y: -60,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const successPop: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.6,
    },
  },
};

export const rippleEffect: Variants = {
  tap: {
    scale: [1, 1.2, 1],
  },
};

export const flipCard: Variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};

export const typewriter: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
  },
};

export const breathe: Variants = {
  breathe: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const wobble: Variants = {
  wobble: {
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export const confetti: Variants = {
  hidden: { opacity: 0, scale: 0, y: -50 },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1, 0.3],
    y: [0, -100, -200, -300],
    rotate: [0, 360],
  },
};

export const slideFromSides: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const morphingCard: Variants = {
  rest: {
    borderRadius: "12px",
    scale: 1,
  },
  hover: {
    borderRadius: "24px",
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const liquidFill: Variants = {
  empty: { scaleY: 0 },
  filling: (percentage: number) => ({
    scaleY: percentage / 100,
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  }),
};

// Gesture Animations
export const swipeableCard: Variants = {
  rest: { x: 0, rotate: 0, scale: 1 },
  dragging: { scale: 1.05, rotate: 5 },
  swiped: {
    x: 1000,
    rotate: 30,
    opacity: 0,
  },
};

// Loading States
export const skeletonPulse: Variants = {
  pulse: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const loadingDots: Variants = {
  loading: (i: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.2,
      ease: "easeInOut",
    },
  }),
};

// Achievement Animations
export const achievementBadge: Variants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    rotate: [0, 10, 0],
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      times: [0, 0.6, 1],
    },
  },
};

export const streakFlame: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
  },
  burning: {
    scale: [1, 1.1, 1.05, 1.1, 1],
    rotate: [-2, 2, -1, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const goalCelebration: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.5, 1.2, 1],
    opacity: [0, 1, 1, 1],
    transition: {
      duration: 1,
      ease: "easeOut",
      times: [0, 0.3, 0.7, 1],
    },
  },
};

// Premium Card Effects
export const glassMorphism: Variants = {
  rest: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.1)",
  },
  hover: {
    backdropFilter: "blur(15px)",
    background: "rgba(255, 255, 255, 0.15)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const gradientShift: Variants = {
  rest: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Missing animation variants for components
export const buttonRipple: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

export const inputFocus: Variants = {
  unfocused: {
    borderColor: "rgba(124, 58, 237, 0)",
    boxShadow: "0 0 0 0 rgba(124, 58, 237, 0)",
    transition: { duration: 0.2 },
  },
  focused: {
    borderColor: "rgba(124, 58, 237, 1)",
    boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const tooltipEnhanced: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.15 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};
