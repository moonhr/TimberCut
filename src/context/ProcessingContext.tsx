import React, { createContext, useState, useContext } from "react";
// import { BaseProcessing } from "@/core/Processing/BaseProcessing";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";

interface ProcessingContextData {
  operations: ProcessingOperation[];
  addOperation: (operation: ProcessingOperation) => void;
  removeOperation: (index: number) => void;
}

const ProcessingContext = createContext<ProcessingContextData | null>(null);

export const ProcessingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [operations, setOperations] = useState<ProcessingOperation[]>([]);

  const addOperation = (operation: ProcessingOperation) => {
    setOperations((prev) => [...prev, operation]);
  };

  const removeOperation = (index: number) => {
    setOperations((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ProcessingContext.Provider
      value={{ operations, addOperation, removeOperation }}
    >
      {children}
    </ProcessingContext.Provider>
  );
};

export const useProcessingContext = () => {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error(
      "useProcessingContext must be used within a ProcessingProvider"
    );
  }
  return context;
};
