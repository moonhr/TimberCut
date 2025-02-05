import { useEffect, useState } from "react";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";
import ProcessingDetails from "@/components/WoodworkingOperations/ProcessingDetails";
import WOCard from "@/components/WoodworkingOperations/WOCard";
import ProcessingList from "@/components/WoodworkingOperations/ProcessingList";
import { useProcessingContext } from "@/context/ProcessingContext";

const WoodworkingOperations = () => {
  const [availableOperations, setAvailableOperations] = useState<
    ProcessingOperation[]
  >([]);
  const [selectedOperation, setSelectedOperation] =
    useState<ProcessingOperation | null>(null);
  const { setSelectedOperation: setContextSelectedOperation } =
    useProcessingContext();

  useEffect(() => {
    const fetchOperations = async () => {
      const response = await fetch("/processing/processing.json");
      const data = await response.json();
      setAvailableOperations(data.processingOperations);
    };
    fetchOperations();
  }, []);

  const handleCardClick = (operation: ProcessingOperation) => {
    setSelectedOperation(operation);
    setContextSelectedOperation(operation.name);
  };

  const handleClearSelection = () => {
    setSelectedOperation(null);
    setContextSelectedOperation(null);
  };

  return (
    <>
      <div className="w-full p-4 bg-gray-100 rounded shadow">
        <ProcessingDetails
          selectedOperation={selectedOperation}
          onClearSelection={handleClearSelection}
        />
      </div>

      <ProcessingList />

      <div className="flex flex-wrap gap-2 w-full items-center justify-center">
        {availableOperations.map((operation, index) => (
          <WOCard
            key={index}
            name={operation.name}
            image={`/processing/${operation.name}.png`}
            onClick={() => handleCardClick(operation)}
          />
        ))}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-sm font-mono text-gray-600 px-3 py-1 rounded text-center">
              Coming Soon
            </span>
          </div>
          <div className="opacity-50">
            <WOCard key={"Dado"} name={"Dado"} image={"/processing/Dado.png"} />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-sm font-mono text-gray-600 px-3 py-1 rounded text-center">
              Coming Soon
            </span>
          </div>
          <div className="opacity-50">
            <WOCard
              key={"Rabbet"}
              name={"Rabbet"}
              image={"/processing/Rabbet.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WoodworkingOperations;
