"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";

export function useGameMessageListener() {  

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const user = useUserStore.getState().user;
      const setUserSession = useUserStore.getState().setUserSession;

      const data = event.data;
      if (!data || typeof data !== "object") return;
      
      if (data.type === "BALANCE_UPDATE") {
        const balance = data.payload?.balance;
        if (typeof balance === "number" && user) {
          setUserSession({...user, point: balance});
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
