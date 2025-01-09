import { Input } from "../ui/input";

import { useModelingContext } from "@/context/ModelingContext";

export const SizeBox = () => {
  const { length, width, thickness, unit, setLength, setWidth, setThickness } =
    useModelingContext();

  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="길이"
          value={length}
          onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
          type="number"
        />
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="너비"
          value={width}
          onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
          type="number"
        />
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="두께"
          value={thickness}
          onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
          type="number"
        />
        <span className="text-sm text-gray-600">{unit}</span>
      </div>
    </div>
  );
};
