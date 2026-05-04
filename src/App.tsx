import { useCallback, useMemo, useState } from "react";
import {
  BookOpen,
  Bug,
  ClipboardCheck,
  Code2,
  FileText,
  GitPullRequest,
  LineChart,
  Map,
  Rocket,
  ShieldCheck,
  TestTube2,
  Users
} from "lucide-react";
import CardStack, { type DeploymentCard } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";

const deploymentCards: DeploymentCard[] = [
  {
    id: "planning",
    label: "01",
    title: "Planning",
    description: "Convert ambiguous product input into build plans, acceptance criteria, affected surfaces, and test maps.",
    outcome: "Fewer unclear tickets enter implementation.",
    accent: "bg-emerald-500",
    gradient: "bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.9),transparent_30%),linear-gradient(135deg,#0f172a,#155e75_48%,#047857)]",
    icon: Map
  },
  {
    id: "implementation",
    label: "02",
    title: "Implementation",
    description: "Use scoped Codex tasks for API wiring, component builds, bug isolation, migrations, and focused refactors.",
    outcome: "Faster first working drafts with human-owned review.",
    accent: "bg-cyan-500",
    gradient: "bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.85),transparent_28%),linear-gradient(135deg,#111827,#164e63_48%,#0f766e)]",
    icon: Code2
  },
  {
    id: "review",
    label: "03",
    title: "Review",
    description: "Compare PRs against requirements, security assumptions, edge cases, test coverage, and operational risk.",
    outcome: "Reviewers catch requirement drift and missing tests earlier.",
    accent: "bg-violet-500",
    gradient: "bg-[radial-gradient(circle_at_75%_30%,rgba(167,139,250,0.9),transparent_30%),linear-gradient(135deg,#18181b,#4338ca_45%,#7c3aed)]",
    icon: GitPullRequest
  },
  {
    id: "testing",
    label: "04",
    title: "Testing",
    description: "Generate unit, integration, regression, and edge-case test plans from changed code and intended behavior.",
    outcome: "Changed code ships with stronger regression protection.",
    accent: "bg-amber-500",
    gradient: "bg-[radial-gradient(circle_at_24%_24%,rgba(251,191,36,0.9),transparent_28%),linear-gradient(135deg,#1c1917,#92400e_52%,#ca8a04)]",
    icon: TestTube2
  },
  {
    id: "documentation",
    label: "05",
    title: "Docs",
    description: "Create implementation notes, migration guides, changelogs, support handoffs, and onboarding material from real diffs.",
    outcome: "Knowledge survives beyond the person who shipped the change.",
    accent: "bg-rose-500",
    gradient: "bg-[radial-gradient(circle_at_78%_24%,rgba(251,113,133,0.9),transparent_30%),linear-gradient(135deg,#1f2937,#9f1239_48%,#be123c)]",
    icon: FileText
  },
  {
    id: "readiness",
    label: "06",
    title: "Readiness",
    description: "Prepare rollout checklists, failure-mode analysis, support notes, observability review, and rollback paths.",
    outcome: "Teams launch with clearer ownership and fewer missed steps.",
    accent: "bg-lime-500",
    gradient: "bg-[radial-gradient(circle_at_22%_22%,rgba(163,230,53,0.88),transparent_28%),linear-gradient(135deg,#132018,#3f6212_50%,#15803d)]",
    icon: Rocket
  },
  {
    id: "feedback",
    label: "07",
    title: "Feedback",
    description: "Capture customer friction, useful workflows, context gaps, and repeated enablement needs as product insight.",
    outcome: "Field deployments become better product and model feedback.",
    accent: "bg-sky-500",
    gradient: "bg-[radial-gradient(circle_at_75%_24%,rgba(56,189,248,0.85),transparent_30%),linear-gradient(135deg,#111827,#0369a1_48%,#0f766e)]",
    icon: LineChart
  },
  {
    id: "enablement",
    label: "08",
    title: "Enablement",
    description: "Turn successful deployments into workshops, prompt libraries, demos, reference builds, and internal adoption guides.",
    outcome: "Codex usage becomes repeatable across teams.",
    accent: "bg-fuchsia-500",
    gradient: "bg-[radial-gradient(circle_at_22%_26%,rgba(217,70,239,0.82),transparent_30%),linear-gradient(135deg,#18181b,#86198f_48%,#be185d)]",
    icon: Users
  }
];

