/* Chewy · Senior Technical Product Manager, Inventory Technology (R30533)
   Single source of truth for every user-visible string on this page.
   index.html contains zero prose. Bump the ?v= cache-buster on every edit. */

const DRAFT = true;   // flip to false before the URL is shared

const CONTENT = {

  meta: {
    company:   "Chewy",
    role:      "Senior Technical Product Manager, Inventory Technology",
    recipient: null,
    owner:     "Michael Fitzpatrick"
  },

  hero: {
    title: "Inventory technology problems, and where my experience fits",
    note:  "I spent my last several years at Amazon Fresh building exactly this: " +
           "in-stock instrumentation, root-cause diagnostics, and the ordering and sourcing " +
           "algorithms underneath them. I put this together so you can explore the fit yourself " +
           "rather than take my word for it. Left column is what I think this role is actually " +
           "pointed at. Right column is work I have shipped.",
    cue:   "Click any card to trace it"
  },

  /* ---------------- UI CHROME STRINGS ----------------
     Added by the renderer build. index.html carries zero prose, so every label
     the reader can see has to live here, including the ones the reference build
     had hardcoded in markup: column heads, the JD badge, the coach mark, the
     references disclosure, and the draft-mode scaffolding. */
  ui: {
    columns: {
      problems: "What Chewy has to solve",
      work:     "Where I have done this"
    },
    fromJD:  "From the job description",
    coach: [
      { title: "These cards are clickable",
        body:  "Click this one to trace it to the work I have shipped against the same problem shape." },
      { title: "Try another one",
        body:  "Every problem lights a different set. Clicking a card on the right traces it back the other way." }
    ],
    coachDismiss: "Dismiss",
    refs: {
      primaryHead:  "Primary sources",
      summaryTitle: "Sources",
      summaryCount: "{p} primary sources, {s} more in the full list",
      open:         "Open",
      close:        "Close"
    },
    draftBar:    "Working draft, not final. Content IDs are shown so Mike can edit by ID.",
    todoTitle:   "Open items on this page",
    todoToggle:  "Open items",
    todoEmpty:   "Nothing open. Flip DRAFT to false in content.js.",
    todoCount:   "{n} open",
    todoNone:    "none"
  },

  mapping: {

    /* ---------------- LEFT COLUMN: Chewy's problems ---------------- */
    problems: [
      {
        id: "R01",
        title: "Under half of fulfillment volume runs through automation, against a target above 70%",
        fromJD: false,
        why: "Chewy's own disclosure put automated volume below 50% with a stated goal above 70%. " +
             "A $600M term loan in June 2026 was raised explicitly to fund automation. [VERIFY current figure]"
      },
      {
        id: "R02",
        title: "In-stock rate and inventory health are the success metrics, and neither is published",
        fromJD: true,
        why: "The JD names both as outcomes with no target attached. No in-stock rate, fill rate, " +
             "or inventory turns appears in any Chewy filing or release."
      },
      {
        id: "R03",
        title: "Autoship makes most demand knowable in advance, and the buy quantity may not reflect it",
        fromJD: false,
        why: "84.4% of net sales are subscription, so demand is known by SKU with a date attached. " +
             "Chewy has never publicly quantified the forecast-accuracy benefit it extracts from that."
      },
      {
        id: "R04",
        title: "Forecasting, inventory planning, and replenishment run as separate systems",
        fromJD: true,
        why: "The JD scopes all three to one role and describes managing cross-team dependencies " +
             "and integration points between them."
      },
      {
        id: "R05",
        title: "Supply chain intent has to become technical requirements before engineering can act",
        fromJD: true,
        why: "Named twice in the JD. Translating business needs into structured plans, requirements, " +
             "and milestones is the core verb of the role."
      },
      {
        id: "R06",
        title: "Six partner functions need one delivery sequence they all accept",
        fromJD: true,
        why: "The JD names Engineering, Product, Science, Analytics, Supply Chain, and Operations " +
             "as partners on a single program."
      },
      {
        id: "R07",
        title: "New private brands launch with no demand history and a shelf-life clock",
        fromJD: false,
        why: "Get Real fresh food launched in 2025 alongside an expanding private label line. " +
             "A parallel Chewy req asks someone to build mechanisms to monitor inventory expiration risk."
      },
      {
        id: "R08",
        title: "Autoship edits race the fulfillment state machine, and recovery depends on a human agent",
        fromJD: false,
        why: "Public complaints show orders shipping ahead of the customer's set date and holds " +
             "placed before shipment, with only a phone agent able to override. That is 84% of revenue."
      },
      {
        id: "R09",
        title: "Program health is reported rather than mechanized",
        fromJD: true,
        why: "The JD asks for status reporting, roadmap tracking, and stakeholder communication as " +
             "standing mechanisms rather than as one-off updates."
      },
      {
        id: "R10",
        title: "Inventory placement decides the capex return on newly automated capacity",
        fromJD: true,
        why: "The JD scopes how inventory is positioned across the network. A parallel Chewy req ties " +
             "assortment flow and storage strategy directly to return on capex investment."
      },
      {
        id: "R11",
        title: "AI agents are being deployed across fulfillment and service with dollar targets attached",
        fromJD: false,
        why: "Chewy guided to low tens of millions in AI benefit for FY2026 and at least $50M " +
             "annualized in 2027, spanning fulfillment, pharmacy, service, and discovery."
      }
    ],

    /* ---------------- RIGHT COLUMN: Mike's work ---------------- */
    /* Every outcome below is quoted verbatim from a cleared memory file. */
    work: [
      {
        id: "W01",
        name: "UARC2, causal-inference stockout root-cause engine",
        outcome: "4x more accurate, attribution MAPE ~8 vs ~32",
        detail: "Built 0 to 1 at Amazon Fresh. Instrumented the supply chain to isolate true " +
                "causation instead of correlation, drove up to +200bps instock in some categories, " +
                "and reached 100% of required users and 92% of the wider org."
      },
      {
        id: "W02",
        name: "Feast Instock Portal, net-new internal platform",
        outcome: "30+ tools into 8 workflows, 100% adoption",
        detail: "Single-threaded owner with a 14-engineer team for a $30B, 8-country grocery " +
                "operation and 400+ users. Added guardrails that eliminated fat-finger disruptions " +
                "previously occurring about twice a quarter. +78% usability."
      },
      {
        id: "W03",
        name: "OADS, ordering algorithm replacement",
        outcome: "9.15% shrink reduction, ~$6.4M/yr",
        detail: "Asked to automate a manual daily ordering process, found the underlying algorithm " +
                "optimized DC labor with no shrink constraint, and replaced it. Instock held, and " +
                "the 15% of SKUs downgraded saw 53% less shrink."
      },
      {
        id: "W04",
        name: "Freyja, sourcing algorithm reconstruction",
        outcome: "+25bps network instock, +315bps hub share",
        detail: "Reconstructed two sourcing algorithms in SQL himself, proved an ML model was " +
                "optimizing the wrong objective, and deprecated it. Rolled out one DC at a time " +
                "with projected versus actual measurement at each wave."
      },
      {
        id: "W05",
        name: "BPSI prioritization framework",
        outcome: "+200bps instock in bakery",
        detail: "Rebuilt the prioritization model to add actionability as a second axis alongside " +
                "raw impact, then did the political pre-work to reprioritize past a hostile director. " +
                "Became the spotlight topic at the bi-monthly VP review."
      },
      {
        id: "W06",
        name: "Sourceability ownership, Feast 2.0",
        outcome: "88% to 92% in three months",
        detail: "Convinced two peer orgs to hand his team ownership of the sourceability calculation " +
                "and a business team to cede selection gatekeeping. Launched a single correct " +
                "calculation in place of competing ones."
      },
      {
        id: "W07",
        name: "Procurability at Amazon Go",
        outcome: "93% to 99% procurability, 92% to 95% instock",
        detail: "Surfaced procurability-error data nobody was using into a daily report and paired " +
                "it with a SKU ownership model. Turned reactive instock teams proactive, and " +
                "adoption rose organically with no mandate."
      },
      {
        id: "W08",
        name: "Catalog API integration",
        outcome: "Catalog errors down 20%, data 4x fresher",
        detail: "Two API-contract changes made his service the source of truth for grocery " +
                "assortment coverage. Centralizing a check every partner team had been running " +
                "separately cut incorrect assortments about 40%."
      },
      {
        id: "W09",
        name: "Frida, natural-language diagnostic interface",
        outcome: "80% faster investigation",
        detail: "An LLM interface built on the UARC2 causal-inference stack so operators could " +
                "root-cause stockouts without writing SQL. Success metric was defined in week one " +
                "and measured as time-to-answer against SQL and reports."
      },
      {
        id: "W10",
        name: "MATES, multi-agent trading system",
        outcome: "47% return year to date",
        detail: "A multi-agent workflow plus an MCP server, built on his own time in Claude Code, " +
                "that trades prediction markets. Evidence he still builds agentic systems himself " +
                "rather than only directing them."
      }
    ],

    /* ---------------- EDGES: 30 total, zero orphans ---------------- */
    edges: [
      { problem:"R01", work:"W03", strength:"primary"    },
      { problem:"R01", work:"W04", strength:"supporting" },
      { problem:"R01", work:"W02", strength:"supporting" },

      { problem:"R02", work:"W01", strength:"primary"    },
      { problem:"R02", work:"W07", strength:"primary"    },
      { problem:"R02", work:"W09", strength:"supporting" },

      { problem:"R03", work:"W03", strength:"primary"    },
      { problem:"R03", work:"W04", strength:"primary"    },
      { problem:"R03", work:"W01", strength:"supporting" },

      { problem:"R04", work:"W02", strength:"primary"    },
      { problem:"R04", work:"W06", strength:"primary"    },
      { problem:"R04", work:"W08", strength:"supporting" },

      { problem:"R05", work:"W08", strength:"primary"    },
      { problem:"R05", work:"W01", strength:"supporting" },

      { problem:"R06", work:"W01", strength:"primary"    },
      { problem:"R06", work:"W05", strength:"primary"    },
      { problem:"R06", work:"W06", strength:"supporting" },

      { problem:"R07", work:"W03", strength:"primary"    },
      { problem:"R07", work:"W04", strength:"supporting" },

      { problem:"R08", work:"W02", strength:"primary"    },
      { problem:"R08", work:"W07", strength:"supporting" },
      { problem:"R08", work:"W09", strength:"supporting" },

      { problem:"R09", work:"W07", strength:"primary"    },
      { problem:"R09", work:"W05", strength:"supporting" },
      { problem:"R09", work:"W02", strength:"supporting" },

      { problem:"R10", work:"W04", strength:"primary"    },
      { problem:"R10", work:"W03", strength:"supporting" },

      { problem:"R11", work:"W10", strength:"primary"    },
      { problem:"R11", work:"W09", strength:"primary"    },
      { problem:"R11", work:"W01", strength:"supporting" }
    ]
  },

  sections: {
    mapping: {
      eyebrow: "Experience Map",
      h2: "Their problems, and my work against them",
      deck: "Click any card to trace its connections. Click it again, or press Escape, to clear."
    },
    references: {
      eyebrow: "References",
      h2: "Where all of this came from",
      deck: "Every claim on this page traces to a public source or to a project I ran."
    }
  },

  references: {
    primary: [
      { label: "Job description, Senior Technical Product Manager, Inventory Technology (R30533)",
        url: "https://wd5.myworkdaysite.com/en-US/recruiting/chewy/External/job/Senior-Technical-Product-Manager_R30533-1",
        note: "The posting itself. Forecasting, inventory planning, replenishment, measured on in-stock rate and inventory health." },
      { label: "Chewy FY2025 Form 10-K",
        url: "https://www.sec.gov/Archives/edgar/data/1766502/000176650226000034/chwy-20260201.htm",
        note: "Fulfillment network size, SKU count, supplier risk factors, and the automation disclosure." },
      { label: "Chewy Q1 FY2026 results",
        url: "https://www.sec.gov/Archives/edgar/data/0001766502/000162828026042058/chwyq12026exhibit991.htm",
        note: "Autoship at 84.4% of net sales, the number behind the demand-signal argument." },
      { label: "Chewy Q1 FY2026 earnings call transcript",
        url: "https://www.fool.com/earnings/call-transcripts/2026/06/10/chewy-chwy-q1-2026-earnings-transcript/",
        note: "AI benefit guidance and fulfillment network optimization named as a standing priority." },
      { label: "Term Loan B 8-K, June 2026",
        url: "https://www.sec.gov/Archives/edgar/data/0001766502/000119312526281042/d43042d8k.htm",
        note: "$600M raised explicitly to fund automation, one month after the new CTO started." },
      { label: "Inside Chewy's first automated fulfillment center",
        url: "https://www.supplychaindive.com/news/chewy-automated-fulfilment-warehouse-goods-to-person/588176/",
        note: "Goods-to-person architecture and the productivity claims behind the automation target." },
      { label: "Chewy automated fulfillment and peak season",
        url: "https://www.supplychaindive.com/news/chewy-automated-fulfillment-centers-q3-2024/735062/",
        note: "Automation penetration against the stated goal above 70%." },
      { label: "Chewy Operating Principles",
        url: "https://careers.chewy.com/us/en/operating-principles",
        note: "Seven principles. Operate in the Details and Debate Openly Commit Fully are the two this page speaks to." },
      { label: "Chewy Senior Instock Manager req",
        url: "https://www.builtinboston.com/job/senior-instock-manager/6977599",
        note: "A parallel req asking someone to build mechanisms to monitor inventory expiration risk." },
      { label: "How Chewy is using AI",
        url: "https://www.digitalcommerce360.com/2026/07/09/ecommerce-trends-how-chewy-is-using-ai/",
        note: "Where agentic work is actually deployed, and the efficiency targets attached to it." }
    ],
    secondary: [
      { group: "Company filings and investor material", items: [
        { label: "Chewy FY2025 Q4 and full year results", url: "https://investor.chewy.com/news-and-events/news/news-details/2026/Chewy-Announces-Fiscal-Fourth-Quarter-and-Full-Year-2025-Financial-Results/default.aspx" },
        { label: "Chewy Q1 FY2026 Form 10-Q", url: "https://www.sec.gov/Archives/edgar/data/0001766502/000162828026042060/chwy-20260503.htm" },
        { label: "Chewy FY2024 Form 10-K", url: "https://www.sec.gov/Archives/edgar/data/1766502/000176650225000014/chwy-20250202.htm" },
        { label: "Chewy FY2026 proxy statement", url: "https://www.sec.gov/Archives/edgar/data/0001766502/000114036126022529/ny20064174x1_def14a.htm" },
        { label: "CFO transition 8-K, February 2026", url: "https://www.sec.gov/Archives/edgar/data/1766502/000119312526065612/d97879dex991.htm" },
        { label: "Modern Animal acquisition", url: "https://investor.chewy.com/news-and-events/news/news-details/2026/Chewy-to-Acquire-Modern-Animal-Accelerating-Evolution-to-a-Fully-Integrated-Healthcare-Ecosystem/default.aspx" },
        { label: "AI Won't Disrupt Chewy investor presentation", url: "https://investor.chewy.com/news-and-events/events-and-presentations/presentation/presentation-details/2026/AI-Wont-Disrupt-Chewy--It-Will-Route-Demand-to-It/default.aspx" },
        { label: "Chewy investor relations", url: "https://investor.chewy.com" }
      ]},
      { group: "Industry and market analysis", items: [
        { label: "APPA 2026 State of the Industry", url: "https://americanpetproducts.org/2026-state-of-the-industry" },
        { label: "Chewy and Petco customer losses fuelling Amazon", url: "https://globalpetindustry.com/news/petco-and-chewys-customer-losses-fuel-amazons-growth-in-online-pet-retail/" },
        { label: "Amazon pet prescriptions via Vetsource", url: "https://www.aboutamazon.com/news/retail/pet-prescriptions-amazon-online-pet-pharmacy-vetsource" },
        { label: "Walmart expands pet care services", url: "https://www.avma.org/news/walmart-expands-pet-care-services-new-veterinary-centers-telehealth-service" },
        { label: "Tractor Supply premium pet expansion", url: "https://www.petage.com/tractor-supply-expands-pet-assortment-freshpet-open-farm-muttnation/" },
        { label: "The Farmer's Dog passes $1B annualized", url: "https://pitchbook.com/news/articles/pet-food-farmers-dog-profits-more-than-1b-annualized-revenue" },
        { label: "Freshpet Q2 2026 results", url: "https://investors.freshpet.com/news-releases/news-release-details/freshpet-inc-reports-second-quarter-2026-financial-results" },
        { label: "Veterinary consolidator ownership map 2026", url: "https://transitionselite.com/veterinary-consolidator-ownership-map-2026/" }
      ]},
      { group: "Practitioner and operator sources", items: [
        { label: "Chewy prescription approval policy", url: "https://www.chewy.com/customer-care/prescriptions-and-veterinary-diets/filling-prescriptions-or-veterinary-diets/prescription-approval" },
        { label: "Chewy customer reviews, Trustpilot", url: "https://www.trustpilot.com/review/chewy.com" },
        { label: "Chewy BBB complaint record", url: "https://www.bbb.org/us/fl/plantation/profile/pet-supplies/chewy-inc-0633-90060047/complaints" },
        { label: "Chewy customer care AI tools", url: "https://www.customerexperiencedive.com/news/chewys-customer-care-ai-tools-reduce-handle-times-lower-costs/816015/" },
        { label: "Chewy Plus membership economics", url: "https://www.customerexperiencedive.com/news/chewy-plus-top-pet-membership-program/759902/" },
        { label: "Interviewing at Chewy", url: "https://careers.chewy.com/us/en/interviewing-at-chewy" },
        { label: "Chewy office locations", url: "https://careers.chewy.com/us/en/locations" },
        { label: "Chewy Senior Supply Chain Product Manager req", url: "https://builtin.com/job/senior-supply-chain-product-manager/3648164" }
      ]},
      { group: "Competitor and adjacent products", items: [
        { label: "Petco Q2 FY2026 results", url: "https://www.investing.com/news/company-news/petco-q2-2026-slides-sales-stabilize-debt-falls-15-93CH-4886817" },
        { label: "Petco store closure plan FY2026", url: "https://www.gurufocus.com/news/8699312/petco-woof-announces-plans-for-net-store-closures-and-capital-expenditure-in-fy26" },
        { label: "Tractor Supply Q1 2026 results", url: "https://www.sec.gov/Archives/edgar/data/0000916365/000091636526000020/ex991-q12026earningsrelease.htm" },
        { label: "PetMed Express FY2026 results summary", url: "https://www.tradingview.com/news/tradingview:1792112684297:0-petmed-express-inc-fy-2026-revenue-179-02m-eps-2-74-10-k-summary/" },
        { label: "Chewy retail media network", url: "https://www.modernretail.co/marketing/inside-chewys-push-to-build-a-pet-focused-retail-media-network/" },
        { label: "Chewy automated FCs and shipping cost", url: "https://www.supplychaindive.com/news/chewys-automated-fulfillment-centers-reduce-shipping-costs-Q3/638548/" },
        { label: "Amazon advance in the US pet market", url: "https://www.freedoniagroup.com/blog/amazon-continues-advance-in-u-s-pet-market-with-new-private-label-pet-food-brand" },
        { label: "Chewy CTO appointment", url: "https://www.geekwire.com/2026/tech-moves-amazon-vp-is-now-chewy-cto-smartsheet-names-cfo-microsoft-exec-joins-netapp/" }
      ]}
    ]
  },

  footer: "Michael Fitzpatrick · Seattle · September 2026",

  todos: [
    { id:"T01", text:"R01: confirm the current automation percentage before sharing. The under-50% figure is from the FY2024 disclosure and may have moved." },
    { id:"T02", text:"R08: decide whether to keep the Autoship state-machine problem. It is the sharpest product insight on the page and also the most critical of Chewy." },
    { id:"T03", text:"W10 MATES: confirm the 47% YTD figure is still current as of the share date." },
    { id:"T04", text:"Hero note: add the hiring manager's name once known, and reference the conversation if this goes out after an interview." },
    { id:"T05", text:"Consider adding a vendor-management problem. The JD names vendor oversight and there is no work item that covers it, which is an honest gap." }
  ]
};
