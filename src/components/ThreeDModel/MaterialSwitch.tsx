import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface MaterialSwitchProps {
  onToggle: (value: boolean) => void; // 텍스처 활성화 여부를 부모로 전달
}

export function MaterialSwitch({ onToggle }: MaterialSwitchProps) {
  return (
    <div className="flex items-center space-x-2 p-1">
      <Switch
        id="material-switch"
        defaultChecked={true}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="material-switch">Material</Label>
    </div>
  );
}
