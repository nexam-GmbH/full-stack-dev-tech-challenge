import type { RestorationType, SceneObject } from "../scene/types";

export interface RestorationPlacementInput {
  scanObject: SceneObject;
  restorationObject: SceneObject;
  restorationType: RestorationType;
  sceneObjects: SceneObject[];
}

export interface RestorationPlacementResult {
  restorationObjectId: string;
  transformMatrix: number[];
  diagnostics: string[];
}

export type PlacementRunState =
  | {
      status: "idle" | "running" | "error";
      message: string;
      diagnostics?: string[];
    }
  | {
      status: "success";
      message: string;
      diagnostics: string[];
    };