const workflowRows = [
  ["Discovery", "Interview leads, map current SDLC friction, choose pilot workflow."],
  ["Pilot", "Run Codex on real tickets, PRs, test gaps, and release tasks."],
  ["Scale", "Create team-specific templates, workshops, and reference examples."],
  ["Operationalize", "Track metrics, refine patterns, and route product feedback."]
] as const;

const metrics = [
  ["Planning", "ambiguous tickets reduced"],
  ["Implementation", "time to first PR"],
  ["Review", "missing tests found"],
  ["Testing", "regression coverage added"],
  ["Docs", "handoff completeness"],
  ["Launch", "readiness checklist quality"]
] as const;

function App() {
  const [activeCard, setActiveCard] = useState<DeploymentCard>(deploymentCards[0]);
  const [selectedView, setSelectedView] = useState<"workflow" | "metrics" | "guardrails">("workflow");

  const activeIndex = useMemo(
    () => deploymentCards.findIndex((card) => card.id === activeCard.id) + 1,
    [activeCard.id]
  );

  const handleActiveChange = useCallback((card: DeploymentCard) => {
    setActiveCard(card);
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Codex deployment artifact</p>
            <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
              How I would deploy Codex across an engineering team's SDLC
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-zinc-600 sm:w-[330px]">
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-lg font-semibold text-zinc-950">6</p>
              <p>SDLC surfaces</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-lg font-semibold text-zinc-950">4</p>
              <p>rollout phases</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <p className="text-lg font-semibold text-zinc-950">1</p>
              <p>feedback loop</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:px-8">
        <CardStack cards={deploymentCards} onActiveChange={handleActiveChange} />

        <aside className="rounded-lg border border-zinc-200 bg-white p-5 shadow-deck">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Surface {String(activeIndex).padStart(2, "0")}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal">{activeCard.title}</h2>
            </div>
            <div className={cn("grid h-12 w-12 place-items-center rounded-lg text-white", activeCard.accent)}>
              <activeCard.icon className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-5 text-base leading-7 text-zinc-700">{activeCard.description}</p>

          <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Deployment motion</p>
            <ol className="mt-4 space-y-3 text-sm text-zinc-700">
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-zinc-950 text-center text-xs leading-5 text-white">1</span>
                Select a real team workflow with visible friction.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-zinc-950 text-center text-xs leading-5 text-white">2</span>
                Add repo context, constraints, acceptance criteria, and validation.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-zinc-950 text-center text-xs leading-5 text-white">3</span>
                Turn the pattern into a reusable prompt, demo, or guide.
              </li>
            </ol>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-4">
              <ClipboardCheck className="h-5 w-5 text-emerald-700" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Primary output</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{activeCard.outcome}</p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <ShieldCheck className="h-5 w-5 text-zinc-800" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Guardrail</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Codex assists the workflow. Engineers own design judgment, review, and production readiness.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-8 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="flex flex-wrap gap-2">
            {(["workflow", "metrics", "guardrails"] as const).map((view) => (
              <button
                key={view}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium capitalize transition",
                  selectedView === view
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                )}
                onClick={() => setSelectedView(view)}
                type="button"
              >
                {view}
              </button>
            ))}
          </div>

          {selectedView === "workflow" && (
            <div className="mt-5 space-y-3">
              {workflowRows.map(([title, body]) => (
                <div key={title} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-700">{body}</p>
                </div>
              ))}
            </div>
          )}

          {selectedView === "metrics" && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {metrics.map(([title, body]) => (
                <div key={title} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-700">{body}</p>
                </div>
              ))}
            </div>
          )}

          {selectedView === "guardrails" && (
            <div className="mt-5 space-y-3">
              {[
                ["Overtrust", "Human review remains mandatory for generated plans, code, tests, and release artifacts."],
                ["Context quality", "Prompts include relevant files, constraints, examples, and validation commands."],
                ["Security", "Deployment templates include data handling, secrets, auth, and permission review."],
                ["Quality", "Success is measured through accepted tests, review findings, readiness, and cycle time."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-700">{body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-emerald-300" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Demo narrative</p>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-normal">From artifact to customer conversation</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            This demo is meant to show the motion behind the written playbook: select an SDLC surface, explain the customer problem, show the Codex workflow, preserve human ownership, and define what improvement should be measured.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              [Bug, "Real pain"],
              [Code2, "Working pattern"],
              [LineChart, "Measured outcome"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <Icon className="h-5 w-5 text-white" />
                <p className="mt-3 text-sm font-medium">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
