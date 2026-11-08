/** Sample children, families and attendance for the demo workspace. Every person here is fictional. */

import { centres } from "./demo";

export type NoteCat =
  | "Meal"
  | "Sleep"
  | "Toilet"
  | "Mood"
  | "Behaviour"
  | "Health"
  | "Milestone"
  | "General";

export const NOTE_CATS: NoteCat[] = [
  "General",
  "Meal",
  "Sleep",
  "Toilet",
  "Mood",
  "Behaviour",
  "Health",
  "Milestone",
];

export type Note = {
  id: string;
  at: string;
  by: string;
  cat: NoteCat;
  text: string;
  /** Include in the family's end-of-day update. */
  share: boolean;
};

export type Contact = {
  name: string;
  relation: string;
  phone: string;
  email?: string;
  canCollect: boolean;
  primary?: boolean;
  note?: string;
};

export type Allergy = {
  name: string;
  severity: "Anaphylaxis" | "Moderate" | "Mild";
  reaction: string;
  plan: string;
};

export type Medication = {
  name: string;
  dose: string;
  when: string;
  /** Days until the medication expires. */
  expiresIn: number;
};

export type Room = {
  name: string;
  /** Children per educator the room must not exceed. Indicative: check your state's rules. */
  limit: number;
  educators: number;
};

export type AttStatus = "expected" | "in" | "out" | "absent";
export type Att = {
  status: AttStatus;
  inAt?: string;
  inBy?: string;
  outAt?: string;
  outBy?: string;
  reason?: string;
};

export type Child = {
  id: string;
  centreId: string;
  first: string;
  last: string;
  dob: string;
  room: string;
  days: string[];
  allergies: Allergy[];
  conditions: string[];
  medications: Medication[];
  dietary: string;
  immunisation: string;
  doctor: { name: string; phone: string };
  behaviour: {
    strengths: string[];
    triggers: string[];
    strategies: string[];
    comfort: string;
    support?: string;
  };
  guardians: Contact[];
  authorised: Contact[];
  emergency: Contact[];
  restriction?: string;
  consents: [string, boolean][];
  language: string;
  notes: Note[];
  today: Att;
  /** Set when a child has left the centre. */
  archived?: boolean;
};

/* ---------- rooms ---------- */

export const ROOMS: Record<string, Room[]> = {
  "little-steps": [
    { name: "Babies", limit: 4, educators: 2 },
    { name: "Toddlers", limit: 5, educators: 2 },
    { name: "Preschool", limit: 10, educators: 2 },
  ],
  "maple-street": [{ name: "School age", limit: 15, educators: 1 }],
  "harbour-kids": [{ name: "Preschool", limit: 10, educators: 2 }],
  "wattle-grove": [
    { name: "Babies", limit: 4, educators: 2 },
    { name: "Toddlers", limit: 4, educators: 1 },
    { name: "Preschool", limit: 11, educators: 1 },
  ],
};

/* ---------- libraries ---------- */

export const ALLERGY: Record<string, Allergy> = {
  peanut: {
    name: "Peanut",
    severity: "Anaphylaxis",
    reaction: "Hives, swelling of lips and face, difficulty breathing",
    plan: "ASCIA action plan on file. Give adrenaline, call 000.",
  },
  treenut: {
    name: "Tree nuts",
    severity: "Anaphylaxis",
    reaction: "Vomiting, wheeze, swelling",
    plan: "ASCIA action plan on file. Give adrenaline, call 000.",
  },
  egg: {
    name: "Egg",
    severity: "Moderate",
    reaction: "Hives and stomach upset",
    plan: "Egg-free meals. Antihistamine per medical plan, call parent.",
  },
  dairy: {
    name: "Cow's milk",
    severity: "Moderate",
    reaction: "Rash, vomiting",
    plan: "Dairy-free meals and snacks. Call parent if exposed.",
  },
  sesame: {
    name: "Sesame",
    severity: "Moderate",
    reaction: "Hives around the mouth",
    plan: "Check labels, no sesame products on the menu.",
  },
  bee: {
    name: "Bee sting",
    severity: "Mild",
    reaction: "Local swelling",
    plan: "Cold pack, monitor for 30 minutes, call parent.",
  },
};

