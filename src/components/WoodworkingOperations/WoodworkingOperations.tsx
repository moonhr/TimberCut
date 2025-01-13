import { useEffect, useState } from "react";
import { ProcessingOperation } from "@/ts/interface/ProcessingOperation";
import ProcessingDetails from "@/components/WoodworkingOperations/ProcessingDetails";
import WOCard from "@/components/WoodworkingOperations/WOCard";
import ProcessingList from "@/components/WoodworkingOperations/ProcessingList";

const WoodworkingOperations = () => {
  const [operations, setOperations] = useState<ProcessingOperation[]>([]);
  const [selectedOperation, setSelectedOperation] =
    useState<ProcessingOperation | null>(null);

  useEffect(() => {
    const fetchOperations = async () => {
      const response = await fetch("/processing/processing.json");
      const data = await response.json();
      setOperations(data.processingOperations);
    };
    fetchOperations();
  }, []);

  const handleCardClick = (operation: ProcessingOperation) => {
    setSelectedOperation(operation); 
  };

  const handleClearSelection = () => {
    setSelectedOperation(null); // 선택 해제
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
        {operations.map((operation, index) => (
          <WOCard
            key={index}
            name={operation.name}
            image={`https://via.placeholder.com/150?text=${operation.name}`}
            onClick={() => handleCardClick(operation)} // 클릭 핸들러 추가
          />
        ))}
      </div>
    </>
  );
};

export default WoodworkingOperations;
