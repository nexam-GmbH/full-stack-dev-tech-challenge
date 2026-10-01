# Tech Challenge: Dental Restoration Placement and 3D Viewer

## 1. Context

Build a web application that allows a user to inspect 3D dental meshes and automatically position a CAD-designed restoration onto an intraoral scan. Three restoration types are in scope: crowns, bridges and interim prostheses.

This challenge has two major parts:

1. Build a custom 3D inspection viewer for dental meshes
2. Implement an automated method for restoration placement on a scan

The goal is to evaluate engineering judgment, frontend architecture, 3D rendering and interaction quality, handling of imperfect geometry, pragmatic algorithm design, and product thinking.

This is not an academic research task. A robust, clearly explained, practical solution is preferred over an unfinished ambitious one.

### Clinical Context

![Dental crown preparation and placement context](docs/crown-placement-context.jpeg)

**Crowns.** The practical workflow is:

1. A damaged tooth crown is reduced to a prepared stump.
2. A CAD-designed replacement crown is produced for that prepared shape.
3. The replacement crown is positioned and cemented on the preparation.

**Bridges.** A bridge replaces one or more missing teeth. The teeth on both sides of the gap are prepared as abutments, and the bridge is one rigid piece: retainers sit on each abutment and pontics fill the gap above the gingiva. Because the bridge is rigid, it must fit all abutments at the same time along a common insertion direction. The pontic areas have no stump to fit against; their underside should rest on or slightly above the gingiva.

**Interim prostheses.** A temporary removable prosthesis that replaces missing teeth, for example while extraction sites heal. There is no prepared stump: it rests on soft tissue (gingiva, alveolar ridge, palate) and on the remaining teeth.

In real scan data, gingiva/soft tissue may overlap the virtual restoration because tissue is not physically displaced in the digital workflow. A good placement method should therefore target the best feasible fit on the supporting region and tolerate gingiva interference instead of forcing a perfect match everywhere.

### Data Context

Cases are grouped by restoration type. Each case contains:

- an intraoral 3D scan
- a CAD-designed restoration mesh corresponding to that scan

The scan is expected to include real-world defects and noise (holes, irregular tessellation, artifacts, partial surrounding anatomy). The restoration mesh is generally cleaner.

Target placement quality for this challenge:

- crowns and bridges: approximately `± 0.2 mm` on the prepared abutments
- interim prostheses: plausible seating on the supporting tissue and remaining teeth without gross penetration or floating

The approach should generalize across all provided cases of all three types without per-case hardcoding.

## 2. Assumptions, Requirements, Expectations, Stretch Goals

### Assumptions

- Cases live under `apps/web/public/data/`, one folder per restoration type: `crown-cases/`, `bridge-cases/`, `interim-cases/`
- Each case folder contains one scan file (`scan-XX`) and one restoration file named after its type (`crown-XX`, `bridge-XX`, `interim-XX`)
- Provided assets may include a mix of STL and PLY scan data

### Requirements

1. Automated restoration placement:
   Implement an automatic positioning approach (for example ICP-inspired, feature-based, PCA initialization, coarse-to-fine, or heuristic geometry reasoning). The method must generalize across all provided cases and all three restoration types.
   - Crowns: fit the inner (intaglio) surface to the prepared stump.
   - Bridges: fit all abutments simultaneously; pontics must not drive the fit.
   - Interim prostheses: seat on the supporting tissue and remaining teeth.
2. Visual verification:
   Reviewer must be able to inspect scan and restoration together and judge plausibility of placement. For that an adequate STL/PLY File Viewer is needed.
3. User upload capability:
   Support drag-and-drop and manual file selection/deletion for STL/PLY files, with clear file/object state in UI. The user must be able to tell which file is the scan and which is the restoration, and of which type.

### Viewer Expectations

- You may use existing 3D/viewer libraries.
- Lighting should be tuned for contour readability.
- Concave side should appear slightly darker than convex side to aid penetration checks.
- Avoid accidental back-face transparency artifacts that reduce readability.
- Camera interaction should be predictable and smooth on desktop and mobile (dynamics with low delay/inertia).
- Orthographic camera is preferred with FOV `<= 1°`.
- No rotational axis lock/limits.
- Show/hide each object.
- Independent transparency per object.
- Optionally independent color per object.
- Show textures when present and relevant.
- No gimmicks; focus on inspection workflow quality.

### Stretch Goals (Optional)

- collision or penetration visualization
- distance heatmap between restoration and scan (stump, abutments, or supporting tissue)
- per-abutment fit diagnostics for bridges
- common insertion direction / undercut check for bridges
- coarse-to-fine refinement stages
- lightweight quantitative scoring diagnostics

## 3. Given Setup (Scaffold, Structure, Local Run)

### Stack Defaults

- `npm` workspaces
- React + TypeScript (strict mode)
- Tailwind CSS v4
- shared UI primitives from `@repo/ui` (shadcn-style components)

Design direction is intentionally open. Treat the current styling as a starting point, not a visual limitation, as long as you stay consistent with project conventions.

### What Is Already Scaffolded

- application shell and layout
- upload panel placeholder
- viewer placeholder module
- placement API stub
- dataset folders per restoration type

You are allowed to change the shell to your own needs if necessary and justified.

### Candidate-Owned TODO Boundaries

- `apps/web/src/features/viewer/components/stl-viewer-workbench.tsx`
- `apps/web/src/features/placement/run-restoration-placement.ts`
- `apps/web/src/features/scene/components/file-upload-panel.tsx`
- any additional viewer/geometry modules you create

### Project Structure

```text
.
├── apps/
│   └── web/
│       ├── public/data/
│       │   ├── crown-cases/
│       │   │   ├── case-01/
│       │   │   └── ...
│       │   ├── bridge-cases/
│       │   │   ├── case-01/
│       │   │   └── ...
│       │   └── interim-cases/
│       │       ├── case-01/
│       │       └── ...
│       └── src/
│           ├── app/
│           └── features/
│               ├── placement/
│               ├── scene/
│               └── viewer/
├── packages/
│   └── ui/
└── DECISIONS.md
```

### Local Setup

Prerequisites:

- Node.js `>= 22`
- npm `>= 10`

Install and run:

```bash
npm install
npm run dev
```

Validation:

```bash
npm run typecheck
npm run lint
npm run build
```

## 4. Submission

### Deliverables

1. Push your solution to a private GitHub repository.
2. Add `nexam-labs` as collaborator.
3. Include a completed `DECISIONS.md`.
4. Optionally include a short demo video.

### Time Limit

Time limit: 72 hours from when you start.

### Tips

- We value clear thinking (DECISIONS.md) as much as clean code.
- Don't over-engineer. 72 hours is tight. Ship something that works.
- Aim to make it as easy as possible for users to evaluate the feasibility of the restoration design.

