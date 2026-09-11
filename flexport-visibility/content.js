/* ============================================================================
   content.js  -  ALL copy and data for the Flexport Visibility experience map.
   index.html is the renderer. It contains NO prose. Edit content here only.

   Every item has an ID. In DRAFT mode the page renders those IDs, so changes
   can be requested as "kill R04, W07 needs a harder number".

   Nothing is ever deleted. Cut items move to CONTENT.parked.

   CONTENT PASS 2026-09-11. problems[], work[], edges[] and references are the
   real draft, built from the JD mine (research/11), the domain primer
   (research/12), the pain inventory (research/06) and the project-*.md memory
   files. Metrics are verbatim from those memory files and cleared for public
   use as written. Claims marked [VERIFY] or [INFERENCE] are outside-in.

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

   fromJD convention (same as the reference build): the JD line the problem
   traces to, as a string, when it comes from the posting; false when it is
   research-derived. The renderer does not display it; it is provenance.
   ========================================================================== */

const DRAFT  = true;           // draft banner, TODO panel, visible content IDs
const SHOW_TODOS = true;       // the floating "Open decisions" panel. Independent of DRAFT.

const CONTENT = {
  "meta": {
    "title": "Visibility at Flexport, and where my experience fits",
    "subtitle": "[HM name], I put this together after my conversation with Phil so you can explore it at your own pace: the visibility problems as I understand them from the outside, and how the work I have actually done maps onto them. Some of it will be wrong, and I would like to hear which parts.",
    "preparedFor": "Flexport · Staff Product Manager, Visibility",
    "author": "Michael Fitzpatrick",
    "date": "September 2026"
  },
  "popups": [
    {
      "id": "M01",
      "tone": "red",
      "title": "This is built to be walked through live",
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
      "question": "Who is the hero note addressed to, and does Visibility sit inside Phil Song's org?",
      "why": "meta.subtitle opens with [HM name]. The recruiter redirected Mike from the Trucking Technology loop, and whether Visibility reports into Ops Tech Product & Data Services or a peer org is unconfirmed.",
      "proposal": "Ask the recruiter before the HM call. If the recipient is still unknown at send time, drop the name and address the role."
    },
    {
      "id": "T02",
      "status": "open",
      "question": "Does the 8+ years framing belong anywhere on this page?",
      "why": "The JD states 8+ years of PM experience unhedged and Mike has ~4.5 inside a ~14 to 15 year career. The page currently says nothing about tenure and lets scope and outcomes carry it.",
      "proposal": "Keep it off the page. Say the number out loud in the conversation before they do, framed on scope: a $30B eight-country domain, a seven-org coalition, ~$6.4M a year."
    },
    {
      "id": "T03",
      "status": "open",
      "question": "Which story goes primary on R01, the client-facing promise versus execution?",
      "why": "Project Roadie (venue-dock field research) is primary today, with OADS and the UARC2 launch criteria supporting. Roadie is TPM-flavored by Mike's own framing, and the alternative is to lead R01 with the launch-criteria story instead.",
      "proposal": "Leave Roadie primary for the field-research beat, but decide before the walkthrough which of the two Mike wants to narrate first on that card."
    },
    {
      "id": "T04",
      "status": "open",
      "question": "How hard do the [INFERENCE] claims get stated: rented ground telemetry, no first-class load object, no Bellevue engineering?",
      "why": "R04 and R11 rest on public evidence that is suggestive rather than confirmed. The field reference for the data model returned a 404 during research, and the vendor list for ground tracking is inferred from job postings and integrations.",
      "proposal": "Keep them as questions in the walkthrough and soften the card copy only if the HM call confirms they are wrong. Mark them [INFERENCE] on the card until then."
    },
    {
      "id": "T05",
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
        "title": "The client-facing tracking promise runs ahead of what physical execution can deliver",
        "fromJD": "Our team is responsible for defining the client-facing tracking experience based on real physical execution capabilities",
        "why": "The most candid line in the posting. A client-facing ETA shown while there is no chassis, no terminal appointment before the last free day and an open customs hold is a promise nobody in ops is working toward, and the size of that gap is not a published number."
      },
      {
        "id": "R02",
        "title": "A wrong ETA or missing milestone gets chased by ops as a symptom instead of attributed to the system or party that caused it",
        "fromJD": "We solve complex supply chain workflows at the system root-cause level using data, product intuition, and highly structured logic",
        "why": "A missing LOAD event on the second-leg vessel can be a dropped 315 batch, a rolled box at a transshipment hub, a booking amendment that never re-synced the plan, or a facility code mapped to the wrong port. For the first 24 hours they all look identical."
      },
      {
        "id": "R03",
        "title": "The same milestone arrives from the carrier 315, the terminal TOS, AIS inference and an ops keystroke, with different timestamps and no stored precedence",
        "fromJD": false,
        "why": "Most platforms resolve the conflict with latest-wins or carrier-wins and overwrite. Aggregators normalize the sources away entirely, which removes exactly the information a root cause needs. Sources: Vizion data-quality page, DCSA track-and-trace standard, FreightWaves on the terminal blind spot."
      },
      {
        "id": "R04",
        "title": "Past the terminal gate a truck move is a leg of a container, and the telemetry under it is rented from FourKites, project44, MacroPoint and 10-4",
        "fromJD": false,
        "why": "The public data model has Shipment, Container, ContainerLeg, Milestone and Port, with no Load, Appointment, Driver or Yard object. Owning end-to-end tracking on the ground legs is a vendor decision before it is a product decision, and project44 spinning off LSP44 in July 2026 changed the math. [INFERENCE from the public API reference and integration evidence]"
      },
      {
        "id": "R05",
        "title": "Ops associates key milestones from emails and phone calls, so the timestamp records when it was typed and the dashboard turns green either way",
        "fromJD": false,
        "why": "Track and trace is the highest-manual-touch area in brokerage operations, and a milestone entered to clear a dashboard is indistinguishable from an observed event. Manual touches per shipment by leg is the cost-to-serve number the automation curve is graded on. [INFERENCE on Flexport specifics]"
      },
      {
        "id": "R06",
        "title": "Visibility metrics exist as dashboards, and investment decisions do not run through them",
        "fromJD": "Building metrics frameworks that connect product usage to business outcomes and using them to guide investment decisions across your domain",
        "why": "Stated twice in the posting, and the phrasing reads as a complaint about the current state. The domain needs one number that survives leadership pressure, or every quarter re-litigates what good means."
      },
      {
        "id": "R07",
        "title": "There is no published ground truth for tracking accuracy, so a wrong ETA is an anecdote rather than a number leadership sees",
        "fromJD": false,
        "why": "Flexport reports 75% on-time on Transpacific eastbound against its own prediction, and on-time against the date the client planned inventory around is a different number that costs the client money. Cargo iQ has scored air plan-versus-actual per milestone for two decades. Ocean has no equivalent."
      },
      {
        "id": "R08",
        "title": "Exceptions have to fire early enough to beat the last free day without training clients to ignore the feed",
        "fromJD": false,
        "why": "Roughly 600 typed exceptions, and the Winter 2026 release cut notifications about 80% by batching and elevating true exceptions. Subtraction was the first fix. Precision against recall is the next one, and recall is where demurrage exposure lives."
      },
      {
        "id": "R09",
        "title": "The fix for a root cause often lands in an execution or planning team's process, and the product seat has no line authority over it",
        "fromJD": "driving operational and system changes across execution, planning, and technology teams",
        "why": "The weakest of the four verbs in the team paragraph is drive, and it is repeated verbatim in the You Will list. When the answer is a process change in an ops team rather than a feature, someone has to get that team to change how it works without being able to tell them to."
      },
      {
        "id": "R10",
        "title": "Atlas, the platform UI, the API, notifications and email are separate surfaces that do not yet compose into one tracking experience",
        "fromJD": "You will define the vision for how multiple product surfaces work together to serve clients and operators across global logistics",
        "why": "The posting says domain rather than feature twice, and the roadmap horizon is 2 to 3 years across multiple engineering teams with no dated commitment forcing it. The artifact leadership trusts does not yet exist in that form."
      },
      {
        "id": "R11",
        "title": "Execution runs across a 15 to 16 hour offset with China engineering, and Bellevue inherits decisions made in the Hong Kong morning",
        "fromJD": "Collaborate closely across a global footprint (Hong Kong, Europe, US) with China engineering teams, participating in regular cross-border syncs",
        "why": "China engineering is the only engineering location named in the posting, and no engineering reqs are posted in Bellevue. Origin milestones (gate-in, load, sail) sit with the teams closest to them, and destination milestones with the US side, so one milestone model has to hold across both. [INFERENCE]"
      },
      {
        "id": "R12",
        "title": "Raise the PM bar on specs and trade-off communication while the domain work itself is still being defined",
        "fromJD": "Mentor PMs on the team: improving how we write specs, prioritize, communicate trade-offs, and ship",
        "why": "Stated in the overview and again in the requirements, softened to formally or informally. It is the work that gets cut first when the diagnostic and data-model work slips, which is why it needs a mechanism rather than good intentions."
      }
    ],
    "work": [
      {
        "id": "W01",
        "name": "UARC2, stockout root-cause engine",
        "outcome": "4x more accurate, up to 200bps instock gain",
        "detail": "An empty grocery shelf sits on top of 70+ possible root causes, and the incumbent tool blamed all of them evenly. I led a causal-inference engine that decomposes the physical and virtual supply chain into discrete links using instrumentation already in the microservice ecosystem, then measures each link's contribution to the stockout so the answer lands with the org that owns the broken link. Seven customer orgs adopted it fully about six weeks after tech-complete, run through a biweekly senior-manager sync plus a weekly working group with one IC borrowed from each org."
      },
      {
        "id": "W02",
        "name": "UARC2 North Star metric, lost and reinstated",
        "outcome": "Attribution MAPE ~8 vs ~32, 100% adoption six weeks after tech-complete",
        "detail": "UARC2 is a diagnostic, so there was no instock delta to point at, and I proposed a ground truth instead: ten random stockouts a week scored by both systems against a panel of tenured SMEs, measured as Stockout Driver Attribution MAPE. After one round of pushback from my director and manager I dropped it, and the months of adoption churn that followed ended only when I reinstated it with a one-pager written off a nationwide strawberry shortage, where UARC1 blamed five things equally for a vendor that simply had no strawberries."
      },
      {
        "id": "W03",
        "name": "UARC2 MVP launch criteria",
        "outcome": "3-option proposal, launched at 4x accuracy across all 7 orgs",
        "detail": "Midway through the year I learned my director had told the VP that UARC2 would launch in two weeks, while the customer orgs still needed a lower granularity that was not built and would have gone backwards on switching. I confirmed that with every customer group and wrote a proposal with three dated options, then asked for a single meeting with my director and the customer's director, where hearing it peer to peer did what my own argument could not. It launched in late January on the revised schedule."
      },
      {
        "id": "W04",
        "name": "BPSI prioritization",
        "outcome": "+200bps instock in bakery",
        "detail": "The UARC2 roadmap ranked root-cause buckets by how many basis points of stockouts each drove, which put DC Scarcity next even though operators already had a workaround for it, while BPSI was a black box the system could flag and nobody could act on. I convened ICs from all seven customer orgs to co-create a framework with actionability as a second axis, BPSI floated to the top on the group's own math, and their leaders arrived at the review pre-aligned. Expanding the model to BPSI surfaced insights that drove the bakery gain."
      },
      {
        "id": "W05",
        "name": "Feast Instock Portal",
        "outcome": "30+ tools consolidated into 8 workflows, 100% adoption",
        "detail": "The configuration tooling a $30B, 8-country grocery operation ran on had been bolted together at inception, and fat-finger changes were causing major operational disruption about twice a quarter. I wrote a 3-year vision and won above-the-line funding against a top-10 pain list, then led 14 engineers to consolidate 30+ tools into 8 workflows with guardrails and projected impact on every change. 100% adoption across 400+ users in 8 countries, with usability up 78%."
      },
      {
        "id": "W06",
        "name": "Freyja / Sotheby",
        "outcome": "+25bps network instock, +315bps hub share",
        "detail": "Freyja picks a vendor and a supply-chain path for every product at every store six times a day, and I inherited it half converted to Sotheby, an ML model whose objective had quietly stopped matching a strategy that had shifted from cost to instock. With no data scientist assigned I reconstructed both algorithms in SQL and normalized out the hardcoded business-rule differences, which showed legacy winning wherever the algorithm itself drove the decision. I ported Sotheby's hub-routing logic into legacy and deprecated the model, then rolled Freyja 2.0 out one DC at a time with projected-versus-actual measured at each wave."
      },
      {
        "id": "W07",
        "name": "OADS, ordering algorithm replacement",
        "outcome": "9.15% shrink reduction, roughly $6.4M a year",
        "detail": "I was asked to automate a manual daily script that set order increments at every hub, and found it was an objective function that matched increment to slot size to minimize DC receive labor with no constraint on shrink, so slow-moving perishables were ordered a full pallet at a time. I rewrote the objective around total landed cost constrained by instock rate and built the projection models myself in SQL before DS was scoped, with shrink savings coming out roughly 8:1 against labor cost. It shadow-ran against the live buying system, then rolled out one DC at a time, and the 15% of SKUs downgraded saw 53% less shrink with instock holding."
      },
      {
        "id": "W08",
        "name": "Catalog API integration",
        "outcome": "Incorrect assortments down 40%, catalog errors down 20%, data 4x fresher",
        "detail": "Every partner team in Amazon grocery ran its own flaky check of catalog coverage, so assortments came back misaligned and valid SKUs got missed. Two API-contract changes over two years made FRC, my core sourcing service, the source of truth: first migrating it onto the new catalog API, then inverting the upstream contract with Feast 2.0 so FRC takes in a wide SKU set and vends back which ones passed, with the coverage check run in one place."
      },
      {
        "id": "W09",
        "name": "Sourceability in Feast 2.0",
        "outcome": "88% to 92% sourceability in three months",
        "detail": "During the assortment reset, different teams decided whether a SKU could be sourced at a location using different logic, and the teams making the call lacked the supply-chain topology knowledge my team had. I wrote a proposal and worked a coalition of peers to win two concessions, two orgs letting my team own the calculation and a business team letting my users own the selection gate, and kept it survivable by allowing only objective criteria in the new model."
      },
      {
        "id": "W10",
        "name": "Project Roadie, concert-tour merch supply chain",
        "outcome": "3-model options doc, Beyonce Renaissance Tour launch unblocked",
        "detail": "Amazon Music launched concert-tour merch, and leadership wanted to reuse a small-parcel fulfillment service that drops boxes at residential addresses, when tour inventory rides with the show and lands pallets at an arena dock. I went to the field, down to the back-of-house docks at live shows, and wrote an options doc with three models working backwards from what I watched happen, and business and tech leadership picked the operationally grounded one in a single room."
      },
      {
        "id": "W11",
        "name": "Frida, natural-language diagnostics",
        "outcome": "80% faster investigation",
        "detail": "Even with UARC2 underneath, root-causing a stockout still meant writing SQL and pulling reports. Frida is an LLM natural-language interface over that diagnostics stack, and I defined its success metric, time to answer against the old method, before a single requirement was written."
      },
      {
        "id": "W12",
        "name": "Procurability at Amazon Go",
        "outcome": "Procurability 93% to 99%, instock 92% to 95%",
        "detail": "Instock teams at Amazon Go spent each week reviewing last week's stockouts, and the WBR reinforced it by making that review the centerpiece. Procurability errors were already sitting unused in data tables, so I put them in a daily morning report with an owning manager on every SKU and moved a procurability slide ahead of the stockout review, and adoption grew with no mandate."
      },
      {
        "id": "W13",
        "name": "Sourcing ecosystem",
        "outcome": "5 automated decisions per SKU per location, 6 runs a day",
        "detail": "I owned the automated sourcing layer for Amazon Fresh, which decides for every SKU at every location who to buy from, how to route it, when to buy, what order increment to use at the hubs, and how to degrade gracefully when the ideal path is unavailable. Freyja, FRC, HPC and ProPAS sit behind those decisions along with the cross-dock and transship handling, and UARC2 is the diagnostic layer over all of it."
      }
    ],
    "edges": [
      {
        "id": "E01",
        "problem": "R01",
        "work": "W10",
        "strength": "primary",
        "note": "He went to the venue dock before designing anything and wrote the options working backwards from what the operation could physically do, which is the promise-from-execution rule applied to merch instead of containers."
      },
      {
        "id": "E02",
        "problem": "R01",
        "work": "W07",
        "strength": "supporting",
        "note": "Leadership asserted layer-picking was impossible and he pulled the real DC labor numbers that said otherwise, so the plan rested on measured execution capacity instead of an assertion."
      },
      {
        "id": "E03",
        "problem": "R01",
        "work": "W03",
        "strength": "supporting",
        "note": "He moved a launch off a date a VP had been promised and onto the customers who were actually ready, which is how a client-facing promise gets staged instead of announced."
      },
      {
        "id": "E04",
        "problem": "R02",
        "work": "W01",
        "strength": "primary",
        "note": "Same shape: one symptom with dozens of candidate causes, decomposed into linked states with an expected transition and an owner, and attributed to the one that broke. Swap stockout for missing milestone."
      },
      {
        "id": "E05",
        "problem": "R02",
        "work": "W11",
        "strength": "supporting",
        "note": "Once attribution exists, Frida is what lets an ops associate ask why a milestone fired late in plain language instead of writing the query."
      },
      {
        "id": "E06",
        "problem": "R03",
        "work": "W08",
        "strength": "primary",
        "note": "Every partner team ran its own check and the answers conflicted, so he moved the check into one service that vends the authoritative answer, which is a precedence rule made structural."
      },
      {
        "id": "E07",
        "problem": "R03",
        "work": "W06",
        "strength": "supporting",
        "note": "Two systems disagreed and nobody could say why, so he reconstructed both in SQL and normalized out the rule differences to see which one was right under which conditions."
      },
      {
        "id": "E08",
        "problem": "R03",
        "work": "W09",
        "strength": "supporting",
        "note": "Different teams computed the same fact with different logic, and he got them onto one calculation that admits only objective criteria."
      },
      {
        "id": "E09",
        "problem": "R04",
        "work": "W08",
        "strength": "primary",
        "note": "He inverted an API contract with an upstream dependency to make his service the record of truth, which is the shape of turning a container leg into a first-class load with milestones of its own."
      },
      {
        "id": "E10",
        "problem": "R04",
        "work": "W06",
        "strength": "supporting",
        "note": "He measured a boutique component against a simpler owned one and deprecated it on the numbers, which is the build-or-buy decision the ground telemetry layer needs. Honest stretch: the vendor was internal."
      },
      {
        "id": "E11",
        "problem": "R05",
        "work": "W12",
        "strength": "primary",
        "note": "An error signal already sitting in tables became a daily report with a name on every row, and the reactive review moved upstream of the failure. Adoption grew with no mandate."
      },
      {
        "id": "E12",
        "problem": "R05",
        "work": "W05",
        "strength": "supporting",
        "note": "Guardrails and projected impact on every configuration change eliminated the twice-quarterly fat-finger disruptions, which is manual-touch risk designed out instead of caught later."
      },
      {
        "id": "E13",
        "problem": "R06",
        "work": "W02",
        "strength": "primary",
        "note": "He defined the one number that connects a diagnostic to an outcome, and adoption stalled for months while it was missing. The metric was the investment case."
      },
      {
        "id": "E14",
        "problem": "R06",
        "work": "W11",
        "strength": "supporting",
        "note": "On the next product the success metric was written in week one, before requirements, so usage and outcome were linked by design."
      },
      {
        "id": "E15",
        "problem": "R06",
        "work": "W07",
        "strength": "supporting",
        "note": "SQL projection models built before DS was scoped turned a shrink hypothesis into a funded decision with a defended dollar figure."
      },
      {
        "id": "E16",
        "problem": "R07",
        "work": "W02",
        "strength": "primary",
        "note": "Expert-grounded validation against a tenured SME panel is how he built a ground truth for a diagnostic that had none, and MAPE is the same score an ETA error needs."
      },
      {
        "id": "E17",
        "problem": "R07",
        "work": "W06",
        "strength": "supporting",
        "note": "The prior team had watched aggregate instock and never measured the model's actual objective, so he isolated the effect and measured projected against actual at every rollout wave."
      },
      {
        "id": "E18",
        "problem": "R08",
        "work": "W12",
        "strength": "primary",
        "note": "A daily error report that fires before the stockout instead of a review after it is exception-based operations, and it held adoption because every row was actionable and owned."
      },
      {
        "id": "E19",
        "problem": "R08",
        "work": "W04",
        "strength": "supporting",
        "note": "He added actionability as a prioritization axis because an exception the system flags and nobody can act on erodes trust faster than silence, which is the precision side of the problem."
      },
      {
        "id": "E20",
        "problem": "R08",
        "work": "W01",
        "strength": "supporting",
        "note": "Root-causing an exception to the connector or party that produced it is what stops the same exception from firing again, where suppression only hides it."
      },
      {
        "id": "E21",
        "problem": "R09",
        "work": "W01",
        "strength": "primary",
        "note": "Attribution tells an org a stockout was their fault, and he carried that across seven orgs with a biweekly senior-manager sync and a weekly IC working group, with no authority over any of them."
      },
      {
        "id": "E22",
        "problem": "R09",
        "work": "W04",
        "strength": "supporting",
        "note": "He pre-aligned a hostile director's own team and peers before the review, so the reprioritization arrived as their conclusion rather than his ask."
      },
      {
        "id": "E23",
        "problem": "R09",
        "work": "W09",
        "strength": "supporting",
        "note": "Two peer orgs gave up a calculation and a business team gave up a decision gate, won through a coalition of peers rather than escalation."
      },
      {
        "id": "E24",
        "problem": "R10",
        "work": "W05",
        "strength": "primary",
        "note": "A 3-year vision that consolidated 30+ tools into 8 workflows for 8 countries is a domain roadmap held across many user groups, and it shipped to 100% adoption."
      },
      {
        "id": "E25",
        "problem": "R10",
        "work": "W13",
        "strength": "supporting",
        "note": "Five decisions across four services owned as one sourcing domain, rather than as separate features, is the domain-over-feature distinction the posting states twice."
      },
      {
        "id": "E26",
        "problem": "R11",
        "work": "W05",
        "strength": "primary",
        "note": "An 8-country user base run through a biweekly global SME connect is the closest match he has. Engineering was co-located, so the cross-border engineering half is unproven and he should say so."
      },
      {
        "id": "E27",
        "problem": "R12",
        "work": "W06",
        "strength": "primary",
        "note": "His director asked him to run a retro and lunch-and-learn on where boutique ML earns its place against a well-constrained algorithm, which is mentoring by written framework."
      },
      {
        "id": "E28",
        "problem": "R12",
        "work": "W04",
        "strength": "supporting",
        "note": "The actionability framework was co-created with ICs from seven orgs and then used by them, which is raising the bar by handing people a better tool to prioritize with."
      }
    ]
  },
  "references": {
    "primary": [
      {
        "id": "REF01",
        "label": "The job description",
        "title": "Staff Product Manager, Visibility · Flexport",
        "url": "https://job-boards.greenhouse.io/flexport/jobs/8158012"
      },
      {
        "id": "REF02",
        "label": "Flexport Winter 2026 Technology Release",
        "title": "Atlas, the 80% notification cut, and the exception elevation language",
        "url": "https://www.flexport.com/technology/product-release/winter-2026/"
      },
      {
        "id": "REF03",
        "label": "Predicting Accurate and Reliable Ocean Freight Transit Times",
        "title": "Flexport blog. The 75% on-time claim, and the question of on-time against what",
        "url": "https://www.flexport.com/blog/predicting-accurate-and-reliable-ocean-freight-transit-times/"
      },
      {
        "id": "REF04",
        "label": "Flexport API v2 reference",
        "title": "The public data model: Shipment, Container, ContainerLeg, Milestone, Port",
        "url": "https://apidocs.flexport.com/"
      },
      {
        "id": "REF05",
        "label": "DCSA Track and Trace standard",
        "title": "The event codes and journeys the ocean milestone chain is built on",
        "url": "https://dcsa.org/standards/track-and-trace"
      },
      {
        "id": "REF06",
        "label": "IATA Cargo iQ Master Operating Plan",
        "title": "How air has scored planned versus actual per milestone for two decades",
        "url": "https://www.iata.org/contentassets/169b00e69b264cc5ac203af757596dc6/2016-03-cargo-industry-mop.pdf"
      },
      {
        "id": "REF07",
        "label": "Sea-Intelligence: global schedule reliability drops to 62.6% in June 2026",
        "title": "Container News. Late vessels averaging 5.31 days",
        "url": "https://container-news.com/sea%E2%80%91intelligence-global-schedule-reliability-drops-to-62-6-in-june-2026/"
      },
      {
        "id": "REF08",
        "label": "Vizion: container tracking data quality",
        "title": "How an aggregator normalizes roughly 60 events and what that normalization hides",
        "url": "https://www.vizionapi.com/container-tracking/data-quality"
      },
      {
        "id": "REF09",
        "label": "The Container Terminal Visibility Blind Spot",
        "title": "FreightWaves. The terminal knows first and shares least",
        "url": "https://www.freightwaves.com/news/the-container-terminal-visibility-blind-spot"
      },
      {
        "id": "REF10",
        "label": "project44, FourKites head the visibility class as Gartner flags reliability",
        "title": "JOC. The rented-telemetry market and its data-quality critique",
        "url": "https://www.joc.com/article/project44-fourkites-head-of-visibility-class-gartner-5242896"
      }
    ],
    "secondary": [
      {
        "group": "Flexport: company, product, and platform",
        "items": [
          { "title": "Flexport product index", "url": "https://www.flexport.com/products/" },
          { "title": "Flexport Platform", "url": "https://www.flexport.com/products/flexport-platform/" },
          { "title": "Flexport Control Tower", "url": "https://www.flexport.com/technology/control-tower/" },
          { "title": "Flexport: Drayage and FTL Trucking Services", "url": "https://www.flexport.com/products/trucking/" },
          { "title": "Flexport Fall 2025 Technology Release", "url": "https://www.flexport.com/technology/product-release/fall-2025/" },
          { "title": "Flexport Winter 2025 Technology Release", "url": "https://www.flexport.com/technology/product-release/winter-2025/" },
          { "title": "Flexport launches 20+ AI-powered products (Feb 2025)", "url": "https://www.prnewswire.com/news-releases/flexport-unveils-20-tech-and-ai-powered-products-to-modernize-global-supply-chains-302383593.html" },
          { "title": "Flexport developer documentation", "url": "https://developers.flexport.com/" },
          { "title": "Snowflake customer case study: Flexport data mesh", "url": "https://www.snowflake.com/en/customers/all-customers/case-study/flexport/" },
          { "title": "Flexport engineering: Isolating Rails Engines with RuboCop", "url": "https://flexport.engineering/isolating-rails-engines-with-rubocop-210feaba3164" },
          { "title": "Why We Bought, Built, and Sold the Convoy Platform (Petersen, July 2025)", "url": "https://www.flexport.com/blog/why-we-bought-built-and-sold-the-convoy-platform/" },
          { "title": "NTG and Flexport Launch Strategic Partnership (July 2022)", "url": "https://www.businesswire.com/news/home/20220728005168/en/Nolan-Transportation-Group-and-Flexport-Launch-Strategic-Partnership" },
          { "title": "Flexport partner page: NTG", "url": "https://www.flexport.com/company/global-network/partners-ntg/" },
          { "title": "Flexport careers", "url": "https://www.flexport.com/careers/jobs/" },
          { "title": "Flexport Greenhouse job board (full req pull)", "url": "https://job-boards.greenhouse.io/flexport" },
          { "title": "Staff PM, Trucking Technology (the prior loop's posting)", "url": "https://job-boards.greenhouse.io/flexport/jobs/8110066" },
          { "title": "Senior PM, Visibility (sibling posting)", "url": "https://job-boards.greenhouse.io/flexport/jobs/8158027" },
          { "title": "Flexport product management team page", "url": "https://www.flexport.com/careers/teams/product-management/" },
          { "title": "Flexport blog index", "url": "https://www.flexport.com/blog/" },
          { "title": "Flexport About", "url": "https://www.flexport.com/about/" },
          { "title": "Wikipedia: Flexport", "url": "https://en.wikipedia.org/wiki/Flexport" },
          { "title": "TheOrg: Flexport organization chart", "url": "https://theorg.com/org/flexport" },
          { "title": "Flexport Trustpilot reviews", "url": "https://www.trustpilot.com/review/flexport.com" }
        ]
      },
      {
        "group": "Milestones, standards, and where the data comes from",
        "items": [
          { "title": "DCSA Track and Trace standard", "url": "https://dcsa.org/standards/track-and-trace" },
          { "title": "Vizion: DCSA event code types", "url": "https://docs.vizionapi.com/docs/dcsa-event-code-types" },
          { "title": "Port Technology: DCSA updates track and trace standards", "url": "https://www.porttechnology.org/news/dcsa-updates-track-and-trace-standards/" },
          { "title": "IATA Cargo iQ Master Operating Plan (PDF)", "url": "https://www.iata.org/contentassets/169b00e69b264cc5ac203af757596dc6/2016-03-cargo-industry-mop.pdf" },
          { "title": "AWB status meanings (Cargo iQ milestone chain)", "url": "https://airwaybilltracker.com/awb-status-meanings.html" },
          { "title": "EDI 315 ocean status details", "url": "https://orwiki.org/t:315" },
          { "title": "EDI 322 terminal operations and intermodal ramp activity", "url": "https://www.kasoftware.com/schema/edi/x12/00304/messages/322/" },
          { "title": "AXSMarine: AIS for shipping", "url": "https://public.axsmarine.com/blog/ais-for-shipping" },
          { "title": "Big Ocean Data: when a vessel disappears from AIS", "url": "https://bigoceandata.com/vessel-disappears-from-ais/" },
          { "title": "Railway Age: seven rail shipment visibility facts", "url": "https://www.railwayage.com/cs/seven-rail-shipment-visibility-facts-that-might-surprise-you/" },
          { "title": "FreightWaves: why freight visibility needs a second signal", "url": "https://www.freightwaves.com/news/why-freight-visibility-needs-a-second-signal" },
          { "title": "CCJ: load boards start a new chapter on freight visibility", "url": "https://www.ccjdigital.com/technology/article/15065904/load-boards-start-new-chapter-on-freight-visibility" },
          { "title": "CBP: ACE cargo release status notification implementation guide", "url": "https://www.cbp.gov/document/guidance/ace-cargo-release-status-notification-implementation-guide" },
          { "title": "FreightWaves: the container terminal visibility blind spot", "url": "https://www.freightwaves.com/news/the-container-terminal-visibility-blind-spot" },
          { "title": "Vizion: container tracking data quality", "url": "https://www.vizionapi.com/container-tracking/data-quality" },
          { "title": "NMFTA: EDI vs API in trucking", "url": "https://nmfta.org/news/edi-vs-api-in-trucking-why-its-time-to-embrace-api-standards-api-101/" }
        ]
      },
      {
        "group": "Industry and market analysis",
        "items": [
          { "title": "Container News: Sea-Intelligence global schedule reliability, June 2026", "url": "https://container-news.com/sea%E2%80%91intelligence-global-schedule-reliability-drops-to-62-6-in-june-2026/" },
          { "title": "Flexport: predicting accurate and reliable ocean freight transit times", "url": "https://www.flexport.com/blog/predicting-accurate-and-reliable-ocean-freight-transit-times/" },
          { "title": "Seatrade Maritime: a third of cargo rolled over at transshipment hubs (Ocean Insights)", "url": "https://www.seatrade-maritime.com/containers/third-cargo-rolled-over-transhipment-hubs-ocean-insights" },
          { "title": "Shipping and Freight Resource: advance notification of cargo rollover", "url": "https://www.shippingandfreightresource.com/advance-notification-of-cargo-rollover/" },
          { "title": "JOC: project44 and FourKites head the visibility class, Gartner", "url": "https://www.joc.com/article/project44-fourkites-head-of-visibility-class-gartner-5242896" },
          { "title": "FreightWaves: Gartner critiques the real-time visibility market", "url": "https://www.freightwaves.com/news/freighttech-friday-gartner-critiques-real-time-visibility-market-players" },
          { "title": "FreightWaves: project44 forms two new businesses, launches AI-native LSP44", "url": "https://www.freightwaves.com/news/project44-forms-two-new-businesses-launches-ai-native-lsp44" },
          { "title": "FreightWaves: project44 launches Autopilot", "url": "https://www.freightwaves.com/news/project44-launches-autopilot-an-ai-enabled-logistics-operating-system-that-offers-infinite-labor" },
          { "title": "FreightWaves: AI agents without context are just guessing faster", "url": "https://www.freightwaves.com/news/ai-agents-without-context-are-just-guessing-faster" },
          { "title": "Axios: SAP and FourKites supply chain acquisition", "url": "https://www.axios.com/2026/02/23/sap-fourkites-supply-chain-acquisition" },
          { "title": "Land Line: truckers back on the hook for demurrage and detention charges", "url": "https://landline.media/truckers-back-on-the-hook-for-demurrage-and-detention-charges/" },
          { "title": "Land Line magazine: truckers again responsible for demurrage and detention fees", "url": "https://landline.media/magazine/truckers-again-responsible-for-demurrage-detention-fees/" },
          { "title": "FreightWaves: demurrage dilemma, court overturns FMC trucking rule", "url": "https://www.freightwaves.com/news/demurrage-dilemma-court-overturns-fmcs-trucking-rule" },
          { "title": "HTA: chassis box rules white paper", "url": "https://harbortruckers.com/resources/Documents/Industry%20Issues/Box%20Rules%20FINAL%20VERSION.pdf" },
          { "title": "FreightWaves: yard management technology moves out of the shadows", "url": "https://www.freightwaves.com/news/yard-management-technology-moves-out-of-the-shadows-as-supply-chains-push-for-end-to-end-visibility" },
          { "title": "FreightWaves: executives talk tech, port drayage and capacity", "url": "https://www.freightwaves.com/news/executives-talk-tech-port-drayage-and-capacity-on-freightwaves-today" },
          { "title": "Loadstar: Flexport doubles down on AI and enterprise shippers", "url": "https://theloadstar.com/flexport-doubles-down-on-ai-and-enterprise-shippers-as-it-moves-beyond-start-up-phase/" },
          { "title": "JOC at TPM26: Flexport CEO sees AI's impact accelerating", "url": "https://www.joc.com/article/tpm26-flexport-ceo-sees-ais-impact-on-logistics-accelerating-6179418" }
        ]
      },
      {
        "group": "Competitor and adjacent products",
        "items": [
          { "title": "Terminal49: best container tracking software in 2026, an honest comparison", "url": "https://terminal49.com/blog/best-container-tracking-software-in-2026-an-honest-comparison" },
          { "title": "Windward: vessel ETA", "url": "https://windward.ai/solutions/vessel-eta/" },
          { "title": "Gnosis Freight: container lifecycle management platform", "url": "https://www.gnosisfreight.com/platform" },
          { "title": "Shippeo", "url": "https://www.shippeo.com/" },
          { "title": "Kuehne+Nagel myKN", "url": "https://www.kuehne-nagel.com/us/digital-services/mykn" },
          { "title": "Kuehne+Nagel 2025 annual report, business units", "url": "https://2025-annual-report.kuehne-nagel.com/annual-report/status-report/business-units" },
          { "title": "DHL Group: Global Forwarding, Freight division report", "url": "https://reporting-hub.group.dhl.com/2025-fy/en/combined-management-report/report-on-economic-position/global-forwarding-freight-division-1/" },
          { "title": "Expeditors FY2025 Form 10-K", "url": "https://www.sec.gov/Archives/edgar/data/746515/000119312526071569/expd-20251231.htm" },
          { "title": "CH Robinson FY2025 Form 10-K", "url": "https://www.sec.gov/Archives/edgar/data/1043277/000104327726000009/chrw-20251231.htm" },
          { "title": "FreightWaves: CH Robinson deploys a suite of AI agents into Navisphere", "url": "https://www.freightwaves.com/news/c-h-robinson-deploys-a-suite-of-ai-agents-into-navisphere" },
          { "title": "Opendock", "url": "https://opendock.com/en/" }
        ]
      },
      {
        "group": "Practitioner and operator sources",
        "items": [
          { "title": "FreightWaves", "url": "https://www.freightwaves.com/" },
          { "title": "JOC", "url": "https://www.joc.com/" },
          { "title": "The Loadstar", "url": "https://theloadstar.com/" },
          { "title": "Supply Chain Dive", "url": "https://www.supplychaindive.com/" },
          { "title": "Land Line", "url": "https://landline.media/" },
          { "title": "Transport Topics", "url": "https://www.ttnews.com/" },
          { "title": "FreightWaves: Freight Hero broker back office (the manual-touch quote)", "url": "https://www.freightwaves.com/news/freight-hero-broker-back-office" },
          { "title": "FreightWaves: is AI the missing link in appointment scheduling", "url": "https://www.freightwaves.com/news/is-ai-the-missing-link-in-appointment-scheduling" },
          { "title": "FreightWaves: understanding detention pay clauses", "url": "https://www.freightwaves.com/news/understanding-detention-pay-clauses" },
          { "title": "TruckersReport: shippers and receivers, good or bad", "url": "https://www.thetruckersreport.com/truckingindustryforum/forums/shippers-receivers-good-or-bad.286/" },
          { "title": "Harbor Trucking Association white papers", "url": "https://harbortruckers.com/White-Papers" }
        ]
      },
      {
        "group": "Method",
        "items": [
          { "title": "The company research playbook used to structure this work", "url": "https://docs.google.com/document/d/1CEb0gl2Vq-fv01MwIgHmKAdYSXG4ExGJ3bqKacBJjlU/edit" }
        ]
      }
    ]
  },
  "parked": []
};
