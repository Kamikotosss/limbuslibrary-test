import { useState, useEffect, RefObject } from 'react';

export default function useControlledHover<T extends HTMLElement>(ref: RefObject<T>) {
  const [isHovering, setHovering] = useState(false);

  const on = () => {
    setHovering(true);
  };

  const off = () => {
    setHovering(false);
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;
    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    };
  }, [ref.current]);

  // Возвращаем isHovering, on и off из хука
  return [isHovering, on, off] as const;
}
