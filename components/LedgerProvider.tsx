"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TRIALS } from "@/lib/trials";
import { HOUSES, type House } from "@/lib/houses";

const STORAGE_KEY = "tbc-legend:ledger";

/** trial id → the house whose way the reader took */
type Ledger = Record<string, string>;

type Ctx = {
  ledger: Ledger;
  record: (trialId: string, house: string) => void;
  /** Undo one trial, so the reader can take the other road */
  unrecord: (trialId: string) => void;
  reset: () => void;
  /** How many of the four trials have been answered */
  answered: number;
  /** Houses ranked by how often the reader actually acted like them */
  tally: { house: House; count: number }[];
  /** The house the reader behaved most like, or null on a tie or no data */
  behaved: House | null;
};

const LedgerCtx = createContext<Ctx>({
  ledger: {},
  record: () => {},
  unrecord: () => {},
  reset: () => {},
  answered: 0,
  tally: [],
  behaved: null,
});

export const useLedger = () => useContext(LedgerCtx);

/**
 * What the reader actually did on the road.
 *
 * The choice at beat 01 is instinct; this is behaviour. The ending sets one
 * against the other, which is the only way the page can ask "are you really
 * X?" and have an answer rather than just repeating the question.
 *
 * Deliberately only a record. It gates nothing, unlocks nothing and shows no
 * score while the reader is travelling — a visible tally would turn four
 * story beats into a quiz, which is exactly what the actual quiz is for.
 */
export default function LedgerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ledger, setLedger] = useState<Ledger>({});

  // Read after mount, never during render: the server has no localStorage and
  // touching it while rendering mismatches the hydration.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return;
      // Keep only entries this build still recognises, so a stored ledger from
      // an older trial set cannot skew the tally with beats that no longer run.
      const valid: Ledger = {};
      for (const t of TRIALS) {
        const v = (parsed as Ledger)[t.id];
        if (typeof v === "string" && t.options.some((o) => o.house === v))
          valid[t.id] = v;
      }
      setLedger(valid);
    } catch {
      // Private mode, disabled storage, or malformed JSON. The road still works.
    }
  }, []);

  const persist = useCallback((next: Ledger) => {
    setLedger(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Not remembering is not a reason to refuse the choice.
    }
  }, []);

  const record = useCallback(
    (trialId: string, house: string) => {
      setLedger((prev) => {
        const next = { ...prev, [trialId]: house };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* see above */
        }
        return next;
      });
    },
    [],
  );

  const unrecord = useCallback((trialId: string) => {
    setLedger((prev) => {
      // Delete the key rather than writing an empty value: the tally counts
      // entries, and a blank one would read as an answered trial.
      const next = { ...prev };
      delete next[trialId];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* see above */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => persist({}), [persist]);

  const { tally, behaved, answered } = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of TRIALS) {
      const h = ledger[t.id];
      if (h) counts.set(h, (counts.get(h) ?? 0) + 1);
    }
    const ranked = HOUSES.map((house) => ({
      house,
      count: counts.get(house.id) ?? 0,
    })).sort((a, b) => b.count - a.count);

    // A tie at the top is not a result. Saying "you behaved like Dovlatia"
    // when the reader split evenly between two houses would be a claim the
    // data does not support.
    const top = ranked[0];
    const tied = ranked.filter((r) => r.count === top.count).length > 1;

    return {
      tally: ranked,
      behaved: top.count > 0 && !tied ? top.house : null,
      answered: TRIALS.filter((t) => Boolean(ledger[t.id])).length,
    };
  }, [ledger]);

  const value = useMemo(
    () => ({ ledger, record, unrecord, reset, answered, tally, behaved }),
    [ledger, record, unrecord, reset, answered, tally, behaved],
  );

  return <LedgerCtx.Provider value={value}>{children}</LedgerCtx.Provider>;
}
