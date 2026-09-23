import type { Dict } from "@/lib/i18n";

/**
 * The page in English.
 *
 * Translated as prose, not word-for-word. The Georgian is deliberately terse —
 * short declaratives, second person, no ornament — and a literal rendering
 * turns that into something stilted, so the English matches the register
 * rather than the word order. Where a line is a beat of story it is written
 * as a line of story.
 *
 * TBC's own seven paragraphs are the campaign's copy, not mine; they are
 * translated plainly and kept intact, since the point of the piece is that
 * the design serves that text rather than replacing it.
 */
export const en: Dict = {
  code: "en",
  other: { code: "ka", label: "KA", title: "ქართულად ნახვა" },

  meta: {
    title: "Treasure Marathon | საგანძურის მარათონი",
    description:
      "The ancient treasure of a fairytale kingdom shattered into millions of gold coins. Four great houses set out to find them — which house do you belong to?",
    ogTitle: "Treasure Marathon",
    ogDescription:
      "Four houses, millions of gold coins and one legend. Take the financial quiz and find out which house you belong to.",
  },

  nav: {
    brand1: "Treasure",
    brand2: "Marathon",
    legend: "Legend",
    houses: "Houses",
    quiz: "Quiz",
  },

  hero: {
    eyebrow: "TBC · A tale of four houses",
    title1: "Treasure",
    title2: "Marathon",
    note1:
      "Unofficial design concept · the original campaign belongs to TBC Bank —",
  },

  choose: {
    beat: "01 · Blood",
    heading: "Choose your house",
    sub: "Before you take the road — choose whose blood runs in you",
    empty: "The medallion is still blank",
  },

  legend: {
    beat02: "02 · The hall",
    cloak: "The cloak on the wall is your colour",
    beat03: "03 · The balance",
    beat04: "04 · The messenger",
    messenger:
      "At midnight someone knocked. The knock came once. Beyond the door there was no one — only a letter, sealed with your own house's seal.",
    messengerLine: "The seal is yours. The hand is not.",
    beat05: "05 · Departure",
    gate: "Alone, at night",
    beat06: "06 · The treasury",
    beat07: "07 · The break",
    doubts: ["An accident", "A betrayal", "A prophecy"],
    beat09: "09 · The verdict",
    verdict1: "In the morning all four houses gathered. All four said the same thing:",
    verdictQuote: "“Not us.”",
    verdict2: "And all four thought the same thing — then who?",
    verdict3:
      "No one asked you to leave. Staying had simply stopped making sense.",
    chapters: [
      [
        "For centuries, a fairytale kingdom was ruled jointly by four great and glorious families — four houses.",
        "Peace, balance and prosperity were held by a single ancient and secret treasure, one that carried a magic of its own.",
      ],
      [
        "Then on one strange night, without warning, that treasure shattered. It broke into millions of gold coins and scattered to every far corner of the kingdom.",
        "No one knows whether it was an accident, a betrayal by an enemy, or an old prophecy coming true.",
      ],
      [
        "To restore the kingdom's balance — and to prove their own power — all four families set out after the gold.",
        "Each house has its own truth, its own doubts, and its own vision of what the kingdom should become.",
      ],
    ],
  },

  gesture: { puck1: "Hold", puck2: "and pull" },

  marathon: {
    beat10: "10 · The first coin",
    coin: "The first coin lay in the road. No one had guarded it, no one had hidden it.",
    coinCaption: "Every marathon begins this way — easily.",
    beat15: "15 · The well",
    well1:
      "You leaned over the well and saw four faces in the water. All four were you.",
    well2: ["Another house was", "never the enemy.", "It is your other option."],
    beat16: "16 · Four horizons",
    oneIsYours: "One of them is yours",
  },

  trialPanel: { otherWay: "I'd take the other road" },

  houses: {
    heading1: "Four houses",
    heading2: "One treasure",
    tagline: "Each with its own truth",
    yours: "Your house",
  },

  price: {
    beat: "17 · The price",
    heading: "Every virtue has its price",
    sub: "When you follow it all the way.",
    closing:
      "None of them is the right answer. That is precisely why it is a choice.",
  },

  ret: {
    beat: "19 · The return",
    l1: "You went back to the treasury and laid out on the stone everything you had gathered.",
    l2: "The pile is small. The treasure will not be whole again.",
    coins: (n: number, of: number) => `Coins gathered: ${n} of ${of}`,
    pileA: "But this pile is ",
    pileEm: "your road",
    pileB: " — each coin one decision, and you made every one of them.",
    big1: "The treasure was never the gold.",
    big2: "It was the rule you keep about gold.",
    caption: "No one sent the letter. The seal was yours — the hand was not.",
  },

  cta: {
    chose: (h: string) => `You chose ${h}.`,
    really: (h: string) => `Are you really ${h}?`,
    which1: "Which house",
    which2: "do you belong to?",
    strap: [
      "All four houses are competing",
      "The most coins takes the lead",
      "The kingdom's great prizes",
    ],
    body: "Now all four houses are competing to gather the most of the scattered coins, take the lead, and claim the kingdom's great prizes. Would you like to see which family is ahead, or take the financial quiz and find out which one you belong to?",
    placeholder: "[Placeholder data — the leaderboard updates in real time]",
    leaderboard: "See the leaderboard",
    quiz: "Take the quiz",
  },

  reckoning: {
    title: "The road's account",
    none: "—",
    matched: (n: number, h: string) => ({
      line: "Your blood did not lie to you.",
      note: `${n} times out of four you acted exactly as ${h} would. The quiz will confirm it.`,
    }),
    near: () => ({
      line: "Your instinct said one thing; your hand did another.",
      note: "This is ordinary. Most people feel one house and behave like another.",
    }),
    against: (behaved: string, chosen: string) => ({
      line: `On the road you were ${behaved}.`,
      note: `You chose ${chosen} — and all four decisions belonged to another house. That is not a mistake; it is a question.`,
    }),
    split: (both: string[], chosen: string) => ({
      line: `On the road you were between ${both.join(" and ")}.`,
      note: `You chose ${chosen}, but your hand went twice one way and twice the other. One choice — two characters.`,
    }),
  },

  footer: {
    brand1: "Treasure",
    brand2: "Marathon",
    concept: "Demonstration concept",
    originalLink: "The original campaign — tbcbank.ge",
    aboutTitle: "About this site",
    aboutNotReal: "This site is not real.",
    aboutA: " It is a design concept, not a working product. Only the ",
    aboutMine: "interface and the visual design are mine",
    aboutB:
      " — the campaign idea, the story and the copy belong to TBC Bank. The original “Treasure Marathon” campaign is here: ",
    nonCommercialTitle: "Non-commercial",
    nonCommercial:
      "This page is not commercial and earns nothing. No product or service is sold or offered here. The author is not affiliated with TBC Bank, and the page is not an official communication from the bank. The buttons and the leaderboard figures are for demonstration and reflect no real data.",
    privacyTitle: "Privacy",
    privacyA: "The page is static and ",
    privacyNone: "collects no personal data whatsoever",
    privacyB:
      ": no cookies, no analytics, no tracking of any kind, no forms and no sign-in. Fonts and media are served from the page itself, so no request reaches a third party.",
    marks:
      "Brand names, logos and campaign copy are the property of their owners and appear here for illustration only. The illustrations were generated with AI for this demo. Should a rights holder want the material taken down, the page will come down immediately.",
    rights: (y: number) => `© ${y} · Unofficial design concept`,
  },

  houseText: {
    kharjiani: {
      name: "Kharjiani",
      motto: "We only get one life",
      price: "and winter comes every year",
      description:
        "A family that loves action, enjoying life and throwing itself into things. They are not afraid to spend what they have to get where they are going.",
    },
    anabaridze: {
      name: "Anabaridze",
      motto: "The future is built today",
      price: "sometimes it takes so long to build that no today is left",
      description:
        "A prudent, strategic, saving house. Their creed is to allocate resources wisely and insure the future.",
    },
    dovlatia: {
      name: "Dovlatia",
      motto: "Fortune favours the bold",
      price: "the bold — and those who tried a second time",
      description:
        "A family set on drawing wealth toward itself, on luck and on glory.",
    },
    baratishvili: {
      name: "Baratishvili",
      motto: "Order, out of old glory",
      price: "old order cannot see a new road",
      description:
        "A traditional, steadfast and influential family that guards the kingdom's ancient glory and its order.",
    },
  },

  trialText: {
    bridge: {
      title: "The bridge",
      setup: [
        "There is a toll on the bridge. You have thirteen coins in your pocket.",
        "Beside it — a way around, two days' walk, free.",
      ],
      options: [
        {
          label: "Pay and cross",
          cost: "Three coins, the far bank now",
          outcome:
            "On the far bank the fog had not yet come down. Ten coins left.",
        },
        {
          label: "Go around",
          cost: "Two days, three coins still yours",
          outcome:
            "The way around proved long, but you found two coins on it. You have eleven.",
        },
      ],
      lesson:
        "Opportunity cost — time is a price, even when no one hands you a receipt.",
    },
    market: {
      title: "The market",
      setup: [
        "A man at the market is selling a map. He says it shows where the coins lie.",
        "Five coins. The map is old. The man — who knows.",
      ],
      options: [
        {
          label: "Buy the map",
          cost: "Five coins, and it may be true",
          outcome:
            "The map took you to a ravine. The coins were there — nine of them. This time it paid.",
        },
        {
          label: "Keep to the old road",
          cost: "No price, and no discovery",
          outcome:
            "On the old road you found three coins. Neither gain nor loss.",
        },
      ],
      lesson: "Information has a price. Truth does not come guaranteed.",
    },
    winter: {
      title: "Winter",
      setup: [
        "The first snow came. A night in the barn costs four coins.",
        "Outside is free, and cold.",
      ],
      options: [
        {
          label: "Keep yourself warm",
          cost: "Four coins, a warm night",
          outcome: "You woke early and walked the whole day.",
        },
        {
          label: "Endure it",
          cost: "A cold night, four coins still yours",
          outcome:
            "In the morning you moved slowly, but you moved. Four coins in your pocket.",
        },
      ],
      lesson:
        "The difference between meanness and prudence only shows in the outcome.",
    },
    purse: {
      title: "The purse",
      setup: [
        "A purse lies on the path. Inside are seven coins —",
        "and one name: another house's seal.",
      ],
      options: [
        {
          label: "Keep it",
          cost: "Seven coins, and no one saw",
          outcome: "Seven coins. The purse stayed in the road, empty.",
        },
        {
          label: "Return it",
          cost: "Seven coins fewer",
          outcome:
            "Three weeks later, in a ravine far from there, a door you did not know opened for you.",
        },
      ],
      lesson: "Some investments are not measured in coins.",
    },
  },

  plateText: {
    crestKharjiani: "The Kharjiani crest — a flame in an open palm",
    crestAnabaridze: "The Anabaridze crest — a sealed door",
    crestDovlatia: "The Dovlatia crest — a wheel of fortune",
    crestBaratishvili: "The Baratishvili crest — a seal pressed into wax",
    medallion: "An empty medallion — waiting to be struck",
    altar: "The ancient treasure in the treasury",
    hall: "The family hall and a travelling cloak",
    shattering: "The shattering — coins scattering",
    banners: "Four banners on one horizon",
    gate: "Departure — the gate at night",
    kharjiani: "The Kharjiani banner — fire and motion",
    anabaridze: "The Anabaridze vault — a sealed door",
    dovlatia: "The Dovlatia wheel of fortune",
    baratishvili: "The old Baratishvili seal",
    hand: "A hand reaching out",
    seal: "A molten gold seal — drawing back",
    messenger: "A letter under the door, sealed in wax",
    verdict: "Four seals on the council table",
    firstCoin: "The first coin in the dust of the road",
    bridge: "A stone bridge and a toll house",
    market: "A market table, a map unrolled",
    winter: "A snowbound road, a distant light",
    purse: "An abandoned purse on the path",
    well: "The mouth of a well — four reflections in the water",
    ret: "The empty treasury, a pile of coins",
    accident: "A broken iron rod",
    betrayal: "A shadow on a closed door",
    prophecy: "An old manuscript",
    heroNight:
      "A night sky of ink clouds; below, the kingdom and the whole treasure in its treasury",
  },
};
