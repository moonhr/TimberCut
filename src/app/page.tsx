"use client";

import Providers from "@/components/Providers/Providers";
import HomeContent from "@/components/HomeContent";
import FloatingMenu from "@/components/Menu/Menu";
import WarnOnNavigate from "@/utils/WarnOnNavigate";

const Page = () => {
  const warnOnNavigate = new WarnOnNavigate();
  warnOnNavigate.enableWarning();

  return (
    <Providers>
      <HomeContent />
      <FloatingMenu />
    </Providers>
  );
};

export default Page;
