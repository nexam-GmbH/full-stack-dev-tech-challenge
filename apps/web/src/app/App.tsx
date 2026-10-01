import { useState } from "react";

import { PlacementPanel } from "../features/placement/components/placement-panel";
import { runRestorationPlacement } from "../features/placement/run-restoration-placement";
import type { PlacementRunState } from "../features/placement/types";
import { FileUploadPanel } from "../features/scene/components/file-upload-panel";
import { useSceneState } from "../features/scene/hooks/use-scene-state";
import { StlViewerWorkbench } from "../features/viewer/components/stl-viewer-workbench";

const IDLE_PLACEMENT_STATE: PlacementRunState = {
  status: "idle",
  message: "",
};

export function App() {
  const [placementState, setPlacementState] =
    useState<PlacementRunState>(IDLE_PLACEMENT_STATE);

  const { objects } = useSceneState();

  const handleRunPlacement = async () => {
    const scanObject = objects.find((object) => object.kind === "scan");
    const restorationObject = objects.find(
      (object) => object.kind === "restoration",
    );

    if (!scanObject || !restorationObject?.restorationType) {
      setPlacementState({
        status: "error",
        message:
          "A scan and a restoration object (crown, bridge or interim) must both be present before running placement.",
      });
      return;
    }

    setPlacementState({
      status: "running",
      message: "Running automated placement...",
    });

    try {
      const result = await runRestorationPlacement({
        scanObject,
        restorationObject,
        restorationType: restorationObject.restorationType,
        sceneObjects: objects,
      });

      setPlacementState({
        status: "success",
        message:
          "Placement completed. Verify geometric fit in the viewer and controls.",
        diagnostics: result.diagnostics,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Placement failed unexpectedly.";

      setPlacementState({
        status: "error",
        message,
      });
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <header className="border-b border-slate-300/70 bg-white/85 backdrop-blur">
        <div className="w-full px-4 py-3 sm:px-6">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Dental Restoration Placement and 3D Viewer
          </h1>
        </div>
      </header>

      <main className="w-full space-y-3 px-4 py-3 sm:px-6">
        <section className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
          <FileUploadPanel />

          <PlacementPanel
            status={placementState}
            onRunPlacement={handleRunPlacement}
          />
        </section>

        <section>
          <StlViewerWorkbench />
        </section>
      </main>
    </div>
  );
}