const MEDICAL: Record<string, { cond: string; meds: Omit<Medication, "expiresIn">[] }> = {
  asthma: {
    cond: "Asthma. Written asthma action plan on file.",
    meds: [{ name: "Ventolin with spacer", dose: "4 puffs", when: "Wheeze or cough, then call parent" }],
  },
  eczema: {
    cond: "Eczema. Moisturise after sunscreen and after water play.",
    meds: [{ name: "Moisturising cream", dose: "Thin layer", when: "After nappy changes and water play" }],
  },
  febrile: { cond: "History of febrile convulsion. Keep fever plan in the room.", meds: [] },
  grommets: { cond: "Grommets fitted. Keep ears dry during water play.", meds: [] },
  coeliac: { cond: "Coeliac disease. Strictly gluten free, including shared utensils.", meds: [] },
  epi: {
    cond: "",
    meds: [{ name: "Adrenaline autoinjector", dose: "As per action plan", when: "Anaphylaxis only" }],
  },
};

const BEHAVIOUR: Record<string, Child["behaviour"]> = {
  settled: {
    strengths: ["Settles quickly", "Enjoys group play", "Kind to younger children"],
    triggers: [],
    strategies: [],
    comfort: "Likes a story at rest time",
  },
  separation: {
    strengths: ["Loves the book corner", "Warm with familiar educators"],
    triggers: ["Drop-off", "New educators", "Loud transitions"],
    strategies: [
      "Parent says goodbye at the door, then an educator offers the book corner",
      "Family photo kept in the comfort box",
    ],
    comfort: "Soft rabbit toy and a cuddle on the couch",
  },
  biting: {
    strengths: ["Curious and active", "Loves music and movement"],
    triggers: ["Tiredness", "Crowded play areas", "Toy conflicts"],
    strategies: [
      "Shadow during transitions and busy play",
      "Offer chewy toys and name the feeling",
      "Two of the same popular toy out",
    ],
    comfort: "Rocking and a quiet song",
    support: "Biting plan shared with family, reviewed fortnightly",
  },
  sensory: {
    strengths: ["Detailed builder", "Strong memory for songs"],
    triggers: ["Loud noises", "Sticky textures", "Unannounced changes"],
    strategies: [
      "Headphones available in the quiet corner",
      "Visual timetable and a five minute warning before changes",
      "Offer a wipe, never insist on touching messy play",
    ],
    comfort: "Weighted lap pad and the quiet corner",
    support: "Occupational therapy plan shared by family, strategies reviewed each term",
  },
  bigfeelings: {
    strengths: ["Leader in imaginative play", "Great sense of humour"],
    triggers: ["Waiting for turns", "Losing a game", "Transitions"],
    strategies: [
      "Calm-down kit and breathing cards",
      "Give a job during transitions",
      "Name the feeling, then offer two choices",
    ],
    comfort: "Drawing at the art table",
  },
  shy: {
    strengths: ["Careful and observant", "Beautiful drawings"],
    triggers: ["Large group time", "Being put on the spot"],
    strategies: ["Invite into small group first", "Pair with a friendly peer", "Do not force sharing at group time"],
    comfort: "Reading with one educator",
  },
  schoolage: {
    strengths: ["Responsible", "Loves sport", "Helps younger children"],
    triggers: ["Tired after school", "Homework pressure"],
    strategies: ["Snack and downtime first, then homework", "Offer an active game after school"],
    comfort: "Handball with friends",
  },
};

/* ---------- specs ---------- */

