/* ============================================================================
   content.js  -  ALL copy and data for the Flexport trucking demo.
   index.html is the renderer. It contains NO prose. Edit content here only.

   Every item has an ID. In DRAFT mode the page renders those IDs, so changes
   can be requested as "kill P04, make P07 loud, reword W03".

   Nothing is ever deleted. Cut items move to CONTENT.parked.

   Generated 2026-09-01. Safe to hand-edit from here.
   ========================================================================== */

const DRAFT  = false;          // draft banner, TODO panel, visible content IDs
const SHOW_TODOS = false;    // the floating "Open decisions" panel. Independent of DRAFT.
const LAYOUT = "two-lane";    // "two-lane" | "single-line"

const CONTENT = {
  "meta": {
    "title": "Trucking lifecycle, and where my experience fits",
    "subtitle": "Phil, I really enjoyed our conversation yesterday. I built this afterwards so you can explore it yourself: the trucking lifecycle end to end with the places it genuinely breaks, and how my experience maps against what this role needs.",
    "preparedFor": "Flexport · Staff Product Manager, Trucking Technology",
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
      "question": "Which three pain markers should be the loud ones?",
      "why": "This is the editorial spine of Pillar 01. Three loud markers read as a point of view. Ten equally weighted markers read as noise.",
      "proposal": "Detention as an unclaimed receipt (P01), appointment portal fragmentation (P02), and the drayage last-free-day clock (P03). Reasoning: all three sit on the JD's own language about scheduling and payment touchpoints, every supporting number is public and non-vendor, and all three are downstream of the appointment record, which is the one artifact Flexport already owns."
    },
    {
      "id": "T02",
      "status": "open",
      "question": "Does the closer name a specific first bet, or stay optional?",
      "why": "The most memorable thing on the page, and also the most presumptuous thing to bring from outside.",
      "proposal": "Name it, frame it explicitly as an outside-in hypothesis, and attach a falsifier. A named bet with a stated way to be proven wrong reads as confidence. An unnamed one reads as hedging."
    },
    {
      "id": "T10",
      "status": "open",
      "question": "Does Roadie stay without a number?",
      "why": "Every other entry leads with a figure, and the oversized numeral treatment will make W11 look empty next to them. The Beyonce launch is the strongest asset the story has, and it is a name rather than a metric.",
      "proposal": "Keep it, because it is the only entry in the set that is about physical freight moving into a dock, which is the closest thing to Flexport's actual domain. If it looks broken visually, cut it and let W03 and W04 carry the operations-depth argument."
    },
    {
      "id": "T11",
      "status": "open",
      "question": "Five of twelve entries live inside the UARC2 orbit. Is that too much of one project?",
      "why": "UARC2, BPSI, Frida, and to a degree Feast are all the same program. A reader scanning the right column may conclude he has one big story and a handful of fragments.",
      "proposal": "Cut BPSI (W06) or fold its actionability framework into the UARC2 detail, and keep Frida because 80% faster is a clean standalone number. That leaves UARC2 as one entry with real depth instead of three entries competing for the same credit."
    },
    {
      "id": "T12",
      "status": "open",
      "question": "Does the sourcing ecosystem belong in a column called delivered work?",
      "why": "It is a system he owned and an interview walkthrough, and it is not a project with a before-and-after. The outcome line I wrote describes the system's shape, so it reads differently from every other row.",
      "proposal": "Keep it, and re-title the column heading to something like scope and delivered work so W10 is not pretending to be a result. Alternative: cut it and let W04 carry Freyja, since the ecosystem detail is more useful spoken over a diagram than read on a page."
    },
    {
      "id": "T13",
      "status": "open",
      "question": "The Roadie engineering-team count is unreconciled in the source doc.",
      "why": "The Home Runs doc says 13 engineering teams in one place and 9 in another, and flags it as an open PIN. This page is going on a public URL, so I left the number out entirely.",
      "proposal": "Mike reconciles it and we put the real figure in the outcome line, which would give W11 the number it is currently missing and solve T10 at the same time."
    },
    {
      "id": "T14",
      "status": "open",
      "question": "Does MATES belong on a page prepared for Flexport?",
      "why": "47% year to date is the punchiest number in the set and it is the only entry showing he builds agentic systems hands-on. It is also a personal trading side project on a page about trucking, and a reader could take it as unserious or as a distraction from the freight argument.",
      "proposal": "Keep it as the last row so it reads as a coda. If the Flexport conversation turns out to be light on AI, cut it and the set still holds at eleven."
    },
    {
      "id": "T15",
      "status": "open",
      "question": "The North Star metric failure is absent, and it may be the strongest thing here.",
      "why": "The set as written is twelve wins in a row, which is the least credible way to present a career. The NSM story has a real cost attached to it and ends in the MAPE 8 versus 32 number that carries UARC2.",
      "proposal": "Add it as a thirteenth entry with an outcome line about the months of adoption churn he paid for dropping the metric, or work one sentence of it into the UARC2 detail. My preference is a standalone row, because a visible scar in the right column changes how the other eleven read."
    },
    {
      "id": "T16",
      "status": "open",
      "question": "Catalog API carries three numbers and the treatment wants one.",
      "why": "The outcome field renders as an oversized numeral. Incorrect assortments down 40%, catalog errors down 20%, and data 4x fresher will either wrap badly or shrink to a size that defeats the treatment.",
      "proposal": "Lead with incorrect assortments down 40%, since it is the largest figure and the one produced by the contract inversion he designed. Move the other two into the detail sentences."
    },
    {
      "id": "T20",
      "status": "open",
      "question": "R06 is the thinnest mapping on the board. Is there real external-party negotiation experience missing from the right column?",
      "why": "Automated dispatch and appointment scheduling is the most concrete AI deliverable named in the JD, and the best available match is an internal API contract change. A reader who cares about that line will notice the gap immediately.",
      "proposal": "Ask Mike whether Freyja's vendor selection ever involved vendor-side commitments, or whether ProPAS touched supplier appointment windows. If yes, that becomes the primary edge and W08 drops to supporting. If no, leave E13 as written, because the honest note reads better than a forced claim and gives him something to address out loud in the interview."
    },
    {
      "id": "T21",
      "status": "open",
      "question": "Did Feast or UARC2 actually involve engineering or design partners in other time zones?",
      "why": "R08 explicitly calls out global collaboration, and E18 currently leans on 8 countries of operations while saying the distributed-team half is unconfirmed. If partner teams really were in India or Europe, the note gets one sentence stronger and the caveat disappears.",
      "proposal": "Mike confirms and we rewrite E18's note with the specific geography. If the partner teams were all in Seattle, keep the caveat visible, because a leadership audience for this role will probe it either way."
    },
    {
      "id": "T22",
      "status": "open",
      "question": "Is there any commercial or vendor-contract experience that would give R10 a real primary?",
      "why": "E22 is the weakest primary on the board and I said so in the note. Unwinding vendor licenses and partner-executed volume is a named part of what a single Flexport-owned platform means, and right now it maps to an internal turf negotiation.",
      "proposal": "Ask whether Roadie's small-parcel service, or any Amazon Fresh third-party carrier or vendor relationship, put him in front of contract terms, notice periods, or data rights. If nothing surfaces, consider whether R10 should stay on the board at all, since a visible weak link is useful once and dead weight twice."
    },
    {
      "id": "T23",
      "status": "open",
      "question": "W05, W01, and W02 all carry adoption claims and all three want R09. Should the primary stay with Procurability?",
      "why": "R09 is the problem I would argue is most likely to decide the program, and the primary edge is the one that gets read.",
      "proposal": "Keep W05 as primary. 93% to 99% with no mandate is the only one of the three where adoption was the achievement rather than a byproduct of a platform launch. I dropped the W02 supporting edge to keep the diagram readable; add it back if the R09 column looks bare."
    },
    {
      "id": "T24",
      "status": "open",
      "question": "W12 (MATES) and W09 (Frida) each hold exactly one supporting edge. Do they earn their space?",
      "why": "This compounds T11 and T14 in the existing panel. If a work item only ever appears as a thin line into one problem, the board is carrying a row for a reason unrelated to the mapping.",
      "proposal": "Keep both, for different reasons. Frida's edge into R07 is genuinely load-bearing, because it is the only entry about answer speed under time pressure. MATES earns its row as the current-tooling proof rather than as a mapped experience, so if the edge count needs trimming, cut E26 and leave W12 on the board unconnected as a deliberate coda."
    },
    {
      "id": "T25",
      "status": "open",
      "question": "If the North Star metric failure gets added as a thirteenth work item, where does it attach?",
      "why": "T15 in the existing panel proposes adding it. If it lands, it changes this file, because the story is about a metric he let leadership kill and then had to reinstate after months of adoption churn.",
      "proposal": "Make it a supporting edge into R03 and a second one into R09. It is the only material in the set where persuading leadership failed, and R03 is currently three wins in a row, which is the least believable way to answer a question about persuading executives."
    },
    {
      "id": "T26",
      "status": "open",
      "question": "If W06 (BPSI) gets cut per T11, does R03 lose anything that matters?",
      "why": "E07 is the only edge on the board where the mechanism is co-authoring a decision framework with the people it affects, which is a different persuasion move from the ownership fight in W07.",
      "proposal": "If BPSI gets folded into the UARC2 detail, move the actionability-axis sentence into E24's note or add a second supporting edge from W02 into R03. Losing the mechanism entirely would leave R03 resting on one win and one field-research story."
    }
  ],
  "walkthrough": {
    "intro": "The product I keep coming back to is UARC2, a supply chain visibility and failure diagnostics platform I proposed and led at Amazon Fresh. It launched in January 2026. Below is how I would break it down against the four layers, plus the follow-ups underneath them.",
    "groups": [
      {
        "id": "G01",
        "name": "The Why (Strategy)",
        "items": [
          {
            "id": "Q01",
            "q": "What was the specific pain point you set out to solve?",
            "a": "When a product went out of stock at Amazon Fresh, nobody could tell you why. We had tooling that showed what happened in the window before a stockout, but it surfaced correlations rather than causes. An instock manager would see that a stockout followed a forecast miss, a late inbound truck, and a vendor short-ship, and have no way to know which one actually drove it. In practice that meant every org defaulted to blaming whatever they did not control, and we spent real money reacting to the wrong thing.",
            "pending": false
          },
          {
            "id": "Q02",
            "q": "How did you validate this was the right problem to solve?",
            "a": "I started from users rather than from a solution. I went out across the supply chain orgs and gathered feedback on where their biggest opportunities were, and stockout attribution came back as the highest-value gap. Then I audited the existing tool to understand why it was falling short, which is where I found the correlation problem. That gave me a testable hypothesis: if we instrumented more points along the chain, we could decompose the entire operation, physical and virtual, into a connected set of links and isolate true causation. Rather than ask for funding on the strength of a hypothesis, I pitched our science lead on building a prototype and we ran it at a single fulfillment center first. The results were strong enough that I walked into leadership with data instead of an opinion.",
            "pending": false
          },
          {
            "id": "Q03",
            "q": "Why this problem over the other things you could have worked on?",
            "a": "Two reasons. First, it sat upstream of a lot of other work. Every org had its own theory about what drove stockouts, so without a shared answer we were funding several parallel guesses at once. Fixing attribution made everyone else's prioritization better. Second, instock was our north star metric, so improving root-cause accuracy paid out across the whole organization rather than inside one team's lane.",
            "pending": false
          },
          {
            "id": "Q04",
            "q": "Who was the customer, and what did they actually tell you?",
            "a": "Seven functional orgs, with instock managers and supply chain analysts as the day-to-day users. The consistent message was that they did not lack data, they lacked a defensible answer. They would walk into a weekly business review with three plausible explanations for the same stockout and no way to choose between them, so the conversation became about whose theory was most persuasive rather than what was actually true.",
            "pending": false
          }
        ]
      },
      {
        "id": "G02",
        "name": "Discovery and Trade-offs",
        "items": [
          {
            "id": "Q05",
            "q": "What alternative solutions did you consider?",
            "a": "The obvious alternative was to improve the existing correlation tool rather than replace it. That was genuinely tempting because it was cheaper, lower risk, and would have shown progress faster. Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q06",
            "q": "Why did you pick this path over those alternatives?",
            "a": "Improving the existing tool would have made a correlation engine more precise, and precision on the wrong construct does not help anyone. The users' problem was not that the correlations were noisy, it was that correlation could not answer the question they were being asked in a business review. That is a structural limit rather than a tuning problem, so incremental work on it had a ceiling we would hit quickly. Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q07",
            "q": "What did you intentionally NOT build, and why?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q08",
            "q": "What did you cut to get to a shippable MVP?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          }
        ]
      },
      {
        "id": "G03",
        "name": "Execution and Delivery",
        "items": [
          {
            "id": "Q09",
            "q": "How did you partner with Engineering and Science?",
            "a": "I ran three cadences at three altitudes, deliberately. A daily standup with the engineering and science team to keep delivery unblocked. A weekly tactical sync with my IC and first-line-manager counterparts inside the customer orgs, so open questions got resolved in days instead of escalating. And a biweekly with Senior Managers and Directors for hot topics and strategic trade-offs. The middle one carried the most weight. Pulling operators from the customer orgs into a working session every week meant decisions were made by people who actually did the job, and it kept their leadership looped in without me having to escalate to get there.",
            "pending": false
          },
          {
            "id": "Q10",
            "q": "How did you partner with Design?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q11",
            "q": "Describe a specific technical hurdle or pivot you navigated.",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q12",
            "q": "How did you keep seven orgs aligned without the roadmap thrashing?",
            "a": "This was the hardest part of the program. Seven functional customer orgs each wanted their own features prioritized first, which created real friction early in roadmap planning. I defused it by moving the argument off personalities and onto shared criteria. We aligned on an objective prioritization framework that weighed actionability alongside raw impact, so a high-impact item nobody could act on ranked below a moderate-impact item a team could act on tomorrow. Once the criteria were agreed, sequencing stopped being a negotiation and became arithmetic. Combined with the weekly working sync, that converted prioritization from something done to those orgs into something done with them. It built the buy-in that later showed up as adoption, and it insulated the team from thrash so we shipped the top items on schedule.",
            "pending": false
          }
        ]
      },
      {
        "id": "G04",
        "name": "Impact (Metrics)",
        "items": [
          {
            "id": "Q13",
            "q": "What was the concrete outcome?",
            "a": "We launched in January 2026. UARC2 came in 4x more accurate than the system it replaced, roughly 8 MAPE against 32. It reached 92% adoption as the default decision layer for our instock and supply chain teams. And it lifted instock, our north star, by up to 200 basis points in some grocery categories. Concretely, once it was live we could trace a single stockout back to its actual root cause, whether that was external like a crop failure in a strawberry field, or internal like a bug in how our forecast and buying system handled frequent-reorder, long-lead-time products. Teams could act on a specific defect instead of arguing about which theory to believe.",
            "pending": false
          },
          {
            "id": "Q14",
            "q": "What was your north star metric and how did you pick it?",
            "a": "Instock rate was the north star for the business, and for the product itself the measure that mattered was attribution accuracy, which we tracked as MAPE against a ground-truth set. I picked accuracy as the product metric deliberately, because adoption of a diagnostics tool is downstream of trust, and trust is downstream of being right. Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q15",
            "q": "How do you know the 4x improvement was real and not measurement choice?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q16",
            "q": "What would you do differently today?",
            "a": "I would fight harder for the north star metric, and earlier. Partway through the program, leadership pushed to drop the north star metric we had defined, and I let it go rather than spending the capital to defend it. That turned out to be expensive. Without a shared definition of success, each org drifted back to its own measure, and I paid for it in months of adoption churn re-litigating things I thought were settled. I eventually reinstated the metric and adoption followed. What I took from it is that a north star is not documentation, it is the mechanism that holds a coalition together, and it is worth spending real political capital on at the start rather than cheaper capital cleaning up later.",
            "pending": false
          }
        ]
      },
      {
        "id": "G05",
        "name": "Show Backbone",
        "items": [
          {
            "id": "Q17",
            "q": "Tell me about saying no to a high-stakes stakeholder to protect the product.",
            "a": "My director committed to a VP that we would launch in two weeks. The scope that implied would have shipped something producing answers we could not stand behind, and in a diagnostics product a confidently wrong root cause is worse than no answer, because people act on it. So I said no to the date. What I did not do was simply push back. I built three options with explicit trade-offs: what we could genuinely ship in two weeks and what it would and would not be able to claim, an intermediate scope, and the full launch criteria I believed we needed. Then I asked for a meeting with my director and the VP in the same room rather than relaying my position through my director, so the trade-off was decided by the person who owned the consequence and had the full picture. We landed on a middle option with launch criteria I could defend.",
            "pending": false
          },
          {
            "id": "Q18",
            "q": "What did holding that line cost you?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          }
        ]
      },
      {
        "id": "G06",
        "name": "Technical Depth",
        "items": [
          {
            "id": "Q19",
            "q": "What were the data inputs?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q20",
            "q": "How does the causal logic actually work?",
            "a": "The core idea was to stop treating the supply chain as a black box with a stockout at the end of it, and instead model it as a connected graph of links where each link has an observable state and a defined handoff to the next one. If you can see the state at every link, you can walk backward from the failure and identify the first link where the actual state diverged from the expected state, rather than reporting everything that happened to co-occur beforehand. That is what turned a list of correlated events into a single attributable cause. Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q21",
            "q": "What did the system architecture look like?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          },
          {
            "id": "Q22",
            "q": "Where did SQL come into it?",
            "a": "Mike will discuss this verbally.",
            "pending": true
          }
        ]
      },
      {
        "id": "G07",
        "name": "STAR+ (the 90-second arc)",
        "items": [
          {
            "id": "Q23",
            "q": "Give me the whole thing in ninety seconds.",
            "a": "Situation: at Amazon Fresh, when a product went out of stock, no one could say why. Our tooling surfaced correlations rather than causes, so seven orgs each had a theory and no shared answer. Task: I owned the charter for our inventory visibility and diagnostics platform, and I proposed we replace attribution entirely rather than tune what we had. Action: I validated the problem with users, formed a hypothesis that instrumenting more of the chain would let us isolate causation, prototyped it with our science lead, and ran it at one fulfillment center before asking for money. I took the data to leadership, won funding, and ran a twelve-month build on three cadences. When seven orgs fought over sequencing, I moved the argument onto an objective framework that weighed actionability alongside impact. When my director promised a VP a two-week launch, I brought three scoped options into a room with both of them rather than accept a date that would have shipped answers we could not defend. Result: we launched in January 2026 at 4x the accuracy of the prior system, 92% adoption, and up to 200 basis points of instock lift. Learning: I gave up our north star metric under pressure partway through and paid for it in months of adoption churn. The metric was the thing holding the coalition together, and I did not understand that until it was gone.",
            "pending": false
          },
          {
            "id": "Q24",
            "q": "What did you learn, beyond the result?",
            "a": "Two things. The first is the metric lesson above, which I now treat as a rule: define the north star early, get it agreed in writing, and spend capital defending it before you need it rather than after. The second is that adoption is a design problem and not a rollout problem. The 92% number was not the result of a good launch plan, it was the result of the weekly working sync a year earlier, where the operators who would eventually use the tool were the ones deciding what got built. By the time we shipped, it was already their product.",
            "pending": false
          }
        ]
      },
      {
        "id": "G08",
        "name": "Values: Act like an entrepreneur",
        "items": [
          {
            "id": "Q25",
            "q": "How does this story show it?",
            "a": "Nobody asked me to build this. I found the gap by talking to users, formed a hypothesis, and de-risked it with a prototype at a single site before asking anyone to fund it. That is the part I would point to: I did not bring leadership a pitch, I brought them a result from an experiment I ran on the margins of my existing charter.",
            "pending": false
          }
        ]
      },
      {
        "id": "G09",
        "name": "Values: Win as a team",
        "items": [
          {
            "id": "Q26",
            "q": "How does this story show it?",
            "a": "Seven functional orgs with competing priorities could easily have made this a political program. Instead of managing them through their leaders, I brought their ICs and first-line managers into a weekly working sync and let them make the calls, then kept their leadership informed. The coalition, rather than the algorithm, is what produced 92% adoption.",
            "pending": false
          }
        ]
      },
      {
        "id": "G10",
        "name": "Values: Simplify",
        "items": [
          {
            "id": "Q27",
            "q": "How does this story show it?",
            "a": "The whole product is a simplification. We took a tangled operation that produced an unreadable list of correlated events and decomposed it into a connected set of links with observable states, so a user could get one attributable cause instead of five plausible ones. The measure of success was that an instock manager stopped needing to interpret the tool and could just act on it.",
            "pending": false
          }
        ]
      },
      {
        "id": "G11",
        "name": "Values: Play the long game",
        "items": [
          {
            "id": "Q28",
            "q": "How does this story show it?",
            "a": "The clearest example is the one where I got it wrong first. I let the north star metric go under short-term pressure, which bought a quiet quarter and cost months of churn. Reinstating it was the long-game call, and it is the reason I now treat the metric as infrastructure rather than as paperwork. The launch-criteria decision was the same instinct applied correctly: taking a later date to ship something we could defend.",
            "pending": false
          }
        ]
      },
      {
        "id": "G12",
        "name": "Values: Empower the client",
        "items": [
          {
            "id": "Q29",
            "q": "How does this story show it?",
            "a": "My clients were internal, the instock and supply chain teams, and the measure of whether I empowered them is whether they chose to use the thing. Ninety-two percent adoption as the default decision layer is the answer. Before UARC2 they went into business reviews with three theories and no way to choose. After it they went in with a root cause and a specific defect to fix.",
            "pending": false
          }
        ]
      }
    ]
  },
  "lifecycle": {
    "lanes": {
      "physical": "Physical custody",
      "informational": "Information, money, and verification"
    },
    "steps": [
      {
        "id": "S01",
        "name": "Quote",
        "physical": "Nothing moves yet. The freight is still sitting at the shipper.",
        "informational": "The shipper asks for a price on a lane. The broker prices off historical lane cost, market data, equipment type, and expected accessorials.",
        "custodyHolder": "Shipper",
        "dataHolder": "Broker",
        "markers": [],
        "physShort": "Nothing moves. Freight sits at the shipper.",
        "infoShort": "Shipper asks a price on a lane. Broker prices off lane history and market data."
      },
      {
        "id": "S02",
        "name": "Tender",
        "physical": "Still nothing. The truck has not been assigned.",
        "informational": "The shipper formally offers the load at a contracted rate, as an EDI 204 or an API call, carrying stop sequence, appointment windows, weight, and reference numbers.",
        "custodyHolder": "Shipper",
        "dataHolder": "Shipper TMS",
        "markers": [],
        "physShort": "Still nothing. No truck has been assigned.",
        "infoShort": "Shipper offers the load at contract rate by EDI 204, with stops and windows."
      },
      {
        "id": "S03",
        "name": "Accept or reject",
        "physical": "Nothing moves. The freight is still on the origin dock while the load works its way down the routing guide.",
        "informational": "The carrier answers with an EDI 990. Every decline pushes the load one position deeper into the routing guide, and each position past the primary costs roughly 5 to 15 percent more.",
        "custodyHolder": "Shipper",
        "dataHolder": "Shipper TMS",
        "markers": [],
        "physShort": "Nothing moves. Freight sits on the origin dock.",
        "infoShort": "Carrier answers with EDI 990. Each decline down the guide costs 5 to 15% more."
      },
      {
        "id": "S04",
        "name": "Cover",
        "physical": "Still nothing physical. Somewhere a truck is finishing another load and does not know about this one yet.",
        "informational": "The broker buys a truck, working its own network first and the load boards last. The signed rate confirmation is the binding document, and the shipper's record now reads covered without saying by whom.",
        "custodyHolder": "Shipper",
        "dataHolder": "Broker",
        "markers": [],
        "physShort": "Still nothing. A truck is finishing another load.",
        "infoShort": "Broker buys a truck, own network first. Signed rate confirmation is binding."
      },
      {
        "id": "S05",
        "name": "Dispatch",
        "physical": "A truck starts moving toward the origin, empty. The freight itself has still not moved.",
        "informational": "The carrier assigns a driver and equipment and passes the rate confirmation down. Hours of service feasibility gets checked here for the first time, well after the appointment window was promised at tender.",
        "custodyHolder": "Shipper",
        "dataHolder": "Carrier",
        "markers": [],
        "physShort": "An empty truck heads to origin. Freight has not moved.",
        "infoShort": "Carrier assigns driver and equipment. Hours of service checked only now."
      },
      {
        "id": "S06",
        "name": "Pickup appointment",
        "physical": "The driver arrives at the origin dock and waits. The freight crosses into the trailer only when the facility is ready to load it.",
        "informational": "The facility's scheduling portal holds the slot, the gate time, and the in and out stamps. Free time runs from the scheduled appointment time rather than from actual arrival, so that portal record is already the billing record.",
        "custodyHolder": "Facility",
        "dataHolder": "Facility",
        "markers": [],
        "physShort": "Driver waits at the origin dock. Loading starts later.",
        "infoShort": "Facility portal holds slot and gate stamps. Free time runs from appointment."
      },
      {
        "id": "S07",
        "name": "In transit",
        "physical": "The freight is on the road, sealed in the trailer, under the driver's control for the length of the run.",
        "informational": "Status flows as EDI 214, an ELD API pull, or a driver app ping. Coverage is thinnest on one to five truck carriers, which is exactly who moves spot freight, so the broker fills the gap with manual check calls.",
        "custodyHolder": "Driver",
        "dataHolder": "Broker",
        "markers": [],
        "physShort": "Freight is on the road, sealed under the driver.",
        "infoShort": "Status by EDI 214, ELD pull, or app ping. Small fleets need check calls."
      },
      {
        "id": "S08",
        "name": "Delivery appointment",
        "physical": "The truck sits at the receiver's gate. The freight is still on the trailer and the driver cannot leave.",
        "informational": "The receiver sets the appointment and decides whether to honor it. Detention accrues against a scheduled time the receiver controls, and the receiver carries none of the cost of a bad slot.",
        "custodyHolder": "Driver",
        "dataHolder": "Receiver",
        "markers": [],
        "physShort": "Truck sits at the receiver gate. Freight stays loaded.",
        "infoShort": "Receiver sets the appointment and decides whether to honor it. Detention runs."
      },
      {
        "id": "S09",
        "name": "POD",
        "physical": "The freight comes off the trailer and into the receiver's building. Damage or shortage is noted at this moment or it is never noted at all.",
        "informational": "The signed bill of lading, carrying any OS&D notation, becomes the proof of delivery. It often rides in the cab for days, and nothing downstream can be billed until it lands.",
        "custodyHolder": "Receiver",
        "dataHolder": "Driver",
        "markers": [],
        "physShort": "Freight comes off the trailer. Damage is noted now.",
        "infoShort": "Signed bill of lading becomes the POD. Nothing bills until it lands."
      },
      {
        "id": "S10",
        "name": "Invoice",
        "physical": "Nothing moves. The freight is in the receiver's inventory and the transportation event is finished.",
        "informational": "The carrier bills by EDI 210 with the POD, lumper receipts, and detention documentation attached. Accessorial disputes start here, because the carrier, the broker, the shipper, and the facility each hold a different set of arrival timestamps and none of those sets is shared.",
        "custodyHolder": "Receiver",
        "dataHolder": "Broker",
        "markers": [],
        "physShort": "Nothing moves. Freight is in receiver inventory.",
        "infoShort": "Carrier bills by EDI 210 with POD. Four parties hold different timestamps."
      },
      {
        "id": "S11",
        "name": "Settlement",
        "physical": "Nothing moves. The only thing still in motion is cash.",
        "informational": "The broker remits by EDI 820, typically net 30 from POD, while collecting from the shipper on net 60 to 90. Small carriers cannot finance that gap, so many sell the invoice to a factor at 1 to 5 percent and the factor becomes the party owed.",
        "custodyHolder": "Receiver",
        "dataHolder": "Factor",
        "markers": [],
        "physShort": "Nothing moves. Only cash is still in motion.",
        "infoShort": "Broker remits by EDI 820 net 30 and collects net 60 to 90. Carriers factor."
      },
      {
        "id": "S12",
        "name": "Claims",
        "physical": "The damaged or short freight sits at the receiver, sometimes refused at the door and sometimes accepted with an exception written on the paperwork.",
        "informational": "The Carmack Amendment places near strict liability on the carrier, with nine months to file and two years plus a day to sue. The outcome turns on the POD notation and the document file, which the broker assembled and holds.",
        "custodyHolder": "Receiver",
        "dataHolder": "Broker",
        "markers": [],
        "physShort": "Damaged or short freight sits at the receiver.",
        "infoShort": "Carmack puts near strict liability on the carrier. Broker holds the file."
      }
    ]
  },
  "markers": [
    {
      "id": "P01",
      "step": "S08",
      "weight": "loud",
      "title": "Detention is earned, invoiced, and then never paid",
      "what": "Free time starts from the scheduled appointment time, not from when the driver actually arrives. So the appointment record is the billing record, and the party that holds it wins the argument.",
      "who": "Carriers, and owner-operators hardest of all",
      "frequency": "39.3% of all stops run past the free period",
      "cost": "$15.1B a year industry-wide. Carriers invoice only 75% of the time, and only 55% of those invoices get paid, so roughly 41% of earned detention ever becomes cash.",
      "workaround": "Chase the paperwork inside a 24 to 48 hour window, or write it off.",
      "controlsDecision": "The receiver, who sets and honors the appointment",
      "bearsCost": "The carrier, who has no control over either",
      "flexportAngle": "Flexport books the appointment, so it is already holding the evidence and not turning it into money for its carriers.",
      "aiOpportunity": "replace",
      "source": "ATRI detention study; FreightWaves detention pay clauses"
    },
    {
      "id": "P02",
      "step": "S06",
      "weight": "loud",
      "title": "Booking one load can mean logging into six different portals",
      "what": "No standard exists for facility appointment booking, so each stop is its own system with its own rules and its own confirmation chase. A six-stop shipment means six separate logins and six separate follow-ups afterward.",
      "who": "Broker and 3PL scheduling clerks, and carrier dispatchers",
      "frequency": "Every load, multiplied by the number of stops on it",
      "cost": "Paid in headcount rather than in a line item. Opendock alone covers 4,000+ warehouses and 14M+ annual appointments, and it is one vendor among many, so a national broker touching 20,000 facilities holds logins across dozens of systems plus phone and email.",
      "workaround": "In-house manual portal entry, or outsourcing the same work to cheaper offshore labor pools.",
      "controlsDecision": "The facility, which picks its own scheduling system and writes its own rules",
      "bearsCost": "The broker, which staffs a human for every portal the facility chose",
      "flexportAngle": "Flexport already books these appointments at volume, which gives it the facility relationships and the repetition data to turn portal coverage into a durable asset. The JD naming AI-driven appointment scheduling suggests they see the same opening.",
      "aiOpportunity": "assist: An agent can draft and chase most bookings, but the genuinely hard part is write access to thousands of portals with no public API, so browser automation and voice fallback still leave a real exception surface for a human.",
      "source": "Qued CEO interview; Opendock published coverage figures"
    },
    {
      "id": "P03",
      "step": "S05",
      "weight": "loud",
      "title": "The last free day arrives before the terminal has a slot to give",
      "what": "Demurrage and per diem clocks run on calendar days while terminal gate slots are rationed, so a container can pass its last free day waiting for an appointment that does not exist yet. Chassis availability constrains the same move a second time.",
      "who": "Drayage carriers and dispatchers, and the cargo owner downstream",
      "frequency": "Every container. Drayage productivity is 1 to 3 turns per day, so one badly placed slot costs a large share of a truck's day.",
      "cost": "Split chassis moves add 45 to 90 minutes per trip with no reimbursement, and equipment providers apply severe penalties for returning a chassis to the wrong terminal. In October 2025 the D.C. Circuit partially vacated the FMC billing rule, putting motor carriers back on the hook for demurrage and detention when they contract directly with ocean carriers.",
      "workaround": "Pre-pull containers early to beat free time, refresh terminal portals by hand hunting for cancellations, and absorb the per diem when neither works.",
      "controlsDecision": "The terminal, which rations gate slots, alongside the equipment provider that sets chassis rules",
      "bearsCost": "The drayage carrier, newly re-exposed since the October 2025 ruling",
      "flexportAngle": "This is the one pain sitting on the seam between Flexport's ocean business and its trucking business, and Flexport knows the container's arrival before anyone downstream does. A board pairing last free day against the next real slot is an opening nobody has taken since a legal change this recent.",
      "aiOpportunity": "assist: The countdown and the dollar exposure are straightforward once the data sits in one place, but booking the terminal slot runs into the same missing-API wall, so the terminal integration has to be mocked and named as mocked.",
      "source": "Harbor Trucking Association chassis white paper; Land Line coverage of the D.C. Circuit ruling"
    },
    {
      "id": "P04",
      "step": "S04",
      "weight": "quiet",
      "title": "The carrier who books the load is not always the carrier who shows up",
      "what": "Carrier identity theft has become the dominant fraud vector. A fraudster takes over a legitimate carrier's authority or email domain and books freight under someone else's safety record, and the theft surfaces after the trailer is gone.",
      "who": "Brokers, the carriers whose identities were used, and shippers with cargo on the trailer",
      "frequency": "TIA members filed 1,611 fraud reports across eight months, up 65% over the prior period, and 83% encountered three or more distinct fraud types within six months",
      "cost": "Average gross cost of roughly $402,000 per responding firm, with more than $40,000 lost per fraudulent load. Cargo theft losses reached $725 million in 2025 while incident counts stayed roughly flat.",
      "workaround": "Third-party vetting subscriptions, callback verification, and a hand-maintained blacklist living in the TMS.",
      "controlsDecision": "The broker, choosing a carrier under time pressure with a truck needed in three hours",
      "bearsCost": "The broker on the cargo claim, and the legitimate carrier whose safety record was borrowed to steal it",
      "flexportAngle": "Fraud signals improve with scale, one of the few genuine data network effects in freight, and Flexport's load volume plus its ocean-side knowledge of what is actually inside the container is a real starting position. The vendor space is crowded, so the sharper question is what to partner for and what to own.",
      "aiOpportunity": "assist: Anomaly detection across booking behavior is a good fit for a model, while identity verification itself depends on authoritative external data and a human on the escalation path.",
      "source": "TIA fraud survey Sept 2024 to Feb 2025; Verisk CargoNet 2025 cargo theft data"
    },
    {
      "id": "P05",
      "step": "S11",
      "weight": "quiet",
      "title": "Carriers take a lower rate to get paid sooner and call it the cost of doing business",
      "what": "Standard broker terms run 30 to 45 days while an owner-operator's fuel bill comes due at the pump today. That timing gap gets closed by factoring or quick pay, both priced as a discount on work already delivered.",
      "who": "Small carriers and owner-operators",
      "frequency": "Every invoice",
      "cost": "Quick pay commonly runs about 3%, and a nominal 3% factoring rate lands nearer 4% effective once ACH, wire, monthly minimum, and termination fees are counted. Small carriers routinely carry $40,000 to $100,000 in delivered but unpaid work. FreightWaves documents carriers taking a $2.20 per mile load paying in a week over a $2.60 per mile load paying in 45 days, a 15% revenue haircut taken purely on timing.",
      "workaround": "Factor the invoice, buy quick pay at a discount, or choose brokers by payment speed ahead of rate.",
      "controlsDecision": "The broker, which sets carrier terms to match its own collection cycle from the shipper",
      "bearsCost": "The carrier, financing the gap at roughly 4%, and ultimately the broker, which pays a rate premium it never sees itemized",
      "flexportAngle": "Payment speed is a pricing lever, and a broker paying faster buys capacity cheaper. Flexport has the balance sheet and the load history to price that trade deliberately rather than by default.",
      "aiOpportunity": "assist: Faster settlement is largely a document and exception problem, so automated POD capture and accessorial validation shorten the cycle without asking a model to make the credit decision.",
      "source": "FreightWaves carrier payment reporting; published factoring and quick pay rate ranges"
    },
    {
      "id": "P06",
      "step": "S03",
      "weight": "quiet",
      "title": "The routing guide holds right up until the market moves",
      "what": "Contract rates are backward-looking averages of where spot has been, so when spot climbs past contract the primary carrier declines and the load cascades down the guide. Every fall re-prices the load and usually re-opens the appointment behind it.",
      "who": "Shippers first, then the broker holding a fixed-price commitment",
      "frequency": "Continuous through 2026. SONAR's outbound tender reject index ran about 9.97% in January 2026 and above 13% by February 2026.",
      "cost": "Each position beyond primary costs roughly 5 to 15% more, and J.B. Hunt flagged a cumulative 20% rate hike across two years. Schneider reported its most contract renewals since 2021.",
      "workaround": "Spot scramble, mini-bids, and more frequent contract renegotiation.",
      "controlsDecision": "The carrier, deciding load by load whether the contracted rate still beats spot",
      "bearsCost": "The shipper on cost and OTIF, and the broker whose gross margin compresses because it honors a sell rate while buying at rising spot",
      "flexportAngle": "Routing guide depth is a shipper's single best cost-control number, and Flexport sits on both the tender side and the coverage side of it. Anything that improves acceptance at depth one is directly monetizable.",
      "aiOpportunity": "assist: Predicting which tenders will reject is tractable, while the decision to reprice or re-source is a commercial judgment worth keeping a human on in a market this volatile.",
      "source": "FreightWaves SONAR OTRI; J.B. Hunt and Schneider public commentary"
    },
    {
      "id": "P07",
      "step": "S04",
      "weight": "quiet",
      "title": "A small carrier can lose access to freight without ever being told why",
      "what": "After the Supreme Court's unanimous Montgomery decision in May 2026, carrier selection is documented legal exposure, so brokers cull hard using third-party scores. A carrier with a thin inspection history can be dropped with no notice and no appeal path.",
      "who": "Small carriers, and the broker compliance teams now carrying the documentation burden",
      "frequency": "Rising sharply since May 2026",
      "cost": "Landstar cut its approved network from over 100,000 carriers in Q2 2022 to 64,600 in Q2 2026, a 35% reduction. ATRI's December 2025 study found improper hiring or onboarding multiplied a verdict award by 272.3%, and the BMC-84 broker bond of $75,000 covers none of that.",
      "workaround": "Brokers subscribe to vetting services and cull the list. Carriers post about it on public forums and apply somewhere else.",
      "controlsDecision": "The broker, applying a third-party score it did not build and cannot fully explain",
      "bearsCost": "The small carrier losing freight access, and the broker paying for the capacity it just removed from its own network",
      "flexportAngle": "Montgomery converts vetting from a compliance checkbox into a system of record, which is the largest new product requirement in brokerage in a decade and lands inside the JD's procure verb. An explainable decision trail is worth building regardless of whose score feeds it.",
      "aiOpportunity": "assist: A model can assemble and continuously refresh the evidence file the ruling now requires, while the selection decision should stay reviewable by a person because it is the artifact that gets read back in a deposition.",
      "source": "Montgomery v. Caribe Transport II, SCOTUS May 2026; Landstar Q2 2026 disclosures; ATRI Dec 2025 verdict study"
    },
    {
      "id": "P08",
      "step": "S07",
      "weight": "quiet",
      "title": "Visibility works best on the fleets that need it least",
      "what": "Location arrives through an ELD integration or a driver app ping, with a manual status message as the fallback. Quality drops off exactly where the freight is hardest, on the one to five truck carriers moving spot loads, and the gap gets filled with phone calls.",
      "who": "Brokerage operations teams, and the drivers they call",
      "frequency": "Every load, daily, and far more often once a load goes sideways",
      "cost": "No credible non-vendor figure exists for tracking compliance or check calls per load, so any circulating number deserves suspicion. What is documented is that track and trace remains the highest-manual-touch area in brokerage operations.",
      "workaround": "Manual check calls, increasingly placed by voice agents rather than by people.",
      "controlsDecision": "The carrier and the driver, who decide whether to share location at all",
      "bearsCost": "The broker staffing the gap, and the shipper receiving an ETA that decays across every dwell event",
      "flexportAngle": "Voice agents for check calls are already in production across the industry, so the interesting remaining work is what the collected data feeds. Dwell distributions by facility are arguably the most valuable proprietary dataset a domestic broker can own, and Flexport's volume is enough to build one.",
      "aiOpportunity": "replace: Scripted, high-volume, low-stakes calls with a clean human escalation path are the clearest production win in freight AI today, and the escalation path is what a PM actually owns.",
      "source": "Ally Logistics CEO on manual touches; visibility provider architecture notes"
    },
    {
      "id": "P09",
      "step": "S08",
      "weight": "quiet",
      "title": "An appointment time is a request, and plenty of facilities treat it that way",
      "what": "A facility confirms a slot and then works the dock in arrival order, so the appointment lives in the booking system while the yard runs first come first served. The driver waits, and the timestamps a detention claim depends on never line up with what happened.",
      "who": "Drivers most of all, then the carrier that loses the day",
      "frequency": "Constant. SONAR measures average dwell at 119 minutes per stop, landing right on the two-hour free-time boundary, and a live load runs roughly three hours against about 30 minutes for drop and hook.",
      "cost": "Feeds detention directly. DOT OIG found each 15-minute increase in average dwell raises the average crash rate by 6.2%, so the cost is a safety cost as well as a commercial one.",
      "workaround": "Word of mouth. A TruckersReport thread on the worst shippers and receivers has run since 2006 and carries 1,270 replies against 493,000 views.",
      "controlsDecision": "The facility, which sets the appointment and then decides whether to honor it",
      "bearsCost": "The carrier and the driver, neither of whom has any say in either decision",
      "flexportAngle": "Flexport books enough appointments to know which facilities honor them, and facility dwell is the largest single source of quote error. Measuring it and pricing it back into the quote closes a loop most brokers cannot even observe today.",
      "aiOpportunity": "assist: This is a data problem ahead of a model problem, and the useful output is a facility reliability score a pricing analyst can defend to a customer.",
      "source": "SONAR dwell data; DOT OIG 2018 detention report; TruckersReport forum volume"
    },
    {
      "id": "P10",
      "step": "S10",
      "weight": "quiet",
      "title": "Four parties hold four different arrival times and none of them is authoritative",
      "what": "Accessorial disputes come down to timestamps. The carrier bills four hours of detention, the broker's records show two, the shipper's show one, and the facility kept none, so the invoice gets settled by negotiation where arithmetic should have done the work.",
      "who": "Carrier billing clerks and broker accounts payable",
      "frequency": "Every settlement carrying an accessorial",
      "cost": "No credible industry-wide error rate or per-correction cost is available from a non-vendor source, so the honest position is that the magnitude is unmeasured while the mechanism is well documented: overcharges above contracted rates, duplicate invoices, misclassified freight, and unauthorized accessorials.",
      "workaround": "Freight audit programs after the fact, plus rate confirmation language requiring written authorization before any detention is paid at all.",
      "controlsDecision": "Whoever holds the record the other parties will accept, which today is usually nobody",
      "bearsCost": "The carrier, which discounts the invoice or writes it off to protect the relationship",
      "flexportAngle": "Flexport books the appointment and can timestamp arrival and departure, which is the one shared fact that converts an accessorial argument into a calculation. Publishing that record to both sides is a small artifact with an outsized effect on carrier loyalty.",
      "aiOpportunity": "assist: Document extraction and invoice matching are production-ready today, and reconciliation only becomes trivial once a shared timestamp exists, which is a product decision ahead of a model one.",
      "source": "FreightWaves settlement error taxonomy; rate confirmation clause reporting"
    }
  ],
  "mapping": {
    "problems": [
      {
        "id": "R01",
        "title": "Consolidate a fragmented estate without stopping the trucks",
        "fromJD": "Experience leading large-scale platform consolidations or system unification programs without disrupting live operations",
        "why": "There is no maintenance window. Freight moves every day, and every migration step has to be reversible while the operation keeps running."
      },
      {
        "id": "R02",
        "title": "Diagnose a human workflow well enough to safely automate it",
        "fromJD": "Proven ability in operational process engineering, diagnosing, redesigning, and automating complex human workflows",
        "why": "The workflow people describe is rarely the workflow they run, because the real one absorbs exceptions through phone calls, side spreadsheets, and favors. Automating the described version relocates the exception load somewhere less visible instead of removing it."
      },
      {
        "id": "R03",
        "title": "Persuade senior leaders to change operating models they built and are measured on",
        "fromJD": "This role involves redesigning the operating processes themselves and persuading leadership to adopt new models",
        "why": "A new operating model redistributes cost, headcount, and escalation paths across orgs that each carry their own targets. The proposal has to survive leaders who can quietly decline it without ever saying no."
      },
      {
        "id": "R04",
        "title": "Prove a software program actually moved cost-to-serve and procurement savings",
        "fromJD": "Deliver measurable business impact by optimizing cost-to-serve, procurement savings, and carrier performance metrics",
        "why": "Financial impact in a brokerage lands months after a release and is tangled up with rate cycles, freight mix, and volume swings. Attribution has to be designed into the rollout before the first migration step, because it cannot be reconstructed afterward."
      },
      {
        "id": "R05",
        "title": "Build the measurement layer before the thing being measured lives in one place",
        "fromJD": "Strong analytical skills with SQL proficiency and experience building metrics frameworks to drive strategic decisions",
        "why": "A fragmented estate usually means several data marts at different grain, each with its own definition of the same event. One conformed view of a truck move is the prerequisite for ranking any investment against any other."
      },
      {
        "id": "R06",
        "title": "Automate dispatch and appointments when the deciding party sits outside the company",
        "fromJD": "Drive automation and AI initiatives, such as automated dispatch and appointment scheduling, to remove manual work from the cargo lifecycle",
        "why": "The receiver controls the appointment slot and the carrier controls whether it accepts the load, so both are negotiations across an organizational boundary rather than allocations inside one. The prediction is the tractable half, and reaching agreement through dozens of incompatible warehouse portals is where the real work sits."
      },
      {
        "id": "R07",
        "title": "Make a dense operational screen fast for someone working an exception queue under time pressure",
        "fromJD": "Skilled at shipping intuitive UX in data-dense domains and aligning cross-functional teams around a shared roadmap",
        "why": "An operator needs every relevant field visible at once and also needs the next action to be obvious within a second. Simplifying by hiding data pushes that operator straight back into the spreadsheets the tool was built to replace."
      },
      {
        "id": "R08",
        "title": "Hold strategy altitude and migration-level detail at the same time across time zones",
        "fromJD": "Ability to operate simultaneously at the high-level strategy and granular execution levels, collaborating with global Engineering, Design, and Operations teams",
        "why": "Leadership forums reward a clean narrative while a migration is decided in small details that only surface in the daily working thread. With partner teams spread across time zones, a question that takes five minutes in a room costs a full day."
      },
      {
        "id": "R09",
        "title": "Get the people doing the work every day to actually switch to the new way",
        "fromJD": "Implied: consolidation and process redesign programs are usually won or lost at frontline adoption, which the JD does not name directly",
        "why": "Operators and first-line managers keep a shadow workflow alive whenever the new path is slower on the case they handle most often. Adoption holds only when the new path beats the old one on the worst day of the week, and confirming that requires watching real queues rather than usage dashboards."
      },
      {
        "id": "R10",
        "title": "Bring rented and partner-executed capability in-house on terms that were signed years ago",
        "fromJD": "Implied: a 'single Flexport-owned platform' means unwinding vendor licenses and partner-executed volume, which takes commercial work as well as engineering",
        "why": "Capability that a partner executes or a vendor licenses carries contracts, notice periods, and data rights that quietly set the migration sequence. The technical plan has to follow the commercial one, and renegotiation runs on a calendar of its own."
      },
      {
        "id": "R11",
        "title": "Set the direction yourself in a domain with no standing senior owner to inherit from",
        "fromJD": "Implied: 'execute with high autonomy' in a domain that currently has no named senior owner",
        "why": "Real autonomy means defining the problem is part of the job, with no incumbent roadmap to argue for or against. The baseline numbers and the decision rights both have to be assembled before the first meaningful trade-off can even be framed."
      }
    ],
    "work": [
      {
        "id": "W01",
        "name": "Feast Instock Portal",
        "outcome": "30+ tools consolidated into 8 workflows, 100% adoption",
        "detail": "Net-new internal platform for a $30B grocery operation across 8 countries. Replaced a sprawl of disconnected tools with a single workflow-oriented surface, and moved usability up 78% while the operation kept running."
      },
      {
        "id": "W02",
        "name": "UARC2",
        "outcome": "4x more accurate, up to 200bps instock gain",
        "detail": "An empty grocery shelf sits on top of 70+ possible root causes, and the incumbent tool measured correlation, so it collected everything that went wrong before a stockout and blamed all of it evenly. I led a causal-inference engine that decomposes the physical and virtual supply chain into discrete links using instrumentation already present across the microservice ecosystem, then measures each link's contribution to the outcome. Attribution MAPE went from roughly 32 to roughly 8, and it reached 100% adoption across all seven customer orgs about six weeks after tech-complete."
      },
      {
        "id": "W03",
        "name": "OADS",
        "outcome": "9.15% shrink reduction, roughly $6.4M a year",
        "detail": "I was asked to automate a manual daily script that set order increments for every product at every hub, and found it was really an objective function that matched order increment to slot size to minimize DC receive labor with no constraint on shrink. Slow-moving perishables were getting ordered a full pallet at a time, sometimes months of demand for something like dairy, and nobody had connected order increment to the shrink number. I rewrote the objective around total landed cost constrained by instock rate, shadow-tested against the live buying system, and rolled out one DC at a time, with the 15% of SKUs downgraded seeing 53% less shrink and instock holding."
      },
      {
        "id": "W04",
        "name": "Freyja / Sotheby",
        "outcome": "+25bps network instock, +315bps hub share",
        "detail": "I was told to finish rolling out an ML model called Sotheby inside Freyja, the sourcing engine that picks a vendor and a supply-chain path for every product at every store six times a day. Its objective function maximized long-term free cash flow, which had stopped matching a business strategy that shifted to instock, and the original team had never isolated its impact. With no data scientist assigned I reconstructed both algorithms in SQL from scratch and normalized out the hardcoded business-rule differences, which showed the legacy algorithm winning wherever the algorithm itself drove the decision, so I ported Sotheby's modern hub-routing logic into legacy, deprecated the model, and rolled it out one DC at a time with projected-versus-actual measurement at each wave."
      },
      {
        "id": "W05",
        "name": "Procurability at Amazon Go",
        "outcome": "Procurability 93% to 99%, instock 92% to 95%",
        "detail": "Instock teams spent their week reviewing last week's stockouts, and the weekly business review agenda reinforced that by making the stockout review its centerpiece. Procurability errors were already sitting unused in data tables, so I surfaced them in a daily morning report, assigned every SKU an owning instock manager so each error had a name on it, and moved a procurability slide ahead of the stockout review in the WBR. Adoption grew without a mandate."
      },
      {
        "id": "W06",
        "name": "BPSI prioritization",
        "outcome": "+200bps instock in bakery",
        "detail": "The UARC2 roadmap ranked root-cause buckets purely by how many basis points of stockouts each one drove, which put DC Scarcity next. I wanted the smaller BPSI bucket first, because DC Scarcity already had an operator workaround while BPSI was a black box the system could flag but nobody could act on. I convened ICs from all seven customer orgs and co-created a prioritization framework that added actionability as a second axis, BPSI floated to the top on the group's own math, and expanding the model to it surfaced insights that drove the bakery gain."
      },
      {
        "id": "W07",
        "name": "Sourceability in Feast 2.0",
        "outcome": "88% to 92% sourceability in three months",
        "detail": "During the assortment reset process, different teams decided sourceability differently and the teams making the call lacked the supply-chain topology knowledge my team had, so answers conflicted and were often wrong. I wrote a proposal and worked a coalition of peers to win two separate concessions: two orgs letting my team own the calculation, and a business team letting my users own the selection gatekeeping decision. I kept it survivable by holding the new model to objective criteria with no subjective judgment calls in it."
      },
      {
        "id": "W08",
        "name": "Catalog API integration",
        "outcome": "Incorrect assortments down 40%, catalog errors down 20%, data 4x fresher",
        "detail": "Two API contract changes across two years made FRC, my core sourcing service, the source of truth for catalog assortment coverage in Amazon grocery. The first migrated FRC off a legacy catalog API onto the new one. The second inverted the contract with the upstream Feast 2.0 dependency so FRC receives a wide SKU set, runs the coverage check itself, and vends back which SKUs passed, replacing the flaky per-team checks every partner had been running independently."
      },
      {
        "id": "W09",
        "name": "Frida",
        "outcome": "80% faster investigation",
        "detail": "Even with UARC2 underneath, root-causing a stockout still meant writing SQL and pulling reports. Frida is an LLM natural-language interface over that diagnostics stack, so operators ask why an item went out of stock in plain language. I defined the success metric, time to answer versus the old method, before a single requirement was written."
      },
      {
        "id": "W10",
        "name": "Sourcing ecosystem",
        "outcome": "5 automated decisions per SKU per location, 6 runs a day",
        "detail": "I owned the automated sourcing layer for Amazon Fresh. For every SKU at every location it decides who to buy from, how to route it, when to buy, what order increment to use at the hubs, and how to degrade gracefully when the ideal path is unavailable. Freyja, FRC, HPC, and ProPAS sit behind those decisions, along with the cross-dock and transship handling."
      },
      {
        "id": "W11",
        "name": "Project Roadie",
        "outcome": "Beyonce Renaissance Tour merch launch unblocked",
        "detail": "Amazon Music launched a concert-tour merch business, and leadership wanted to reuse a small-parcel fulfillment service that drops boxes at residential addresses. Tour merch moves on a truck that travels with the show and lands pallets at an arena dock, so I interviewed operators and venue hosts, went to shows and down to the back-of-house docks to watch inventory move, then wrote an options doc working backwards from the physical operation. Business and technology leadership picked the operationally grounded model in one room, and I built the frontline handheld tooling for inventory transactions and virtual location transfers."
      },
      {
        "id": "W12",
        "name": "MATES",
        "outcome": "47% return year to date",
        "detail": "A multi-agent trading system for prediction markets that I built on my own time in Claude Code, including its MCP server. It is what I point at when someone asks whether I still build with agentic tooling myself."
      }
    ],
    "edges": [
      {
        "id": "E01",
        "problem": "R01",
        "work": "W01",
        "strength": "primary",
        "note": "Both collapse a scattered tool estate into one workflow surface while the operation keeps running underneath, with no window to go dark."
      },
      {
        "id": "E02",
        "problem": "R01",
        "work": "W03",
        "strength": "supporting",
        "note": "Shadow-testing against the live buying system and rolling out one DC at a time is the reversibility discipline a migration needs."
      },
      {
        "id": "E03",
        "problem": "R01",
        "work": "W04",
        "strength": "supporting",
        "note": "Deprecating a running system wave by wave, with measurement at each wave, is the same sequencing problem as retiring a legacy platform."
      },
      {
        "id": "E04",
        "problem": "R02",
        "work": "W03",
        "strength": "primary",
        "note": "He was handed a manual script to automate and found an unstated objective function underneath it, which is exactly the gap between the described workflow and the real one."
      },
      {
        "id": "E05",
        "problem": "R02",
        "work": "W11",
        "strength": "supporting",
        "note": "He went to the dock and watched inventory move before designing anything, so the design started from the observed operation rather than the reported one."
      },
      {
        "id": "E06",
        "problem": "R03",
        "work": "W07",
        "strength": "primary",
        "note": "He moved a calculation and a gatekeeping decision away from two peer orgs and a business team, which is a change to who decides rather than a change to a tool."
      },
      {
        "id": "E07",
        "problem": "R03",
        "work": "W06",
        "strength": "supporting",
        "note": "He changed leadership's ranking by getting the affected orgs to co-author the framework, so the new order arrived as the group's own math."
      },
      {
        "id": "E08",
        "problem": "R03",
        "work": "W11",
        "strength": "supporting",
        "note": "Leadership had already chosen a fulfillment model and he redirected them in one room using field evidence they could not argue with."
      },
      {
        "id": "E09",
        "problem": "R04",
        "work": "W03",
        "strength": "primary",
        "note": "He rebuilt the objective around total landed cost under an instock constraint and produced a defended dollar figure, which is cost-to-serve attribution designed in rather than reconstructed."
      },
      {
        "id": "E10",
        "problem": "R04",
        "work": "W04",
        "strength": "supporting",
        "note": "Projected-versus-actual measurement at every rollout wave is the mechanism that survives volume swings and mix changes after launch."
      },
      {
        "id": "E11",
        "problem": "R05",
        "work": "W02",
        "strength": "primary",
        "note": "He built one conformed decomposition of an event that lived across dozens of services, which is the same prerequisite as one shared definition of a truck move."
      },
      {
        "id": "E12",
        "problem": "R05",
        "work": "W04",
        "strength": "supporting",
        "note": "He reconstructed two production algorithms in SQL and normalized out the hardcoded differences to make them comparable, which is grain reconciliation done by hand."
      },
      {
        "id": "E13",
        "problem": "R06",
        "work": "W08",
        "strength": "primary",
        "note": "Honest stretch. The shared mechanism is negotiating a machine-readable agreement across a boundary he did not control and replacing everyone's private workaround, but the counterparty was an internal team rather than a warehouse or a carrier."
      },
      {
        "id": "E14",
        "problem": "R06",
        "work": "W10",
        "strength": "supporting",
        "note": "Five automated decisions per SKU per location, six times a day, including graceful degradation when the preferred path is unavailable, is automation running against an unreliable outside world."
      },
      {
        "id": "E15",
        "problem": "R07",
        "work": "W01",
        "strength": "primary",
        "note": "Usability up 78% in a data-dense operational tool came from reorganizing around workflows instead of removing fields the operator still needed."
      },
      {
        "id": "E16",
        "problem": "R07",
        "work": "W09",
        "strength": "supporting",
        "note": "Frida cut time to answer by 80% for someone mid-investigation, and he set that clock as the success metric before requirements existed."
      },
      {
        "id": "E17",
        "problem": "R07",
        "work": "W11",
        "strength": "supporting",
        "note": "He built the handheld tooling frontline staff used for inventory transactions on a live dock, where the interaction budget is seconds."
      },
      {
        "id": "E18",
        "problem": "R08",
        "work": "W01",
        "strength": "primary",
        "note": "A net-new platform for a $30B operation across 8 countries forced both the leadership narrative and the per-country rollout detail. The time-zone specifics are not stated in the source, so treat the distributed-team half as unconfirmed."
      },
      {
        "id": "E19",
        "problem": "R08",
        "work": "W02",
        "strength": "supporting",
        "note": "He carried one program through seven customer orgs, holding an attribution story for executives and link-level instrumentation detail for engineers at the same time."
      },
      {
        "id": "E20",
        "problem": "R09",
        "work": "W05",
        "strength": "primary",
        "note": "He changed what the frontline did daily by putting an existing error signal in front of them every morning with a name attached, and adoption grew with no mandate behind it."
      },
      {
        "id": "E21",
        "problem": "R09",
        "work": "W01",
        "strength": "supporting",
        "note": "100% adoption of a replacement platform means the shadow workflow actually died, which is the only real test of a consolidation."
      },
      {
        "id": "E22",
        "problem": "R10",
        "work": "W07",
        "strength": "primary",
        "note": "Weakest primary on the board. He won ownership of capability another org executed, which is the right shape, but the negotiation was internal politics with no contracts, notice periods, or data rights involved."
      },
      {
        "id": "E23",
        "problem": "R10",
        "work": "W08",
        "strength": "supporting",
        "note": "Migrating off a legacy catalog API and then inverting the contract with an upstream dependency shows a technical plan sequenced around somebody else's terms."
      },
      {
        "id": "E24",
        "problem": "R11",
        "work": "W02",
        "strength": "primary",
        "note": "A 0-to-1 program in a domain where the incumbent tool measured the wrong thing, so he had to define the problem and build the baseline before any trade-off could be argued."
      },
      {
        "id": "E25",
        "problem": "R11",
        "work": "W10",
        "strength": "supporting",
        "note": "Owning the automated sourcing layer end to end meant setting scope and decision rights across four services with no roadmap handed down."
      },
      {
        "id": "E26",
        "problem": "R11",
        "work": "W12",
        "strength": "supporting",
        "note": "He specified, built, and ran an agentic system on his own with nobody assigning the problem, which is the autonomy claim in its purest form."
      }
    ]
  },
  "closer": {
    "framing": "Held loosely. This is built from outside with partial information, and the first job is finding out which parts of it are wrong, so I picked three bets concrete enough to be checked against what the team already knows in the first two weeks.",
    "bets": [
      {
        "id": "B01",
        "title": "Get one shared view of a truck move",
        "what": "Stand up a single table where one row is one truck move, carrying the same timestamps and the same identifiers whether the move began as a container leg, a partner-executed load, or a domestic shipment inherited from fulfillment. Publish a weekly cost and cycle-time read off that table and invite the operators to argue with it.",
        "why": "Cost to serve cannot be improved before it can be measured the same way twice, and every prioritization argument after this one runs through that table. Ground consolidation has been scoped here before, and the quickest way for us to learn from that is to put one shared number in front of everyone early.",
        "firstMove": "Week one, sit with data services and try to write the query for how many truck moves we executed last month and what each one cost, then write down every place it breaks."
      },
      {
        "id": "B02",
        "title": "Treat the appointment record as an asset we own",
        "what": "Make the scheduled appointment time a versioned record with an audit trail of who set it, who moved it, and when the truck actually arrived. Wire that record into the detention calculation so the evidence exists before anyone has to go looking for it.",
        "why": "Detention free time runs from the scheduled appointment time, and Flexport already books the appointment, which means we are holding the evidence for an argument that industry-wide turns into cash only about 41 percent of the time. This is the shortest path from data we already have to cash a carrier can actually collect.",
        "firstMove": "Week one, pull thirty recent drayage moves by hand and check whether the original appointment time still exists anywhere queryable after it was changed."
      },
      {
        "id": "B03",
        "title": "Serve import-linked ground first",
        "what": "Scope the first release of the owned platform to moves on a container whose customs entry we already filed, beginning with drayage and transload. Write that segment definition down as a rule the roadmap can be tested against, and keep general domestic truckload on its current path until the owned stack has earned it.",
        "why": "On an import-linked move the customs status and the terminal appointment already sit inside data we control, so orchestration becomes a join against records we hold. Selling the Convoy platform had its own real logic and it changes the starting position, so the fastest route back to an owned stack is the segment where the data is already ours.",
        "firstMove": "Week one, count what share of last quarter's ground volume was attached to a Flexport customs entry, because that number decides whether this bet is worth making at all."
      }
    ],
    "metric": "Fully loaded cost per import-linked truck move, including operator handling time and unrecovered accessorials, read from the shared truck-move table and reported monthly against a baseline we set in the first sixty days.",
    "falsifier": "If the shared truck-move view already exists and operators trust it, and cost per import-linked move is already flat or falling, then the constraint is somewhere I could not see from outside and this plan should be thrown out in week two. The same holds if import-linked ground turns out to be too small a share of volume for progress there to move the number the org is graded on.",
    "asks": [
      "A named data engineering partner for the first sixty days",
      "Read access to ground data everywhere it lives today, partner-executed volume included",
      "Agreement that the first release serves one named segment before it serves all of ground"
    ]
  },
  "references": {
    "primary": [
      {
        "id": "REF01",
        "label": "The job description",
        "title": "Staff Product Manager, Trucking Tech · Flexport",
        "url": "https://job-boards.greenhouse.io/flexport/jobs/8110066"
      },
      {
        "id": "REF02",
        "label": "Why We Bought, Built, and Sold the Convoy Platform",
        "title": "Ryan Petersen, Flexport, 28 July 2025",
        "url": "https://www.flexport.com/blog/why-we-bought-built-and-sold-the-convoy-platform/"
      },
      {
        "id": "REF03",
        "label": "DAT to Acquire the Convoy Platform from Flexport",
        "title": "DAT Freight & Analytics, 28 July 2025",
        "url": "https://www.dat.com/company/news-events/news-releases/dat-to-acquire-convoy-platform-from-flexport"
      },
      {
        "id": "REF04",
        "label": "An Update on Flexport's Trucking Business",
        "title": "Ryan Petersen, Flexport, 1 November 2023",
        "url": "https://www.flexport.com/blog/update-on-flexports-trucking-business/"
      },
      {
        "id": "REF05",
        "label": "NTG and Flexport Launch Strategic Partnership",
        "title": "The release that names Transmission and Beon, 28 July 2022",
        "url": "https://www.businesswire.com/news/home/20220728005168/en/Nolan-Transportation-Group-and-Flexport-Launch-Strategic-Partnership"
      },
      {
        "id": "REF06",
        "label": "Analysis of the Operational Costs of Trucking, 2026 Update",
        "title": "ATRI. The $2.336 per mile figure and its line items",
        "url": "https://truckingresearch.org/2026/07/analysis-of-the-operational-costs-of-trucking-2026-update/"
      },
      {
        "id": "REF07",
        "label": "New Study Shows Detention Improving Slightly But Still Pervasive",
        "title": "ATRI detention data via FreightWaves. 39.3% of stops, 75% invoiced, 55% paid",
        "url": "https://www.freightwaves.com/news/new-study-shows-detention-improving-slightly-but-still-pervasive"
      },
      {
        "id": "REF08",
        "label": "Understanding Detention Pay Clauses",
        "title": "FreightWaves. Free time runs from the scheduled appointment time",
        "url": "https://www.freightwaves.com/news/understanding-detention-pay-clauses"
      },
      {
        "id": "REF09",
        "label": "The Supreme Court Just Told Every Freight Broker They Can Be Sued",
        "title": "Montgomery v. Caribe Transport II, decided 14 May 2026",
        "url": "https://www.freightwaves.com/news/the-supreme-court-just-told-every-freight-broker-that-they-can-be-sued"
      },
      {
        "id": "REF10",
        "label": "Flexport Winter 2026 Technology Release",
        "title": "The full product slate, for comparison against ground",
        "url": "https://www.flexport.com/technology/product-release/winter-2026/"
      }
    ],
    "secondary": [
      {
        "group": "Flexport: company, product, and platform",
        "items": [
          {
            "title": "Flexport product index",
            "url": "https://www.flexport.com/products/"
          },
          {
            "title": "Flexport: Drayage and FTL Trucking Services",
            "url": "https://www.flexport.com/products/trucking/"
          },
          {
            "title": "Flexport Platform",
            "url": "https://www.flexport.com/products/flexport-platform/"
          },
          {
            "title": "Flexport Control Tower",
            "url": "https://www.flexport.com/technology/control-tower/"
          },
          {
            "title": "Flexport Fall 2025 Technology Release",
            "url": "https://www.flexport.com/technology/product-release/fall-2025/"
          },
          {
            "title": "Flexport Winter 2025 Technology Release",
            "url": "https://www.flexport.com/technology/product-release/winter-2025/"
          },
          {
            "title": "Flexport partner page: NTG",
            "url": "https://www.flexport.com/company/global-network/partners-ntg/"
          },
          {
            "title": "Flexport blog index",
            "url": "https://www.flexport.com/blog/"
          },
          {
            "title": "Flexport About",
            "url": "https://www.flexport.com/about/"
          },
          {
            "title": "Flexport developer documentation",
            "url": "https://developers.flexport.com/"
          },
          {
            "title": "Flexport API v2 reference (version 2023-07-01)",
            "url": "https://apidocs.flexport.com/"
          },
          {
            "title": "Flexport careers",
            "url": "https://www.flexport.com/careers/jobs/"
          },
          {
            "title": "Flexport Greenhouse job board (full req pull)",
            "url": "https://job-boards.greenhouse.io/flexport"
          },
          {
            "title": "Staff PM, Commerce Tech (Shenzhen), naming Instant Price and Book",
            "url": "https://job-boards.greenhouse.io/flexport/jobs/8011493"
          },
          {
            "title": "Flexport engineering: Isolating Rails Engines with RuboCop",
            "url": "https://flexport.engineering/isolating-rails-engines-with-rubocop-210feaba3164"
          },
          {
            "title": "Snowflake customer case study: Flexport data mesh",
            "url": "https://www.snowflake.com/en/customers/all-customers/case-study/flexport/"
          },
          {
            "title": "Flexport launches 20+ AI-powered products (Feb 2025)",
            "url": "https://www.prnewswire.com/news-releases/flexport-unveils-20-tech-and-ai-powered-products-to-modernize-global-supply-chains-302383593.html"
          },
          {
            "title": "Flexport Customs Technology Suite launch (Oct 2025)",
            "url": "https://www.businesswire.com/news/home/20251014811735/en/Flexport-Launches-Customs-Technology-Suite-to-Help-Businesses-Manage-Tariffs-and-Reduce-Costs"
          },
          {
            "title": "Flexport launches technology to automate tariff refunds (Feb 2026)",
            "url": "https://www.businesswire.com/news/home/20260226536552/en/Flexport-Launches-Technology-to-Automate-Tariff-Refunds"
          },
          {
            "title": "Flexport launches AI to spot customs errors and prepare refunds",
            "url": "https://www.aircargonews.net/technology/2026/02/flexport-launches-ai-technology-to-spot-customs-errors-and-prepare-tariff-refunds/"
          },
          {
            "title": "Wikipedia: Flexport",
            "url": "https://en.wikipedia.org/wiki/Flexport"
          }
        ]
      },
      {
        "group": "Flexport: financials, valuation, and strategy",
        "items": [
          {
            "title": "Contrary Research company report: Flexport",
            "url": "https://research.contrary.com/company/flexport"
          },
          {
            "title": "Sacra: Flexport",
            "url": "https://sacra.com/c/flexport/"
          },
          {
            "title": "Sacra: Flexport at $2.1B revenue",
            "url": "https://sacra.com/research/flexport-at-2-1b-revenue/"
          },
          {
            "title": "Dealroom: Petersen on the push to $600M, the SaaS apocalypse, and the cost-leader pivot",
            "url": "https://app.dealroom.co/news/note/freight-email-forwarding-reborn-ryan-petersen-on-flexport-s-push-to-600m-the-saas-apocalypse-and-the-cost-leader-pivot"
          },
          {
            "title": "Flexport eyes profitability and IPO after restructuring (Feb 2026)",
            "url": "https://www.stattimes.com/air-cargo/flexport-eyes-profitability-and-ipo-after-restructuring-phase-1358160"
          },
          {
            "title": "Flexport targets profitability by end of 2025",
            "url": "https://finance.yahoo.com/news/flexport-targets-profitability-end-2025-205804929.html"
          },
          {
            "title": "AMB Logistic: what technical profit signals and what it does not",
            "url": "https://amblogistic.us/flexports-profitability-moment-what-technical-profit-signals-and-what-it-doesnt-about-digital-freight/"
          },
          {
            "title": "Sourcing Journal: Flexport projects 2025 profit on Convoy and organic growth",
            "url": "https://wwd.com/sourcing-journal/logistics/flexport-projects-2025-profit-convoy-organic-growth-freight-forwarder-ryan-petersen-1238856765/"
          },
          {
            "title": "Loadstar: Flexport doubles down on AI and enterprise shippers",
            "url": "https://theloadstar.com/flexport-doubles-down-on-ai-and-enterprise-shippers-as-it-moves-beyond-start-up-phase/"
          },
          {
            "title": "JOC at TPM26: Flexport CEO sees AI's impact accelerating",
            "url": "https://www.joc.com/article/tpm26-flexport-ceo-sees-ais-impact-on-logistics-accelerating-6179418"
          },
          {
            "title": "Upstarts Media: Flexport's Ryan Petersen on tariffs",
            "url": "https://www.upstartsmedia.com/p/flexports-ryan-petersen-on-tariff"
          },
          {
            "title": "Productmint: the Flexport business model",
            "url": "https://productmint.com/the-flexport-business-model-how-does-flexport-make-money/"
          },
          {
            "title": "GoFreight: what is the profit margin for freight forwarders",
            "url": "https://gofreight.com/blog/education/what-is-the-profit-margin-for-freight-forwarders.html"
          },
          {
            "title": "Shopify completes sale of Shopify Logistics to Flexport",
            "url": "https://www.shopify.com/news/shopify-completes-sale-of-shopify-logistics-to-flexport"
          },
          {
            "title": "CNBC: Shopify offloads logistics business to Flexport",
            "url": "https://www.cnbc.com/2023/05/04/shopify-offloads-logistics-business-to-flexport.html"
          },
          {
            "title": "Shopify SFN to charge $5,000 monthly as of 2026 (community thread)",
            "url": "https://community.shopify.com/t/flexport-sfn-to-charge-5-000-monthly-as-of-2026/553977"
          },
          {
            "title": "Flexport Trustpilot reviews",
            "url": "https://www.trustpilot.com/review/flexport.com"
          }
        ]
      },
      {
        "group": "Flexport: leadership, org, and the Dave Clark era",
        "items": [
          {
            "title": "Dave Clark to join Flexport as CEO (June 2022)",
            "url": "https://www.prnewswire.com/news-releases/dave-clark-to-join-flexport-as-chief-executive-officer-301564077.html"
          },
          {
            "title": "Supply Chain Dive: Flexport CEO Dave Clark resigns, Petersen takes over",
            "url": "https://www.supplychaindive.com/news/flexport-ceo-dave-clark-resigns-founder-ryan-petersen-takes-over/692956/"
          },
          {
            "title": "CNBC: the inside story of Dave Clark's tumultuous last days at Flexport",
            "url": "https://www.cnbc.com/2023/10/02/the-inside-story-of-dave-clarks-tumultuous-last-days-at-flexport.html"
          },
          {
            "title": "FreightWaves: Flexport founder says ousted CEO lost customer focus and spending discipline",
            "url": "https://www.freightwaves.com/news/flexport-founder-says-ousted-ceo-lost-customer-focus-spending-discipline"
          },
          {
            "title": "CNBC: Flexport is laying off 20% of its workforce",
            "url": "https://www.cnbc.com/2023/10/12/flexport-is-laying-off-20percent-of-its-workforce/"
          },
          {
            "title": "Supply Chain Dive: Flexport layoffs, fulfillment, forwarding, Shopify",
            "url": "https://www.supplychaindive.com/news/flexport-layoffs-fulfillment-forwarding-shopify/728950/"
          },
          {
            "title": "FreightWaves: Flexport CEO Petersen overhauls top management",
            "url": "https://www.freightwaves.com/news/flexport-ceo-petersen-overhauls-top-management"
          },
          {
            "title": "TheOrg: Flexport organization chart",
            "url": "https://theorg.com/org/flexport"
          },
          {
            "title": "Levels.fyi: Flexport product manager salaries",
            "url": "https://www.levels.fyi/companies/flexport/salaries/product-manager"
          }
        ]
      },
      {
        "group": "Convoy: the rise, the shutdown, and the assets",
        "items": [
          {
            "title": "Wikipedia: Convoy",
            "url": "https://en.wikipedia.org/wiki/Convoy_(company)"
          },
          {
            "title": "GeekWire: Flexport buys Convoy's tech, Dan Lewis and others to join",
            "url": "https://www.geekwire.com/2023/flexport-buys-convoys-tech-convoy-ceo-dan-lewis-other-employees-to-join-freight-company/"
          },
          {
            "title": "GeekWire: Convoy collapse, the CEO's memo detailing the shutdown",
            "url": "https://www.geekwire.com/2023/convoy-collapse-read-ceos-memo-detailing-sudden-shutdown-of-seattle-trucking-startup/"
          },
          {
            "title": "FreightWaves: Death from overfunding, an obituary for Convoy",
            "url": "https://www.freightwaves.com/news/death-from-overfunding-an-obituary-for-convoy"
          },
          {
            "title": "FreightWaves: Convoy shutdown",
            "url": "https://www.freightwaves.com/news/convoy-shutdown-trucking-startup"
          },
          {
            "title": "Overdrive: Convoy's collapse, was the tech worth the hype",
            "url": "https://www.overdriveonline.com/business/article/15637421/convoys-collapse-was-the-tech-worth-the-hype"
          },
          {
            "title": "FreightWaves: Flexport acquires Convoy technology stack",
            "url": "https://www.freightwaves.com/news/flexport-acquires-convoy-technology-stack-for-undisclosed-sum"
          },
          {
            "title": "Supply Chain Dive: Flexport buys Convoy tech stack, relaunches truckload",
            "url": "https://www.supplychaindive.com/news/Flexport-buys-Convoy-tech-stack-relaunch-truckload-service/698556/"
          },
          {
            "title": "FreightWaves: Flexport relaunches digital freight network Convoy",
            "url": "https://www.freightwaves.com/news/flexport-relaunches-digital-freight-network-convoy"
          },
          {
            "title": "Trucking Dive: Flexport offers Convoy load board technology to brokers",
            "url": "https://www.truckingdive.com/news/flexport-offering-convoy-load-board-technology-brokers/717864/"
          },
          {
            "title": "BusinessWire: DAT to acquire the Convoy Platform",
            "url": "https://www.businesswire.com/news/home/20250728801115/en/DAT-to-Acquire-the-Convoy-Platform-from-Flexport"
          },
          {
            "title": "FreightWaves: less than 2 years after Flexport bought Convoy's stack, it is being sold to DAT",
            "url": "https://www.freightwaves.com/news/less-than-2-years-after-flexport-bought-convoys-tech-stack-its-being-sold-to-dat"
          },
          {
            "title": "FreightWaves: load matching wars escalate as DAT snaps up Convoy",
            "url": "https://www.freightwaves.com/news/load-matching-wars-escalate-as-dat-snaps-up-convoy"
          },
          {
            "title": "Convoy announces drop-and-hook innovations (Nov 2020)",
            "url": "https://www.businesswire.com/news/home/20201119005340/en/Convoy-Announces-Three-Industry-Leading-Innovations-for-Nationwide-Drop-and-Hook-Service"
          },
          {
            "title": "DC Velocity: Convoy says smart trailer pool can speed freight turns",
            "url": "https://www.dcvelocity.com/articles/48051-convoy-says-smart-trailer-pool-can-speed-freight-turns"
          },
          {
            "title": "FreightWaves: Flexport head of trucking on broker tech in 5 to 10 years (Driegert)",
            "url": "https://www.freightwaves.com/news/flexport-head-of-trucking-new-broker-tech-will-be-crucial-in-5-10-years"
          }
        ]
      },
      {
        "group": "US trucking: market data, rates, and the 2026 inversion",
        "items": [
          {
            "title": "DAT: dry van report, spot rates ease as summer demand softens",
            "url": "https://www.dat.com/blog/dry-van-report-spot-rates-ease-as-summer-freight-demand-softens"
          },
          {
            "title": "DAT: freight demand flat but the sector story tells you everything",
            "url": "https://www.dat.com/blog/dry-van-report-freight-demand-stays-flat-but-the-sector-story-tells-you-everything"
          },
          {
            "title": "DAT: Q1 2026 US Bank Freight Payment Index, costs surging as volumes hold flat",
            "url": "https://www.dat.com/blog/dry-van-report-the-q1-2026-u-s-bank-freight-payment-index-shows-costs-surging-even-as-volumes-hold-flat"
          },
          {
            "title": "DAT: dry van spot rates top contract for the first time since February 2022",
            "url": "https://www.globenewswire.com/news-release/2026/07/09/3324951/0/en/dat-dry-van-spot-rates-top-contract-for-first-time-since-february-2022-flatbed-rates-hit-record-high.html"
          },
          {
            "title": "DAT Trendlines",
            "url": "https://www.dat.com/trendlines"
          },
          {
            "title": "Fleet Owner: spot rates soften for dry van and reefer while flatbed gains continue",
            "url": "https://www.fleetowner.com/news/rates/news/55383336/spot-market-freight-rates-soften-for-dry-van-and-refrigerated-while-flatbed-gains-continue-in-2026"
          },
          {
            "title": "FreightWaves: national trucking capacity is about to tighten significantly",
            "url": "https://www.freightwaves.com/news/national-trucking-capacity-is-about-to-tighten-significantly"
          },
          {
            "title": "FreightWaves: truckload carriers eyeing a multiyear rate upcycle",
            "url": "https://www.freightwaves.com/news/truckload-carriers-eyeing-multiyear-rate-upcycle"
          },
          {
            "title": "FreightWaves: routing guides are crumbling, it is different this time",
            "url": "https://www.freightwaves.com/news/routing-guides-are-crumbling-it-is-different-this-time"
          },
          {
            "title": "FreightWaves: spot rates split as tender rejections hold above 13%",
            "url": "https://www.freightwaves.com/news/spot-rates-split-as-tender-rejections-hold-above-13"
          },
          {
            "title": "FreightWaves: truckload volumes and spot rates hit multi-year highs",
            "url": "https://www.freightwaves.com/news/truckload-volumes-and-spot-rates-hit-multi-year-highs"
          },
          {
            "title": "FreightWaves: truckload linehaul rates rip higher in July, Cass says",
            "url": "https://www.freightwaves.com/news/truckload-linehaul-rates-rip-higher-in-july-cass-says"
          },
          {
            "title": "FreightWaves: US Bank Freight Payment Index rates",
            "url": "https://www.freightwaves.com/news/us-bank-freight-payment-index-rates"
          },
          {
            "title": "FreightWaves: is flatbed signaling a manufacturing renaissance",
            "url": "https://www.freightwaves.com/news/is-flatbed-signaling-a-manufacturing-renaissance"
          },
          {
            "title": "FreightWaves: SONAR releases new truckload volume and rejection indices",
            "url": "https://www.freightwaves.com/news/sonar-releases-new-tender-data-sonar-truckload-volume-index-stvi-and-sonar-truckload-rejection-index-stri"
          },
          {
            "title": "RSM: capacity shakeout could rebalance freight (Nov 2025)",
            "url": "https://rsmus.com/insights/industries/manufacturing/capacity-shakeout-could-rebalance-freight.html"
          },
          {
            "title": "ACT Research: trucking industry forecast for 2026",
            "url": "https://www.actresearch.net/resources/blog/trucking-industry-forecast-for-2026"
          },
          {
            "title": "ACT Research: freight and trucking rate data",
            "url": "https://www.actresearch.net/resources/data-tracking/freight-trucking-rates"
          },
          {
            "title": "Ryder: 2026 freight market trends",
            "url": "https://www.ryder.com/en-us/insights/blogs/transportation/2026-freight-market-trends"
          },
          {
            "title": "RXO: US truckload market guide",
            "url": "https://rxo.com/resources/research/us-truckload-market-guide/"
          },
          {
            "title": "Trucking Info: beyond the spot rate spike, what capacity and 2026 look like",
            "url": "https://www.truckinginfo.com/articles/beyond-the-spot-rate-spike-what-freight-capacity-and-2026-look-like-for-trucking"
          },
          {
            "title": "Ubico: is the freight recession over",
            "url": "https://www.ubico.io/post/is-the-freight-recession-over-2026"
          },
          {
            "title": "ATA economics and industry data",
            "url": "https://www.trucking.org/economics-and-industry-data"
          },
          {
            "title": "ATRI research index",
            "url": "https://truckingresearch.org/"
          },
          {
            "title": "ATRI: operational costs of trucking landing page",
            "url": "https://truckingresearch.org/about-atri/atri-research/operational-costs-of-trucking/"
          },
          {
            "title": "ATRI 2026: accelerating costs and low profitability despite cuts",
            "url": "https://truckingresearch.org/2026/07/new-atri-report-details-accelerating-costs-and-low-profitability-despite-cuts/"
          },
          {
            "title": "Fleet Owner: ATRI breaks down Class 8 operating costs by region and category",
            "url": "https://www.fleetowner.com/operations/article/55392569/atri-report-breaks-down-class-8-truck-operating-costs-by-region-and-expense-category"
          },
          {
            "title": "EIA weekly on-highway diesel prices",
            "url": "https://www.eia.gov/petroleum/gasdiesel/"
          },
          {
            "title": "FMCSA registration statistics",
            "url": "https://ai.fmcsa.dot.gov/RegistrationStatistics"
          },
          {
            "title": "OOIDA trucking facts",
            "url": "https://www.ooida.com/trucking-facts/"
          },
          {
            "title": "Trucking Dive: carrier population shifts back toward growth",
            "url": "https://www.truckingdive.com/news/carrier-population-shifts-back-toward-growth-quarterly-fmcsa-data-shows/817176/"
          },
          {
            "title": "FreightWaves: trucking company exits reach a 12-month high",
            "url": "https://www.freightwaves.com/news/trucking-company-exits-reach-12-month-high"
          },
          {
            "title": "FreightWaves: the annual capacity purge",
            "url": "https://www.freightwaves.com/news/tis-the-season-for-the-annual-capacity-purge"
          },
          {
            "title": "FreightWaves: are we in the great trucking recession",
            "url": "https://www.freightwaves.com/news/are-we-in-the-great-trucking-recession-a-look-at-the-numbers-the-pain-and-what-comes-next"
          }
        ]
      },
      {
        "group": "Detention, appointments, dwell, and accessorials",
        "items": [
          {
            "title": "ABL Trucking: the real cost of driver detention, what the data tells us",
            "url": "https://www.abltrucking.com/post/the-real-cost-of-driver-detention-what-the-data-tells-us"
          },
          {
            "title": "FreightWaves: the surprising reasons why truck drivers wait hours unpaid",
            "url": "https://www.freightwaves.com/news/the-surprising-reasons-why-truck-drivers-wait-hours-unpaid"
          },
          {
            "title": "FreightWaves: how to read your rate con like a pro",
            "url": "https://www.freightwaves.com/news/how-to-read-your-rate-con-like-a-pro"
          },
          {
            "title": "FreightWaves: is AI the missing link in appointment scheduling",
            "url": "https://www.freightwaves.com/news/is-ai-the-missing-link-in-appointment-scheduling"
          },
          {
            "title": "FreightWaves: Qued uses AI to synchronize dock appointments",
            "url": "https://www.freightwaves.com/news/qued-uses-ai-to-synchronize-dock-appointments"
          },
          {
            "title": "FreightWaves: 3PL Summit, the art of scheduling appointments",
            "url": "https://www.freightwaves.com/news/3pl-summit-the-art-of-scheduling-appointments-for-supply-chain-success"
          },
          {
            "title": "FreightWaves: yard management technology moves out of the shadows",
            "url": "https://www.freightwaves.com/news/yard-management-technology-moves-out-of-the-shadows-as-supply-chains-push-for-end-to-end-visibility"
          },
          {
            "title": "Opendock",
            "url": "https://opendock.com/en/"
          },
          {
            "title": "DOT Office of Inspector General ST-2018-002, commercial driver detention",
            "url": "https://www.oig.dot.gov/library-item/36514"
          }
        ]
      },
      {
        "group": "Drayage, chassis, demurrage, and the ports",
        "items": [
          {
            "title": "Harbor Trucking Association white papers",
            "url": "https://harbortruckers.com/White-Papers"
          },
          {
            "title": "HTA: chassis box rules white paper",
            "url": "https://harbortruckers.com/resources/Documents/Industry%20Issues/Box%20Rules%20FINAL%20VERSION.pdf"
          },
          {
            "title": "Land Line: truckers back on the hook for demurrage and detention charges",
            "url": "https://landline.media/truckers-back-on-the-hook-for-demurrage-and-detention-charges/"
          },
          {
            "title": "Land Line magazine: truckers again responsible for demurrage and detention fees",
            "url": "https://landline.media/magazine/truckers-again-responsible-for-demurrage-detention-fees/"
          },
          {
            "title": "FreightWaves: demurrage dilemma, court overturns FMC trucking rule",
            "url": "https://www.freightwaves.com/news/demurrage-dilemma-court-overturns-fmcs-trucking-rule"
          },
          {
            "title": "Husch Blackwell: appeals court decision reshapes detention and demurrage billing",
            "url": "https://www.huschblackwell.com"
          },
          {
            "title": "Holland & Knight: DC Circuit vacates key provision of the FMC billing rule",
            "url": "https://www.hklaw.com"
          },
          {
            "title": "FreightWaves: executives talk tech, port drayage and capacity",
            "url": "https://www.freightwaves.com/news/executives-talk-tech-port-drayage-and-capacity-on-freightwaves-today"
          },
          {
            "title": "Wikipedia: drayage",
            "url": "https://en.wikipedia.org/wiki/Drayage"
          },
          {
            "title": "Wikipedia: California Assembly Bill 5",
            "url": "https://en.wikipedia.org/wiki/California_Assembly_Bill_5_(2019)"
          },
          {
            "title": "Wikipedia: Port of Los Angeles",
            "url": "https://en.wikipedia.org/wiki/Port_of_Los_Angeles"
          },
          {
            "title": "Wikipedia: Port of Long Beach",
            "url": "https://en.wikipedia.org/wiki/Port_of_Long_Beach"
          },
          {
            "title": "List of busiest container ports",
            "url": "https://en.wikipedia.org/wiki/List_of_busiest_container_ports"
          }
        ]
      },
      {
        "group": "Carrier payment, factoring, and broker credit",
        "items": [
          {
            "title": "FreightWaves: freight factoring rates, how much does factoring really cost",
            "url": "https://www.freightwaves.com/news/freight-factoring-rates-how-much-does-factoring-really-cost"
          },
          {
            "title": "FreightWaves: you delivered that load three weeks ago, here is why you still do not have the money",
            "url": "https://www.freightwaves.com/news/you-delivered-that-load-three-weeks-ago-here-is-why-you-still-do-not-have-the-money-and-what-to-do-about-it"
          },
          {
            "title": "FreightWaves: the broker offers you quick pay and it sounds like free money",
            "url": "https://www.freightwaves.com/news/the-broker-offers-you-quick-pay-and-it-sounds-like-free-money-read-this-before-you-take-it"
          },
          {
            "title": "FreightWaves: chargebacks in trucking factoring, what they cost you",
            "url": "https://www.freightwaves.com/news/chargebacks-in-trucking-factoring-what-they-cost-you"
          },
          {
            "title": "FreightWaves: the $75,000 bond and truckers left holding the bag",
            "url": "https://www.freightwaves.com/news/the-75000-bond-and-truckers-left-holding-the-bag"
          },
          {
            "title": "FreightWaves: TriumphPay's LoadPay, a new tool in the battle to get drivers paid faster",
            "url": "https://www.freightwaves.com/news/triumphpays-loadpay-a-new-tool-in-fierce-battle-to-get-drivers-paid-faster"
          },
          {
            "title": "FMCSA broker and freight forwarder financial responsibility",
            "url": "https://www.fmcsa.dot.gov/registration/broker-and-freight-forwarder-financial-responsibility"
          }
        ]
      },
      {
        "group": "Freight fraud, carrier vetting, and broker liability",
        "items": [
          {
            "title": "FreightWaves: TIA annual fraud report spotlights surge in incidents",
            "url": "https://www.freightwaves.com/news/check-call-tias-annual-fraud-report-spotlights-surge-in-incidents"
          },
          {
            "title": "FreightWaves: logistics industry must evolve to fight fraud, TIA says",
            "url": "https://www.freightwaves.com/news/logistics-industry-must-evolve-to-fight-fraud-tia-says-in-new-report"
          },
          {
            "title": "FreightWaves: criminals target freight with fake IDs, spoofed emails, stolen identities",
            "url": "https://www.freightwaves.com/news/criminals-target-freight-with-fake-ids-spoofed-emails-and-stolen-identities"
          },
          {
            "title": "FreightWaves: freight fraud everywhere, but is anybody going to jail",
            "url": "https://www.freightwaves.com/news/freight-fraud-everywhere-but-truckstop-ceo-asks-is-anybody-going-to-jail"
          },
          {
            "title": "FreightWaves: Highway, Plaid for freight, cargo theft",
            "url": "https://www.freightwaves.com/news/highway-plaid-for-freight-cargo-theft"
          },
          {
            "title": "FreightWaves: widespread double brokering wreaks havoc in Q2",
            "url": "https://www.freightwaves.com/news/widespread-double-brokering-wreaks-havoc-on-brokers-and-carriers-in-q2"
          },
          {
            "title": "FreightWaves: Landstar has cut more than 35,000 carriers from its approved network",
            "url": "https://www.freightwaves.com/news/landstar-has-cut-more-than-35000-carriers-from-approved-network"
          },
          {
            "title": "FreightWaves: cargo theft dips in Q1 but fraud schemes surge",
            "url": "https://www.freightwaves.com/news/cargo-theft-dips-in-q1-but-fraud-schemes-surge-report-says"
          },
          {
            "title": "FreightWaves: nearly $111M in data center freight stolen as thieves test bump and run",
            "url": "https://www.freightwaves.com/news/nearly-111m-in-data-center-freight-stolen-as-thieves-test-bump-and-run-tactic"
          },
          {
            "title": "FreightWaves: the underground market for MC numbers regulators are trying to stop",
            "url": "https://www.freightwaves.com/news/catch-me-if-you-can-the-underground-market-for-mc-numbers-regulators-are-trying-to-stop"
          },
          {
            "title": "FreightWaves: FMCSA bulletin warning carriers not to buy or sell DOT numbers",
            "url": "https://www.freightwaves.com/news/fmcsa-just-issued-a-bulletin-warning-carriers-not-to-buy-or-sell-dot-numbers-here-is-why-that-warning-exists-and-what-it-means"
          },
          {
            "title": "FreightWaves: what it means as FMCSA eliminates MC numbers in 2025",
            "url": "https://www.freightwaves.com/news/what-it-means-for-the-industry-as-fmcsa-eliminates-mc-numbers-in-2025"
          },
          {
            "title": "FreightWaves: legislation to kill double brokering hits the Senate floor",
            "url": "https://www.freightwaves.com/news/legislation-to-kill-double-brokering-hits-senate-floor"
          },
          {
            "title": "FreightWaves: the DOJ may finally understand modern cargo theft",
            "url": "https://www.freightwaves.com/news/the-doj-may-finally-understand-what-modern-cargo-theft-really-looks-like"
          },
          {
            "title": "FreightWaves: Transfix integrates Highway carrier vetting into its TMS",
            "url": "https://www.freightwaves.com/news/transfix-integrates-highway-carrier-vetting-into-tms"
          },
          {
            "title": "FreightWaves: Cassandra Gaines unveils a blueprint for carrier selection",
            "url": "https://www.freightwaves.com/news/cassandra-gaines-unveils-trucking-industry-blueprint-for-carrier-selection"
          },
          {
            "title": "FreightWaves: CH Robinson faces a $604M verdict, what it means after Montgomery",
            "url": "https://www.freightwaves.com/news/c-h-robinson-faces-604-million-verdict-what-vicarious-liability-and-negligent-hiring-mean-for-brokers-after-montgomery-and-home-depot"
          },
          {
            "title": "FreightWaves: broker liability at the Supreme Court, real-time coverage",
            "url": "https://www.freightwaves.com/news/broker-liability-at-the-supreme-court-real-time-coverage-as-the-arguments-are-made"
          },
          {
            "title": "FreightWaves: RXO post-Montgomery sees benefit in its insurance and vetting",
            "url": "https://www.freightwaves.com/news/rxo-post-montgomery-sees-benefit-in-its-insurance-vetting"
          },
          {
            "title": "FreightWaves: Landstar expects to emerge a winner in a post-Montgomery world",
            "url": "https://www.freightwaves.com/news/landstar-expects-to-emerge-a-winner-in-post-montgomery-world"
          },
          {
            "title": "Crowell: Supreme Court holds freight brokers accountable for negligent carrier selection",
            "url": "https://www.crowell.com"
          },
          {
            "title": "Husch Blackwell: Supreme Court clears path for negligent-hiring claims against brokers",
            "url": "https://www.huschblackwell.com"
          },
          {
            "title": "Spencer Fane: expanding exposure for brokers, Montgomery v. Caribe Transport II",
            "url": "https://www.spencerfane.com"
          },
          {
            "title": "FreightWaves: SONAR Sitrep, how nuclear verdicts are reshaping carrier economics",
            "url": "https://www.freightwaves.com/news/sonar-sitrep-how-nuclear-verdicts-are-reshaping-carrier-economics"
          },
          {
            "title": "FreightWaves: ATRI, pre-crash negligence triples trucking company liability",
            "url": "https://www.freightwaves.com/news/atri-pre-crash-negligence-triples-trucking-company-liability"
          },
          {
            "title": "FreightWaves: how legislators and insurers built a trucking crisis",
            "url": "https://www.freightwaves.com/news/how-legislators-and-insurers-built-a-trucking-crisis"
          },
          {
            "title": "Verisk CargoNet 2025 annual cargo theft report",
            "url": "https://www.verisk.com"
          },
          {
            "title": "FreightWaves: new FMCSA bond rule may shake up broker compliance",
            "url": "https://www.freightwaves.com/news/new-fmcsa-bond-rule-may-shake-up-broker-compliance-heres-what-small-carriers-need-to-know"
          }
        ]
      },
      {
        "group": "Regulation and the driver supply shock",
        "items": [
          {
            "title": "Federal Register: English language proficiency out-of-service criteria",
            "url": "https://www.federalregister.gov/documents/2026/08/10/2026-16288/english-language-proficiency-out-of-service-criteria"
          },
          {
            "title": "Land Line: feds move to lock in English proficiency enforcement",
            "url": "https://landline.media/feds-move-to-lock-in-english-proficiency-enforcement/"
          },
          {
            "title": "CDL Life: Congress mandates FMCSA regulation change on English proficiency",
            "url": "https://cdllife.com/2026/congress-mandates-fmcsa-regulation-change-so-english-proficiency-failure-triggers-out-of-service-order-for-cdl-drivers/"
          },
          {
            "title": "Nutech TMS: CVSA English proficiency rules, 2026 update",
            "url": "https://nutechtms.com/cvsa-english-proficiency-rules-2026-update-now-federal-law/"
          },
          {
            "title": "Infiniti Fleet Safety: CDL English language proficiency requirement",
            "url": "https://infinitifleetsafety.com/2025/10/20/cdl-english-language-proficiency-requirement/"
          },
          {
            "title": "FreightWaves: trucking coalition says 194,000 non-domiciled CDLs affected",
            "url": "https://www.freightwaves.com/news/trucking-coalition-says-194000-non-domiciled-cdls-affected-by-carrier-reforms"
          },
          {
            "title": "FreightWaves: US revokes 20,000 visas for Mexican truckers as cabotage crackdown expands",
            "url": "https://www.freightwaves.com/news/us-revokes-20000-visas-for-mexican-truckers-as-cabotage-crackdown-expands"
          },
          {
            "title": "Trucking Info: 6 regulatory changes for trucking to watch in 2026",
            "url": "https://www.truckinginfo.com/articles/6-regulatory-changes-for-trucking-to-watch-in-2026"
          },
          {
            "title": "The Trucker: year of enforcement, shifting policies continue to impact trucking",
            "url": "https://www.thetrucker.com/trucking-news/truckload-authority/government-affairs/year-of-enforcement-shifting-policies-continue-to-impact-the-trucking-industry"
          },
          {
            "title": "ProTrans: trucking trends to watch in 2026",
            "url": "https://protrans.com/insights/trucking-trends-to-watch-in-2026"
          },
          {
            "title": "FreightWaves: the perfect storm, why freight brokerages face a wave of failures in 2026",
            "url": "https://www.freightwaves.com/news/the-perfect-storm-why-freight-brokerages-face-a-wave-of-failures-in-2026"
          }
        ]
      },
      {
        "group": "LTL, classification, and the Yellow collapse",
        "items": [
          {
            "title": "FreightWaves: new LTL freight class rules take effect",
            "url": "https://www.freightwaves.com/news/new-ltl-freight-class-rules-take-effect-on-saturday"
          },
          {
            "title": "FreightWaves: NMFTA's freight classification overhaul, surprising shipper preparedness",
            "url": "https://www.freightwaves.com/news/nmftas-freight-classification-overhaul-surprising-shipper-preparedness"
          },
          {
            "title": "FreightWaves: FedEx Freight gives shippers more time to adjust to new class rules",
            "url": "https://www.freightwaves.com/news/fedex-freight-gives-shippers-more-time-to-adjust-to-new-ltl-class-rules"
          },
          {
            "title": "FreightWaves: CH Robinson will use AI agents to classify LTL freight",
            "url": "https://www.freightwaves.com/news/c-h-robinson-will-use-ai-agents-to-classify-ltl-freight"
          },
          {
            "title": "ODW Logistics: NMFTA's 2025 freight classification overhaul",
            "url": "https://www.odwlogistics.com/resources/nmftas-2025-freight-classification-overhaul"
          },
          {
            "title": "Old Dominion: NMFC class changes",
            "url": "https://www.odfl.com/us/en/resources/freight-knowledge/odfl-blog/nmfc-class-changes.html"
          },
          {
            "title": "Dynamic Logistix: NMFC updates to density-based classification",
            "url": "https://dynamiclogistix.com/nmfc-updates-system-to-density-based-classification/"
          },
          {
            "title": "FreightWaves: Yellow's demise, two decades in the making",
            "url": "https://www.freightwaves.com/news/yellows-demise-2-decades-in-the-making"
          },
          {
            "title": "FreightWaves: Estes to surpass 14,000 doors in 2026",
            "url": "https://www.freightwaves.com/news/estes-to-surpass-14000-doors-in-2026"
          },
          {
            "title": "FreightWaves: judge OKs sale of Yellow terminals to Estes and R+L",
            "url": "https://www.freightwaves.com/news/judge-oks-sale-of-yellow-terminals-to-estes-rl-carriers"
          },
          {
            "title": "FreightWaves: Yellow nets $176M for rolling stock",
            "url": "https://www.freightwaves.com/news/yellow-nets-176m-for-rolling-stock-while-ex-employees-await-payouts"
          },
          {
            "title": "FreightWaves: LTLs hold the pricing line, Old Dominion announces 4.9% GRI",
            "url": "https://www.freightwaves.com/news/ltls-hold-pricing-line-old-dominion-announces-4-9-gri"
          },
          {
            "title": "FreightWaves: first look, Old Dominion almost a sub-70 OR",
            "url": "https://www.freightwaves.com/news/first-look-old-dominion-almost-a-sub-70-or"
          }
        ]
      },
      {
        "group": "Brokerage competitors and the incumbents",
        "items": [
          {
            "title": "Transport Topics Top 100 Logistics, 2026",
            "url": "https://www.ttnews.com/top100/logistics/2026"
          },
          {
            "title": "Transport Topics: Flexport company profile",
            "url": "https://www.ttnews.com/logistics/companies/flexport/2026"
          },
          {
            "title": "Transport Topics: TQL",
            "url": "https://www.ttnews.com/logistics/companies/tql/2025"
          },
          {
            "title": "Transport Topics: RXO",
            "url": "https://www.ttnews.com/logistics/companies/rxo/2025"
          },
          {
            "title": "CH Robinson FY2025 Form 10-K",
            "url": "https://www.sec.gov/Archives/edgar/data/1043277/000104327726000009/chrw-20251231.htm"
          },
          {
            "title": "CH Robinson Q2 2026 results",
            "url": "https://investor.chrobinson.com/news/press-releases/news-details/2026/C-H--Robinson-Reports-2026-Second-Quarter-Results/default.aspx"
          },
          {
            "title": "CH Robinson Q4 2025 earnings summary",
            "url": "https://www.chrobinson.com/en-us/about-us/newsroom/news/2026/q4-2025-earnings-summary/"
          },
          {
            "title": "Fortune: CH Robinson AI success secrets, Dave Bozeman",
            "url": "https://fortune.com/2026/07/14/c-h-robinson-ai-success-secrets-dave-bozeman/"
          },
          {
            "title": "CH Robinson: Lean AI and growing shipper impact",
            "url": "https://www.chrobinson.com/en-us/about-us/newsroom/news/2026/lean-ai-growing-shipper-impact/"
          },
          {
            "title": "FreightWaves: at CH Robinson, improved profitability and a lot fewer workers",
            "url": "https://www.freightwaves.com/news/at-c-h-robinson-improved-profitability-productivity-and-a-lot-fewer-workers"
          },
          {
            "title": "FreightWaves: CH Robinson gets an upgrade at S&P, reduced headcount a key reason",
            "url": "https://www.freightwaves.com/news/c-h-robinson-gets-an-upgrade-at-sp-global-reduced-headcount-a-key-reason"
          },
          {
            "title": "FreightWaves: how is CH Robinson using AI, its CFO has a story to tell",
            "url": "https://www.freightwaves.com/news/how-is-c-h-robinson-using-ai-its-cfo-has-a-story-to-tell"
          },
          {
            "title": "FreightWaves: CH Robinson deploys a suite of AI agents into Navisphere",
            "url": "https://www.freightwaves.com/news/c-h-robinson-deploys-a-suite-of-ai-agents-into-navisphere"
          },
          {
            "title": "RXO Q2 2026 press release",
            "url": "https://s201.q4cdn.com/733042408/files/doc_financials/2026/q2/RXO2026Q2PressRelease.pdf"
          },
          {
            "title": "RXO announces fourth quarter results",
            "url": "https://investors.rxo.com/news/news-details/2026/RXO-Announces-Fourth-Quarter-Results/default.aspx"
          },
          {
            "title": "RXO to acquire Coyote Logistics from UPS",
            "url": "https://rxo.com/news/rxo-to-acquire-coyote-logistics-from-ups/"
          },
          {
            "title": "FreightWaves: RXO's tech turnaround, why investors are watching",
            "url": "https://www.freightwaves.com/news/rxos-tech-turnaround-why-investors-are-watching"
          },
          {
            "title": "FreightWaves: RXO vs CH Robinson, the growing financial divide widens",
            "url": "https://www.freightwaves.com/news/rxo-vs-c-h-robinson-the-growing-financial-divide-widens-some-more"
          },
          {
            "title": "FreightWaves: TQL offers $2,000 resignation incentive to workers",
            "url": "https://www.freightwaves.com/news/tql-offers-2000-resignation-incentive-to-workers"
          },
          {
            "title": "FreightWaves: TQL takes its loss in a broker liability case to the Supreme Court",
            "url": "https://www.freightwaves.com/news/tql-takes-its-loss-in-a-broker-liability-case-to-the-supreme-court"
          },
          {
            "title": "FreightWaves: TQL case on broker transparency heads to oral arguments",
            "url": "https://www.freightwaves.com/news/tql-case-on-broker-transparency-heads-to-oral-arguments"
          },
          {
            "title": "TQL about us",
            "url": "https://www.tql.com/about-us"
          },
          {
            "title": "FreightWaves: Echo Global Logistics expands platform with the ITS acquisition",
            "url": "https://www.freightwaves.com/news/echo-global-logistics-expands-platform-with-its-acquisition"
          },
          {
            "title": "FreightWaves: two solid yes votes for Echo Global's acquisition, Moody's and S&P",
            "url": "https://www.freightwaves.com/news/two-solid-yes-votes-for-echo-globals-acquisition-moodys-and-sp"
          },
          {
            "title": "FreightWaves: Echo embraces a bottom-up AI strategy",
            "url": "https://www.freightwaves.com/news/echo-embraces-bottom-up-ai-strategy-to-transform-operations"
          },
          {
            "title": "Echo technology",
            "url": "https://www.echo.com/technology"
          },
          {
            "title": "Arrive Logistics about us",
            "url": "https://arrivelogistics.com/about-us/"
          },
          {
            "title": "FreightWaves: Arrive Logistics trims Toronto headcount",
            "url": "https://www.freightwaves.com/news/arrive-logistics-trims-toronto-headcount-as-it-retools-canadian-operations"
          },
          {
            "title": "FreightWaves: Thoma Bravo to acquire WWEX Group, combine with Auctane",
            "url": "https://www.freightwaves.com/news/thoma-bravo-to-acquire-wwex-group-combine-with-auctane"
          },
          {
            "title": "FreightWaves: logistics M&A accelerates as WWEX and Auctane form ShipStation Global",
            "url": "https://www.freightwaves.com/news/logistics-ma-accelerates-as-wwex-and-auctane-form-shipstation-global"
          },
          {
            "title": "Landstar financials (stockanalysis.com)",
            "url": "https://stockanalysis.com/stocks/lstr/financials/"
          },
          {
            "title": "FreightWaves: flatbed trends buttress Landstar amid dry van slump",
            "url": "https://www.freightwaves.com/news/flatbed-trends-buttress-landstar-amid-dry-van-slump"
          },
          {
            "title": "FreightWaves: Uber Freight still unprofitable after big revenue jump",
            "url": "https://www.freightwaves.com/news/uber-freight-still-unprofitable-after-big-revenue-jump"
          },
          {
            "title": "FreightWaves: Rebecca Tinucci named CEO of Uber Freight",
            "url": "https://www.freightwaves.com/news/rebecca-tinucci-named-ceo-of-uber-freight"
          },
          {
            "title": "FreightWaves: Uber Freight CTO on AI in freight",
            "url": "https://www.freightwaves.com/news/uber-freight-cto-ai-in-freight"
          },
          {
            "title": "FreightWaves: Uber Freight confirms cyber incident",
            "url": "https://www.freightwaves.com/news/uber-freight-confirms-cyber-incident-after-hackers-claim-nearly-1-million-files"
          },
          {
            "title": "J.B. Hunt Q2 2026 results",
            "url": "https://www.stocktitan.net/news/JBHT/j-b-hunt-transport-services-inc-reports-u-s-gaap-revenues-net-9ixaa2og8wmb.html"
          },
          {
            "title": "FreightWaves: massive opportunities for J.B. Hunt in the intermodal shift",
            "url": "https://www.freightwaves.com/news/massive-opportunities-for-j-b-hunt-in-intermodal-shift"
          },
          {
            "title": "FreightWaves: J.B. Hunt's summer of many minibids",
            "url": "https://www.freightwaves.com/news/j-b-hunts-summer-of-many-minibids"
          },
          {
            "title": "FreightWaves: regulatory capacity cleanup fuels Knight-Swift's bullish outlook",
            "url": "https://www.freightwaves.com/news/regulatory-capacity-cleanup-fuels-knight-swifts-bullish-outlook"
          },
          {
            "title": "FreightWaves: Knight-Swift aims for a double-digit rate hike in a tight market",
            "url": "https://www.freightwaves.com/news/knight-swift-aims-for-double-digit-rate-hike-in-tight-market"
          },
          {
            "title": "FreightWaves: Knight-Swift Q2 sees rapid progression in TL fundamentals",
            "url": "https://www.freightwaves.com/news/knight-swifts-q2-sees-rapid-progression-in-tl-fundamentals"
          }
        ]
      },
      {
        "group": "Global forwarders and cross-border",
        "items": [
          {
            "title": "Kuehne+Nagel 2025 annual report, business units",
            "url": "https://2025-annual-report.kuehne-nagel.com/annual-report/status-report/business-units"
          },
          {
            "title": "Kuehne+Nagel reports solid earnings in 2025",
            "url": "https://newsroom.kuehne-nagel.com/kuehnenagel-reports-solid-earnings-in-2025/"
          },
          {
            "title": "DHL Group: Global Forwarding, Freight division report",
            "url": "https://reporting-hub.group.dhl.com/2025-fy/en/combined-management-report/report-on-economic-position/global-forwarding-freight-division-1/"
          },
          {
            "title": "DHL Group annual earnings 2025",
            "url": "https://group.dhl.com/en/media-relations/press-releases/2026/dhl-group-annual-earnings-2025.html"
          },
          {
            "title": "DSV completes acquisition of Schenker",
            "url": "https://investor.dsv.com/news-releases/news-release-details/dsv-1154-dsv-completes-acqusition-schenker"
          },
          {
            "title": "DSV 2025 annual report",
            "url": "https://www.globenewswire.com/news-release/2026/02/04/3231762/0/en/dsv-1164-2025-annual-report.html"
          },
          {
            "title": "Expeditors FY2025 Form 10-K",
            "url": "https://www.sec.gov/Archives/edgar/data/746515/000119312526071569/expd-20251231.htm"
          },
          {
            "title": "TechCrunch: sennder buys CH Robinson's European business",
            "url": "https://techcrunch.com/2024/07/30/sennder-buys-ch-robinsons-european-business/"
          },
          {
            "title": "Wikipedia: DSV",
            "url": "https://en.wikipedia.org/wiki/DSV_(company)"
          },
          {
            "title": "Wikipedia: Kuehne+Nagel",
            "url": "https://en.wikipedia.org/wiki/Kuehne%2BNagel"
          },
          {
            "title": "Wikipedia: CEVA Logistics",
            "url": "https://en.wikipedia.org/wiki/CEVA_Logistics"
          },
          {
            "title": "Wikipedia: Expeditors International",
            "url": "https://en.wikipedia.org/wiki/Expeditors_International"
          },
          {
            "title": "Nuvocargo company profile (Tracxn)",
            "url": "https://tracxn.com/d/companies/nuvocargo/__g1Q_xkmc0WMc9lhSlBQXsCP2VZmFdM0HU3xZxGPlAy0"
          },
          {
            "title": "FreightWaves: Nuvocargo acquires a South Carolina 3PL",
            "url": "https://www.freightwaves.com/news/nuvocargo-acquires-south-carolina-based-3pl"
          },
          {
            "title": "Beacon",
            "url": "https://beacon.com/"
          },
          {
            "title": "Zencargo",
            "url": "https://www.zencargo.com/"
          },
          {
            "title": "sennder about us",
            "url": "https://www.sennder.com/about-us"
          }
        ]
      },
      {
        "group": "Ocean rates, tariffs, and trade policy",
        "items": [
          {
            "title": "Drewry World Container Index",
            "url": "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry"
          },
          {
            "title": "DCN: World Container Index, 20 August 2026",
            "url": "https://www.thedcn.com.au/news/world-container-index-20-august-2026"
          },
          {
            "title": "DCN: World Container Index, 13 August 2026",
            "url": "https://www.thedcn.com.au/news/world-container-index-13-august-2026"
          },
          {
            "title": "gCaptain: container rates extend gains as carriers tighten transpacific capacity",
            "url": "https://gcaptain.com/container-rates-extend-gains-as-carriers-tighten-transpacific-capacity/"
          },
          {
            "title": "FreightWaves: maritime rates back on the rise",
            "url": "https://www.freightwaves.com/news/maritime-rates-back-on-the-rise"
          },
          {
            "title": "Xeneta: October spot rate spike and 2026 ocean freight tenders",
            "url": "https://www.xeneta.com/blog/october-spot-rate-spike-2026-ocean-freight-tenders"
          },
          {
            "title": "Global Trade Magazine: ocean freight rates fall across key routes in early 2026",
            "url": "https://www.globaltrademag.com/ocean-freight-rates-fall-across-key-routes-in-early-2026-amid-capacity-uncertainty/"
          },
          {
            "title": "Freightos: ocean and air freight forecast 2026",
            "url": "https://www.freightos.com/freight-industry-updates/market-updates/ocean-and-air-freight-forecast-2026-what-to-expect/"
          },
          {
            "title": "PIIE: US-China trade war tariffs, date chart",
            "url": "https://www.piie.com/research/piie-charts/2019/us-china-trade-war-tariffs-date-chart"
          },
          {
            "title": "Tax Foundation: Trump tariffs and the trade war tracker",
            "url": "https://taxfoundation.org/research/all/federal/trump-tariffs-trade-war/"
          },
          {
            "title": "Tariffs Tool: the de minimis exemption ended, 2026 status",
            "url": "https://www.tariffstool.com/guides/de-minimis-exemption-ended-2026"
          },
          {
            "title": "Morgan Lewis: de minimis exception eliminated for imports from China",
            "url": "https://www.morganlewis.com/pubs/2025/05/de-minimis-exception-eliminated-for-imports-from-china"
          },
          {
            "title": "Gaia Dynamics: de minimis tariff in 2025, what importers and brokers need to know",
            "url": "https://www.gaiadynamics.ai/blog/de-minimis-tariff-in-2025-what-u-s-importers-brokers-and-small-businesses-need-to-know"
          },
          {
            "title": "GoBolt: Section 321 fulfillment suspension",
            "url": "https://www.gobolt.com/blog/section-321/"
          },
          {
            "title": "Armstrong & Associates: global 3PL market size estimates",
            "url": "https://www.3plogistics.com/3pl-market-info-resources/3pl-market-information/global-3pl-market-size-estimates/"
          }
        ]
      },
      {
        "group": "Freight technology, AI, TMS, and visibility",
        "items": [
          {
            "title": "FreightWaves: project44 forms two new businesses, launches AI-native LSP44",
            "url": "https://www.freightwaves.com/news/project44-forms-two-new-businesses-launches-ai-native-lsp44"
          },
          {
            "title": "FreightWaves: project44 launches Autopilot",
            "url": "https://www.freightwaves.com/news/project44-launches-autopilot-an-ai-enabled-logistics-operating-system-that-offers-infinite-labor"
          },
          {
            "title": "FreightWaves: AI agents without context are just guessing faster",
            "url": "https://www.freightwaves.com/news/ai-agents-without-context-are-just-guessing-faster"
          },
          {
            "title": "FreightWaves: project44 hits a milestone with positive cash flow and 48% Q4 ARR growth",
            "url": "https://www.freightwaves.com/news/project44-hits-milestone-with-positive-cash-flow-48-q4-arr-growth"
          },
          {
            "title": "FreightWaves: Chicago rivals project44 and FourKites resolve legal disputes",
            "url": "https://www.freightwaves.com/news/chicago-rivals-p44-and-fourkites-resolve-legal-disputes"
          },
          {
            "title": "FreightWaves: Gartner critiques the real-time visibility market",
            "url": "https://www.freightwaves.com/news/freighttech-friday-gartner-critiques-real-time-visibility-market-players"
          },
          {
            "title": "Axios: SAP and FourKites supply chain acquisition",
            "url": "https://www.axios.com/2026/02/23/sap-fourkites-supply-chain-acquisition"
          },
          {
            "title": "WiseTech completes strategic acquisition of e2open",
            "url": "https://www.e2open.com/news/press-releases/wisetech-global-completes-strategic-acquisition-of-e2open/"
          },
          {
            "title": "FreightWaves: Korber announces purchase of TMS provider MercuryGate",
            "url": "https://www.freightwaves.com/news/korber-announces-purchase-of-tms-provider-mercurygate"
          },
          {
            "title": "FreightWaves: Descartes acquires Tai for $100M",
            "url": "https://www.freightwaves.com/news/descartes-acquires-tai-for-100m"
          },
          {
            "title": "FreightWaves: Triumph Financial to acquire Greenscreens.ai",
            "url": "https://www.freightwaves.com/news/triumph-financial-to-acquire-greenscreens-ai"
          },
          {
            "title": "BusinessWire: Alvys raises $40M Series B",
            "url": "https://www.businesswire.com/news/home/20250930315239/en/Alvys-Raises-$40-Million-Series-B"
          },
          {
            "title": "FreightWaves: HappyRobot Series C, freighttech unicorn",
            "url": "https://www.freightwaves.com/news/happyrobot-series-c-freighttech-unicorn"
          },
          {
            "title": "TechCrunch: Augment raises a $85M Series A",
            "url": "https://techcrunch.com/2025/09/04/ai-logistics-startup-augment-from-deliverrs-founder-raises-massive-85m-series-a/"
          },
          {
            "title": "FreightWaves: Vooma grabs $16.6M as brokers prepare for a market swing",
            "url": "https://www.freightwaves.com/news/vooma-grabs-16-6m-in-funding-as-brokers-prepare-for-market-swing"
          },
          {
            "title": "TechCrunch: FleetWorks raises $17M to match truckers with cargo faster",
            "url": "https://techcrunch.com/2025/10/14/fleetworks-raises-17m-to-match-truckers-with-cargo-faster/"
          },
          {
            "title": "FreightWaves: Cargado raises $12M to boost cross-border trucking",
            "url": "https://www.freightwaves.com/news/exclusive-cargado-raises-12m-to-boost-cross-border-trucking-marketplace"
          },
          {
            "title": "FreightWaves: AI freight roll-up, why Fura bought High Rise",
            "url": "https://www.freightwaves.com/news/ai-freight-roll-up-why-fura-bought-high-rise"
          },
          {
            "title": "FreightWaves: AI booking agent aims to give freight brokers an Iron Man suit",
            "url": "https://www.freightwaves.com/news/ai-booking-agent-aims-to-give-freight-brokers-an-iron-man-suit"
          },
          {
            "title": "FreightWaves: Freight Hero broker back office",
            "url": "https://www.freightwaves.com/news/freight-hero-broker-back-office"
          },
          {
            "title": "FreightWaves: Motive files for IPO",
            "url": "https://www.freightwaves.com/news/motive-files-for-ipo-signaling-next-phase-of-fleet-tech-arms-race"
          },
          {
            "title": "FreightWaves: 2026 FreightTech 25 winners",
            "url": "https://www.freightwaves.com/news/2026-freighttech-25-winners-revealed-onstage-at-f3"
          },
          {
            "title": "FreightWaves: heavy haul freight exposes the limits of one-size-fits-all load boards",
            "url": "https://www.freightwaves.com/news/heavy-haul-freight-exposes-the-limits-of-one-size-fits-all-load-boards"
          },
          {
            "title": "FreightWaves: Trucker Path and Truckstop integration",
            "url": "https://www.freightwaves.com/news/trucker-path-truckstop-integration"
          },
          {
            "title": "FreightWaves: OOIDA and Truckstop team up on the load board",
            "url": "https://www.freightwaves.com/news/ooida-truckstop-team-up-load-board-is-now-groups-exclusive-partner"
          },
          {
            "title": "FreightWaves: Volvo partners with Class8 to create Load Finder",
            "url": "https://www.freightwaves.com/news/volvo-partners-with-class8-to-create-load-finder"
          },
          {
            "title": "FreightWaves: freight invoice audits and why they matter",
            "url": "https://www.freightwaves.com/news/freight-invoice-audits-and-why-they-matter"
          },
          {
            "title": "NMFTA: EDI vs API in trucking",
            "url": "https://nmfta.org/news/edi-vs-api-in-trucking-why-its-time-to-embrace-api-standards-api-101/"
          }
        ]
      },
      {
        "group": "Autonomous trucking",
        "items": [
          {
            "title": "Aurora Innovation investor news",
            "url": "https://ir.aurora.tech/news-events/press-releases"
          },
          {
            "title": "Aurora financials (stockanalysis.com)",
            "url": "https://stockanalysis.com/stocks/aur/"
          },
          {
            "title": "FreightWaves: Aurora Q2 earnings, driverless truck rates",
            "url": "https://www.freightwaves.com/news/aurora-q2-earnings-driverless-truck-rates"
          },
          {
            "title": "Kodiak financials (stockanalysis.com)",
            "url": "https://stockanalysis.com/stocks/kdk/"
          },
          {
            "title": "TechCrunch: Kodiak AI raises $100M at a steep discount",
            "url": "https://techcrunch.com/2026/05/07/kodiak-ai-raises-100m-at-a-steep-discount/"
          },
          {
            "title": "TechCrunch: Waabi raises $1B and expands into robotaxis with Uber",
            "url": "https://techcrunch.com/2026/01/28/waabi-raises-1b-and-expands-into-robotaxis-with-uber/"
          },
          {
            "title": "Wikipedia: TuSimple",
            "url": "https://en.wikipedia.org/wiki/TuSimple"
          },
          {
            "title": "TechCrunch: TuSimple pivot from self-driving to AI animation completes with CreateAI rebrand",
            "url": "https://techcrunch.com/2024/12/19/tusimple-pivot-from-self-driving-to-ai-animation-is-complete-with-createai-rebrand/"
          },
          {
            "title": "TechCrunch: report, TuSimple sent sensitive self-driving data to China",
            "url": "https://techcrunch.com/2025/05/27/report-tusimple-sent-sensitive-self-driving-data-to-china-after-us-national-security-agreement/"
          },
          {
            "title": "FreightWaves: TuSimple plans to settle federal fraud lawsuit for $189M",
            "url": "https://www.freightwaves.com/news/tusimple-plans-to-settle-federal-fraud-lawsuit-for-189m"
          },
          {
            "title": "Wikipedia: Plus (autonomous trucking)",
            "url": "https://en.wikipedia.org/wiki/Plus_(autonomous_trucking)"
          },
          {
            "title": "FreightWaves: PlusAI and Churchill Capital IX end planned SPAC merger",
            "url": "https://www.freightwaves.com/news/plus-ai-spac-termination-churchill-capital-ix"
          },
          {
            "title": "Wikipedia: Inceptio Technology",
            "url": "https://en.wikipedia.org/wiki/Inceptio_Technology"
          },
          {
            "title": "Inceptio press",
            "url": "https://en.inceptio.ai/press/239.html"
          },
          {
            "title": "CNBC: China's self-driving truck leaders say AI breakthroughs will not accelerate rollout",
            "url": "https://www.cnbc.com/2026/05/01/chinas-self-driving-truck-leaders-say-ai-breakthroughs-wont-accelerate-rollout-heres-why.html"
          },
          {
            "title": "Wikipedia: Pony.ai",
            "url": "https://en.wikipedia.org/wiki/Pony.ai"
          },
          {
            "title": "CNEVPost: Pony.ai plans 1,000 autonomous heavy trucks in 2 to 3 years",
            "url": "https://cnevpost.com/2026/08/06/pony-ai-1000-autonomous-heavy-trucks-2-3-years/"
          },
          {
            "title": "CNEVPost: China grants its first L3 autonomous driving permits for passenger cars",
            "url": "https://cnevpost.com/2025/12/15/china-grants-1st-l3-autonomous-driving-permits-passenger-cars/"
          },
          {
            "title": "CNEVPost: China puts the brakes on smart driving chaos",
            "url": "https://cnevpost.com/2025/04/17/china-puts-brakes-chaos-smart-driving/"
          },
          {
            "title": "CNEVPost: China sets a safety baseline for L3 and L4 autonomous driving",
            "url": "https://cnevpost.com/2026/08/04/china-sets-safety-baseline-l3-l4-autonomous-driving/"
          },
          {
            "title": "CNEVPost: Eacon jumps on its Hong Kong debut",
            "url": "https://cnevpost.com/2026/07/08/eacon-jumps-hk-debut/"
          },
          {
            "title": "IDTechEx: China's autonomous trucks now log over one million kilometers daily",
            "url": "https://www.idtechex.com/en/research-article/chinas-autonomous-trucks-now-log-over-one-million-kilometers-daily/33969"
          }
        ]
      },
      {
        "group": "China road freight and Full Truck Alliance",
        "items": [
          {
            "title": "Full Truck Alliance FY2025 and Q4 2025 results",
            "url": "https://www.prnewswire.com/news-releases/full-truck-alliance-co-ltd-announces-fourth-quarter-and-fiscal-year-2025-unaudited-financial-results-302712061.html"
          },
          {
            "title": "Full Truck Alliance FY2024 results",
            "url": "https://www.prnewswire.com/news-releases/full-truck-alliance-co-ltd-announces-fourth-quarter-and-fiscal-year-2024-unaudited-financial-results-302392757.html"
          },
          {
            "title": "Full Truck Alliance Q3 2025 results",
            "url": "https://ir.fulltruckalliance.com/2025-11-17-Full-Truck-Alliance-Co-Ltd-Announces-Third-Quarter-2025-Unaudited-Financial-Results"
          },
          {
            "title": "FTA announces changes to its freight brokerage service (Aug 2025)",
            "url": "https://www.prnewswire.com/news-releases/full-truck-alliance-co-ltd-announces-changes-to-its-freight-brokerage-service-302519852.html"
          },
          {
            "title": "FTA 2024 Annual Report, Form 20-F",
            "url": "https://filecache.investorroom.com/mr5ir_manbang/277/Full%20Truck%20Alliance%20Co.%20Ltd.%202024%20Annual%20Report.pdf"
          },
          {
            "title": "FTA FY2025 Form 20-F",
            "url": "https://www.sec.gov/Archives/edgar/data/1838413/000119312526153778/d20504d20f.htm"
          },
          {
            "title": "FTA Q2 2026 earnings call transcript",
            "url": "https://www.fool.com/earnings/call-transcripts/2026/08/19/full-truck-alliance-ymm-q2-2026-earnings-call-transcript/"
          },
          {
            "title": "Tianfeng Securities initiation report on YMM (19 March 2025)",
            "url": "https://pdf.dfcfw.com/pdf/H3_AP202503191644768661_1.pdf"
          },
          {
            "title": "FTA cybersecurity review announcement (July 2021)",
            "url": "https://ir.fulltruckalliance.com/2021-07-05-Full-Truck-Alliance-Announces-Cybersecurity-Review-in-China"
          },
          {
            "title": "CNBC: China opens cybersecurity probe into Full Truck Alliance",
            "url": "https://www.cnbc.com/2021/07/05/china-opens-cybersecurity-probe-into-full-truck-alliance-boss-zhipin.html"
          },
          {
            "title": "Jeff Towson: three questions about the future of Full Truck Alliance",
            "url": "https://jefftowson.com/membership_content/3-questions-about-the-future-of-full-truck-alliance-asia-tech-strategy-daily-lesson-update/"
          },
          {
            "title": "MOT 2025 Transport Industry Development Statistical Bulletin",
            "url": "https://xxgk.mot.gov.cn/jigou/zhghs/202606/t20260618_4207752.html"
          },
          {
            "title": "MOT 2021 National Toll Road Statistics Bulletin (the last published edition)",
            "url": "https://xxgk.mot.gov.cn/jigou/glj/202211/t20221111_3707993.html"
          },
          {
            "title": "MOT: Interim Measures for Online Platform Road Freight Transport Operations",
            "url": "https://xxgk.mot.gov.cn/2020/xzgfxwj/202303/t20230317_3776365.html"
          },
          {
            "title": "MOT: 2026 Network Freight Carrier Platform Measures",
            "url": "https://xxgk.mot.gov.cn/xzgfxwj/202601/t20260126_4199002.html"
          },
          {
            "title": "State Council interpretation of the 2019 Interim Measures",
            "url": "https://www.gov.cn/zhengce/2019-09/09/content_5428571.htm"
          },
          {
            "title": "ICCT: barriers and opportunities for improving long-haul freight efficiency in China",
            "url": "https://theicct.org/wp-content/uploads/2021/06/China-long_haul_freight_barriers.pdf"
          },
          {
            "title": "ICCT: China Freight Assessment project report",
            "url": "https://theicct.org/sites/default/files/China_Freight_Assessment_English_20181022.pdf"
          },
          {
            "title": "RMI: improving efficiency in Chinese trucking and logistics",
            "url": "https://rmi.org/wp-content/uploads/2017/03/China_Trucking_Charrette_Report_2016.pdf"
          },
          {
            "title": "Nature Communications: truck-hailing and operational efficiency in China's road freight decarbonization",
            "url": "https://www.nature.com/articles/s41467-026-71160-1"
          },
          {
            "title": "Sinoiov: big-data analysis of China's road freight industry",
            "url": "https://www.sinoiov.com/news/official/252.html"
          },
          {
            "title": "199IT: 2021 CFLP truck driver survey profile",
            "url": "https://www.199it.com/archives/1308711.html"
          },
          {
            "title": "Jiemian: why China's road freight is hard to scale",
            "url": "https://m.jiemian.com/article/6073643.html"
          },
          {
            "title": "Lalatech Holdings HKEX listing application (April 2026)",
            "url": "https://www1.hkexnews.hk/app/sehk/2026/108488/documents/sehk26043002914.pdf"
          },
          {
            "title": "SF Holding 2025 annual results",
            "url": "https://www.prnewswire.com/apac/news-releases/sf-holding-announces-2025-annual-results-delivering-record-profitability-and-enhanced-shareholder-returns-302728928.html"
          },
          {
            "title": "Alibaba 6-K on the Cainiao IPO withdrawal",
            "url": "https://www.sec.gov/Archives/edgar/data/1577552/000110465924038666/tm249803d1_ex99-1.htm"
          },
          {
            "title": "SCMP: Alibaba scraps the Hong Kong IPO plan for Cainiao",
            "url": "https://www.scmp.com/tech/big-tech/article/3256810/alibaba-scraps-hong-kong-ipo-plan-logistics-unit-cainiao-it-tweaks-restructuring"
          },
          {
            "title": "Wikipedia: Lalamove",
            "url": "https://en.wikipedia.org/wiki/Lalamove"
          },
          {
            "title": "Wikipedia: SF Holding",
            "url": "https://en.wikipedia.org/wiki/SF_Holding"
          },
          {
            "title": "Wikipedia: Cainiao",
            "url": "https://en.wikipedia.org/wiki/Cainiao"
          },
          {
            "title": "Wikipedia: Sinotrans",
            "url": "https://en.wikipedia.org/wiki/Sinotrans"
          },
          {
            "title": "Wikipedia: expressways of China",
            "url": "https://en.wikipedia.org/wiki/Expressways_of_China"
          },
          {
            "title": "State Council: China's logistics costs-to-GDP ratio hits a record low in 2025",
            "url": "https://english.www.gov.cn/archive/statistics/202602/07/content_WS69873e16c6d00ca5f9a08fc4.html"
          }
        ]
      },
      {
        "group": "Shippers building in-house, and market structure",
        "items": [
          {
            "title": "FreightWaves: Amazon opens its full LTL network to all businesses",
            "url": "https://www.freightwaves.com/news/amazon-opens-full-scale-less-than-truckload-network-to-all-businesses"
          },
          {
            "title": "Amazon Freight newsroom",
            "url": "https://freight.amazon.com/newsroom/news-updates/news-updates-25-af-delivers"
          },
          {
            "title": "FreightWaves: Walmart rolls forward with brokerage, what it means for Amazon",
            "url": "https://www.freightwaves.com/news/walmart-rolls-forward-with-brokerage-what-it-means-for-amazon"
          },
          {
            "title": "Transflo: how Amazon and Walmart could reshape freight networks",
            "url": "https://www.transflo.com/blog/how-amazon-and-walmart-could-reshape-freight-networks"
          },
          {
            "title": "Transport Intelligence: logistics M&A headlined by a trio of landmark transactions",
            "url": "https://ti-insight.com/briefs/logistics-ma-activity-headlined-by-trio-of-landmark-transactions-in-july-2026/"
          },
          {
            "title": "AlixPartners: Q1 2026 transport M&A review",
            "url": "https://www.alixpartners.com/insights/102mrg1/q1-2026-transport-ma-review-deal-activity-inflects-upward-as-strategic-buyers-c/"
          },
          {
            "title": "FedEx Freight spin-off",
            "url": "https://investors.fedex.com/fedex-freight-spin-off/default.aspx"
          },
          {
            "title": "Wikipedia: Union Pacific Railroad, on the Norfolk Southern merger",
            "url": "https://en.wikipedia.org/wiki/Union_Pacific_Railroad"
          }
        ]
      },
      {
        "group": "Practitioner forums and primary voice",
        "items": [
          {
            "title": "TruckersReport: shippers and receivers, good or bad",
            "url": "https://www.thetruckersreport.com/truckingindustryforum/forums/shippers-receivers-good-or-bad.286/"
          },
          {
            "title": "TruckersReport: freight broker forum",
            "url": "https://www.thetruckersreport.com/truckingindustryforum/forums/freight-broker-forum.395/"
          },
          {
            "title": "FreightWaves",
            "url": "https://www.freightwaves.com/"
          },
          {
            "title": "Transport Topics",
            "url": "https://www.ttnews.com/"
          },
          {
            "title": "Land Line",
            "url": "https://landline.media/"
          },
          {
            "title": "Supply Chain Dive",
            "url": "https://www.supplychaindive.com/"
          }
        ]
      },
      {
        "group": "Method",
        "items": [
          {
            "title": "The company research playbook used to structure this work",
            "url": "https://docs.google.com/document/d/1CEb0gl2Vq-fv01MwIgHmKAdYSXG4ExGJ3bqKacBJjlU/edit"
          }
        ]
      }
    ]
  },
  "appendix": {
    "intro": "Reference material behind this walkthrough.",
    "items": [
      {
        "id": "X01",
        "title": "Interview rubric, as provided by Flexport",
        "note": "The four-layer product breakdown requested in the candidate portal.",
        "image": "interview-rubric.png",
        "imageAlt": "Flexport interview rubric screenshot"
      }
    ]
  },
  "parked": []
};
