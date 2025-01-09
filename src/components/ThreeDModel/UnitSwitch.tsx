import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface UnitSwitchProps {
  onToggle: (value: boolean) => void;
}

export function SizeSwitch({ onToggle }: UnitSwitchProps) {
  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch
        id="unit-switch"
        defaultChecked={true}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="unit-switch">Size</Label>
    </div>
  );
}
