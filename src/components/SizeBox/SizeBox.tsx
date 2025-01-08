import { Input } from "../ui/input";

export const SizeBox = () => {
  return (
    <div className="flex flex-row gap-3">
      <Input placeholder="길이" />
      <Input placeholder="너비" />
      <Input placeholder="두께" />
    </div>
  );
};
