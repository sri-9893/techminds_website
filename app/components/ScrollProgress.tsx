'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const reduceMotion = useReducedMotion();
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }} />;
}
