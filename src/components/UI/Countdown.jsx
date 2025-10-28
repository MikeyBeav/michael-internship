import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate, className = "de_countdown" }) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return "";
    
    const expiry = new Date(expiryDate).getTime();
    const timeDiff = expiry - currentTime;
    
    if (timeDiff <= 0) return "Expired";
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return "";
    }
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownText = formatCountdown(expiryDate);

  if (!countdownText) return null;

  return <div className={className}>{countdownText}</div>;
};

export default Countdown;
