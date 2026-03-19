import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How far it drags (pixels)
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  strength = 15,
  onClick,
  href,
  target,
  rel
}) => {
  const ref = useRef<HTMLElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25, mass: 1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Map bounds to pixel drag distance
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Limit distance visually based on strength (simple linear pull)
    // The further from center, the stronger the pull, up to `strength` px.
    const pullX = (distanceX / (rect.width / 2)) * strength;
    const pullY = (distanceY / (rect.height / 2)) * strength;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const attributes = {
    ref: ref as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY },
    className,
    onClick,
    whileTap: { scale: 0.95 },
  };

  // Render anchor if href exists, else button
  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...attributes}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...attributes}>
      {children}
    </motion.button>
  );
};
