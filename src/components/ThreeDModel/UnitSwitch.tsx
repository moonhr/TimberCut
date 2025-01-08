import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function UnitSwitch() {
  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch id="unit switch" />
      <Label htmlFor="unit switch">Unit</Label>
    </div>
  );
}
