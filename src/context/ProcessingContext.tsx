import React, { createContext, useState, useContext } from "react";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";

interface ProcessingContextData {
  operations: ProcessingOperation[];
  selectedOperation: string | null;
  processingParameters: Record<string, number> | null;
  previewOperation: {
    name: string | null;
    parameters: Record<string, number> | null;
  };
  addOperation: (operation: ProcessingOperation) => void;
  removeOperation: (index: number) => void;
  setSelectedOperation: (operation: string | null) => void;
  setProcessingParameters: (parameters: Record<string, number> | null) => void;
  updatePreview: (name: string, parameters: Record<string, number>) => void;
  clearPreview: () => void;
}

const ProcessingContext = createContext<ProcessingContextData | null>(null);

export const ProcessingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [operations, setOperations] = useState<ProcessingOperation[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(
    null
  );
  const [processingParameters, setProcessingParameters] = useState<Record<
    string,
    number
  > | null>(null);
  const [previewOperation, setPreviewOperation] = useState<{
    name: string | null;
    parameters: Record<string, number> | null;
  }>({
    name: null,
    parameters: null,
  });

  const addOperation = (operation: ProcessingOperation) => {
    setOperations((prev) => [...prev, operation]);
    clearPreview();
  };

  const removeOperation = (index: number) => {
    setOperations((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePreview = (name: string, parameters: Record<string, number>) => {
    setPreviewOperation({
      name,
      parameters,
    });
  };

  const clearPreview = () => {
    setPreviewOperation({
      name: null,
      parameters: null,
    });
  };

  return (
    <ProcessingContext.Provider
      value={{
        operations,
        selectedOperation,
        processingParameters,
        previewOperation,
        addOperation,
        removeOperation,
        setSelectedOperation,
        setProcessingParameters,
        updatePreview,
        clearPreview,
      }}
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
