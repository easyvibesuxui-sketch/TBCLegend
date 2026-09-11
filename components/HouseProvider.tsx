"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HOUSES, type House } from "@/lib/houses";

const STORAGE_KEY = "tbc-legend:house";

/** The signal red the page wears before a house has been chosen, and the ink that reads on it. */
const UNCHOSEN = "#CF2A20";
const UNCHOSEN_INK = "#0E0E0E";
/** That same signal red, lifted to read on the night grounds (4.52:1). */
const UNCHOSEN_NIGHT = "#E35249";

type Ctx = {
  house: House | null;
  choose: (id: string) => void;
  clear: () => void;
};

const HouseCtx = createContext<Ctx>({
  house: null,
  choose: () => {},
  clear: () => {},
});

export const useHouse = () => useContext(HouseCtx);

/**
 * Holds which house the reader picked, and threads its colour through the
 * page.
 *
 * The accent reaches the rest of the site as a CSS custom property on <html>
 * rather than through props: the sections that wear it — the nav button, the
 * progress ticks, the closing call — are nowhere near this component in the
 * tree, and a class name cannot carry a colour that is only known at runtime.
 * `data-house` rides along for anything that needs to style per house rather
 * than per colour.
 */
export default function HouseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setId] = useState<string | null>(null);

  // Read the stored choice after mount, never during render: the server has no
  // localStorage, so touching it while rendering mismatches the hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && HOUSES.some((h) => h.id === saved)) setId(saved);
    } catch {
      // Private mode, or storage disabled. The page works unchosen.
    }
  }, []);

  const house = useMemo(
    () => HOUSES.find((h) => h.id === id) ?? null,
    [id],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--house", house?.accent ?? UNCHOSEN);
    root.style.setProperty("--house-ink", house?.onAccent ?? UNCHOSEN_INK);
    // The same mark, lifted to read on the page's night grounds. Anything
    // drawn on #1C1C1C must use this rather than --house: two of the four
    // accents are dark enough to vanish there.
    root.style.setProperty("--house-night", house?.accentOnDark ?? UNCHOSEN_NIGHT);
    if (house) root.dataset.house = house.id;
    else delete root.dataset.house;
  }, [house]);

  const choose = useCallback((next: string) => {
    setId(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not being able to remember the choice is not a reason to refuse it.
    }
  }, []);

  const clear = useCallback(() => {
    setId(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* see above */
    }
  }, []);

  const value = useMemo(() => ({ house, choose, clear }), [house, choose, clear]);

  return <HouseCtx.Provider value={value}>{children}</HouseCtx.Provider>;
}
