import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const AnimatedPage = ({ children, loadingComponent }) => {
  const [loading, setLoading] = useState(true);  // State to control loading display

  useEffect(() => {
    // Set a timeout to hide the loading screen and show the main content after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);  // Set this to the total delay before content appears

    return () => clearTimeout(timer);  // Cleanup the timer
  }, []);

  const fadeInVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,  // Half a second fade-in
        delay: 0.3       // Delay before the animation starts
      }
    }
  };

  return (
    <>
      {loading && loadingComponent}
      {!loading && (
        <motion.div
          className="page-container"
          variants={fadeInVariants}
          initial="initial"
          animate="in"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
