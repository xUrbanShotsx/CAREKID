/** Sample data for the demo workspace. Every name here is fictional. */

export const me = { name: "Priya Nair", initials: "PN", role: "Group Director" };

export const ALL = "all";

/* ---------- shared shapes ---------- */

export type Tile = { value: string; label: string; hot: boolean };
export type Action = { task: string; who: string; when: string; hot: boolean };

export type Check = { id: string; text: string };
export type Checklist = {
  id: string;
  title: string;
  room: string;
  owner: string;
  checks: Check[];
};

export type Staff = {
  name: string;
  role: string;
  /** Days until each credential expires. Negative means expired. */
  wwcc: number;
  firstAid: number;
  childProtection: number;
  missing: string[];
};

export type Policy = {
  name: string;
  version: string;
  status: "Approved" | "Draft" | "In review";
  ref: string;
};

export type Incident = {
  id: string;
  title: string;
  kind: "Injury" | "Near miss" | "Hazard" | "Illness";
  room: string;
  status: "Open" | "Actions due" | "Closed";
  actions: [number, number];
  owner: string;
  when: string;
};

export type Qa = { qa: string; name: string; pct: number; gaps: number; evidence: number };

export type Centre = {
  id: string;
  name: string;
  type: string;
  state: string;
  status: string;
  summary: { overdue: number; missing: number; open: number };
  tiles: Tile[];
  actions: Action[];
  briefing: [string, string][];
  insight: string;
  /** Which shared checklists this service runs, and how many checks are already ticked. */
  lists: Record<string, number>;
  staff: Staff[];
  /** Per shared policy: people who have read it, of this centre's headcount, and days to review. */
  policyRead: number[];
  policyDays: number[];
  incidents: Incident[];
  qas: [number, number, number][]; // pct, gaps, evidence per Quality Area
};

/* ---------- shared templates ---------- */

export const checklists: Checklist[] = [
  {
    id: "open",
    title: "Opening checklist",
    room: "Whole centre",
    owner: "Room leaders",
    checks: [
      { id: "o1", text: "Alarm disarmed and doors unlocked" },
      { id: "o2", text: "Sign-in tablet on and working" },
      { id: "o3", text: "Kitchen fridge and freezer temperatures logged" },
      { id: "o4", text: "First aid kits stocked and in place" },
      { id: "o5", text: "Indoor spaces free of hazards" },
    ],
  },
  {
    id: "play",
    title: "Playground check",
    room: "Outdoor area",
    owner: "Room leader",
    checks: [
      { id: "p1", text: "Gate latched and locked" },
      { id: "p2", text: "Sandpit covered" },
      { id: "p3", text: "Climbing frame, no loose bolts" },
      { id: "p4", text: "Shade sails undamaged" },
      { id: "p5", text: "Bark depth under swings" },
    ],
  },
  {
    id: "sleep",
    title: "Sleep room checks",
    room: "Babies room",
    owner: "Babies educators",
    checks: [
      { id: "s1", text: "Cots clear of loose items" },
      { id: "s2", text: "Room temperature in range" },
      { id: "s3", text: "Baby monitor on and working" },
      { id: "s4", text: "Sleep check sheet up to date" },
    ],
  },
  {
    id: "close",
    title: "Closing checklist",
    room: "Whole centre",
    owner: "Closing educator",
    checks: [
      { id: "c1", text: "All children signed out" },
      { id: "c2", text: "Gates and windows locked" },
      { id: "c3", text: "Bins out and kitchen cleaned" },
      { id: "c4", text: "Alarm set" },
    ],
  },
];

export const policies: Policy[] = [
  { name: "Sleep and Rest Policy", version: "v2", status: "Approved", ref: "Reg 81, Reg 168" },
  { name: "Child Safe Environment Policy", version: "v4", status: "Approved", ref: "Reg 168" },
  { name: "Digital Devices and Photography Policy", version: "v1", status: "In review", ref: "Child safety reforms" },
  { name: "Incident, Injury and Illness Policy", version: "v3", status: "Approved", ref: "Reg 85 to 87" },
  { name: "Water Safety Policy", version: "v2", status: "Draft", ref: "Reg 168" },
  { name: "Emergency and Evacuation Policy", version: "v5", status: "Approved", ref: "Reg 97" },
];

export const qaNames: [string, string][] = [
  ["QA1", "Educational program and practice"],
  ["QA2", "Children's health and safety"],
  ["QA3", "Physical environment"],
  ["QA4", "Staffing arrangements"],
  ["QA5", "Relationships with children"],
  ["QA6", "Collaborative partnerships with families and communities"],
  ["QA7", "Governance and leadership"],
];

/* ---------- centres ---------- */

export const centres: Centre[] = [
  {
    id: "little-steps",
    name: "Little Steps Early Learning",
    type: "Long day care",
    state: "NSW",
    status: "Needs attention",
    summary: { overdue: 2, missing: 1, open: 3 },
    tiles: [
      { value: "18/22", label: "Tasks completed today", hot: false },
      { value: "3", label: "Records expiring soon", hot: true },
      { value: "5", label: "Outstanding actions", hot: true },
      { value: "2", label: "Policies due for review", hot: false },
    ],
    actions: [
      { task: "Outdoor playground inspection", who: "Room Leader", when: "Today", hot: true },
      { task: "First aid certificate review", who: "Centre Director", when: "This week", hot: false },
      { task: "Policy acknowledgement pending", who: "2 staff", when: "This week", hot: false },
      { task: "Evacuation drill, monthly", who: "Centre Director", when: "3 days late", hot: true },
      { task: "Upload training certificate for Jo Lim", who: "Jo Lim", when: "Next week", hot: false },
    ],
    briefing: [
      ["2", "inspections not yet started"],
      ["3", "staff records incomplete"],
      ["1", "unresolved risk, due Thursday"],
      ["4", "deadlines this fortnight"],
    ],
    insight:
      "Two policies are approaching their scheduled review dates. One educator's training record is missing an uploaded completion certificate. Review these records before marking the associated tasks complete.",
    lists: { open: 5, play: 3, sleep: 1, close: 0 },
    staff: [
      { name: "Priya Nair", role: "Centre Director", wwcc: 412, firstAid: 188, childProtection: 301, missing: [] },
      { name: "Sam Kowalski", role: "Educational Leader", wwcc: 530, firstAid: 22, childProtection: 240, missing: [] },
      { name: "Jo Lim", role: "Room Leader, Toddlers", wwcc: 96, firstAid: 140, childProtection: 18, missing: ["Training certificate"] },
      { name: "Amira Haddad", role: "Educator, Babies", wwcc: 28, firstAid: 260, childProtection: 330, missing: [] },
      { name: "Tom Bright", role: "Educator, Preschool", wwcc: 610, firstAid: -4, childProtection: 150, missing: ["First aid certificate"] },
      { name: "Lena Fischer", role: "Casual educator", wwcc: 365, firstAid: 90, childProtection: 75, missing: ["Induction sign-off"] },
    ],
    policyRead: [9, 12, 4, 11, 0, 12],
    policyDays: [-62, 9, 92, 150, 999, 210],
    incidents: [
      { id: "INC-0145", title: "Child fell from low climbing frame, graze to knee", kind: "Injury", room: "Toddler yard", status: "Open", actions: [0, 2], owner: "Jo Lim", when: "Today" },
      { id: "INC-0144", title: "Loose bolt found on swing set", kind: "Hazard", room: "Toddler yard", status: "Actions due", actions: [1, 3], owner: "Priya Nair", when: "Mon" },
      { id: "INC-0143", title: "Door nearly closed on a child's fingers", kind: "Near miss", room: "Preschool", status: "Actions due", actions: [1, 2], owner: "Tom Bright", when: "Last week" },
      { id: "INC-0142", title: "Child unwell with fever, parent called", kind: "Illness", room: "Babies room", status: "Closed", actions: [2, 2], owner: "Amira Haddad", when: "Last week" },
    ],
    qas: [[82, 2, 41], [74, 4, 52], [90, 1, 28], [66, 5, 24], [88, 1, 19], [71, 3, 22], [58, 6, 28]],
  },
  {
    id: "maple-street",
    name: "Maple Street OSHC",
    type: "Before and after school",
    state: "NSW",
    status: "On track",
    summary: { overdue: 0, missing: 0, open: 1 },
    tiles: [
      { value: "12/13", label: "Tasks completed today", hot: false },
      { value: "1", label: "Records expiring soon", hot: true },
      { value: "1", label: "Outstanding actions", hot: false },
      { value: "0", label: "Policies due for review", hot: false },
    ],
    actions: [{ task: "Afternoon sign-out headcount", who: "Educator", when: "Today", hot: true }],
    briefing: [
      ["1", "inspection not yet started"],
      ["0", "staff records incomplete"],
      ["0", "unresolved risks"],
      ["2", "deadlines this fortnight"],
    ],
    insight:
      "Nothing is overdue. One first aid certificate expires within 30 days, so book the renewal now. All policies have been read by every educator.",
    lists: { open: 5, play: 5, close: 2 },
    staff: [
      { name: "Dana Reyes", role: "Coordinator", wwcc: 300, firstAid: 25, childProtection: 280, missing: [] },
      { name: "Ollie Park", role: "Educator", wwcc: 410, firstAid: 200, childProtection: 190, missing: [] },
      { name: "Nina Voss", role: "Educator", wwcc: 220, firstAid: 160, childProtection: 120, missing: [] },
    ],
    policyRead: [4, 4, 4, 4, 4, 4],
    policyDays: [200, 140, 300, 160, 260, 220],
    incidents: [
      { id: "INC-0061", title: "Child tripped on stairs, no injury", kind: "Near miss", room: "Hall", status: "Closed", actions: [1, 1], owner: "Dana Reyes", when: "Last week" },
    ],
    qas: [[90, 1, 22], [88, 1, 30], [92, 0, 18], [84, 2, 16], [91, 1, 14], [86, 1, 12], [80, 2, 15]],
  },
  {
    id: "harbour-kids",
    name: "Harbour Kids Preschool",
    type: "Preschool",
    state: "NSW",
    status: "Behind",
    summary: { overdue: 5, missing: 4, open: 7 },
    tiles: [
      { value: "9/15", label: "Tasks completed today", hot: true },
      { value: "4", label: "Records expiring soon", hot: true },
      { value: "7", label: "Outstanding actions", hot: true },
      { value: "3", label: "Policies due for review", hot: true },
    ],
    actions: [
      { task: "Fire extinguisher service", who: "Contractor", when: "6 days late", hot: true },
      { task: "Evacuation drill, monthly", who: "Centre Director", when: "9 days late", hot: true },
      { task: "Working with Children Check, Mei Tan", who: "Mei Tan", when: "Expires in 12 days", hot: true },
      { task: "Child safety risk assessment review", who: "Centre Director", when: "This week", hot: false },
      { task: "Playground inspection", who: "Room Leader", when: "Today", hot: true },
    ],
    briefing: [
      ["4", "inspections not yet started"],
      ["4", "staff records incomplete"],
      ["3", "unresolved risks"],
      ["6", "deadlines this fortnight"],
    ],
    insight:
      "This centre has the most overdue work in the group. Two safety tasks are late and four staff records are incomplete. Start with the evacuation drill and the expiring Working with Children Check.",
    lists: { open: 3, play: 0, close: 0 },
    staff: [
      { name: "Grace Okafor", role: "Centre Director", wwcc: 200, firstAid: 95, childProtection: 180, missing: [] },
      { name: "Mei Tan", role: "Teacher", wwcc: 12, firstAid: 140, childProtection: 60, missing: ["Child protection certificate"] },
      { name: "Luca Bianchi", role: "Educator", wwcc: 330, firstAid: -20, childProtection: 210, missing: ["First aid certificate"] },
      { name: "Hana Sato", role: "Educator", wwcc: 80, firstAid: 28, childProtection: 15, missing: ["Induction sign-off"] },
      { name: "Ben Ashby", role: "Casual educator", wwcc: 150, firstAid: 120, childProtection: -3, missing: ["Training certificate"] },
    ],
    policyRead: [3, 2, 1, 4, 0, 3],
    policyDays: [-30, -5, 20, 90, 999, 40],
    incidents: [
      { id: "INC-0210", title: "Child bumped head on table, ice applied", kind: "Injury", room: "Preschool room", status: "Open", actions: [0, 2], owner: "Mei Tan", when: "Today" },
      { id: "INC-0209", title: "Gate latch faulty on back fence", kind: "Hazard", room: "Back yard", status: "Open", actions: [0, 2], owner: "Grace Okafor", when: "Yesterday" },
      { id: "INC-0208", title: "Cleaning product left within reach", kind: "Near miss", room: "Kitchen", status: "Actions due", actions: [1, 3], owner: "Hana Sato", when: "Mon" },
      { id: "INC-0207", title: "Child unwell, sent home", kind: "Illness", room: "Preschool room", status: "Actions due", actions: [1, 2], owner: "Luca Bianchi", when: "Last week" },
      { id: "INC-0206", title: "Slip on wet floor, no injury", kind: "Near miss", room: "Bathroom", status: "Actions due", actions: [1, 2], owner: "Grace Okafor", when: "Last week" },
      { id: "INC-0205", title: "Broken chair found in storeroom", kind: "Hazard", room: "Storeroom", status: "Actions due", actions: [2, 3], owner: "Grace Okafor", when: "2 weeks ago" },
      { id: "INC-0204", title: "Minor scratch from playground fence", kind: "Injury", room: "Back yard", status: "Closed", actions: [1, 1], owner: "Hana Sato", when: "2 weeks ago" },
    ],
    qas: [[64, 4, 26], [52, 7, 31], [70, 3, 18], [48, 8, 14], [66, 4, 12], [55, 5, 11], [42, 9, 17]],
  },
  {
    id: "wattle-grove",
    name: "Wattle Grove Early Learning",
    type: "Long day care",
    state: "VIC",
    status: "Needs attention",
    summary: { overdue: 1, missing: 2, open: 2 },
    tiles: [
      { value: "14/18", label: "Tasks completed today", hot: false },
      { value: "2", label: "Records expiring soon", hot: true },
      { value: "2", label: "Outstanding actions", hot: false },
      { value: "1", label: "Policies due for review", hot: false },
    ],
    actions: [
      { task: "Sleep room temperature log", who: "Babies educators", when: "Today", hot: true },
      { task: "Upload first aid certificate for Zoe Hart", who: "Zoe Hart", when: "This week", hot: false },
    ],
    briefing: [
      ["3", "inspections not yet started"],
      ["2", "staff records incomplete"],
      ["1", "unresolved risk"],
      ["3", "deadlines this fortnight"],
    ],
    insight:
      "One task is late and two staff records are missing documents. The digital devices policy has been read by fewer than half the team.",
    lists: { open: 5, play: 4, sleep: 2, close: 0 },
    staff: [
      { name: "Elise Morgan", role: "Centre Director", wwcc: 250, firstAid: 130, childProtection: 200, missing: [] },
      { name: "Zoe Hart", role: "Room Leader", wwcc: 120, firstAid: 20, childProtection: 150, missing: ["First aid certificate"] },
      { name: "Kai Anderson", role: "Educator", wwcc: 26, firstAid: 210, childProtection: 90, missing: [] },
      { name: "Rosa Mendez", role: "Educator, Babies", wwcc: 300, firstAid: 80, childProtection: 55, missing: ["Induction sign-off"] },
    ],
    policyRead: [8, 8, 3, 7, 5, 8],
    policyDays: [120, 60, 25, 180, 90, 250],
    incidents: [
      { id: "INC-0092", title: "Child pinched finger in cupboard door", kind: "Injury", room: "Toddler room", status: "Actions due", actions: [1, 2], owner: "Zoe Hart", when: "Tue" },
      { id: "INC-0091", title: "Spill on kitchen floor, near slip", kind: "Near miss", room: "Kitchen", status: "Open", actions: [0, 1], owner: "Elise Morgan", when: "Mon" },
      { id: "INC-0090", title: "Child unwell with rash, parent called", kind: "Illness", room: "Babies room", status: "Closed", actions: [2, 2], owner: "Rosa Mendez", when: "Last week" },
    ],
    qas: [[78, 3, 33], [72, 4, 40], [85, 2, 22], [74, 3, 20], [84, 2, 15], [76, 3, 17], [68, 4, 21]],
  },
];

export const getCentre = (id: string): Centre | undefined =>
  centres.find((c) => c.id === id);
