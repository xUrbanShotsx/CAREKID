/** Sample enquiries and waitlist for the demo workspace. Fictional. */
export const STAGES = ["Enquiry", "Tour booked", "Offered a place", "Enrolment form sent", "Enrolled", "Declined"] as const;

export type Enquiry = {
  id: string;
  centreId: string;
  child: string;
  age: string;
  parent: string;
  days: string;
  start: string;
  source: string;
  /** Priority points from the centre's own waitlist rules. */
  score: number;
  stage: (typeof STAGES)[number];
  form: number;
  note?: string;
  /** Set once the enquiry has been enrolled as a child. */
  childId?: string;
  phone?: string;
  email?: string;
};

export const enquiries: Enquiry[] = [
  { id: "e1", centreId: "little-steps", child: "Harvey Lowe", age: "8 months", parent: "Kirsty Lowe", days: "Mon, Tue, Wed", start: "Feb 2027", source: "Website", score: 82, stage: "Offered a place", form: 60, note: "Sibling already enrolled" },
  { id: "e2", centreId: "little-steps", child: "Ada Ng", age: "2 yrs", parent: "Wei Ng", days: "Tue, Thu", start: "Jan 2027", source: "Referral", score: 64, stage: "Tour booked", form: 0, note: "Tour Thursday 10am" },
  { id: "e3", centreId: "little-steps", child: "Zeke Barrett", age: "11 months", parent: "Dani Barrett", days: "Mon to Fri", start: "Mar 2027", source: "Google", score: 51, stage: "Enquiry", form: 0 },
  { id: "e4", centreId: "little-steps", child: "Poppy Salim", age: "3 yrs", parent: "Aisha Salim", days: "Wed, Thu, Fri", start: "Jan 2027", source: "Website", score: 70, stage: "Enrolment form sent", form: 35 },
  { id: "e5", centreId: "maple-street", child: "Tilly Grant", age: "5 yrs", parent: "Jo Grant", days: "Before and after school, Mon to Fri", start: "Term 1 2027", source: "School newsletter", score: 77, stage: "Tour booked", form: 0 },
  { id: "e6", centreId: "maple-street", child: "Ravi Menon", age: "6 yrs", parent: "Suresh Menon", days: "After school, Tue to Thu", start: "Term 1 2027", source: "Referral", score: 58, stage: "Enquiry", form: 0 },
  { id: "e7", centreId: "harbour-kids", child: "Imogen Park", age: "3 yrs", parent: "Soo Park", days: "Mon to Wed", start: "Jan 2027", source: "Website", score: 66, stage: "Offered a place", form: 80 },
  { id: "e8", centreId: "harbour-kids", child: "Dev Patel", age: "4 yrs", parent: "Anil Patel", days: "Thu, Fri", start: "Jan 2027", source: "Google", score: 49, stage: "Enquiry", form: 0 },
  { id: "e9", centreId: "harbour-kids", child: "Sage Whitby", age: "3 yrs", parent: "Lou Whitby", days: "Mon to Fri", start: "Feb 2027", source: "Referral", score: 73, stage: "Enrolment form sent", form: 20 },
  { id: "e10", centreId: "wattle-grove", child: "Noor Aziz", age: "10 months", parent: "Huda Aziz", days: "Mon to Thu", start: "Feb 2027", source: "Website", score: 80, stage: "Tour booked", form: 0 },
  { id: "e11", centreId: "wattle-grove", child: "Bodhi Hart", age: "2 yrs", parent: "Zoe Hart", days: "Tue, Wed", start: "Jan 2027", source: "Staff family", score: 90, stage: "Offered a place", form: 100, note: "Staff child" },
];
