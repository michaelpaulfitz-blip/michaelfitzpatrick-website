/* ============================================================================
   content.js  -  ALL copy and data for the Flexport Visibility experience map.
   index.html is the renderer. It contains NO prose. Edit content here only.

   Every item has an ID. In DRAFT mode the page renders those IDs, so changes
   can be requested as "kill R04, W07 needs a harder number".

   Nothing is ever deleted. Cut items move to CONTENT.parked.

   SCAFFOLD 2026-09-11. Every entry marked PLACEHOLDER is filler so the page
   renders without orphans. The JD mine replaces them; the schema stays as is.

   Schema (identical to the flexport-trucking-tech-demo reference build):
     meta        { title, subtitle, preparedFor, author, date }
     popups[]    { id, tone, title, body, dismissLabel, linkLabel?, linkTarget? }
     todos[]     { id, status, question, why, proposal }
     mapping
       problems[] { id, title, fromJD, why }
       work[]     { id, name, outcome, detail }
       edges[]    { id, problem, work, strength, note }
     references
       primary[]   { id, label, title, url }
       secondary[] { group, items[ { title, url } ] }
     parked[]
   ========================================================================== */

const DRAFT  = true;           // draft banner, TODO panel, visible content IDs
const SHOW_TODOS = true;       // the floating "Open decisions" panel. Independent of DRAFT.

const CONTENT = {
  "meta": {
    "title": "Visibility at Flexport, and where my experience fits",
    "subtitle": "[HM name], I really enjoyed our conversation. I built this afterwards so you can explore it yourself: the problems I think this role is actually pointed at, and how my experience maps against them.",
    "preparedFor": "Flexport · Staff Product Manager, Visibility",
    "author": "Michael Fitzpatrick",
    "date": "September 2026"
  },
  "popups": [
    {
      "id": "M01",
      "tone": "red",
      "title": "This is built to be walked through, not read cold",
      "body": "This page is the visual half of a conversation. I built it to narrate live, so a lot of the reasoning lives in what I say over the top of it rather than on the screen. Read on its own it will feel thin in places, and that is by design. If you are seeing this without me, I am glad to walk you through it any time.",
      "dismissLabel": "Got it"
    },
    {
      "id": "M02",
      "tone": "yellow",
      "title": "Built from the outside, so some of it will be wrong",
      "body": "Everything here comes from publicly available sources. I have no access to Flexport's internal data, so some of these conclusions are certainly wrong, and the ones that are right are right by inference rather than by evidence. Treat this as a demonstration of how I frame a problem and work a domain, rather than as a set of recommendations I would defend without seeing the real numbers. I would genuinely like to know which parts I got wrong.",
      "dismissLabel": "Understood",
      "linkLabel": "See the sources",
      "linkTarget": "#references"
    }
  ],
  "todos": [
    {
      "id": "T01",
      "status": "open",
      "question": "Replace every PLACEHOLDER entry once the JD mine lands.",
      "why": "problems[], work[], edges[] and references.primary[] are filler so the shell renders. None of it is real content.",
      "proposal": "Swap the data in place. Keep the IDs stable (R01.., W01.., E01.., REF01..) so feedback can reference them. Bump the cache-buster in index.html on the same commit."
    },
    {
      "id": "T02",
      "status": "open",
      "question": "Who is the hero note addressed to?",
      "why": "meta.subtitle currently opens with [HM name]. If the recipient is unknown at send time, drop the name and address the role.",
      "proposal": "Fill in after the first conversation. Keep it to two sentences and keep it human."
    },
    {
      "id": "T03",
      "status": "open",
      "question": "Flip DRAFT to false and clear this panel before the link goes to anyone.",
      "why": "Draft mode shows the yellow bar, the content ID chips and this panel. None of that should reach a hiring manager.",
      "proposal": "After the content pass, set DRAFT = false, bump the cache-buster, push, and re-verify the live URL at /flexport-visibility/."
    }
  ],
  "mapping": {
    "problems": [
      {
        "id": "R01",
        "title": "PLACEHOLDER R01: replaced after JD mine",
        "fromJD": "PLACEHOLDER: JD line that this problem traces to",
        "why": "PLACEHOLDER R01: one or two sentences on where this problem came from, in Flexport's own operational vocabulary."
      },
      {
        "id": "R02",
        "title": "PLACEHOLDER R02: replaced after JD mine",
        "fromJD": "PLACEHOLDER: JD line that this problem traces to",
        "why": "PLACEHOLDER R02: one or two sentences on where this problem came from, in Flexport's own operational vocabulary."
      },
      {
        "id": "R03",
        "title": "PLACEHOLDER R03: replaced after JD mine",
        "fromJD": false,
        "why": "PLACEHOLDER R03: research-derived problem (fromJD false). One or two sentences naming the source."
      }
    ],
    "work": [
      {
        "id": "W01",
        "name": "PLACEHOLDER W01: replaced after JD mine",
        "outcome": "PLACEHOLDER 0% outcome with a hard number",
        "detail": "PLACEHOLDER W01: two sentences maximum. What the problem was, what Mike did. Metrics come verbatim from the project-*.md memory files."
      },
      {
        "id": "W02",
        "name": "PLACEHOLDER W02: replaced after JD mine",
        "outcome": "PLACEHOLDER 0% outcome with a hard number",
        "detail": "PLACEHOLDER W02: two sentences maximum. What the problem was, what Mike did. Metrics come verbatim from the project-*.md memory files."
      },
      {
        "id": "W03",
        "name": "PLACEHOLDER W03: replaced after JD mine",
        "outcome": "PLACEHOLDER 0% outcome with a hard number",
        "detail": "PLACEHOLDER W03: two sentences maximum. What the problem was, what Mike did. Metrics come verbatim from the project-*.md memory files."
      }
    ],
    "edges": [
      {
        "id": "E01",
        "problem": "R01",
        "work": "W01",
        "strength": "primary",
        "note": "PLACEHOLDER E01: replaced after JD mine"
      },
      {
        "id": "E02",
        "problem": "R02",
        "work": "W02",
        "strength": "primary",
        "note": "PLACEHOLDER E02: replaced after JD mine"
      },
      {
        "id": "E03",
        "problem": "R03",
        "work": "W03",
        "strength": "primary",
        "note": "PLACEHOLDER E03: replaced after JD mine"
      },
      {
        "id": "E04",
        "problem": "R01",
        "work": "W02",
        "strength": "supporting",
        "note": "PLACEHOLDER E04: replaced after JD mine"
      }
    ]
  },
  "references": {
    "primary": [
      {
        "id": "REF01",
        "label": "PLACEHOLDER REF01: the job description, replaced after JD mine",
        "title": "Staff Product Manager, Visibility · Flexport [VERIFY] URL",
        "url": "#references"
      }
    ],
    "secondary": [
      { "group": "Flexport: company, product, and platform", "items": [] },
      { "group": "Industry and market analysis", "items": [] },
      { "group": "Practitioner and operator sources", "items": [] },
      { "group": "Competitor and adjacent products", "items": [] }
    ]
  },
  "parked": []
};