const FIRST_NOTES: Record<NoteCat, string[]> = {
  Meal: ["Ate all of lunch and asked for more fruit.", "Only ate half of lunch, drank all water."],
  Sleep: ["Slept 1h 40m, woke happily.", "Rested quietly for 45 minutes, did not fall asleep."],
  Toilet: ["Used the toilet independently twice today.", "Two accidents, changed into spare clothes, no fuss."],
  Mood: ["Cheerful all morning. Needed a cuddle after lunch.", "A little teary at drop-off, settled in 10 minutes."],
  Behaviour: ["Had a hard time sharing the trucks. Used the calm-down kit and rejoined play.", "Pushed a peer in a queue. Spoke about gentle hands and checked in on the friend together."],
  Health: ["Slightly warm at 2pm, 37.4. Rechecked, normal. Family told at pick-up.", "Bumped knee on the deck, ice applied, no mark."],
  Milestone: ["Counted to ten in order during block play.", "Wrote the first letter of their name for the first time."],
  General: ["Loved the sensory tray and stayed with it for 25 minutes.", "Asked for the fairy story again and helped tidy up."],
};

type Spec = {
  f: string;
  l: string;
  dob: string;
  room: string;
  days: string;
  a?: string[];
  m?: string[];
  b: string;
  g: string[];
  t: string;
  n?: [NoteCat, number][];
  diet?: string;
  lang?: string;
  restrict?: [string, string];
};

const S = (s: Spec): Spec => s;

