// FAANG Behavioral seed content: competencies (Amazon's 16 Leadership Principles
// + generic FAANG competencies) and a curated question bank with "what they
// assess", exemplar STAR answers, and follow-up probes.
// Consumed by prisma/seed.ts (seedBehavioral). Seeded globally (userId: null).

export type CompetencySeed = {
  name: string;
  type: "LeadershipPrinciple" | "Competency";
  company: string | null; // "Amazon" for LPs, null for generic competencies
  description: string;
};

export type BehavioralQuestionSeed = {
  slug: string;
  prompt: string;
  category: string; // Failure | Conflict | Leadership | Ambiguity | Teamwork | Influence | Ownership | Deadline | Growth | Customer
  difficulty?: string;
  whatTheyAssess: string;
  exemplarAnswer: string; // a compact STAR example
  followUps: string;
  competencies: string[]; // must match COMPETENCY_SEED names
  companies: string[]; // must match CompanyCard names (COMPANY_SEED)
};

export const COMPETENCY_SEED: CompetencySeed[] = [
  // ---- Amazon's 16 Leadership Principles ----
  { name: "Customer Obsession", type: "LeadershipPrinciple", company: "Amazon", description: "Start with the customer and work backwards; earn and keep trust." },
  { name: "Ownership", type: "LeadershipPrinciple", company: "Amazon", description: "Think long term; act on behalf of the whole company, never 'that's not my job'." },
  { name: "Invent and Simplify", type: "LeadershipPrinciple", company: "Amazon", description: "Seek new ideas and simplify; not invented here is no barrier." },
  { name: "Are Right, A Lot", type: "LeadershipPrinciple", company: "Amazon", description: "Strong judgment; seek diverse perspectives and disconfirming evidence." },
  { name: "Learn and Be Curious", type: "LeadershipPrinciple", company: "Amazon", description: "Never done learning; curious about new possibilities." },
  { name: "Hire and Develop the Best", type: "LeadershipPrinciple", company: "Amazon", description: "Raise the performance bar; coach and grow others." },
  { name: "Insist on the Highest Standards", type: "LeadershipPrinciple", company: "Amazon", description: "Relentlessly high standards; drive quality and fix root causes." },
  { name: "Think Big", type: "LeadershipPrinciple", company: "Amazon", description: "Bold direction that inspires results; think differently for the customer." },
  { name: "Bias for Action", type: "LeadershipPrinciple", company: "Amazon", description: "Speed matters; many decisions are reversible and don't need exhaustive study." },
  { name: "Frugality", type: "LeadershipPrinciple", company: "Amazon", description: "Accomplish more with less; constraints breed resourcefulness." },
  { name: "Earn Trust", type: "LeadershipPrinciple", company: "Amazon", description: "Listen, speak candidly, treat others respectfully; be vocally self-critical." },
  { name: "Dive Deep", type: "LeadershipPrinciple", company: "Amazon", description: "Operate at all levels, audit frequently; no task is beneath you." },
  { name: "Have Backbone; Disagree and Commit", type: "LeadershipPrinciple", company: "Amazon", description: "Challenge respectfully when you disagree; once decided, commit fully." },
  { name: "Deliver Results", type: "LeadershipPrinciple", company: "Amazon", description: "Focus on key inputs and deliver with quality, despite setbacks." },
  { name: "Strive to be Earth's Best Employer", type: "LeadershipPrinciple", company: "Amazon", description: "Create a safer, more productive, empathetic work environment." },
  { name: "Success and Scale Bring Broad Responsibility", type: "LeadershipPrinciple", company: "Amazon", description: "Consider the broader impact of decisions on community and the world." },

  // ---- Generic FAANG competencies ----
  { name: "Conflict Resolution", type: "Competency", company: null, description: "Navigating disagreements with peers, managers, or partners constructively." },
  { name: "Leadership", type: "Competency", company: null, description: "Driving direction, motivating others, and leading without formal authority." },
  { name: "Dealing with Ambiguity", type: "Competency", company: null, description: "Making progress and decisions with incomplete or shifting information." },
  { name: "Influence Without Authority", type: "Competency", company: null, description: "Persuading and aligning stakeholders you don't manage." },
  { name: "Teamwork & Collaboration", type: "Competency", company: null, description: "Working effectively across people and teams toward a shared goal." },
  { name: "Resilience & Handling Failure", type: "Competency", company: null, description: "Recovering from setbacks and learning from mistakes." },
  { name: "Prioritization", type: "Competency", company: null, description: "Choosing the highest-impact work under constraints and trade-offs." },
  { name: "Communication", type: "Competency", company: null, description: "Conveying ideas clearly to technical and non-technical audiences." },
  { name: "Mentorship", type: "Competency", company: null, description: "Growing the skills and careers of others." },
  { name: "Customer Focus", type: "Competency", company: null, description: "Grounding decisions in user/customer needs and impact." },
  { name: "Data-Driven Decisions", type: "Competency", company: null, description: "Using metrics and evidence to drive and justify decisions." },
  { name: "Adaptability", type: "Competency", company: null, description: "Adjusting effectively to change in priorities, scope, or environment." },
];

