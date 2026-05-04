# Codex SDLC Deployment Playbook

An interactive portfolio artifact showing how I would deploy Codex across an engineering team's software development lifecycle.

This project is designed for a customer-facing AI deployment role: it combines a practical adoption playbook, a live React demo, and supporting application materials that explain how Codex can become a repeatable engineering workflow rather than a one-off coding assistant.

## Thesis

Codex adoption should not be treated as "give every engineer an AI coding tool."

The strongest deployments will map Codex onto real SDLC bottlenecks:

- ambiguous specs
- slow first implementation drafts
- inconsistent PR review quality
- thin test coverage
- missing implementation documentation
- weak rollout and operational readiness practices

The goal is not to remove engineering judgment. The goal is to help engineering teams plan, build, review, test, document, and ship with more clarity, speed, and discipline.

## Live Demo

The interactive demo turns the playbook into a display deck. Each card represents one SDLC surface where Codex can create leverage:

1. Planning
2. Implementation
3. Review
4. Testing
5. Documentation
6. Operational readiness
7. Product feedback
8. Enablement

The demo is intentionally built like a customer conversation artifact: select a workflow, explain the friction, show the Codex deployment motion, preserve the human review point, and define the measurable outcome.

## What This Shows

This artifact is meant to demonstrate:

- customer-facing technical communication
- Codex workflow design
- AI-assisted SDLC adoption strategy
- practical rollout planning
- engineering enablement thinking
- product feedback capture from real deployments
- ability to turn an abstract AI capability into a concrete demo

## Repo Structure

```text
.
├── docs
│   ├── application
│   │   └── Application-Framing-Note.md
│   ├── playbook
│   │   └── Codex-SDLC-Deployment-Playbook.md
│   └── resume
│       └── Resume-to-Role-Alignment-Matrix.md
├── src
│   ├── components
│   │   └── ui
│   │       └── card-stack.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## Key Files

- [`src/components/ui/card-stack.tsx`](src/components/ui/card-stack.tsx): reusable shadcn-style card stack component with Framer Motion interactions.
- [`src/App.tsx`](src/App.tsx): display deck experience that frames each Codex deployment surface.
- [`docs/playbook/Codex-SDLC-Deployment-Playbook.md`](docs/playbook/Codex-SDLC-Deployment-Playbook.md): full deployment playbook.
- [`docs/application/Application-Framing-Note.md`](docs/application/Application-Framing-Note.md): concise application-facing framing note.
- [`docs/resume/Resume-to-Role-Alignment-Matrix.md`](docs/resume/Resume-to-Role-Alignment-Matrix.md): role alignment, resume positioning, and interview talking points.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Component Structure

The interactive deck component lives at:

```text
src/components/ui/card-stack.tsx
```

That mirrors the conventional shadcn component path. Keeping the reusable UI component under `components/ui` makes it easier to move into a shadcn project, while `src/App.tsx` stays responsible for application-specific content and layout.

## Deployment Strategy Captured In The Demo

The demo follows a repeatable customer deployment motion:

1. Identify a high-friction engineering workflow.
2. Define where Codex should assist.
3. Add repo context, constraints, and acceptance criteria.
4. Preserve human review and ownership.
5. Measure practical outcomes.
6. Convert successful patterns into prompts, workshops, reference implementations, and product feedback.

## Why This Matters

AI coding tools create the most value when they are deployed against real engineering workflows. A strong Codex deployment should improve more than code generation. It should improve planning, review, testing, documentation, rollout readiness, and the product feedback loop between customers and OpenAI.

This project is my attempt to make that deployment motion tangible.
