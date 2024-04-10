import React, { useEffect, useRef } from "react";

interface IntersectionObserverProps {
  children?: React.ReactNode;
  onIntersect: () => void;
}

const OnIntersect: React.FC<IntersectionObserverProps> = ({
  children,
  onIntersect,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = targetRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          onIntersect();
        }
      },
      { threshold: 1 }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [onIntersect]);

  return <div ref={targetRef}>{children}</div>;
};

export default OnIntersect;
