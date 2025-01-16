import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { useProcessingContext } from "@/context/ProcessingContext";

const ProcessingList: React.FC = () => {
  const { operations: contextOperations, removeOperation } =
    useProcessingContext();

  return (
    <div className="w-full p-4 bg-gray-200 rounded shadow mt-4">
      <h3 className="text-lg font-bold">Selected Processing Operations</h3>
      {contextOperations.length > 0 ? (
        <ul className="list-disc ml-4">
          {contextOperations.map((operation, index) => (
            <li key={index} className="flex justify-between items-center gap-4">
              <div className="flex flex-col">
                <span className="font-semibold">{operation.name}</span>
                {` (${Object.entries(operation.parameters)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")})`}
              </div>
              <Button
                className={buttonVariants({
                  variant: "destructive",
                  size: "sm",
                })}
                onClick={() => removeOperation(index)}
              >
                X
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">No operations added.</p>
      )}
    </div>
  );
};

export default ProcessingList;
