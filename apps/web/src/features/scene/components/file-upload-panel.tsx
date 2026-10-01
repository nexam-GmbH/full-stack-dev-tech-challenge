import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";

export function FileUploadPanel() {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle>Files</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 px-3 pb-3">
        {/* TODO:
            Implement your file upload field here.
            Expected scope: drag-and-drop + manual selection for STL/PLY files,
            with each file marked as scan or restoration (crown, bridge or interim).
        */}
        <div className="rounded-md border-2 border-dashed border-slate-300 bg-slate-50/70 p-4">
          <p className="text-sm font-medium text-slate-900">
            Your File Upload Field
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
