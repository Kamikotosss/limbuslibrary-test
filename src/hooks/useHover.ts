import { useState, useEffect , RefObject} from 'react';

export default function useHover<T extends HTMLElement>(ref: RefObject<T>) {
  const [isHovering, setHovering] = useState(false);

  const on = () => {
    setHovering(true);
    console.log("hovering")
  };

  const off = () => {
    setHovering(false);
    console.log("stop hovering")

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

  return isHovering;
}
