export const SITE_NAME = "CareKid";
export const SITE_TAGLINE = "The compliance and operations hub for Australian childcare";
export const SITE_DESCRIPTION =
  "CareKid keeps Australian long day care, preschool, before school and after school care centres audit-ready: daily checklists, staff credentials, policies, incidents and NQS evidence in one place.";
export const SITE_URL = "https://carekid.com.au";

export type Module = {
  id: string;
  name: string;
  blurb: string;
  features: string[];
};

export const modules: Module[] = [
  {
    id: "dashboard",
    name: "Compliance Dashboard",
    blurb: "One screen that shows what is done, what is due and what is late.",
    features: [
      "Central compliance overview",
      "Outstanding compliance task register",
      "Upcoming expiry and deadline alerts",
      "State-specific compliance obligations",
      "Regulatory change notifications",
      "Compliance evidence repository",
      "Compliance history and audit trails",
      "Downloadable audit preparation reports",
    ],
  },
  {
    id: "children",
    name: "Children & Attendance",
    blurb: "A live roll, a profile for every child and a note beside each name.",
    features: [
      "Daily attendance roll by room",
      "Educator and parent sign-in and sign-out",
      "Parent kiosk with PIN",
      "Live educator-to-child ratio checks",
      "Authorised collector checks at pick-up",
      "Release restriction and court order alerts",
      "Absence recording with reasons",
      "Notes beside each child, by category",
      "Child profiles for behaviour and wellbeing",
      "Parent, guardian and emergency contacts",
      "Consent and permission records",
      "QR-code room sign-in sheets",
    ],
  },
  {
    id: "health",
    name: "Health & Allergies",
    blurb: "Every allergy, condition and medication, where the room can see it.",
    features: [
      "Allergy and anaphylaxis register",
      "Severity flags on the roll and in every room",
      "Medical condition and action plan records",
      "Medication held on site with expiry alerts",
      "Dietary requirements for the kitchen",
      "Immunisation record tracking",
      "Printable allergy list for each room",
      "Doctor and emergency treatment details",
    ],
  },
  {
    id: "families",
    name: "Family Communication",
    blurb: "One clear update per child at the end of the day, from the notes you already wrote.",
    features: [
      "Daily family updates built from staff notes",
      "Staff-only notes kept out of updates",
      "Routine logging for meals, sleep, toileting and sunscreen",
      "Absence and late arrival notices",
      "Incident notifications to families",
      "Policy and consent requests",
      "Free family access",
      "Message and send history",
    ],
  },
  {
    id: "enrol",
    name: "Enrolment & Waitlist",
    blurb: "From first enquiry to an enrolled child, ranked by your own rules.",
    features: [
      "Enquiry and waitlist register",
      "Priority scoring from your own rules",
      "Tour booking and reminders",
      "Online enrolment forms",
      "Offer and acceptance tracking",
      "Child and family profiles created on enrolment",
      "Occupancy and demand reporting",
      "Enquiry source reporting",
    ],
  },
  {
    id: "daily",
    name: "Daily Centre Operations",
    blurb: "The checks that happen every day, done on a phone in the room.",
    features: [
      "Opening and closing checklists",
      "Indoor and outdoor safety inspections",
      "Playground and equipment checks",
      "Cleaning and hygiene schedules",
      "Kitchen and food safety records",
      "Sleep and rest environment checks",
      "Emergency equipment inspections",
      "Daily educator task assignments",
      "QR-code room inspection forms",
    ],
  },
  {
    id: "staff",
    name: "Staff & Qualifications",
    blurb: "Every credential on file, with a date, before it lapses.",
    features: [
      "Staff compliance profiles",
      "Working with Children Check register",
      "First aid and CPR currency tracker",
      "Child protection training register",
      "Qualification and certificate storage",
      "Staff induction and onboarding",
      "Training completion and acknowledgements",
      "Staff meeting records",
      "Credential expiry notifications",
      "Staff compliance overview",
    ],
  },
  {
    id: "policies",
    name: "Policies & Procedures",
    blurb: "Policies that are current, approved and read by the people who use them.",
    features: [
      "Central policy library",
      "AI-assisted policy drafting",
      "AI-assisted gap reviews",
      "Document version history",
      "Policy review date scheduling",
      "Staff read-and-acknowledge workflows",
      "Policy approval and publication controls",
      "Approved policy template library",
      "Policy-to-regulation cross-references",
    ],
  },
  {
    id: "incidents",
    name: "Incident & Risk Management",
    blurb: "From the first report to the last corrective action, with a trail.",
    features: [
      "Incident and injury reporting workflows",
      "Hazard and near-miss register",
      "Corrective action assignments",
      "Serious incident escalation prompts",
      "Risk assessment builder",
      "Emergency drill recording",
      "Incident trend reports",
      "Evidence attachment and audit trail",
      "Restricted-access case management",
    ],
  },
  {
    id: "nqs",
    name: "Quality Improvement & NQS",
    blurb: "Evidence tagged against the seven Quality Areas as the work happens.",
    features: [
      "Digital Quality Improvement Plan",
      "Seven NQS Quality Areas tracker",
      "Improvement action plans",
      "Evidence tagging against NQS elements",
      "Self-assessment questionnaires",
      "Progress and review history",
      "Assessment preparation reports",
      "AI-assisted evidence gap review",
    ],
  },
  {
    id: "safeguarding",
    name: "Child Safety & Safeguarding",
    blurb: "Sensitive records, locked to the people who should see them.",
    features: [
      "Child safety policies register",
      "Digital device and photography policy tracker",
      "Safeguarding training records",
      "Child safety risk assessments",
      "Confidential concern reporting",
      "Restricted safeguarding case records",
      "Mandatory reporting guidance and escalation",
      "Parental consent record tracking",
    ],
  },
  {
    id: "facilities",
    name: "Facilities & Maintenance",
    blurb: "Repairs, servicing and warranties without a folder of invoices.",
    features: [
      "Maintenance request register",
      "Contractor and supplier directory",
      "Equipment servicing schedules",
      "Fire safety equipment records",
      "Cleaning and pest control logs",
      "Asset warranty and expiry tracker",
      "Contractor work completion records",
      "Maintenance cost reports",
    ],
  },
  {
    id: "whs",
    name: "Work Health & Safety",
    blurb: "The WHS duties of a workplace, kept alongside the childcare ones.",
    features: [
      "WHS inspection checklists",
      "Hazard and risk register",
      "Staff injury reporting",
      "Safety meeting records",
      "Emergency procedures and drills",
      "Chemical and SDS register",
      "Manual handling training records",
      "Corrective action tracking",
    ],
  },
  {
    id: "ai",
    name: "AI Compliance Intelligence",
    blurb: "AI that points at the gap and shows its source. People decide.",
    features: [
      "AI document gap analysis",
      "Missing evidence detection",
      "Weekly director compliance summary",
      "AI compliance questions with source citations",
      "Regulatory change impact summaries",
      "Suggested corrective actions",
      "Natural-language report generation",
      "AI policy comparison and review",
      "Predictive compliance risk trends",
    ],
  },
  {
    id: "multi",
    name: "Multi-Centre Management",
    blurb: "Owners see every centre in one view, without chasing reports.",
    features: [
      "Multi-centre compliance command centre",
      "Overdue actions by location",
      "Outstanding documents by location",
      "Unresolved issues by location",
      "Centre-to-centre comparison",
      "Group-level reports",
      "Shared policy library across centres",
      "Centre-level permissions",
    ],
  },
  {
    id: "platform",
    name: "Platform Administration",
    blurb: "The plumbing: permissions, storage, history and exports.",
    features: [
      "Role-based user permissions",
      "Secure document storage",
      "Complete activity and change history",
      "Email and in-app notifications",
      "Mobile-responsive educator interface",
      "Custom checklist builder",
      "Recurring task and workflow engine",
      "Centre onboarding wizard",
      "Subscription billing and account management",
      "Existing software integrations",
      "Data export and retention controls",
    ],
  },
];

