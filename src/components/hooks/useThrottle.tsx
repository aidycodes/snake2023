import { useEffect, useRef, useState } from "react";

const useThrottle = (value: string, limit: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setInterval(function() {
      if (Date.now() - lastRan.current >= limit) {
        
        setThrottledValue(value);
        lastRan.current = Date.now();
        return throttledValue
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearInterval(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle