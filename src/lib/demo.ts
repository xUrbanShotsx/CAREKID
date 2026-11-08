/** Sample data for the demo workspace. Every name here is fictional. */

export const centre = {
  name: "Little Steps Early Learning",
  type: "Long day care",
  state: "NSW",
};

export const me = { name: "Priya Nair", initials: "PN", role: "Centre Director" };

export const tiles = [
  { value: "18/22", label: "Tasks completed today", hot: false },
  { value: "3", label: "Records expiring soon", hot: true },
  { value: "5", label: "Outstanding actions", hot: true },
  { value: "2", label: "Policies due for review", hot: false },
];

export const actions: { task: string; who: string; when: string; hot: boolean }[] = [
  { task: "Outdoor playground inspection", who: "Room Leader", when: "Today", hot: true },
  { task: "First aid certificate review", who: "Centre Director", when: "This week", hot: false },
  { task: "Policy acknowledgement pending", who: "2 staff", when: "This week", hot: false },
  { task: "Evacuation drill, monthly", who: "Centre Director", when: "3 days late", hot: true },
  { task: "Upload training certificate for Jo Lim", who: "Jo Lim", when: "Next week", hot: false },
];

export const briefing: [string, string][] = [
  ["2", "inspections not yet started"],
  ["3", "staff records incomplete"],
  ["1", "unresolved risk, due Thursday"],
  ["4", "deadlines this fortnight"],
];

export type Check = { id: string; text: string };
export type Checklist = {
  id: string;
  title: string;
  room: string;
  owner: string;
  checks: Check[];
  done: string[];
};

export const checklists: Checklist[] = [
  {
    id: "open",
    title: "Opening checklist",
    room: "Whole centre",
    owner: "Room leaders",
    done: ["o1", "o2", "o3", "o4", "o5"],
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
    room: "Toddler yard",
    owner: "Room leader",
    done: ["p1", "p2", "p3"],
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
    done: ["s1"],
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
    done: [],
    checks: [
      { id: "c1", text: "All children signed out" },
      { id: "c2", text: "Gates and windows locked" },
      { id: "c3", text: "Bins out and kitchen cleaned" },
      { id: "c4", text: "Alarm set" },
    ],
  },
];

export type Staff = {
  name: string;
  role: string;
  wwcc: number;
  firstAid: number;
  childProtection: number;
  missing: string[];
};

/** Days until each credential expires. */
export const staff: Staff[] = [
  { name: "Priya Nair", role: "Centre Director", wwcc: 412, firstAid: 188, childProtection: 301, missing: [] },
  { name: "Sam Kowalski", role: "Educational Leader", wwcc: 530, firstAid: 22, childProtection: 240, missing: [] },
  { name: "Jo Lim", role: "Room Leader, Toddlers", wwcc: 96, firstAid: 140, childProtection: 18, missing: ["Training certificate"] },
  { name: "Amira Haddad", role: "Educator, Babies", wwcc: 28, firstAid: 260, childProtection: 330, missing: [] },
  { name: "Tom Bright", role: "Educator, Preschool", wwcc: 610, firstAid: -4, childProtection: 150, missing: ["First aid certificate"] },
  { name: "Lena Fischer", role: "Casual educator", wwcc: 365, firstAid: 90, childProtection: 75, missing: ["Induction sign-off"] },
];

export type Policy = {
  name: string;
  version: string;
  status: "Approved" | "Draft" | "In review";
  review: string;
  daysToReview: number;
  read: [number, number];
  ref: string;
};

export const policies: Policy[] = [
  { name: "Sleep and Rest Policy", version: "v2", status: "Approved", review: "Review overdue", daysToReview: -62, read: [9, 12], ref: "Reg 81, Reg 168" },
  { name: "Child Safe Environment Policy", version: "v4", status: "Approved", review: "In 9 days", daysToReview: 9, read: [12, 12], ref: "Reg 168" },
  { name: "Digital Devices and Photography Policy", version: "v1", status: "In review", review: "In 3 months", daysToReview: 92, read: [4, 12], ref: "Child safety reforms" },
  { name: "Incident, Injury and Illness Policy", version: "v3", status: "Approved", review: "In 5 months", daysToReview: 150, read: [11, 12], ref: "Reg 85 to 87" },
  { name: "Water Safety Policy", version: "v2", status: "Draft", review: "Not scheduled", daysToReview: 999, read: [0, 12], ref: "Reg 168" },
  { name: "Emergency and Evacuation Policy", version: "v5", status: "Approved", review: "In 7 months", daysToReview: 210, read: [12, 12], ref: "Reg 97" },
];

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

export const incidents: Incident[] = [
  { id: "INC-0145", title: "Child fell from low climbing frame, graze to knee", kind: "Injury", room: "Toddler yard", status: "Open", actions: [0, 2], owner: "Jo Lim", when: "Today" },
  { id: "INC-0144", title: "Loose bolt found on swing set", kind: "Hazard", room: "Toddler yard", status: "Actions due", actions: [1, 3], owner: "Priya Nair", when: "Mon" },
  { id: "INC-0143", title: "Door nearly closed on a child's fingers", kind: "Near miss", room: "Preschool", status: "Actions due", actions: [1, 2], owner: "Tom Bright", when: "Last week" },
  { id: "INC-0142", title: "Child unwell with fever, parent called", kind: "Illness", room: "Babies room", status: "Closed", actions: [2, 2], owner: "Amira Haddad", when: "Last week" },
];

export const qas: { qa: string; name: string; pct: number; gaps: number; evidence: number }[] = [
  { qa: "QA1", name: "Educational program and practice", pct: 82, gaps: 2, evidence: 41 },
  { qa: "QA2", name: "Children's health and safety", pct: 74, gaps: 4, evidence: 52 },
  { qa: "QA3", name: "Physical environment", pct: 90, gaps: 1, evidence: 28 },
  { qa: "QA4", name: "Staffing arrangements", pct: 66, gaps: 5, evidence: 24 },
  { qa: "QA5", name: "Relationships with children", pct: 88, gaps: 1, evidence: 19 },
  { qa: "QA6", name: "Collaborative partnerships with families and communities", pct: 71, gaps: 3, evidence: 22 },
  { qa: "QA7", name: "Governance and leadership", pct: 58, gaps: 6, evidence: 28 },
];

export const centres: { name: string; type: string; state: string; overdue: number; missing: number; open: number }[] = [
  { name: "Little Steps Early Learning", type: "Long day care", state: "NSW", overdue: 2, missing: 1, open: 3 },
  { name: "Maple Street OSHC", type: "Before and after school", state: "NSW", overdue: 0, missing: 0, open: 1 },
  { name: "Harbour Kids Preschool", type: "Preschool", state: "NSW", overdue: 5, missing: 4, open: 7 },
  { name: "Wattle Grove Early Learning", type: "Long day care", state: "VIC", overdue: 1, missing: 2, open: 2 },
];

export const aiInsight =
  "Two policies are approaching their scheduled review dates. One educator's training record is missing an uploaded completion certificate. Review these records before marking the associated tasks complete.";