export const featureCount = modules.reduce((n, m) => n + m.features.length, 0);

export const pains: [string, string][] = [
  [
    "The fridge temperature sheet was signed on Monday, for the whole week.",
    "Checks are done on a phone in the room, stamped with who and when. Missed ones show up that day.",
  ],
  [
    "A first aid certificate lapses because the reminder was in someone's diary.",
    "Alerts before every credential expires, sent to the educator and the director.",
  ],
  [
    "Nobody can say which version of the sleep policy is the current one.",
    "One approved version per policy, with a review date and a record of who has read it.",
  ],
  [
    "An incident is reported on paper and never closed out.",
    "Every report has an owner, a due date and corrective actions that stay open until they are done.",
  ],
  [
    "Assessment week means three days of hunting for evidence.",
    "Evidence is tagged against the Quality Areas as it is filed, so the pack is an export.",
  ],
  [
    "The owner finds out a centre is behind when the regulator does.",
    "A command centre shows overdue work at every location, without a request to anyone.",
  ],
];

export const differentiators = [
  {
    id: "auditor",
    n: "01",
    title: "AI Compliance Document Auditor",
    body: "Upload the policies, staff records and compliance documents you already have. CareKid compares them with a curated requirements library, highlights possible gaps and explains why each one needs a look. Every finding links to the guidance or legislation behind it.",
    points: ["Works on the documents you already have", "Each finding cites its source", "A person confirms before anything changes"],
  },
  {
    id: "calendar",
    n: "02",
    title: "Automated Compliance Calendar",
    body: "When a centre joins, its service type, state and operating details generate a tailored schedule of tasks. They recur, reminders go out, and overdue work escalates to management without anyone chasing it.",
    points: ["Built from your service type and state", "Recurring tasks and reminders", "Overdue items escalate to the director, then the owner"],
  },
  {
    id: "assessment",
    n: "03",
    title: "Assessment & Rating Preparation",
    body: "A preparation workspace organised around the seven National Quality Standard Quality Areas. See the documents, completed actions and likely evidence gaps for each one, then export an organised evidence pack.",
    points: ["Seven Quality Areas, one workspace", "Evidence tagged to NQS elements", "Exportable evidence pack"],
  },
  {
    id: "briefing",
    n: "04",
    title: "Director's Morning Briefing",
    body: "Each morning the director gets the outstanding inspections, incomplete staff records, unresolved risks and upcoming deadlines for the day. It turns CareKid into the first thing opened at the desk, not another filing system.",
    points: ["Delivered before the doors open", "Inspections, records, risks, deadlines", "Every line links to the task"],
  },
  {
    id: "command",
    n: "05",
    title: "Multi-Centre Compliance Command Centre",
    body: "Owners with several centres see which locations have overdue actions, outstanding documents and unresolved issues, without asking each director for a separate report.",
    points: ["Every location on one screen", "Overdue, outstanding, unresolved", "Drill into any centre"],
  },
];