const SPECS: Record<string, Spec[]> = {
  "little-steps": [
    S({ f: "Mia", l: "Chen", dob: "2025-06-14", room: "Babies", days: "MTWTF", b: "separation", g: ["Linda|Mother", "David|Father"], t: "in 7:42 am Linda", n: [["Mood", 1], ["Sleep", 0]], lang: "English, Cantonese" }),
    S({ f: "Oscar", l: "Whitfield", dob: "2025-02-03", room: "Babies", days: "MTW", a: ["egg"], b: "settled", g: ["Hannah|Mother"], t: "in 8:05 am Hannah", n: [["Meal", 0]] }),
    S({ f: "Zara", l: "Nasser", dob: "2025-09-21", room: "Babies", days: "TWTF", a: ["dairy"], m: ["eczema"], b: "settled", g: ["Layla|Mother", "Omar|Father"], t: "in 8:20 am Omar", n: [["Toilet", 0]], diet: "Dairy-free formula supplied by family" }),
    S({ f: "Archie", l: "Dunn", dob: "2025-04-30", room: "Babies", days: "MTWTF", b: "biting", g: ["Kate|Mother"], t: "abs Fever, doctor visit", n: [["Behaviour", 0]] }),
    S({ f: "Leo", l: "Papadakis", dob: "2024-03-09", room: "Toddlers", days: "MTWTF", a: ["peanut", "treenut"], m: ["asthma", "epi"], b: "biting", g: ["Eleni|Mother", "Nick|Father"], t: "in 7:35 am Nick", n: [["Behaviour", 0], ["Health", 0], ["Meal", 1]], lang: "English, Greek", diet: "Nut-free centre. Lunch box items checked daily." }),
    S({ f: "Ivy", l: "McKenzie", dob: "2024-07-18", room: "Toddlers", days: "MTWT", b: "sensory", g: ["Rachel|Mother"], t: "in 8:10 am Rachel", n: [["Mood", 0], ["General", 0]] }),
    S({ f: "Noah", l: "Tran", dob: "2024-01-26", room: "Toddlers", days: "WTF", b: "settled", g: ["Bao|Father", "Mai|Mother"], t: "exp", n: [["Meal", 0]], lang: "English, Vietnamese" }),
    S({ f: "Ruby", l: "O'Connor", dob: "2024-05-12", room: "Toddlers", days: "MTWTF", a: ["sesame"], b: "separation", g: ["Siobhan|Mother"], t: "in 8:30 am Siobhan", n: [["Mood", 1]] }),
    S({ f: "Kobe", l: "Williams", dob: "2024-10-02", room: "Toddlers", days: "MTW", m: ["grommets"], b: "settled", g: ["Tamika|Mother", "Jarrah|Father"], t: "out 7:50 am 3:05 pm Jarrah" }),
    S({ f: "Sienna", l: "Rossi", dob: "2022-04-05", room: "Preschool", days: "MTWTF", b: "bigfeelings", g: ["Marco|Father", "Gina|Mother"], t: "in 7:30 am Marco", n: [["Behaviour", 1], ["Milestone", 0]] }),
    S({ f: "Ethan", l: "Park", dob: "2022-08-19", room: "Preschool", days: "MTWT", a: ["bee"], m: ["asthma"], b: "shy", g: ["Jin|Father"], t: "in 8:00 am Jin", n: [["Health", 1], ["Milestone", 1]], lang: "English, Korean" }),
    S({ f: "Matilda", l: "Hughes", dob: "2021-12-11", room: "Preschool", days: "MTWTF", b: "settled", g: ["Anna|Mother", "Steve|Father"], t: "in 7:48 am Anna", n: [["General", 1], ["Milestone", 0]] }),
    S({ f: "Jasper", l: "Singh", dob: "2022-02-28", room: "Preschool", days: "TWT", a: ["egg"], b: "bigfeelings", g: ["Priyanka|Mother"], t: "exp", n: [["Behaviour", 0]] }),
    S({ f: "Willa", l: "Foster", dob: "2022-10-07", room: "Preschool", days: "MTWTF", b: "sensory", g: ["Ben|Father", "Jo|Mother"], t: "in 8:15 am Jo", n: [["Mood", 1], ["Toilet", 0]] }),
  ],
  "maple-street": [
    S({ f: "Lucas", l: "Moretti", dob: "2018-03-17", room: "School age", days: "MTWTF", b: "schoolage", g: ["Paola|Mother"], t: "in 3:20 pm Paola", n: [["General", 0]] }),
    S({ f: "Amelia", l: "Brooks", dob: "2017-09-02", room: "School age", days: "MWF", a: ["peanut"], m: ["epi", "asthma"], b: "schoolage", g: ["Chris|Father", "Dee|Mother"], t: "in 3:25 pm Dee", n: [["Health", 0]], diet: "Nut-free snacks. Carries own autoinjector bag." }),
    S({ f: "Jack", l: "Tuilagi", dob: "2016-11-23", room: "School age", days: "MTWTF", b: "bigfeelings", g: ["Sina|Mother"], t: "in 3:18 pm Sina", n: [["Behaviour", 1]] }),
    S({ f: "Harper", l: "Lowe", dob: "2019-01-08", room: "School age", days: "TTF", b: "shy", g: ["Mel|Mother", "Tim|Father"], t: "exp" }),
    S({ f: "Mohammed", l: "Rahman", dob: "2018-07-30", room: "School age", days: "MTWTF", a: ["sesame"], b: "settled", g: ["Farah|Mother"], t: "in 3:22 pm Farah", n: [["Meal", 0]], lang: "English, Bengali" }),
    S({ f: "Isla", l: "Gardner", dob: "2020-02-14", room: "School age", days: "WTF", b: "schoolage", g: ["Nat|Mother"], t: "abs Family holiday" }),
  ],
  "harbour-kids": [
    S({ f: "Charlotte", l: "Evans", dob: "2022-05-20", room: "Preschool", days: "MTWTF", b: "settled", g: ["Alex|Father", "Beth|Mother"], t: "in 8:00 am Beth", n: [["General", 1]] }),
    S({ f: "Henry", l: "Nguyen", dob: "2022-01-09", room: "Preschool", days: "MTWTF", a: ["treenut"], m: ["epi"], b: "bigfeelings", g: ["Linh|Mother"], t: "in 7:40 am Linh", n: [["Behaviour", 0], ["Health", 1]], lang: "English, Vietnamese" }),
    S({ f: "Grace", l: "Adeyemi", dob: "2021-11-27", room: "Preschool", days: "MTWT", b: "shy", g: ["Tunde|Father", "Ngozi|Mother"], t: "in 8:10 am Tunde", n: [["Milestone", 0]] }),
    S({ f: "Felix", l: "Kowalczyk", dob: "2022-07-04", room: "Preschool", days: "TWTF", m: ["asthma"], b: "sensory", g: ["Marta|Mother"], t: "exp", n: [["Mood", 1]], lang: "English, Polish" }),
    S({ f: "Edie", l: "Marsh", dob: "2022-03-15", room: "Preschool", days: "MTWTF", a: ["dairy"], b: "separation", g: ["Joel|Father"], t: "in 8:25 am Joel", n: [["Mood", 0]], restrict: ["Troy Marsh", "Court order in place: Edie must not be released to Troy Marsh. Copy of the order is on file and reviewed each term."] }),
    S({ f: "Mason", l: "Clarke", dob: "2021-10-01", room: "Preschool", days: "MTW", b: "bigfeelings", g: ["Kelly|Mother", "Shane|Father"], t: "in 7:55 am Shane", n: [["Behaviour", 1]] }),
    S({ f: "Poppy", l: "Dimitriou", dob: "2022-09-12", room: "Preschool", days: "MTWTF", b: "settled", g: ["Sophia|Mother"], t: "in 8:05 am Sophia" }),
    S({ f: "Rory", l: "Callaghan", dob: "2021-12-30", room: "Preschool", days: "TWTF", a: ["egg", "sesame"], b: "shy", g: ["Fiona|Mother"], t: "abs Gastro, 24 hours clear required", n: [["Health", 0]] }),
  ],
  "wattle-grove": [
    S({ f: "Alice", l: "Thompson", dob: "2025-05-08", room: "Babies", days: "MTWTF", b: "separation", g: ["Jess|Mother", "Craig|Father"], t: "in 8:00 am Craig", n: [["Sleep", 1]] }),
    S({ f: "Finn", l: "Murphy", dob: "2025-01-19", room: "Babies", days: "MTW", m: ["eczema"], b: "settled", g: ["Erin|Mother"], t: "in 7:45 am Erin", n: [["Meal", 1]] }),
    S({ f: "Yuki", l: "Tanaka", dob: "2025-08-02", room: "Babies", days: "TWTF", b: "settled", g: ["Aiko|Mother"], t: "exp", lang: "English, Japanese" }),
    S({ f: "Max", l: "Georgiou", dob: "2024-02-11", room: "Toddlers", days: "MTWTF", a: ["peanut"], m: ["epi"], b: "biting", g: ["Costa|Father", "Helen|Mother"], t: "in 7:50 am Costa", n: [["Behaviour", 0]] }),
    S({ f: "Lila", l: "Sharma", dob: "2024-06-25", room: "Toddlers", days: "MTWT", b: "settled", g: ["Anita|Mother"], t: "in 8:12 am Anita", n: [["Toilet", 1]] }),
    S({ f: "Hugo", l: "Bernard", dob: "2022-06-03", room: "Preschool", days: "MTWTF", m: ["coeliac"], b: "bigfeelings", g: ["Claire|Mother"], t: "in 8:02 am Claire", n: [["Meal", 0], ["Behaviour", 1]], diet: "Gluten free. Own toaster and utensils." }),
    S({ f: "Olive", l: "Reid", dob: "2022-01-22", room: "Preschool", days: "TWT", b: "shy", g: ["Sam|Father"], t: "in 8:30 am Sam", n: [["Milestone", 1]] }),
    S({ f: "Theo", l: "Kapoor", dob: "2021-11-14", room: "Preschool", days: "MTWTF", a: ["bee"], m: ["febrile"], b: "settled", g: ["Ravi|Father", "Neha|Mother"], t: "out 7:40 am 2:50 pm Neha", n: [["Health", 0]] }),
  ],
};

