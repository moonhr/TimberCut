import { useEffect, useState } from "react";

import { SizeBox } from "@/components/SizeBox/SizeBox";
import { UnitBox } from "@/components/UnitBox/UnitBox";
import { ThreeDModel } from "@/components/ThreeDModel/ThreeDModel";
import WoodworkingOperations from "./WoodworkingOperations/WoodworkingOperations";

const HomeContent = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setInitialized(true);
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <UnitBox />
      <SizeBox />
      <ThreeDModel />
      <span>Woodworking Operations</span>

      <WoodworkingOperations />
    </div>
  );
};

export default HomeContent;
