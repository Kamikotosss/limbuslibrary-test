import React, { useCallback, useEffect, useState } from "react";
type TTouch = { isStarted:boolean , startX:number , currentX:number};
export const useTouchSwipe = (threshold:number) =>{
    const [touch, setTouch] = useState<TTouch>({ isStarted: false, startX: 0, currentX: 0 });

    const onTouchStart = useCallback((e: TouchEvent) => {
        if (touch.isStarted) return;
        setTouch(prevTouch => ({
            ...prevTouch,
            isStarted: true,
            startX: e.touches[0].clientX
        }));
    }, [touch]);
    
    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!touch.isStarted) return;
        setTouch(prevTouch => ({
            ...prevTouch,
            currentX: e.touches[0].clientX
        }));
    }, [touch]);
    
    const onTouchEnd = useCallback(() => {
        if (!touch.isStarted) return;
        if (touch.currentX - touch.startX > 50) {
            setTouch({ isStarted: false, startX: 0, currentX: 0 });
        }
    }, [touch]);
    
    useEffect(() => {
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
    
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        }
    }, [onTouchStart, onTouchMove, onTouchEnd]);

    return [ touch.currentX-touch.startX , touch.isStarted]
}