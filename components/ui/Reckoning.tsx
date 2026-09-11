"use client";

import { motion } from "framer-motion";
import { useHouse } from "@/components/HouseProvider";
import { useLedger } from "@/components/LedgerProvider";
import { TRIALS } from "@/lib/trials";
import { EASE } from "@/lib/motion";

/**
 * Beat 20: the page hands the reader's instinct back to them, with evidence.
 *
 * This is the only reason the trials exist. Before them the closing question
 * was rhetorical — the page asked "are you really X?" while knowing nothing.
 * Now it knows: the house was picked in the first seconds on instinct, the
 * four trials recorded how the reader actually behaved, and the gap between
 * them is the thing worth pressing a button about.
 *
 * Three endings, and the strongest is the contradiction. It is also the one
 * that must be worded carefully: the reader is not being caught out. Acting
 * unlike the house you feel drawn to is the ordinary human case, not a
 * failure, and the copy says so.
 */
export default function Reckoning() {
  const { house } = useHouse();
  const { behaved, answered, tally } = useLedger();

  // Nothing to reckon with until there is both an instinct and a road behind
  // it. Half a ledger would let the page make a claim it cannot support.
  if (!house || answered < TRIALS.length) return null;

  const matched = tally.find((t) => t.house.id === house.id)?.count ?? 0;
  // Houses sharing the highest count, used when no single one led.
  const topCount = tally[0]?.count ?? 0;
  const tied = tally.filter((t) => t.count === topCount && t.count > 0);

  const verdict =
    matched >= 2
      ? {
          line: "სისხლი არ მოგატყუა.",
          note: `ოთხიდან ${matched}-ჯერ ზუსტად ისე მოიქეცი, როგორც ${house.name}. ქვიზი ამას გაამყარებს.`,
        }
      : matched === 1
        ? {
            line: "ინსტინქტმა ერთი თქვა, ხელმა — სხვა.",
            note: "ეს ჩვეულებრივია. ადამიანების უმეტესობა ერთ სახლს გრძნობს და მეორესავით იქცევა.",
          }
        : behaved
        ? {
            line: `გზაზე ${behaved.name} იყავი.`,
            note: `${house.name} აირჩიე — და ოთხივე გადაწყვეტილება სხვა სახლისა იყო. ეს არ არის შეცდომა; ეს კითხვაა.`,
          }
        : {
            /*
             * No single house led, which given the trial pairings can only
             * mean two of them tied on two each — each pair of trials offers
             * the same two houses, so a reader who matched their own house
             * zero times has necessarily handed two apiece to two others.
             * Saying "you repeated no house" here, as this once did, is
             * simply false: they repeated two.
             */
            line: `გზაზე ${tied.map((t) => t.house.name).join(" და ")} შორის იყავი.`,
            note: `${house.name} აირჩიე, მაგრამ ხელი ორჯერ ერთისკენ წავიდა და ორჯერ მეორისკენ. არჩევანი ერთია — ხასიათი ორი.`,
          };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="mx-auto mt-16 max-w-3xl border-t pt-10"
      style={{ borderColor: "color-mix(in srgb, var(--house-ink, #0E0E0E) 25%, transparent)" }}
    >
      <p className="label opacity-55">გზის ანგარიში</p>

      {/* The four trials, each showing which way it went */}
      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
        {TRIALS.map((t) => (
          <li key={t.id}>
            <p className="label text-[10px] opacity-45">{t.title}</p>
            <p className="mt-1 font-display text-[15px] leading-tight">
              <TrialTaken trialId={t.id} />
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-display text-[clamp(1.4rem,3.4vw,2.4rem)] leading-[1.15]">
        {verdict.line}
      </p>
      <p className="mt-4 max-w-[52ch] font-body text-[14px] leading-[1.8] opacity-80 sm:text-[15px]">
        {verdict.note}
      </p>
    </motion.div>
  );
}

/** The house whose road the reader took at one trial. */
function TrialTaken({ trialId }: { trialId: string }) {
  const { ledger } = useLedger();
  const trial = TRIALS.find((t) => t.id === trialId);
  const option = trial?.options.find((o) => o.house === ledger[trialId]);
  return <>{option?.label ?? "—"}</>;
}
