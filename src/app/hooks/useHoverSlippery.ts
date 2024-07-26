import { useState, useRef, useEffect, useCallback } from 'react';

export interface HoverSlipperyOptions {
  speed?: number;
}

export const useHoverSlippery = (options: HoverSlipperyOptions) => {
  const [activeElement, setActiveElement] = useState<HTMLLIElement | HTMLButtonElement | null>(null);
  const slipperyRef = useRef<HTMLLIElement | HTMLButtonElement>(null);
  const elementsRef = useRef<HTMLLIElement[] | HTMLButtonElement[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (activeElement && slipperyRef.current) {
        const activeRect = activeElement.getBoundingClientRect();
        const parentRect = activeElement.parentElement!.getBoundingClientRect();

        slipperyRef.current.style.width = `${activeRect.width}px`;
        slipperyRef.current.style.left = `${activeRect.left - parentRect.left}px`;
      }
    }, 0);
  }, [activeElement, slipperyRef]);

  const handleMouseEnter = useCallback((_el: any, key: string | number) => {
    const target = elementsRef.current[key];
    if (slipperyRef.current) {
      const rect = target.getBoundingClientRect();

      slipperyRef.current.style.transition = `left ${options.speed}ms, width ${options.speed}ms`;
      slipperyRef.current.style.width = `${rect.width}px`;
      slipperyRef.current.style.left = `${rect.left - target.parentElement!.getBoundingClientRect().left}px`;
    }
  }, [elementsRef, slipperyRef]);

  const handleMouseLeave = useCallback(() => {
    if (activeElement && slipperyRef.current) {
      const rect = activeElement.getBoundingClientRect();
      slipperyRef.current.style.width = `${rect.width}px`;
      slipperyRef.current.style.left = `${rect.left - activeElement.parentElement!.getBoundingClientRect().left}px`;
    }
  }, [activeElement, slipperyRef]);

  const onSetRefElement = useCallback((el: HTMLLIElement | HTMLButtonElement, key: string) => {
    elementsRef.current[key] = el;
  }, [elementsRef]);

  return { slipperyRef, setActiveElement, handleMouseEnter, handleMouseLeave, addElementRef: onSetRefElement, elementsRef };
};
