/* ═══════════════════════════════════════════════════════════════════════
   CONTENT — Tanium, Senior Product Manager, AI Core Services
   Every user-visible string on the page lives in this file.
   index.html contains structure, CSS and logic only.

   Bump the ?v= cache-buster in index.html on EVERY change to this file.
   ═══════════════════════════════════════════════════════════════════════ */

const DRAFT      = true;    // draft bar, TODO panel, visible content IDs
const SHOW_TODOS = true;

const CONTENT = {

  "meta": {
    "title": "The problems this role is pointed at, and where my experience fits",
    "subtitle": "I built this after reading the posting and spending a day on the company. On the left are the problems I think AI Core Services is actually pointed at. On the right is work I have shipped against the same problem shape. Click anything to trace it.",
    "preparedFor": "Prepared for Tanium",
    "author": "Michael Fitzpatrick",
    "date": "September 2026"
  },

  "popups": [
    {
      "tone": "neutral",
      "title": "What this is",
      "body": "A single interactive page, built from public sources only. The left column is my outside-in read of the role. It is a set of hypotheses, and some of them are probably wrong. The right column is work I have actually delivered, with the outcome attached.",
      "dismissLabel": "Got it",
      "linkLabel": "See the sources",
      "linkTarget": "#references"
    }
  ],

  /* ─────────────────────────────────────────────────────────────────────
     THE MAP
     ───────────────────────────────────────────────────────────────────── */
  "mapping": {

    /* LEFT COLUMN — Tanium's problems, in Tanium's vocabulary.
       Never phrased as a skill I have. */
    "problems": [
      {
        "id": "R01",
        "title": "Serve one AI substrate to product teams who each want their own agent stack",
        "fromJD": "Shape the core platform workflows and experiences that teams across the organization rely on",
        "why": "Core Services has internal customers. Endpoint Management, Exposure Management and Security Operations each have their own roadmap and their own idea of what the platform should do."
      },
      {
        "id": "R02",
        "title": "Prove an agent was right before it is allowed to act unattended",
        "fromJD": false,
        "why": "Atlas plans and executes multi-step work but pauses for approval on consequential actions. Configurable guardrails for auto-executing the low-risk ones are described publicly as planned rather than shipped."
      },
      {
        "id": "R03",
        "title": "Give agents history on a platform built to answer in real time",
        "fromJD": false,
        "why": "The linear chain computes answers live at question time, which is the moat. Agents also need what changed since last week, and that record lives outside the platform today."
      },
      {
        "id": "R04",
        "title": "Route a multi-vendor model ensemble without the cost curve running away",
        "fromJD": "Building the core experience and infrastructure that serve our agentic platform",
        "why": "Atlas runs on a curated ensemble from OpenAI, Anthropic, Google and others. Someone owns routing, fallback, evaluation and cost per task across all of them."
      },
      {
        "id": "R05",
        "title": "Expose sensors, questions and packages to a model without widening the blast radius",
        "fromJD": "Building the core experience and infrastructure that serve our agentic platform",
        "why": "The MCP server filters tool discovery by the calling user's permissions. Every tool added is another way for an agent to act on a live production endpoint."
      },
      {
        "id": "R06",
        "title": "Turn licensed modules customers never operate into work an agent can do",
        "fromJD": false,
        "why": "Customer reviews describe arriving at renewal with modules they pay for and do not use, because each one needs a trained human. An agent that can operate the seventh module changes that conversation."
      },
      {
        "id": "R07",
        "title": "Ship an agentic platform with a smaller engineering org than the plan assumed",
        "fromJD": "A spec-driven, AI-assisted development process where PMs author the specs that drive engineering execution",
        "why": "R&D headcount came down in August while the AI roadmap expanded. The stated answer is a process where the PM writes the artifact engineering builds from."
      },
      {
        "id": "R08",
        "title": "Make a shared platform something other teams adopt without being told to",
        "fromJD": "Shape the core platform workflows and experiences that teams across the organization rely on",
        "why": "The standard failure mode for a central platform team is shipping infrastructure nobody adopts. Voluntary adoption is the only honest metric for this kind of work."
      },
      {
        "id": "R09",
        "title": "Draw the line between what the platform owns and what each product team owns",
        "fromJD": false,
        "why": "Core Plus sits alongside the module teams. That boundary gets negotiated rather than assigned, and it has to hold under pressure from both directions."
      },
      {
        "id": "R10",
        "title": "Earn autonomy one action class at a time when a wrong action isolates a production server",
        "fromJD": false,
        "why": "Trust is the real constraint on autonomy and it is destroyed asymmetrically. One bad unattended action costs more than fifty good ones earn."
      },
      {
        "id": "R11",
        "title": "Keep the roadmap anchored to what an operator is actually doing at two in the morning",
        "fromJD": "The portfolio is pivoting toward AI and agentic workflows",
        "why": "The person who finds the problem and the person who can fix it report to different leaders with opposing incentives. A platform that serves only one of them does not get used."
      }
    ],

    /* RIGHT COLUMN — my work. Outcomes are reproduced verbatim from the
       career memory files and are already cleared for public use.
       Do not alter a number here. */
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

    /* EDGES — 29 total. Zero orphans on either side. */
    "edges": [
      { "id":"E01", "problem":"R01", "work":"W01", "strength":"primary",
        "note":"A net-new internal platform whose customers were other teams, adopted by all of them without a mandate." },
      { "id":"E02", "problem":"R01", "work":"W07", "strength":"supporting",
        "note":"Winning ownership of a shared calculation from two peer orgs is the same negotiation a platform team runs with its internal customers." },
      { "id":"E03", "problem":"R01", "work":"W08", "strength":"supporting",
        "note":"Inverting an API contract so one service becomes the source of truth is how a platform stops every team from rolling its own." },

      { "id":"E04", "problem":"R02", "work":"W02", "strength":"primary",
        "note":"The incumbent tool measured correlation and blamed everything evenly. Replacing it meant proving attribution was right, and the accuracy number is the proof." },
      { "id":"E05", "problem":"R02", "work":"W09", "strength":"supporting",
        "note":"I defined the success metric, time to answer versus the old method, before a requirement was written. That is an eval set before a build." },
      { "id":"E06", "problem":"R02", "work":"W12", "strength":"supporting",
        "note":"An agent moving real money has to be measured before it is trusted, and the measurement runs continuously rather than once." },

      { "id":"E07", "problem":"R03", "work":"W02", "strength":"primary",
        "note":"UARC2 decomposes a live operation into discrete links using instrumentation already present, then measures each link's contribution over time." },
      { "id":"E08", "problem":"R03", "work":"W08", "strength":"supporting",
        "note":"Data freshness was the constraint, and fixing it meant changing who computed what and when rather than adding a cache." },

      { "id":"E09", "problem":"R04", "work":"W03", "strength":"primary",
        "note":"The real problem was an objective function optimising the wrong thing with no constraint on the cost that mattered. Routing spend across models is the same shape." },
      { "id":"E10", "problem":"R04", "work":"W10", "strength":"supporting",
        "note":"Five automated decisions per SKU per location, six runs a day, is a throughput and cost problem before it is an intelligence problem." },
      { "id":"E11", "problem":"R04", "work":"W12", "strength":"supporting",
        "note":"Multi-agent systems make routing and cost per task a design decision you feel immediately." },

      { "id":"E12", "problem":"R05", "work":"W12", "strength":"primary",
        "note":"Building the MCP server myself meant deciding which tools an agent gets, under what scope, with real consequences on the other side." },
      { "id":"E13", "problem":"R05", "work":"W08", "strength":"supporting",
        "note":"An API contract is the same artifact as a tool definition. Both decide what a caller is allowed to do." },
      { "id":"E14", "problem":"R05", "work":"W01", "strength":"supporting",
        "note":"Collapsing 30+ tools into 8 workflows is a tool-surface design problem, which is exactly what deciding an agent's tool list is." },

      { "id":"E15", "problem":"R06", "work":"W09", "strength":"primary",
        "note":"Frida took a diagnostics stack that required SQL and made it answerable in plain language, which is what turns a capability nobody operates into one they use." },
      { "id":"E16", "problem":"R06", "work":"W05", "strength":"supporting",
        "note":"The data was already sitting in tables nobody used. The work was making it land in front of the person who could act on it." },

      { "id":"E17", "problem":"R07", "work":"W12", "strength":"primary",
        "note":"Built solo, on my own time, including the MCP server. The whole thing is an argument about what one person plus agentic tooling can now ship." },
      { "id":"E18", "problem":"R07", "work":"W09", "strength":"supporting",
        "note":"An LLM interface over an existing stack was the cheapest path to the outcome, and it shipped without a new backend." },

      { "id":"E19", "problem":"R08", "work":"W01", "strength":"primary",
        "note":"100% adoption of an internal platform, which is the only honest measure of whether a shared surface is any good." },
      { "id":"E20", "problem":"R08", "work":"W05", "strength":"supporting",
        "note":"Adoption grew without a mandate, because the report showed up where the work already happened." },
      { "id":"E21", "problem":"R08", "work":"W06", "strength":"supporting",
        "note":"Co-creating the prioritisation framework with ICs from all seven customer orgs is why the roadmap held instead of being relitigated." },

      { "id":"E22", "problem":"R09", "work":"W07", "strength":"primary",
        "note":"Two orgs conceded ownership of the calculation and a business team conceded the gatekeeping decision. That is a platform boundary being drawn." },
      { "id":"E23", "problem":"R09", "work":"W06", "strength":"supporting",
        "note":"I wanted a different item at the top of the roadmap than the raw impact number implied, and won it on the group's own math rather than by escalating." },
      { "id":"E24", "problem":"R09", "work":"W11", "strength":"supporting",
        "note":"Leadership favoured reusing an existing service. The options doc, grounded in the physical operation, moved the decision in one room." },

      { "id":"E25", "problem":"R10", "work":"W05", "strength":"primary",
        "note":"Moving a team from reviewing last week's failures to acting on this morning's errors is the same shift as moving an agent from suggesting to acting." },
      { "id":"E26", "problem":"R10", "work":"W04", "strength":"supporting",
        "note":"Deprecating a live ML model meant reconstructing both algorithms first, then rolling out one DC at a time with projected-versus-actual measurement at each wave." },
      { "id":"E27", "problem":"R10", "work":"W12", "strength":"supporting",
        "note":"Autonomy under real financial blast radius, where the cost of a wrong unattended action is immediate and mine." },

      { "id":"E28", "problem":"R11", "work":"W11", "strength":"primary",
        "note":"I went to the shows and stood on the back-of-house dock to watch inventory move before writing anything down." },
      { "id":"E29", "problem":"R11", "work":"W10", "strength":"supporting",
        "note":"Owning the automated layer meant owning what happens when the ideal path is unavailable, which is the case operators actually live in." }
    ]
  },

  /* ─────────────────────────────────────────────────────────────────────
     REFERENCES
     ───────────────────────────────────────────────────────────────────── */
  "references": {
    "primary": [
      { "label":"Job description, Senior Product Manager, AI Core Services",
        "url":"https://job-boards.greenhouse.io/tanium/jobs/8113459",
        "note":"The posting itself. Every fromJD marker on this page quotes it." },
      { "label":"Tanium reappoints co-founder Orion Hindawi as CEO",
        "url":"https://www.tanium.com/press-releases/tanium-reappoints-co-founder-orion-hindawi-as-ceo-to-drive-next-chapter-of-growth",
        "note":"2026-08-20. The founder-led reset that reframes everything else on this list." },
      { "label":"Tanium Atlas reaches general availability",
        "url":"https://www.businesswire.com/news/home/20260622064822/en/Tanium-Atlas-Now-Generally-Available-Delivering-Agentic-AI-to-Every-Commercial-Cloud-Customer",
        "note":"2026-06-22. The platform this role sits underneath is roughly ten weeks old." },
      { "label":"Tanium introduces Atlas",
        "url":"https://www.tanium.com/press-releases/tanium-introduces-tanium-atlas-to-transform-it-and-security-operations-for-the-age-of-ai",
        "note":"The ensemble of models from OpenAI, Anthropic and Google, and the ambient agent concept." },
      { "label":"Tanium delivers autonomous security at Black Hat USA 2026",
        "url":"https://www.tanium.com/press-releases/tanium-delivers-autonomous-security-at-black-hat-usa-2026",
        "note":"Background agents, agentic performance analysis, and the approval gate on consequential actions." },
      { "label":"Bringing Tanium's endpoint intelligence into enterprise AI workflows with MCP",
        "url":"https://www.tanium.com/blog/bringing-tanium-s-real-time-endpoint-intelligence-into-enterprise-ai-workflows-with-mcp",
        "note":"Permission-scoped tool discovery, which is the source for R05." },
      { "label":"Tanium leadership",
        "url":"https://www.tanium.com/leadership/",
        "note":"Read for the shape of the org above this role. There is no chief product officer listed." },
      { "label":"Harman Kaur, Chief Technology Officer",
        "url":"https://www.tanium.com/leadership/harman-kaur",
        "note":"Previously VP of AI, and came up through field engineering rather than big-tech product." },
      { "label":"Tanium open roles",
        "url":"https://job-boards.greenhouse.io/tanium",
        "note":"41 open roles, 5 of them product, with a Data Platform director hiring alongside this one." },
      { "label":"Tanium reviews, Gartner Peer Insights",
        "url":"https://www.gartner.com/reviews/market/endpoint-management-tools/vendor/tanium",
        "note":"Customer voice. The module-creep pattern behind R06 comes from here and from PeerSpot." }
    ],
    "secondary": [
      { "group":"Company material and product documentation", "items":[
        { "label":"Tanium Atlas platform page", "url":"https://www.tanium.com/platform/tanium-atlas" },
        { "label":"Autonomous IT platform", "url":"https://www.tanium.com/autonomous-it-platform" },
        { "label":"Tanium Atlas walkthrough, Tech Talks 163", "url":"https://www.tanium.com/blog/mapping-enterprise-it-infrastructure-with-tanium-atlas-tech-talks-163" },
        { "label":"Tanium named a Leader, 2026 Gartner Magic Quadrant for Endpoint Management Tools", "url":"https://www.businesswire.com/news/home/20260108178953/en/Tanium-Named-a-Leader-in-the-2026-Gartner-Magic-Quadrant-for-Endpoint-Management-Tools" },
        { "label":"Tanium AI agent integration with Microsoft Security Copilot", "url":"https://www.tanium.com/blog/tanium-develops-new-ai-agent-integration-with-microsoft-security-copilot/" },
        { "label":"Tanium plugin for Security Copilot, Microsoft Learn", "url":"https://learn.microsoft.com/en-us/copilot/security/plugin-tanium" },
        { "label":"Tanium sensor authoring documentation", "url":"https://help.tanium.com/bundle/ug_console_onprem/page/platform_user/authoring_sensors.html" },
        { "label":"Tanium architecture datasheet", "url":"https://site.tanium.com/rs/790-QFJ-925/images/DS-Tanium-Architecture.pdf" },
        { "label":"Tanium locations", "url":"https://www.tanium.com/locations" }
      ]},
      { "group":"Company analysis, financials and market position", "items":[
        { "label":"Contrary Research company report, Tanium", "url":"https://research.contrary.com/company/tanium" },
        { "label":"Tanium brings back cofounder as CEO, cuts 35 jobs", "url":"https://app.dealroom.co/news/feed/tanium-brings-back-cofounder-as-ceo-cuts-35-jobs-amid-ai-upheaval" },
        { "label":"Tanium, Wikipedia", "url":"https://en.wikipedia.org/wiki/Tanium" },
        { "label":"Tanium secondary market valuation", "url":"https://finance.yahoo.com/quote/TANI.PVT/" },
        { "label":"Tanium IPO tracker, Forge Global", "url":"https://forgeglobal.com/tanium_ipo/" },
        { "label":"Tanium pricing analysis", "url":"https://underdefense.com/blog/tanium-pricing-guide/" },
        { "label":"Tanium market share, endpoint security", "url":"https://6sense.com/tech/endpoint-security/tanium-market-share" }
      ]},
      { "group":"Competitive and adjacent products", "items":[
        { "label":"CrowdStrike Falcon for IT, risk-based patching", "url":"https://ir.crowdstrike.com/news-releases/news-release-details/falcon-it-risk-based-patching-accelerates-cybersecurity-and-it/" },
        { "label":"CrowdStrike FY2026 first quarter results", "url":"https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-reports-first-quarter-fiscal-year-2026-financial/" },
        { "label":"Microsoft 365 capabilities and pricing update", "url":"https://www.microsoft.com/en-us/microsoft-365/blog/2025/12/04/advancing-microsoft-365-new-capabilities-and-pricing-update/" },
        { "label":"Intune Suite joins Microsoft 365 E3 and E5, July 2026", "url":"https://admin365.blog/2026/07/07/intune-suite-joins-microsoft-365-e3-e5-what-changes-july-1-2026/" },
        { "label":"ServiceNow completes Armis acquisition", "url":"https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-completes-Armis-acquisition-closing-the-gap-between-asset-visibility-and-cyber-risk/default.aspx" },
        { "label":"SentinelOne opens Purple AI agentic investigation to all customers", "url":"https://www.sentinelone.com/press/sentinelone-opens-purple-ai-agentic-investigation-to-all-customers-bringing-frontier-ai-directly-into-the-soc/" },
        { "label":"NinjaOne, 2026 Gartner Magic Quadrant", "url":"https://www.ninjaone.com/resource/gartner-magic-quadrant-2026-mq/" },
        { "label":"Ivanti EPMM zero-day vulnerabilities", "url":"https://www.tenable.com/blog/cve-2026-1281-cve-2026-1340-ivanti-endpoint-manager-mobile-epmm-zero-day-vulnerabilities" }
      ]},
      { "group":"Agent evaluation, safety and platform practice", "items":[
        { "label":"Hamel Husain, Your AI product needs evals", "url":"https://hamel.dev/blog/posts/evals/" },
        { "label":"Hamel Husain and Shreya Shankar, AI evals FAQ", "url":"https://hamel.dev/blog/posts/evals-faq/" },
        { "label":"Anthropic, Building effective agents", "url":"https://www.anthropic.com/engineering/building-effective-agents" },
        { "label":"Anthropic, Effective context engineering for AI agents", "url":"https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" },
        { "label":"OpenAI, A practical guide to building agents", "url":"https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf" },
        { "label":"LangChain, Trajectory evaluations", "url":"https://docs.langchain.com/langsmith/trajectory-evals" },
        { "label":"Langfuse, AI agent evaluation", "url":"https://langfuse.com/resources/engineering/ai-agent-evaluation" },
        { "label":"Eugene Yan, Patterns for building LLM-based systems", "url":"https://eugeneyan.com/writing/llm-patterns/" },
        { "label":"Chip Huyen, Common pitfalls when building generative AI applications", "url":"https://huyenchip.com/2025/01/16/ai-engineering-pitfalls.html" },
        { "label":"OWASP LLM Top 10, 2026 edition", "url":"https://www.mend.io/blog/owasp-llm-top-10-2026/" },
        { "label":"Descope, What is the Model Context Protocol", "url":"https://www.descope.com/learn/post/mcp" },
        { "label":"Zartis, AI team structures, embedded versus centralised", "url":"https://www.zartis.com/ai-team-structures-embedded-vs-centralised/" }
      ]},
      { "group":"Practitioner and operator sources", "items":[
        { "label":"Tanium reviews, PeerSpot", "url":"https://www.peerspot.com/products/tanium-reviews" },
        { "label":"Tanium 101, architecture walkthrough", "url":"https://oofhours.com/2021/02/01/tanium-101/" },
        { "label":"Critique of the linear chain architecture", "url":"https://www.linkedin.com/pulse/tanium-like-token-ring-technology-died-90s-stuart-okin" },
        { "label":"Harman Kaur interview, Unite.AI", "url":"https://www.unite.ai/harman-kaur-vice-president-of-ai-at-tanium-interview-series/" },
        { "label":"IDTechEx on autonomous agent deployment", "url":"https://www.idtechex.com/" }
      ]}
    ]
  },

  /* Draft mode only. */
  "todos": [
    { "id":"T01", "text":"R11 is the weakest problem on the board. It is real but it is softer than the other ten. Consider cutting it and rebalancing edges, or sharpening it toward a specific Tanium workflow." },
    { "id":"T02", "text":"W12 MATES carries five edges, more than any other work item. That is honest for an AI role but check it does not read as leaning on a side project." },
    { "id":"T03", "text":"Only two work items are genuinely AI-native (W09, W12). If JobBot3000 or Hemlock have a number cleared for public use, adding one would strengthen the right column for this specific role." },
    { "id":"T04", "text":"R06 module creep comes from customer reviews rather than anything Tanium has said publicly. Worth confirming the framing lands before the URL is shared." },
    { "id":"T05", "text":"Confirm the JD quotes in fromJD are verbatim against the live posting before DRAFT goes false." },
    { "id":"T06", "text":"Decide whether to keep the single intro popup or drop it entirely for this build." },
    { "id":"T07", "text":"KNOWN DEVIATION: W11 Project Roadie has no number in its outcome, which the spec requires. Carried over deliberately from the Flexport build rather than inventing a metric. Either find a cleared number or accept the exception." }
  ],

  /* Unused on this page. Present so the shared renderer has something to read. */
  "walkthrough": { "intro":"", "groups":[] },
  "lifecycle":   { "lanes":[], "steps":[] },
  "markers":     [],
  "closer":      {},
  "appendix":    { "intro":"", "items":[] },
  "parked":      []
};
