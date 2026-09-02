/* ============================================================================
   The Trace — content.
   Structure A: their questions (hierarchical, 4 categories).
   Structure B: the project (chronological, 10 moments).
   Authors write question.links only. moment.answers[] is derived at render time.
   ========================================================================== */

const TRACE = {

  meta: {
    project:  "UARC2",
    subtitle: "Supply chain visibility and failure diagnostics, Amazon Fresh",
    owner:    "Michael Fitzpatrick",
    forRole:  "Staff Product Manager, Trucking Technology"
  },

  /* Reproduced from the Flexport candidate portal so the opening state is
     recognisable to Phil as his own document. */
  portal: {
    preamble: "To prepare, select one major product or feature from the last 1 to 3 years where you were the primary driver. Be ready to discuss the following layers of that product:",
    footnotes: [
      "Use STAR+: Situation, Task, Action, Result plus Learning.",
      "Quantify everything. Have your SQL and metric success stories ready.",
      "Show backbone. Prepare an example of saying no to a high-stakes stakeholder to protect the product.",
      "Technical depth. Be ready to explain the how behind your feature."
    ]
  },

  categories: [
    { id:"why",       label:"The Why (Strategy)",     order:1, tint:"c1",
      portalLine:"What was the specific pain point? How did you validate it was the right problem to solve?" },
    { id:"discovery", label:"Discovery & Trade-offs", order:2, tint:"c2",
      portalLine:"What were the alternative solutions? Why did you pick this path and what did you intentionally not build?" },
    { id:"execution", label:"Execution & Delivery",   order:3, tint:"c3",
      portalLine:"How did you partner with Eng and Design? Describe a specific technical hurdle or pivot you navigated." },
    { id:"impact",    label:"Impact (Metrics)",       order:4, tint:"c4",
      portalLine:"What was the concrete outcome? What would you do differently today?" }
  ],

  questions: [
    { id:"Q01", category:"why", chip:"The pain point",
      text:"What was the specific pain point?",
      links:[ {moment:"M01", role:"primary"}, {moment:"M02", role:"supporting"} ] },
    { id:"Q02", category:"why", chip:"How I validated it",
      text:"How did you validate it was the right problem to solve?",
      links:[ {moment:"M03", role:"primary"}, {moment:"M01", role:"supporting"}, {moment:"M04", role:"supporting"} ] },
    { id:"Q03", category:"why", chip:"Who the customer was",
      text:"Who was the customer, and what did they actually tell you?",
      links:[ {moment:"M01", role:"primary"}, {moment:"M05", role:"supporting"} ] },

    { id:"Q04", category:"discovery", chip:"Alternatives",
      text:"What were the alternative solutions?",
      links:[ {moment:"M02", role:"primary"}, {moment:"M04", role:"supporting"} ] },
    { id:"Q05", category:"discovery", chip:"Why this path",
      text:"Why did you pick this path?",
      links:[ {moment:"M03", role:"primary"}, {moment:"M02", role:"supporting"} ] },
    { id:"Q06", category:"discovery", chip:"What I did not build",
      text:"What did you intentionally not build?",
      links:[ {moment:"M06", role:"primary"}, {moment:"M08", role:"supporting"} ] },
    { id:"Q07", category:"discovery", chip:"What I cut for MVP",
      text:"What did you cut to get to a shippable MVP?",
      links:[ {moment:"M06", role:"primary"}, {moment:"M04", role:"supporting"} ] },

    { id:"Q08", category:"execution", chip:"Eng and science",
      text:"How did you partner with Engineering and Science?",
      links:[ {moment:"M08", role:"primary"}, {moment:"M03", role:"supporting"} ] },
    { id:"Q09", category:"execution", chip:"Technical hurdle",
      text:"Describe a specific technical hurdle or pivot you navigated.",
      links:[ {moment:"M08", role:"primary"} ] },
    { id:"Q10", category:"execution", chip:"Seven orgs aligned",
      text:"How did you keep seven orgs aligned without the roadmap thrashing?",
      links:[ {moment:"M05", role:"primary"}, {moment:"M04", role:"supporting"} ] },
    { id:"Q11", category:"execution", chip:"Saying no",
      text:"Tell me about saying no to a high-stakes stakeholder to protect the product.",
      links:[ {moment:"M06", role:"primary"}, {moment:"M07", role:"supporting"} ] },

    { id:"Q12", category:"impact", chip:"The outcome",
      text:"What was the concrete outcome?",
      links:[ {moment:"M09", role:"primary"}, {moment:"M10", role:"supporting"} ] },
    { id:"Q13", category:"impact", chip:"Proving the 4x",
      text:"How do you know the 4x improvement was real?",
      links:[ {moment:"M09", role:"primary"}, {moment:"M03", role:"supporting"} ] },
    { id:"Q14", category:"impact", chip:"Do differently",
      text:"What would you do differently today?",
      links:[ {moment:"M07", role:"primary"}, {moment:"M10", role:"supporting"} ] },
    { id:"Q15", category:"impact", chip:"What I learned",
      text:"What did you learn, beyond the result?",
      links:[ {moment:"M10", role:"primary"}, {moment:"M07", role:"supporting"} ] }
  ],

  /* Chronological. Fragments are CUES, never prose. Three or four per moment. */
  moments: [
    { id:"M01", label:"Went to the users", when:"Month 0",
      headline:"Stockout attribution came back as the top gap",
      fragments:[
        "Asked seven orgs where the pain was",
        "Did not start from a solution",
        "Answer was consistent: no defensible root cause",
        "Three theories per stockout, no way to choose"
      ] },

    { id:"M02", label:"Found the ceiling", when:"Month 0",
      headline:"The existing tool surfaced correlation, and could not surface cause",
      fragments:[
        "Audited what we already had",
        "It ranked what happened before, in order",
        "Structural limit rather than a tuning problem",
        "Alternative was to tune it. Ceiling was too low."
      ] },

    { id:"M03", label:"Single-FC pilot", when:"Month 1",
      headline:"Instrumented one fulfillment center to test causation",
      fragments:[
        "Pitched the science lead on a prototype",
        "Hypothesis: decompose the chain into linked states",
        "One site, real data, cheap to be wrong",
        "De-risked before asking anyone for money"
      ] },

    { id:"M04", label:"Won funding", when:"Month 2",
      headline:"Took a result to leadership instead of an opinion",
      fragments:[
        "Data-backed proposal, not a pitch deck",
        "Twelve-month build approved",
        "Scope framed as a floor, not a wish list"
      ] },

    { id:"M05", label:"Seven orgs, one framework", when:"Months 2 to 4",
      headline:"Moved prioritization off personalities and onto shared criteria",
      fragments:[
        "Every org wanted its own features first",
        "Added actionability alongside raw impact",
        "High impact nobody can act on ranks below moderate impact they can",
        "Weekly working sync with their ICs and FLMs"
      ] },

    { id:"M06", label:"Said no to two weeks", when:"Month 5",
      headline:"My director had promised a VP a two-week launch",
      fragments:[
        "A wrong root cause is worse than no answer",
        "Built three scoped options, each with what it could and could not claim",
        "Asked for the room with my director and the VP together",
        "Landed on the middle option with criteria I could defend"
      ] },

    { id:"M07", label:"Lost the north star", when:"Month 7",
      headline:"Leadership pushed to drop the metric, and I let it go",
      fragments:[
        "Bought a quiet quarter",
        "Each org drifted back to its own measure",
        "Months of adoption churn re-litigating settled things",
        "The metric was the mechanism, not the paperwork"
      ] },

    { id:"M08", label:"Twelve months of build", when:"Months 2 to 12",
      headline:"Three cadences at three altitudes, plus the VP demo",
      fragments:[
        "Daily standup with eng and science",
        "Weekly tactical with ICs and first-line managers",
        "Biweekly with Senior Managers and Directors",
        "VP demo won the following year's funding"
      ] },

    { id:"M09", label:"Launched", when:"January 2026",
      headline:"4x more accurate than the system it replaced",
      fragments:[
        "MAPE roughly 8 against 32",
        "Traced a stockout to a strawberry crop failure",
        "And to a bug in forecast-and-buy on long-lead-time items",
        "One attributable cause instead of five plausible ones"
      ] },

    { id:"M10", label:"Reinstated the metric", when:"Post-launch",
      headline:"Adoption followed the metric back",
      fragments:[
        "92% adoption as the default decision layer",
        "Up to 200 bps instock lift in some categories",
        "Adoption was a design outcome, not a rollout plan",
        "By launch it was already their product"
      ] }
  ]
};