export const steps: [string, string][] = [
  [
    "Set up the centre",
    "Tell CareKid your service type, state, rooms and team. The onboarding wizard builds your checklists, task calendar and policy list.",
  ],
  [
    "Run the day",
    "Educators complete checks on a phone. Directors see what is done, what is late and what is about to expire.",
  ],
  [
    "Show the evidence",
    "Export an audit or assessment pack, or hand an assessor read-only access. Every record has its history.",
  ],
];

export const kinds: { tag: string; title: string; body: string }[] = [
  {
    tag: "Required",
    title: "Legally required",
    body: "Obligations that come from the National Law, the Regulations or your state or territory. Marked as required, with the source.",
  },
  {
    tag: "Recommended",
    title: "Good practice",
    body: "Guidance from regulators and sector bodies that is recommended but not mandatory. Marked as guidance, never as a legal duty.",
  },
  {
    tag: "Yours",
    title: "Centre procedures",
    body: "Checks and rules your centre sets for itself. You write them, you change them, and they are kept separate from the law.",
  },
];

export const plans = [
  {
    name: "Centre",
    price: "$149",
    note: "per centre, per month",
    blurb: "For an independent centre that wants the daily work and the records in one place.",
    items: [
      "Attendance, child profiles and health register",
      "Dashboard and role-based permissions",
      "Custom daily and recurring checklists",
      "Staff qualification and expiry monitoring",
      "Policy and document management",
      "Compliance calendar and alerts",
    ],
    featured: false,
  },
  {
    name: "Centre + AI",
    price: "$249",
    note: "per centre, per month",
    blurb: "Everything in Centre, plus the AI document auditor and the morning briefing.",
    items: [
      "Everything in Centre",
      "AI document review with cited references",
      "Director's morning briefing",
      "Assessment and rating preparation",
      "Audit and evidence pack exports",
    ],
    featured: true,
  },
  {
    name: "Group",
    price: "Talk to us",
    note: "for owners with several centres",
    blurb: "A command centre across locations, shared policies and group reporting.",
    items: [
      "Multi-centre command centre",
      "Shared policy library",
      "Group-level reports",
      "Centre-level permissions",
      "Onboarding help for each centre",
    ],
    featured: false,
  },
];

