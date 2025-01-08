import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function MaterialSwitch() {
  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch id="material switch" />
      <Label htmlFor="material switch">Material</Label>
    </div>
  );
}
