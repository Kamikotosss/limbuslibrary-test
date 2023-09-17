import { useEffect, useState } from 'react';

interface ThrottleOptions {
  callback: (value: string) => void; // Обновленный тип для callback
  delay: number;
}

function useThrottling({ callback, delay }: ThrottleOptions) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      callback('');
    }, delay);

    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
  }, [callback, delay, timer]);

  return setTimer;
}

export default useThrottling;
