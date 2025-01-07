"use client";
import Scene from "../three/Scene";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="grid grid-cols-3 gap-2">
        <Input />
        <Input />
        <Input />
      </div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Scene />
      </div>
    </div>
  );
};

export default Home;
