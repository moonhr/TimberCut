import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function RotationSwitch() {
  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch id="rotation switch" />
      <Label htmlFor="rotation switch">Rotation</Label>
    </div>
  );
}
