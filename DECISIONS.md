# Candidate Decisions Log

Use this document to explain your engineering choices and tradeoffs.

## 1) Viewer Architecture

- Which rendering stack did you choose and why?
- What were the key architectural tradeoffs?

## 2) Rendering and Interaction Decisions

- How did you ensure unrestricted rotation, predictable pan/zoom, and mobile usability?
- How did you avoid visual artifacts (for example unintended back-side transparency)?

## 3) Restoration Placement Algorithm

- Which automated method did you choose?
- Why is it a reasonable practical choice for this challenge?
- What are the algorithm stages?
- What is shared across crowns, bridges and interim prostheses, and what is type-specific?
- Bridges: how do you fit all abutments at once, and how do you treat the pontic areas?
- Interim prostheses: which surfaces drive the fit when there is no prepared stump?

## 4) Handling Noisy Scan Data

- How does your method handle mesh noise, holes, and irregular tessellation?

## 5) Validation Strategy

- How did you validate placement quality across all provided cases of each restoration type?
- How do you judge fit quality for interim prostheses, where `± 0.2 mm` does not apply?

## 6) Product and UX Decisions

- What UX decisions improve inspection speed and confidence?
- What did you optimize for desktop vs mobile usage?

## 7) Time-Boxed Tradeoffs

- What did you deliberately de-scope?
- What technical debt remains and why?

## 8) Known Failure Modes

- Where do you expect your method or viewer to fail?
- Which restoration type is the least reliable with your approach, and why?

## 9) Notes for Reviewers

- Anything else you want reviewers to know when running your solution.