export const BEHAVIORAL_QUESTION_SEED: BehavioralQuestionSeed[] = [
  {
    slug: "time-you-failed",
    prompt: "Tell me about a time you failed. What happened and what did you learn?",
    category: "Failure",
    whatTheyAssess: "Self-awareness, accountability, and growth. They want you to own the failure (not blame others) and show concrete learning that changed your later behavior.",
    exemplarAnswer: "**S:** I owned the rollout of a new caching layer for our checkout service. **T:** I needed it live before a sale. **A:** I skipped load-testing the cache eviction path to hit the date and shipped. **R:** Under peak traffic the cache stampeded and checkout latency tripled for ~30 min before I rolled back. I ran a blameless postmortem, added load tests to the release gate, and have since never shipped a perf-sensitive change without one — the next launch handled 3x the traffic cleanly.",
    followUps: "What would you do differently? How did you communicate it to stakeholders? Did it change your process?",
    competencies: ["Ownership", "Earn Trust", "Resilience & Handling Failure", "Insist on the Highest Standards"],
    companies: ["Amazon", "Google", "Facebook"],
  },
  {
    slug: "disagreed-with-manager",
    prompt: "Tell me about a time you disagreed with your manager. How did you handle it?",
    category: "Conflict",
    whatTheyAssess: "Backbone with respect — can you challenge upward with data, and then commit to the decision regardless of outcome.",
    exemplarAnswer: "**S:** My manager wanted to rewrite a service in a new framework. **T:** I believed it would slip our quarter. **A:** I built a one-page analysis showing the migration cost and proposed an incremental strangler approach instead, and walked him through the data 1:1. **R:** He agreed to the incremental plan; we shipped on time and migrated 60% with zero downtime. When he overruled me on a later call, I disagreed-and-committed and made it succeed.",
    followUps: "What if he had said no? How do you separate disagreeing from being difficult?",
    competencies: ["Have Backbone; Disagree and Commit", "Earn Trust", "Conflict Resolution", "Data-Driven Decisions"],
    companies: ["Amazon", "Microsoft", "Netflix"],
  },
  {
    slug: "took-on-beyond-scope",
    prompt: "Tell me about a time you took on something outside your area of responsibility.",
    category: "Ownership",
    whatTheyAssess: "Ownership and bias for action — stepping up beyond your formal role for the good of the customer/company.",
    exemplarAnswer: "**S:** Our on-call alerts were noisy and the platform team was underwater. **T:** Nobody owned alert quality. **A:** Although it wasn't my team, I audited a month of pages, killed 40% as non-actionable, and rewrote runbooks for the rest. **R:** On-call pages dropped 45% and MTTR fell by a third; the platform team adopted my audit as a quarterly practice.",
    followUps: "How did you balance it with your own work? Did you get buy-in first?",
    competencies: ["Ownership", "Bias for Action", "Dive Deep", "Leadership"],
    companies: ["Amazon", "Grab", "Bytedance"],
  },
  {
    slug: "influence-without-authority",
    prompt: "Describe a time you influenced a decision without having the authority to make it.",
    category: "Influence",
    whatTheyAssess: "Stakeholder management and persuasion — aligning people you don't manage using data and relationships.",
    exemplarAnswer: "**S:** Three teams duplicated nearly-identical auth code. **T:** I wanted a shared library but owned none of the teams. **A:** I prototyped the library, measured the maintenance cost of duplication, and pitched each lead 1:1 before a group review. **R:** All three adopted it within a quarter, cutting auth bugs by half and saving an estimated 2 eng-weeks/quarter.",
    followUps: "How did you handle the team that resisted? What was your strongest argument?",
    competencies: ["Influence Without Authority", "Invent and Simplify", "Communication", "Leadership"],
    companies: ["Google", "Facebook", "Microsoft"],
  },
  {
    slug: "difficult-teammate",
    prompt: "Tell me about a time you worked with a difficult teammate.",
    category: "Conflict",
    whatTheyAssess: "Empathy, conflict resolution, and professionalism — resolving friction while keeping the relationship and the work on track.",
    exemplarAnswer: "**S:** A senior teammate routinely rejected my PRs with terse comments. **T:** It was slowing delivery and morale. **A:** I asked for a coffee chat, learned he worried about long-term maintainability, and we agreed on a design doc up front for big changes. **R:** Review cycles dropped from days to hours and we later co-led a refactor together.",
    followUps: "What if the behavior continued? When would you escalate?",
    competencies: ["Conflict Resolution", "Earn Trust", "Teamwork & Collaboration", "Communication"],
    companies: ["Amazon", "Agoda", "Apple"],
  },
  {
    slug: "decision-incomplete-data",
    prompt: "Tell me about a time you had to make a decision with incomplete information.",
    category: "Ambiguity",
    whatTheyAssess: "Judgment under ambiguity and bias for action — making a reasonable, reversible call without analysis paralysis.",
    exemplarAnswer: "**S:** We saw a 5% checkout drop but logging was incomplete. **T:** I had to decide whether to roll back a release. **A:** Rather than wait for full data, I treated it as a reversible decision, rolled back the suspect change, and instrumented properly. **R:** Conversion recovered within an hour; the added logging confirmed the cause and we re-shipped safely two days later.",
    followUps: "How did you decide it was reversible? What signals did you rely on?",
    competencies: ["Dealing with Ambiguity", "Bias for Action", "Are Right, A Lot", "Data-Driven Decisions"],
    companies: ["Amazon", "Netflix", "Grab"],
  },
  {
    slug: "tight-deadline",
    prompt: "Describe a time you delivered under a very tight deadline.",
    category: "Deadline",
    whatTheyAssess: "Prioritization and delivery — focusing on the critical path and making smart trade-offs to ship.",
    exemplarAnswer: "**S:** A partner integration had to launch in two weeks for a contractual date. **T:** The full scope needed six. **A:** I cut to the must-have API path, negotiated a phased rollout, and parallelized work across two of us with daily checkpoints. **R:** We shipped the core integration on time; the partner went live and we delivered the rest over the next month.",
    followUps: "What did you cut and why? How did you keep quality?",
    competencies: ["Deliver Results", "Prioritization", "Bias for Action", "Communication"],
    companies: ["Amazon", "Agoda", "Microsoft"],
  },
  {
    slug: "led-without-title",
    prompt: "Tell me about a time you led a project or team without being the official lead.",
    category: "Leadership",
    whatTheyAssess: "Leadership and ownership — driving clarity, coordination, and outcomes through influence.",
    exemplarAnswer: "**S:** A cross-team migration was stalling with no DRI. **T:** Someone needed to drive it. **A:** I volunteered to coordinate, created a tracker, ran a weekly sync, and unblocked dependencies between teams. **R:** We completed the migration two weeks early; I was later asked to formally lead the follow-on initiative.",
    followUps: "How did you get others to follow you? What was the hardest blocker?",
    competencies: ["Leadership", "Ownership", "Deliver Results", "Influence Without Authority"],
    companies: ["Google", "Amazon", "Bytedance"],
  },
  {
    slug: "customer-obsession-example",
    prompt: "Give an example of when you went above and beyond for a customer.",
    category: "Customer",
    whatTheyAssess: "Customer obsession — starting from customer needs and being willing to do the unglamorous work to fix their pain.",
    exemplarAnswer: "**S:** Enterprise customers kept hitting a confusing export error. **T:** Support tickets were rising and churn risk grew. **A:** I shadowed three support calls, found the root cause in a silent timeout, fixed it, and added a clear error + retry. **R:** Export-related tickets fell 70% and the top account renewed, citing the responsiveness.",
    followUps: "How did you measure customer impact? How did you prioritize this?",
    competencies: ["Customer Obsession", "Customer Focus", "Dive Deep", "Ownership"],
    companies: ["Amazon", "Agoda", "Apple"],
  },
  {
    slug: "simplify-complex",
    prompt: "Tell me about a time you simplified a complex process or system.",
    category: "Ownership",
    whatTheyAssess: "Invent and simplify — finding leverage by removing complexity rather than adding more.",
    exemplarAnswer: "**S:** Our deploy process had 14 manual steps and frequent errors. **T:** Releases were slow and risky. **A:** I mapped the steps, automated 11 into a single pipeline, and added safety checks. **R:** Deploy time dropped from 2 hours to 15 minutes and failed deploys fell by 80%, freeing the team to ship daily.",
    followUps: "What did you remove vs automate? Any pushback on changing it?",
    competencies: ["Invent and Simplify", "Insist on the Highest Standards", "Bias for Action", "Ownership"],
    companies: ["Amazon", "Microsoft", "Google"],
  },
  {
    slug: "handled-ambiguous-project",
    prompt: "Describe the most ambiguous project you've worked on. How did you create clarity?",
    category: "Ambiguity",
    whatTheyAssess: "Structuring undefined problems — breaking ambiguity into a plan and aligning others.",
    exemplarAnswer: "**S:** Leadership wanted to 'improve reliability' with no defined scope. **T:** I had to turn it into a roadmap. **A:** I defined SLOs from incident data, ranked the top failure modes, and proposed a quarterly plan with measurable targets. **R:** We cut Sev-2 incidents by 40% over two quarters against the SLOs I set.",
    followUps: "How did you pick the first thing to tackle? How did you align stakeholders?",
    competencies: ["Dealing with Ambiguity", "Think Big", "Data-Driven Decisions", "Leadership"],
    companies: ["Google", "Amazon", "Netflix"],
  },
  {
    slug: "mentored-someone",
    prompt: "Tell me about a time you mentored or developed someone.",
    category: "Growth",
    whatTheyAssess: "Hire and develop the best — investing in others' growth and raising the team's bar.",
    exemplarAnswer: "**S:** A new grad on my team was struggling with code reviews. **T:** I wanted to grow them, not just fix their PRs. **A:** I paired weekly, set up a personal style/checklist, and gradually had them lead reviews. **R:** Within a quarter they were a trusted reviewer and later mentored the next new hire.",
    followUps: "How did you adapt to their learning style? How did you measure progress?",
    competencies: ["Hire and Develop the Best", "Mentorship", "Leadership", "Strive to be Earth's Best Employer"],
    companies: ["Amazon", "Microsoft", "Apple"],
  },
  {
    slug: "disagree-and-commit",
    prompt: "Tell me about a time you committed to a decision you initially disagreed with.",
    category: "Conflict",
    whatTheyAssess: "Disagree and commit — separating your opinion from execution and making the chosen path succeed.",
    exemplarAnswer: "**S:** The team chose a vendor I'd argued against. **T:** Once decided, I had to integrate it. **A:** I set my reservations aside, became the integration expert, and documented mitigations for the risks I'd raised. **R:** The integration shipped smoothly and my risk doc prevented an outage when one of those risks materialized.",
    followUps: "How do you stay genuinely committed? When is it right to keep pushing back?",
    competencies: ["Have Backbone; Disagree and Commit", "Teamwork & Collaboration", "Adaptability", "Deliver Results"],
    companies: ["Amazon", "Netflix", "Grab"],
  },
  {
    slug: "innovative-solution",
    prompt: "Describe a time you came up with an innovative solution to a hard problem.",
    category: "Leadership",
    whatTheyAssess: "Invent and simplify / think big — creative problem solving with real impact.",
    exemplarAnswer: "**S:** Our search was too slow on large catalogs. **T:** I needed sub-100ms queries without a big infra spend. **A:** Instead of scaling the DB, I introduced an inverted index with cached top results and precomputed facets. **R:** p99 search latency dropped from 800ms to 60ms and infra cost stayed flat.",
    followUps: "How did you validate the idea? What alternatives did you reject?",
    competencies: ["Invent and Simplify", "Think Big", "Frugality", "Data-Driven Decisions"],
    companies: ["Google", "Amazon", "Bytedance"],
  },
  {
    slug: "missed-commitment",
    prompt: "Tell me about a time you missed a deadline or commitment.",
    category: "Failure",
    whatTheyAssess: "Accountability and communication under setbacks — owning the miss and how you handled stakeholders.",
    exemplarAnswer: "**S:** I committed to a feature by quarter-end but a dependency slipped. **T:** I realized mid-quarter I'd miss it. **A:** I flagged the risk early, re-scoped to a partial release, and gave stakeholders a revised date with a mitigation. **R:** We shipped the partial value on time and the full feature two weeks later — no surprises, and trust intact because I raised it early.",
    followUps: "When did you know you'd miss it? How did stakeholders react?",
    competencies: ["Ownership", "Earn Trust", "Communication", "Deliver Results"],
    companies: ["Amazon", "Microsoft", "Agoda"],
  },
  {
    slug: "data-over-opinion",
    prompt: "Describe a time you used data to change someone's mind or a decision.",
    category: "Influence",
    whatTheyAssess: "Data-driven decision making and being right a lot — letting evidence, not opinion, drive outcomes.",
    exemplarAnswer: "**S:** The team assumed mobile users wanted a redesigned nav. **T:** I suspected it would hurt conversion. **A:** I ran an A/B test and segmented the funnel data. **R:** The redesign dropped conversion 8% for power users, so we shipped a targeted variant instead — overall conversion rose 3%.",
    followUps: "What if the data were ambiguous? How do you avoid cherry-picking?",
    competencies: ["Data-Driven Decisions", "Are Right, A Lot", "Influence Without Authority", "Customer Focus"],
    companies: ["Facebook", "Google", "Netflix"],
  },
  {
    slug: "high-standards-quality",
    prompt: "Tell me about a time you pushed back on shipping something that wasn't good enough.",
    category: "Ownership",
    whatTheyAssess: "Insist on the highest standards — holding the quality bar even under pressure to ship.",
    exemplarAnswer: "**S:** A feature was 'done' but had flaky tests and no error handling. **T:** There was pressure to ship for a demo. **A:** I laid out the customer risk, negotiated a two-day hardening window, and fixed the gaps. **R:** The demo went flawlessly and we avoided a likely production incident; the bar became our team's definition of done.",
    followUps: "How did you balance quality vs speed? Did you have buy-in?",
    competencies: ["Insist on the Highest Standards", "Have Backbone; Disagree and Commit", "Ownership", "Customer Obsession"],
    companies: ["Apple", "Amazon", "Microsoft"],
  },
  {
    slug: "learned-something-new",
    prompt: "Tell me about a time you had to learn something new quickly to solve a problem.",
    category: "Growth",
    whatTheyAssess: "Learn and be curious — ramping fast in unfamiliar territory and applying it effectively.",
    exemplarAnswer: "**S:** We hit a gnarly Kafka consumer-lag issue and no one knew the internals. **T:** I had to fix it fast. **A:** I spent two days deep in the docs and source, reproduced the rebalancing storm, and tuned the partition/consumer config. **R:** Lag dropped from minutes to sub-second and I wrote a runbook so the team could handle it next time.",
    followUps: "How do you approach learning under pressure? How did you share it?",
    competencies: ["Learn and Be Curious", "Dive Deep", "Bias for Action", "Resilience & Handling Failure"],
    companies: ["Netflix", "Amazon", "Bytedance"],
  },
  {
    slug: "conflicting-priorities",
    prompt: "Describe a time you had to juggle multiple conflicting priorities.",
    category: "Deadline",
    whatTheyAssess: "Prioritization and communication — making explicit trade-offs and managing expectations.",
    exemplarAnswer: "**S:** I had a launch, an on-call rotation, and an exec ask in the same week. **T:** I couldn't do all three fully. **A:** I ranked by impact and reversibility, delegated the exec data pull, and negotiated a one-day launch slip with my PM. **R:** The launch went out clean, on-call stayed covered, and the exec got what they needed a day later.",
    followUps: "How did you decide what to drop? How did you communicate trade-offs?",
    competencies: ["Prioritization", "Communication", "Deliver Results", "Adaptability"],
    companies: ["Amazon", "Grab", "Agoda"],
  },
  {
    slug: "frugal-solution",
    prompt: "Tell me about a time you achieved a lot with limited resources.",
    category: "Ownership",
    whatTheyAssess: "Frugality and resourcefulness — doing more with less rather than asking for more.",
    exemplarAnswer: "**S:** We needed analytics but had no budget for a vendor. **T:** Leadership wanted insights fast. **A:** I built a lightweight pipeline on our existing warehouse with off-the-shelf dashboards instead of buying a tool. **R:** We got the key metrics live in a week at zero added cost, and only adopted a paid tool a year later when scale justified it.",
    followUps: "What trade-offs did the cheap solution carry? When would you invest more?",
    competencies: ["Frugality", "Invent and Simplify", "Bias for Action", "Deliver Results"],
    companies: ["Amazon", "Agoda", "Grab"],
  },
];
