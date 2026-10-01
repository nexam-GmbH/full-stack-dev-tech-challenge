import type {
  RestorationPlacementInput,
  RestorationPlacementResult,
} from "./types";

export async function runRestorationPlacement(
  input: RestorationPlacementInput,
): Promise<RestorationPlacementResult> {
  void input;

  // TODO:
  // Implement an automated placement method for crowns, bridges and interim
  // prostheses that generalizes across all challenge cases without per-case
  // hardcoding.
  //
  // Suggested path:
  // 1) Parse STL/PLY geometry for scan and restoration
  // 2) Compute coarse alignment
  // 3) Refine with iterative registration / geometric heuristics
  //    (crown: single stump, bridge: all abutments at once,
  //    interim: supporting tissue and remaining teeth)
  // 4) Return transform + diagnostics for UI verification
  throw new Error(
    "TODO: Automated restoration placement is not implemented yet.",
  );
}