/* ---------- build ---------- */

const GRANDPARENTS = ["Margaret", "Robert", "Helen", "George", "Pat", "Ian"];
const DOCTORS = ["Dr Amara Patel", "Dr Tom Lindqvist", "Dr Sophie Barker", "Dr Wei Zhang"];

const phone = (n: number) =>
  `0400 ${String(100 + ((n * 37) % 900)).padStart(3, "0")} ${String(100 + ((n * 91) % 900)).padStart(3, "0")}`;

function build(centreId: string, s: Spec, i: number, staffNames: string[]): Child {
  const id = `${centreId}-${s.f}-${s.l}`.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const seed = i * 13 + centreId.length * 7;

  const guardians: Contact[] = s.g.map((g, gi) => {
    const [name, relation] = g.split("|");
    return {
      name: `${name} ${s.l}`,
      relation,
      phone: phone(seed + gi * 5),
      email: `${name.toLowerCase()}.${s.l.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
      canCollect: true,
      primary: gi === 0,
    };
  });
  const gp = GRANDPARENTS[(i + 2) % GRANDPARENTS.length];
  const other = i % 2 ? "Grandmother" : "Grandfather";
  const grand: Contact = {
    name: `${gp} ${i % 3 === 0 ? s.l : "Hale"}`,
    relation: other,
    phone: phone(seed + 11),
    canCollect: true,
  };
  const neighbour: Contact = {
    name: `${GRANDPARENTS[(i + 4) % GRANDPARENTS.length]} Ford`,
    relation: "Family friend",
    phone: phone(seed + 17),
    canCollect: false,
  };

  const authorised = [...guardians, grand];
  const emergency = [grand, neighbour];

  let restriction: string | undefined;
  if (s.restrict) {
    restriction = s.restrict[1];
    authorised.push({
      name: s.restrict[0],
      relation: "Not authorised",
      phone: "",
      canCollect: false,
      note: "Do not release. See court order.",
    });
  }

  const allergies = (s.a ?? []).map((k) => ALLERGY[k]);
  const conditions: string[] = [];
  const medications: Medication[] = [];
  const expiries = [24, 190, 75, 340, 140];
  (s.m ?? []).forEach((k, mi) => {
    const lib = MEDICAL[k];
    if (lib.cond) conditions.push(lib.cond);
    lib.meds.forEach((m) =>
      medications.push({ ...m, expiresIn: expiries[(i + mi + (k === "epi" ? 0 : 2)) % expiries.length] }),
    );
  });

  const notes: Note[] = (s.n ?? []).map(([cat, v], ni) => ({
    id: `${id}-seed-${ni}`,
    at: ["9:10 am", "11:35 am", "1:20 pm"][ni % 3],
    by: staffNames[(i + ni) % staffNames.length],
    cat,
    text: FIRST_NOTES[cat][v],
    share: cat !== "Behaviour" && cat !== "Health",
  }));

  const [kind, ...rest] = s.t.split(" ");
  let today: Att = { status: "expected" };
  if (kind === "in") {
    today = { status: "in", inAt: `${rest[0]} ${rest[1]}`, inBy: `${rest[2]} ${s.l}` };
  } else if (kind === "out") {
    today = {
      status: "out",
      inAt: `${rest[0]} ${rest[1]}`,
      outAt: `${rest[2]} ${rest[3]}`,
      outBy: `${rest[4]} ${s.l}`,
    };
  } else if (kind === "abs") {
    today = { status: "absent", reason: rest.join(" ") };
  }

  const names = "MTWTF".split("");
  const full = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const days: string[] = [];
  let pos = 0;
  for (const ch of s.days) {
    const idx = names.indexOf(ch, pos);
    if (idx >= 0) {
      days.push(full[idx]);
      pos = idx + 1;
    }
  }

  return {
    id,
    centreId,
    first: s.f,
    last: s.l,
    dob: s.dob,
    room: s.room,
    days,
    allergies,
    conditions,
    medications,
    dietary: s.diet ?? (allergies.length ? "Allergy-safe meals. Check the allergy register before serving." : "No restrictions"),
    immunisation: i % 7 === 3 ? "Catch-up plan in place, documents due" : "Up to date, statement on file",
    doctor: { name: DOCTORS[i % DOCTORS.length], phone: phone(seed + 23) },
    behaviour: BEHAVIOUR[s.b],
    guardians,
    authorised,
    emergency,
    restriction,
    consents: [
      ["Photos and video for learning records", i % 5 !== 2],
      ["Social media and newsletter use", i % 3 === 0],
      ["Sunscreen application", true],
      ["Excursions and walks", i % 6 !== 4],
      ["Emergency medical treatment and ambulance", true],
      ["Digital device use for learning", i % 4 !== 1],
    ],
    language: s.lang ?? "English",
    notes,
    today,
  };
}

export const children: Child[] = centres.flatMap((c) =>
  (SPECS[c.id] ?? []).map((s, i) =>
    build(c.id, s, i, c.staff.map((st) => st.name)),
  ),
);

/* ---------- helpers ---------- */

export const childrenOf = (centreId: string) => children.filter((c) => c.centreId === centreId);
export const getChild = (id: string) => children.find((c) => c.id === id);

export function ageText(dob: string, now: Date): string {
  const d = new Date(dob);
  let months = (now.getFullYear() - d.getFullYear()) * 12 + now.getMonth() - d.getMonth();
  if (now.getDate() < d.getDate()) months -= 1;
  if (months < 24) return `${months} months`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y} yrs ${m} mths` : `${y} yrs`;
}

export const initials = (c: Child) => `${c.first[0]}${c.last[0]}`;

export const severeAllergy = (c: Child) => c.allergies.find((a) => a.severity === "Anaphylaxis");

/* ---------- creating a child from a form ---------- */

export type NewChild = {
  centreId: string;
  first: string;
  last: string;
  dob: string;
  room: string;
  days: string[];
  language?: string;
  guardianName: string;
  guardianRelation: string;
  guardianPhone: string;
  guardianEmail?: string;
  secondGuardian?: string;
  secondPhone?: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  allergies: string[];
  condition?: string;
  dietary?: string;
  doctorName?: string;
  doctorPhone?: string;
  photoConsent: boolean;
};

export const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function makeChild(n: NewChild): Child {
  const slug = `${n.centreId}-${n.first}-${n.last}`.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const guardians: Contact[] = [
    { name: n.guardianName, relation: n.guardianRelation, phone: n.guardianPhone, email: n.guardianEmail || undefined, canCollect: true, primary: true },
  ];
  if (n.secondGuardian?.trim())
    guardians.push({ name: n.secondGuardian.trim(), relation: "Parent", phone: n.secondPhone ?? "", canCollect: true });
  const emergency: Contact = { name: n.emergencyName, relation: n.emergencyRelation, phone: n.emergencyPhone, canCollect: false };
  return {
    id: `${slug}-${Date.now().toString(36)}`,
    centreId: n.centreId,
    first: n.first.trim(),
    last: n.last.trim(),
    dob: n.dob,
    room: n.room,
    days: n.days,
    allergies: n.allergies.map((k) => ALLERGY[k]).filter(Boolean),
    conditions: n.condition?.trim() ? [n.condition.trim()] : [],
    medications: [],
    dietary: n.dietary?.trim() || (n.allergies.length ? "Allergy-safe meals. Check the allergy register before serving." : "No restrictions"),
    immunisation: "Statement requested from family",
    doctor: { name: n.doctorName?.trim() || "Not provided", phone: n.doctorPhone?.trim() || "" },
    behaviour: { strengths: [], triggers: [], strategies: [], comfort: "Not recorded yet" },
    guardians,
    authorised: [...guardians],
    emergency: [emergency],
    consents: [
      ["Photos and video for learning records", n.photoConsent],
      ["Social media and newsletter use", false],
      ["Sunscreen application", true],
      ["Excursions and walks", false],
      ["Emergency medical treatment and ambulance", true],
      ["Digital device use for learning", false],
    ],
    language: n.language?.trim() || "English",
    notes: [],
    today: { status: "expected" },
  };
}
