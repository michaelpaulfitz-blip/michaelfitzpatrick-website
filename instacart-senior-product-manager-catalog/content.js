/* Instacart · Senior Product Manager, Catalog (Greenhouse 8143270)
   Single source of truth for every user-visible string on this page.
   index.html contains zero prose. Bump the ?v= cache-buster on every edit. */

const DRAFT = true;  // flip to false before the URL is shared

const CONTENT = {

  meta: {
    company:   "Instacart",
    role:      "Senior Product Manager, Catalog",
    recipient: "Brittany",
    owner:     "Michael Fitzpatrick"
  },

  hero: {
    title: "Catalog attribute problems, and where my experience fits",
    note:  "Brittany, thanks for the conversation about the Catalog role. I built this afterwards " +
           "so you can explore the fit yourself. The left column is what I think the attributes " +
           "charter is actually pointed at, from your docs, your engineering posts, and the job " +
           "description. The right column is work I have shipped, including the item data layer " +
           "I owned at Amazon Fresh, which is your prioritization problem with different nouns.",
    cue:   "Click any card to trace it"
  },

  ui: {
    columns: {
      problems: "What the attributes charter has to solve",
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

    /* ---------------- LEFT COLUMN: Instacart's problems ---------------- */
    problems: [
      {
        id: "R01",
        title: "Attribute quality has to be defensible to Ads, Legal, and retailer customers, with no accuracy SLA published today",
        fromJD: true,
        why: "The posting asks for quality that is \"defensible at scale.\" The help center says Instacart " +
             "\"can't guarantee\" nutritional or allergen information is accurate, and the open Catalog " +
             "engineering manager req asks the hire to \"set and meet SLAs on core attributes.\""
      },
      {
        id: "R02",
        title: "Four prioritization methods decide which source wins per attribute, and retailers can override them",
        fromJD: false,
        why: "docs.instacart.com names retailer file data, initial retailer data, CSP-prioritized, and " +
             "machine learning as the four methods, with five override reasons. \"A small number of " +
             "retailers prioritize their own product content.\" Published only since March 2026."
      },
      {
        id: "R03",
        title: "A brand's correction can be silently overwritten by a retailer feed, and nobody downstream can see which source won",
        fromJD: false,
        why: "Product Library edits take 48 hours to review, then \"might not show up on all retailers' " +
             "storefronts.\" Instacart's own diagnostic for brands: look at three different retailers " +
             "and see where the override is happening."
      },
      {
        id: "R04",
        title: "Precision and recall operating points have to be set per attribute family, with humans reviewing what the model is unsure about",
        fromJD: true,
        why: "\"Reasoning about precision/recall and ML model tradeoffs\" sits in the minimum " +
             "qualifications. PARSE routes low-confidence extractions to human review and reports a " +
             "60 percent accuracy drop when a cheaper model is used on hard attributes."
      },
      {
        id: "R05",
        title: "Golden set audits and human-in-the-loop review have to scale across tens of millions of products",
        fromJD: true,
        why: "Named in the preferred qualifications. PARSE runs human evaluation in development mode and " +
             "confidence-routed review in production. Nothing public describes a cross-family golden " +
             "set or who owns it."
      },
      {
        id: "R06",
        title: "Allergens are a free-text field while the new assistant takes \"nut-free\" as a preference and builds the cart",
        fromJD: false,
        why: "The catalog spec stores allergens as a comma-separated string and warnings as free text. " +
             "Clementine launched 2026-09-09 accepting dietary and allergen preferences. Inside " +
             "ChatGPT, Claude, and Gemini no human reads the label before checkout."
      },
      {
        id: "R07",
        title: "Dietary coverage is on the order of half a million tagged items against tens of millions of products, and nobody publishes the denominator",
        fromJD: false,
        why: "Health Tags covered \"approximately half a million items\" in March 2025. The engineering " +
             "req describes \"tens of millions of products.\" Every dietary filter is a recall problem " +
             "before it is a precision problem."
      },
      {
        id: "R08",
        title: "Dietary and health definitions are self-declared, and Legal sits inside the development process",
        fromJD: true,
        why: "The help center: \"These diets don't have regulatory or consensus-based definitions.\" " +
             "Organic includes partially organic. The posting lists Legal alongside Ops, Engineering, " +
             "and ML in the development process, and names compliance attributes and rights management."
      },
      {
        id: "R09",
        title: "Twelve stakeholder functions, none of which controls all the inputs, need one roadmap they can depend on",
        fromJD: true,
        why: "The posting names Product, Engineering, Design, Analytics, Operations, ML, Sales, Ads, " +
             "Search, Legal, Brand, and Support, and asks for a roadmap \"transparent enough that every " +
             "side of the marketplace can depend on it.\""
      },
      {
        id: "R10",
        title: "Governance rituals, quality dashboards, and postmortems have to be built, since the bar is explicitly more than shipping features",
        fromJD: true,
        why: "\"Building governance structures and quality systems, not just shipping features\" is a " +
             "minimum qualification. No public postmortem, incident process, or attribute quality " +
             "dashboard exists."
      },
      {
        id: "R11",
        title: "Attributes became a sold product in November, with contracted retailer customers and a seven-engineer pod to deliver them",
        fromJD: false,
        why: "Catalog Engine packages nutrition facts, health tags, and allergens for Kroger, Sprouts, " +
             "and other grocers. The posting scopes seven engineers plus ML and Ops partners. A " +
             "contract needs an owner who can define correct."
      },
      {
        id: "R12",
        title: "Five overlapping dietary vocabularies, and Search and Ads each consume their own subset",
        fromJD: false,
        why: "18 inventory-file booleans, 30 Health Tags, 14 Smart Shop preferences, 26 help-center " +
             "labels, and 27 or more storefront tags, with no published crosswalk. Semantic IDs encode " +
             "attributes for Search and Ads retrieval separately."
      }
    ],

    /* ---------------- RIGHT COLUMN: Mike's work ---------------- */
    /* Every outcome below is quoted verbatim from a cleared memory file. */
    work: [
      {
        id: "W01",
        name: "Item data layer (IDA) and catalog API contract, Amazon Fresh",
        outcome: "Catalog errors down 20%, data 4x fresher",
        detail: "Owned the aggregation layer between Amazon's central catalog and a dozen buying " +
                "microservices for a $30B, 8-country grocery operation. Moved it to marketplace-level " +
                "attributes with enrichment pulled downstream, which cut throttling and refresh lag. " +
                "The scar was a second source of truth, and governing the layer became the product."
      },
      {
        id: "W02",
        name: "Sourceability ownership and the inverted contract, Feast 2.0",
        outcome: "88% to 92% in three months, incorrect assortments down 40%",
        detail: "Got three orgs onto one definition of sourceable, then inverted the contract so " +
                "partners send the wide list and get back what passed and why the rest failed. Won " +
                "ownership of the calculation from two peer orgs because it was deterministic and " +
                "auditable, so nobody had to trust a judgment call."
      },
      {
        id: "W03",
        name: "UARC2 golden-set validation, stockout root-cause engine",
        outcome: "Attribution MAPE ~8 vs ~32, 4x more accurate",
        detail: "Ten random stockouts a week ran through the old and new systems while a panel of " +
                "tenured experts adjudicated the true cause. Leadership killed the measure as too " +
                "subjective, adoption stalled for months, and reinstating it took the engine to 100% " +
                "of required users and 92% of the wider org."
      },
      {
        id: "W04",
        name: "Freyja, sourcing algorithm reconstruction",
        outcome: "+25bps network instock, +315bps hub share",
        detail: "Reconstructed two sourcing algorithms in SQL, normalized the business rules out so the " +
                "models could be compared on their own, and found the ML model's confident predictions " +
                "were wrong more often on vendor fill. Deprecated it for a simpler algorithm with the " +
                "right objective."
      },
      {
        id: "W05",
        name: "Procurability at Amazon Go",
        outcome: "93% to 99% procurability, 92% to 95% instock",
        detail: "Surfaced error data nobody was counting into a daily report, gave every SKU an owner " +
                "so every error had a name on it, and moved the review ahead of the stockout slide " +
                "in the weekly business review. Adopted with no mandate."
      },
      {
        id: "W06",
        name: "Feast Instock Portal, net-new internal platform",
        outcome: "30+ tools into 8 workflows, 100% adoption",
        detail: "Single-threaded owner with a 14-engineer team for 400+ users in 8 countries. Added " +
                "guardrails and projected-impact previews that eliminated the fat-finger config " +
                "disruptions previously hitting about twice a quarter. +78% usability."
      },
      {
        id: "W07",
        name: "OADS, ordering algorithm replacement",
        outcome: "9.15% shrink reduction, ~$6.4M/yr",
        detail: "Asked to automate a daily process, found the algorithm optimized DC labor with no " +
                "shrink constraint, and rewrote the objective as landed cost constrained by instock. " +
                "Shadow-tested against the live system before rollout."
      },
      {
        id: "W08",
        name: "BPSI prioritization framework, seven customer orgs",
        outcome: "+200bps instock in bakery",
        detail: "Added actionability as a second axis alongside raw impact, co-created the framework " +
                "with ICs from all seven customer orgs, and re-scored the roadmap in the room so the " +
                "right bucket floated to the top on the group's own math."
      },
      {
        id: "W09",
        name: "Frida, natural-language diagnostic interface",
        outcome: "80% faster investigation",
        detail: "An LLM interface over the root-cause stack so operators could ask why an item was " +
                "out instead of writing SQL. Success metric defined in week one, before any " +
                "requirement was written."
      },
      {
        id: "W10",
        name: "Annual planning for a 140-person technology org",
        outcome: "5 pillars, 34 feature areas, VP sign-off",
        detail: "Directed the annual plan across Product, Engineering, and Science leaders, with a " +
                "published roadmap every partner org planned against."
      },
      {
        id: "W11",
        name: "MATES, multi-agent trading system",
        outcome: "47% return year to date",
        detail: "A multi-agent workflow plus an MCP server, built on his own time in Claude Code, " +
                "that trades prediction markets on structured signals. Evidence he builds agentic " +
                "systems himself and knows what a machine-readable input has to look like."
      }
    ],

    /* ---------------- EDGES: 30 total, zero orphans ---------------- */
    edges: [
      { problem:"R01", work:"W02", strength:"primary"    },
      { problem:"R01", work:"W03", strength:"primary"    },
      { problem:"R01", work:"W05", strength:"supporting" },

      { problem:"R02", work:"W01", strength:"primary"    },
      { problem:"R02", work:"W02", strength:"supporting" },
      { problem:"R02", work:"W04", strength:"supporting" },

      { problem:"R03", work:"W02", strength:"primary"    },
      { problem:"R03", work:"W01", strength:"supporting" },

      { problem:"R04", work:"W04", strength:"primary"    },
      { problem:"R04", work:"W03", strength:"supporting" },

      { problem:"R05", work:"W03", strength:"primary"    },
      { problem:"R05", work:"W09", strength:"supporting" },

      { problem:"R06", work:"W02", strength:"primary"    },
      { problem:"R06", work:"W11", strength:"supporting" },
      { problem:"R06", work:"W09", strength:"supporting" },

      { problem:"R07", work:"W05", strength:"primary"    },
      { problem:"R07", work:"W01", strength:"supporting" },
      { problem:"R07", work:"W06", strength:"supporting" },

      { problem:"R08", work:"W02", strength:"primary"    },
      { problem:"R08", work:"W03", strength:"supporting" },

      { problem:"R09", work:"W10", strength:"primary"    },
      { problem:"R09", work:"W08", strength:"primary"    },
      { problem:"R09", work:"W03", strength:"supporting" },

      { problem:"R10", work:"W05", strength:"primary"    },
      { problem:"R10", work:"W06", strength:"supporting" },

      { problem:"R11", work:"W06", strength:"primary"    },
      { problem:"R11", work:"W07", strength:"supporting" },

      { problem:"R12", work:"W01", strength:"primary"    },
      { problem:"R12", work:"W02", strength:"supporting" },
      { problem:"R12", work:"W04", strength:"supporting" }
    ]
  },

  sections: {
    mapping: {
      eyebrow: "Experience Map",
      h2: "The attributes charter, and my work against it",
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
      { label: "Job description, Senior Product Manager, Catalog",
        url: "https://www.instacart.careers/job?gh_jid=8143270",
        note: "The posting itself. Attributes, governance, precision and recall, and twelve stakeholder functions." },
      { label: "Product information sources and prioritization methods, Instacart Docs",
        url: "https://docs.instacart.com/catalog/get_started/product-info-sources",
        note: "The four prioritization methods and five override reasons, named by Instacart." },
      { label: "Engineering Manager, Catalog (Enrichment) req",
        url: "https://instacart.careers/job/?gh_jid=7927378",
        note: "\"Set and meet SLAs on core attributes\" and \"auditable governance,\" three months before the PM posting." },
      { label: "Scaling catalog attribute extraction with multimodal LLMs (PARSE)",
        url: "https://company.instacart.com/tech-innovation/scaling-catalog-attribute-extraction-with-multi-modal-llms",
        note: "The extraction platform, its eval loop, and the cost and accuracy tradeoffs it reports." },
      { label: "Product information and dietary labels, Instacart Help Center",
        url: "https://www.instacart.com/help/section/809794019",
        note: "The accuracy disclaimer and the line that dietary labels have no regulatory or consensus definition." },
      { label: "Updating your Product Library, Instacart Ads Manager docs",
        url: "https://docs.instacart.com/ads_manager/updating_your_product_library",
        note: "The 48-hour review and the warning that edits might not show on every storefront." },
      { label: "Content service providers and retailer overrides, Instacart Ads partner docs",
        url: "https://docs.instacart.com/ads_partners/product_content_management/content_service_providers",
        note: "Retailers can prioritize their own content, and Instacart cannot tell brands which ones do." },
      { label: "Meet Clementine, Instacart's AI shopping assistant",
        url: "https://www.digitalcommerce360.com/2026/09/09/instacart-ai-assistant-clementine-agentic-commerce-integrations/",
        note: "Dietary and allergen preferences flow into an agent that builds the cart." },
      { label: "Catalog Engine and enterprise AI solutions for grocers",
        url: "https://www.prnewswire.com/news-releases/instacart-announces-new-enterprise-ai-solutions-to-democratize-ai-for-grocers-of-all-sizes-302603735.html",
        note: "Attributes sold to retailers as a product, November 2025." },
      { label: "Instacart Q2 2026 financial results",
        url: "https://www.prnewswire.com/news-releases/instacart-announces-second-quarter-2026-financial-results-302845378.html",
        note: "Advertising and other revenue up 16 percent, outpacing GTV. The revenue side of the attributes question." }
    ],
    secondary: [
      { group: "Instacart documentation and help center", items: [
        { label: "Catalog docs changelog (March 2026 data source explanations)", url: "https://docs.instacart.com/catalog/changelog/" },
        { label: "Catalog overview, Instacart Docs", url: "https://docs.instacart.com/catalog/" },
        { label: "Inventory file specifications overview", url: "https://docs.instacart.com/catalog/catalog_inventory_file/specifications/overview/" },
        { label: "Product claims specification", url: "https://docs.instacart.com/catalog/catalog_inventory_file/specifications/product-claims" },
        { label: "Alcohol requirements specification", url: "https://docs.instacart.com/catalog/catalog_inventory_file/specifications/alcohol-requirements" },
        { label: "SNAP EBT requirements specification", url: "https://docs.instacart.com/catalog/catalog_inventory_file/specifications/snap-ebt-requirements" },
        { label: "Nutrition info specification", url: "https://docs.instacart.com/catalog/catalog_inventory_file/specifications/nutrition_info/overview" },
        { label: "Catalog API overview", url: "https://docs.instacart.com/catalog/catalog_api/overview/" },
        { label: "Product tags, Storefront docs", url: "https://docs.instacart.com/storefront/learn_about_your_storefront/shopping/catalog/product_tags/" },
        { label: "Sort and filter, Storefront docs", url: "https://docs.instacart.com/storefront/learn_about_your_storefront/shopping/sort_and_filter/" },
        { label: "Filters tutorial, Developer Platform API", url: "https://docs.instacart.com/developer_platform_api/guide/tutorials/filters" },
        { label: "Prepare for launch, catalog docs", url: "https://docs.instacart.com/catalog/get_started/prepare-launch/" },
        { label: "SNAP EBT, Connect fulfillment guide", url: "https://docs.instacart.com/connect/fulfillment_guide/concepts/snap_ebt/" },
        { label: "Introduction to advertising on Instacart", url: "https://docs.instacart.com/ads_manager/introduction_to_advertising_on_instacart" },
        { label: "Product images on Instacart, Ads help", url: "https://company.instacart.com/instacart-ads/product-images-on-instacart" },
        { label: "Where do product images come from, Ads help", url: "https://company.instacart.com/instacart-ads/where-do-product-images-come-from" },
        { label: "Managing your catalog, Ads help", url: "https://company.instacart.com/instacart-ads/managing-your-catalog" },
        { label: "FSA and HSA on Instacart", url: "https://www.instacart.com/p/fsa-hsa" },
        { label: "Instacart Health", url: "https://company.instacart.com/health" }
      ]},
      { group: "Instacart engineering and product posts", items: [
        { label: "Semantic IDs: product understanding at scale", url: "https://tech.instacart.com/semantic-ids-product-understanding-at-scale-5283e0288f5a" },
        { label: "Building the Intent Engine: query understanding with LLMs", url: "https://company.instacart.com/tech-innovation/building-the-intent-engine-how-instacart-is-revamping-query-understanding-with-llms" },
        { label: "Agentic machine learning modeling at Instacart", url: "https://company.instacart.com/tech-innovation/agentic-machine-learning-modeling-at-instacart" },
        { label: "Simplifying large-scale LLM processing with Maple", url: "https://company.instacart.com/tech-innovation/simplifying-large-scale-llm-processing-across-instacart-with-maple" },
        { label: "One grocery catalog to rule them all", url: "https://company.instacart.com/tech-innovation/one-grocery-catalog-to-rule-them-all" },
        { label: "The story behind an Instacart order, part 1: building a digital catalog", url: "https://company.instacart.com/how-its-made/the-story-behind-an-instacart-order-part-1-building-a-digital-catalog/" },
        { label: "Quality assessment in Instacart's knowledge graph", url: "https://tech.instacart.com/red-means-stop-green-means-go-a-look-into-quality-assessment-in-instacarts-knowledge-graph-9ceeb3f1be24" },
        { label: "From scoring to spelling: rebuilding ads retrieval", url: "https://tech.instacart.com/from-scoring-to-spelling-rebuilding-ads-retrieval-at-instacart-cf36b4e8d1bb" },
        { label: "Supercharging discovery in search with LLMs", url: "https://company.instacart.com/tech-innovation/supercharging-discovery-in-search-with-llms" },
        { label: "Introducing Pixel, unified image generation platform", url: "https://company.instacart.com/tech-innovation/introducing-pixel-instacarts-unified-image-generation-platform" },
        { label: "Introducing Griffin 2.0, next-gen ML platform", url: "https://company.instacart.com/tech-innovation/introducing-griffin-2-0-instacarts-next-gen-ml-platform" },
        { label: "Instacart data quality checks (Temporal talk)", url: "https://temporal.io/resources/on-demand/instacart-data-quality-checks" },
        { label: "Instacart app launches in OpenAI ChatGPT", url: "https://company.instacart.com/pressreleases/instacart-app-launches-in-openai-chatgpt" },
        { label: "Instacart brings agentic grocery shopping to Gemini", url: "https://company.instacart.com/updates/instacart-brings-agentic-grocery-shopping-to-gemini" },
        { label: "Instacart integrates with AI Mode in Google Search", url: "https://company.instacart.com/updates/instacart-integrates-with-ai-mode-in-google-search" },
        { label: "Instacart connects with Claude", url: "https://www.supermarketnews.com/grocery-technology/instacart-connects-with-ai-platform-claude" },
        { label: "Smart Shop and health features launch", url: "https://company.instacart.com/pressreleases/instacart-launches-ai-powered-smart-shop-and-new-features-that-make-healthy-choices-easy" },
        { label: "The next chapter for Instacart Health", url: "https://www.instacart.com/company/updates/the-next-chapter-for-instacart-health" }
      ]},
      { group: "Company filings, investor material, and press", items: [
        { label: "Q2 2026 results, investor site", url: "https://investors.instacart.com/news-releases/news-release-details/instacart-announces-second-quarter-2026-financial-results" },
        { label: "Q2 2026 Form 10-Q", url: "https://investors.instacart.com/static-files/0a97b8d6-4a83-424d-9a4c-d30bdbb72111" },
        { label: "Q2 2026 earnings call transcript", url: "https://www.investing.com/news/transcripts/earnings-call-transcript-instacart-q2-2026-results-send-shares-up-93-93CH-4844726" },
        { label: "Q1 2026 earnings call transcript", url: "https://www.fool.com/earnings/call-transcripts/2026/05/07/instacart-cart-q1-2026-earnings-transcript/" },
        { label: "Instacart expands Ads Manager to retailers", url: "https://investors.instacart.com/news-releases/news-release-details/instacart-expands-ads-manager-retailers-unlocking-new-self-serve" },
        { label: "Instacart acquires Wynshop", url: "https://investors.instacart.com/news-releases/news-release-details/instacart-acquires-wynshop-accelerate-expansion-its-enterprise" },
        { label: "Instacart acquires Arpalus", url: "https://www.pymnts.com/news/acquiring/2026/instacart-acquires-arpalus-to-move-intelligence-in-store/" },
        { label: "Kroger and Sprouts adopt Instacart AI, Grocery Dive", url: "https://www.grocerydive.com/news/kroger-sprouts-instacart-artificial-intelligence-grocery/804637/" },
        { label: "Instacart CEO on AI and ads strategy, Retail TouchPoints", url: "https://www.retailtouchpoints.com/news/ceo-chris-rogers-shares-ai-and-ad-strategy-as-instacart-revenues-reach-1-billion-in-q1/619341/" },
        { label: "Instacart CPO departs for Walmart, Progressive Grocer", url: "https://progressivegrocer.com/instacarts-chief-product-officer-departs-walmart" },
        { label: "FTC settlement, December 2025", url: "https://www.ftc.gov/news-events/news/press-releases/2025/12/instacart-pay-60-million-consumer-refunds-settle-ftc-lawsuit-over-allegations-it-engaged-deceptive" },
        { label: "OpenAI and Instacart partnership", url: "https://openai.com/index/instacart-partnership/" },
        { label: "Brands can finally control their product data on Instacart, Forbes 2021", url: "https://www.forbes.com/sites/kirimasters/2021/05/06/brands-can-finally-control-their-product-data-on-instacart/" }
      ]},
      { group: "Job postings and org signals", items: [
        { label: "Instacart Greenhouse job board", url: "https://boards-api.greenhouse.io/v1/boards/instacart/jobs" },
        { label: "Senior Product Manager, Retailer Platform (Enterprise DAM)", url: "https://instacart.careers/job/?gh_jid=8014060" },
        { label: "Director of Engineering, Catalog Content", url: "https://www.instacart.careers/job?gh_jid=7793600" },
        { label: "Senior Product Manager, Ads quality signals", url: "https://instacart.careers/job/?gh_jid=8077510" },
        { label: "Team Lead, Catalog Selection and Quality Operations", url: "https://builtin.com/job/team-lead-catalog-selection-quality-operations/3724153" },
        { label: "Data Quality and Labeling Specialist (closed)", url: "https://builtin.com/job/data-quality-and-labeling-specialist/3755182" },
        { label: "Staff Software Engineer, Catalog", url: "https://jobs.khoslaventures.com/companies/instacart/jobs/39427450-staff-software-engineer-catalog" },
        { label: "Enrichment Operations Analyst II", url: "https://builtintoronto.com/job/enrichment-operations-analyst-ii/3532876" },
        { label: "Instacart org chart, The Org", url: "https://theorg.com/org/instacart/org-chart/brittany-drager" }
      ]},
      { group: "Industry, regulatory, and competitor sources", items: [
        { label: "Gluten-free grocery filters compared across six platforms", url: "https://www.letsgoglutenfree.com/blog/gluten-free-grocery-filters-compare/" },
        { label: "Salsify direct connection to Instacart", url: "https://www.prnewswire.com/news-releases/salsify-puts-product-content-control-back-in-the-hands-of-cpg-brands-with-instacart-direct-connection-300766033.html" },
        { label: "Syndigo connections built in 2024", url: "https://syndigo.com/blog/powerful-new-connections-for-your-product-content-built-in-2024/" },
        { label: "Pacvue on Instacart Ads Library Manager updates", url: "https://pacvue.com/blog/updates-to-instacart-ads-library-manager/" },
        { label: "Missing or incorrect product images, Perpetua help", url: "https://help.perpetua.io/en/articles/4626446-missing-or-incorrect-product-images" },
        { label: "DoorDash product knowledge graph with LLMs", url: "https://careersatdoordash.com/blog/building-doordashs-product-knowledge-graph-with-large-language-models/" },
        { label: "Uber Eats INCA inventory catalog, InfoQ", url: "https://www.infoq.com/news/2025/08/ubereats-inca-inventory-catalog/" },
        { label: "Uber Eats and NIQ Brandbank catalog quality", url: "https://nielseniq.com/global/en/insights/success-story/2026/uber-eats-powering-global-catalog-quality-with-niq-brandbank/" },
        { label: "Amazon catalog team self-learning generative AI, AWS blog", url: "https://aws.amazon.com/blogs/machine-learning/how-the-amazon-com-catalog-team-built-self-learning-generative-ai-at-scale-with-amazon-bedrock/" },
        { label: "Walmart Marketplace release notes (content quality score)", url: "https://marketplacelearn.walmart.com/releasenotes" },
        { label: "Kroger Item API FAQ", url: "https://www.thekrogerco.com/wp-content/uploads/2025/04/FAQ_vFINAL.pdf" },
        { label: "FARE on sesame and the FASTER Act", url: "https://www.foodallergy.org/resources/fare-responds-companies-intentionally-adding-sesame-flour-faster-act-goes-effect" },
        { label: "Proposition 65 amendments in effect 2025", url: "https://www.stinson.com/newsroom-publications-warning-new-proposition-65-amendments-in-effect-in-2025" },
        { label: "Amazon sues CPSC over distributor determination", url: "https://www.lawbc.com/amazon-files-suit-against-cpsc-challenging-cpscs-determination-that-amazon-is-a-distributor/" },
        { label: "Undeclared allergen lawsuits, Enjuris", url: "https://www.enjuris.com/blog/news/undeclared-allergen-lawsuits/" }
      ]}
    ]
  },

  footer: "Michael Fitzpatrick · Seattle · September 2026",

  todos: [
    { id:"T01", text:"Hero note: adjust the first sentence to match when this goes out. If it is sent before the call, drop \"thanks for the conversation.\"" },
    { id:"T02", text:"W01: confirm the -20% and 4x numbers attach to the IDA marketplace-level attribute change and not to a separate FRC migration before this ships." },
    { id:"T03", text:"W10: the 140-person, 5 pillars, 34 feature areas figures come from the résumé rather than a memory file. Confirm they are cleared." },
    { id:"T04", text:"W11: confirm the 47% YTD figure is still current as of the share date." },
    { id:"T05", text:"R11: decide whether to keep the seven-engineer line. It is from the posting, so it is safe, but check it reads as observation rather than critique." },
    { id:"T06", text:"R07: the coverage ratio is an inference from two company numbers with different dates. The card says \"on the order of\" on purpose. Keep that wording." }
  ]
};
