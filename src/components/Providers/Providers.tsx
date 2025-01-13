
"use client";

import { ModelingProvider } from "@/context/ModelingContext";
import { ProcessingProvider } from "@/context/ProcessingContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {

  return (
    <ModelingProvider>
      <ProcessingProvider>{children}</ProcessingProvider>
    </ModelingProvider>
  );
};

export default Providers;
