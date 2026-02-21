/**
 * Copyright (c) 2026. All rights reserved.
 * Custom hook to detect if the current viewport is mobile.
 */

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

/**
 * Hook that returns true if the screen width is below the mobile breakpoint.
 */
export function useIsMobile() {
    // Initializing with the current match avoids an unnecessary re-render cycle
    const [isMobile, setIsMobile] = useState<boolean>(() => 
        typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
    );

    useEffect(() => {
        const mql = window.matchMedia(MOBILE_QUERY);
        
        const onChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        mql.addEventListener("change", onChange);
        
        // Sync state in case it changed between initialization and effect
        setIsMobile(mql.matches);

        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}