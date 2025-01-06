import Scene from "../three/Scene";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex flex-col  items-center justify-center">
      <Image src={"/LOGO.png"} alt="Logo" width={100} height={100} />
      <div style={{ height: "100vh", width: "100vw" }}>
        <Button>Click</Button>
        <Scene />
      </div>
    </div>
  );
};

export default Home;
