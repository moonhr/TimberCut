"use client";

import { SizeBox } from "@/components/SizeBox/SizeBox";
import { UnitBox } from "@/components/UnitBox/UnitBox";
import { ThreeDModel } from "@/components/ThreeDModel/ThreeDModel";
import WOCard from "@/components/WoodworkingOperations/WOCard";

import { ModelingProvider } from "@/context/ModelingContext";

const woodworkingOperations = [
  {
    name: "CNC Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Laser Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Edge Banding",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "CNC Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Laser Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Edge Banding",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "CNC Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Laser Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Edge Banding",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "CNC Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Laser Cutting",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
  {
    name: "Edge Banding",
    image: "https://via.placeholder.com/150?text=CNC+Cutting",
  },
];

const Home = () => {
  return (
    <ModelingProvider>
      <div className="flex flex-col items-center justify-center gap-3">
        <UnitBox />
        <SizeBox />
        <ThreeDModel />
        <span>Woodworking Operations</span>
        <div className="flex flex-wrap gap-2 w-full items-center justify-center">
          {woodworkingOperations.map((operation, index) => (
            <WOCard key={index} name={operation.name} image={operation.image} />
          ))}
        </div>
      </div>
    </ModelingProvider>
  );
};

export default Home;
