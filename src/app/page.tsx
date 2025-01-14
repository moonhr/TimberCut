"use client";

import Providers from "@/components/Providers/Providers";
import HomeContent from "@/components/HomeContent";
import FloatingMenu from "@/components/Menu/Menu";

const Page = () => {
  return (
    <Providers>
      <HomeContent />
      <FloatingMenu />
    </Providers>
  );
};

export default Page;
