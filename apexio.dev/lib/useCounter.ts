import { useCallback, useEffect, useState } from "react";

export default function useCounter(): [
  number,
  boolean,
  () => void,
  () => void
] {
  const [count, setCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(true);
  const increase = useCallback(() => {
    setCount((n) => n + 1);
    fetch("/api/counter/increase").catch((e) => {
      console.error(e);
      localStorage.setItem("count", count);
    });
  }, []);
  const decrease = useCallback(() => {
    setCount((n) => n - 1);
    fetch("/api/counter/decrease").catch((e) => {
      console.error(e);
      localStorage.setItem("count", count);
    });
  }, []);

  useEffect(() => {
    fetch("/api/counter")
      .then((resp) => resp.json().catch(() => ({})))
      .then(({ count }) => {
        if (typeof count === "number" && !Number.isNaN(count)) {
          setCount(count);
        }
      })
      .catch((e) => {
        console.error(e);
        setCount(parseInt(localStorage.getItem("count") || "0"));
      })
      .finally(() => {
        setIsSyncing(false);
      });
  }, []);

  return [count, isSyncing, increase, decrease];
}