export const compare: { row: string; carekid: string; typical: string }[] = [
  { row: "Daily attendance and sign-in", carekid: "Core", typical: "Core" },
  { row: "Parent kiosk and family updates", carekid: "Core", typical: "Core" },
  { row: "Child profiles with behaviour and consents", carekid: "Core", typical: "Varies" },
  { row: "Live educator-to-child ratio check", carekid: "Core", typical: "Varies" },
  { row: "Allergy and medication register with expiry alerts", carekid: "Core", typical: "Basic medical details" },
  { row: "Release restriction alert at pick-up", carekid: "Core", typical: "Varies" },
  { row: "Staff credential register with expiry alerts", carekid: "Core", typical: "Rarely a focus" },
  { row: "Policy library with read-and-acknowledge", carekid: "Core", typical: "Rarely a focus" },
  { row: "NQS Quality Area evidence and QIP", carekid: "Core", typical: "Rarely a focus" },
  { row: "AI document auditor with cited sources", carekid: "Core", typical: "Rarely a focus" },
  { row: "Required, good practice and centre rules kept apart", carekid: "Core", typical: "Rarely a focus" },
  { row: "Incident to corrective action to audit pack", carekid: "Core", typical: "Incident forms" },
  { row: "Compliance command centre across centres", carekid: "Core", typical: "Occupancy reporting" },
  { row: "CCS submissions, invoicing and payments", carekid: "Use your billing system", typical: "Core" },
];

export const faqs: [string, string][] = [
  [
    "Does CareKid replace my childcare management system?",
    "Not for billing. CareKid covers attendance, child profiles, family updates, enrolment and everything compliance, but it does not do childcare subsidy billing, invoicing or full rostering. Keep your billing system for those and run CareKid beside it, or use it alone if you bill elsewhere.",
  ],
  [
    "Does CareKid tell me whether we are compliant?",
    "No. CareKid shows what is recorded, what is missing and what is due. AI findings are prompts for a person to review, with the source attached. A finding or a score is never proof that a centre meets the law.",
  ],
  [
    "Which states and territories does it cover?",
    "The product is built around the National Quality Framework, with state and territory obligations kept in a versioned rules library. We are starting with independent NSW long day care centres and widening from there.",
  ],
  [
    "Who can see incident and child safety records?",
    "Only the people you give access to. Incident, safeguarding and sensitive staff records sit behind restricted roles, with retention settings and a log of who opened what. Escalation to a regulator stays a human decision.",
  ],
  [
    "Can educators use it on the floor?",
    "Yes. The educator view is built for a phone: tap a room's QR code, tick the checks, add a photo and move on. Directors get the full desktop view.",
  ],
  [
    "Can we get our data out?",
    "Yes. You can export records and documents at any time, and retention settings stay in your control.",
  ],
];
