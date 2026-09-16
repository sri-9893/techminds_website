'use client';

import { useInView, useReducedMotion, animate } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to, from = 0, direction = 'up', delay = 0, duration = 2,
  className = '', startWhen = true, separator = '', onStart = undefined, onEnd = undefined,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const target = direction === 'down' ? from : to;
  const start = direction === 'down' ? to : from;
  const decimals = Math.max(...[from, to].map(value => (String(value).split('.')[1] || '').length));
  const format = useCallback(value => {
    const formatted = new Intl.NumberFormat('en-US', {
      useGrouping: !!separator, minimumFractionDigits: decimals, maximumFractionDigits: decimals,
    }).format(value);
    return separator ? formatted.replace(/,/g, separator) : formatted;
  }, [decimals, separator]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = format(reduceMotion ? target : start);
    if (!inView || !startWhen) return;
    if (reduceMotion) { ref.current.textContent = format(target); return; }
    const controls = animate(start, target, {
      duration: Number.isFinite(duration) && duration > 0 ? duration : 2,
      delay, ease: 'easeOut',
      onPlay: () => onStart?.(),
      onUpdate: value => { if (ref.current) ref.current.textContent = format(value); },
      onComplete: () => onEnd?.(),
    });
    return () => controls.stop();
  }, [inView, startWhen, reduceMotion, start, target, duration, delay, format, onStart, onEnd]);

  return <span className={className} aria-label={format(target)}><span aria-hidden="true" ref={ref}>{format(target)}</span></span>;
}
