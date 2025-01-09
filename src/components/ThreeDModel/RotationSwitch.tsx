import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function RotationSwitch({
  onToggle,
}: {
  onToggle: (enabled: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    onToggle(checked);
  };

  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch
        id="rotation-switch"
        checked={enabled}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="rotation-switch">Rotation</Label>
    </div>
  );
}
