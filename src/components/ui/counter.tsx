"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";

interface CounterProps {
  end: number;
  suffix?: string;
  trigger?: boolean;
}

export function Counter({ end, suffix = "", trigger = true }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.1);

  useEffect(() => {
    if (!inView || !trigger) {
      return;
    }

    let start = 0;
    const duration = 1000; // Fast 1 second duration
    const step = 4; // Ultra-fast 4ms refresh rate
    const increment = end / (duration / step);
    
    const timer = setInterval(() => {
      start += increment;
      
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, end, trigger]);

  return (
    <span ref={ref} className="tabular-nums">
      {(trigger ? count : 0).toLocaleString()}
      {suffix}
    </span>
  );
}
