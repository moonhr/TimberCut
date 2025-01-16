import { useModelingContext } from "@/context/ModelingContext";
import { useProcessingContext } from "@/context/ProcessingContext";
import React, { useState, useEffect, useCallback } from "react";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";

interface ProcessingDetailsProps {
  selectedOperation: ProcessingOperation | null;
  onClearSelection: () => void;
}

const ProcessingDetails: React.FC<ProcessingDetailsProps> = ({
  selectedOperation,
  onClearSelection,
}) => {
  const { unit } = useModelingContext();
  const { addOperation, setProcessingParameters, updatePreview } =
    useProcessingContext();

  const [parameters, setParameters] = useState<{ [key: string]: number }>(
    selectedOperation?.parameters || {}
  );

  useEffect(() => {
    if (selectedOperation?.parameters) {
      const initialParams = Object.fromEntries(
        Object.entries(selectedOperation.parameters).map(([key, value]) => [
          key,
          value ?? 0,
        ])
      );
      setParameters(initialParams);
      setProcessingParameters(initialParams);
      updatePreview(selectedOperation.name, initialParams);
    }
  }, [selectedOperation, setProcessingParameters, updatePreview]);

  const handleParameterChange = useCallback(
    (key: string, value: number) => {
      const newParameters = { ...parameters, [key]: value };
      setParameters(newParameters);
      setProcessingParameters(newParameters);
      updatePreview(selectedOperation!.name, newParameters);
    },
    [parameters, setProcessingParameters, updatePreview, selectedOperation]
  );

  const handleSave = useCallback(() => {
    if (!selectedOperation) {
      console.error("No operation selected.");
      return;
    }

    const updatedOperation = {
      ...selectedOperation,
      parameters: { ...parameters },
    };

    addOperation({
      id: updatedOperation.id,
      name: updatedOperation.name,
      parameters:
        updatedOperation.parameters as ProcessingOperation["parameters"],
    });

    onClearSelection();
  }, [selectedOperation, parameters, addOperation, onClearSelection]);

  if (!selectedOperation) {
    return (
      <p className="text-sm text-gray-600">
        Select an operation to view details.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{selectedOperation.name}</h2>
      <p className="text-sm text-gray-500 mb-4">Unit: {unit}</p>
      <div>
        {Object.entries(parameters).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium">{key}</label>
            <Input
              type="number"
              value={value ?? 0}
              onChange={(e) =>
                handleParameterChange(key, parseFloat(e.target.value))
              }
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          className={buttonVariants({ variant: "default", size: "sm" })}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className={buttonVariants({ variant: "destructive", size: "sm" })}
          onClick={onClearSelection}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProcessingDetails;
