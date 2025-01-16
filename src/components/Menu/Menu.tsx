// UI 컴포넌트
import React, { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

// 아이콘
import { IoSave } from "react-icons/io5";
import { FaFileImport, FaFileExport } from "react-icons/fa6";

// 컨텍스트
import { useModelingContext } from "@/context/ModelingContext";
import { useProcessingContext } from "@/context/ProcessingContext";

// 유틸리티 함수
import { exportModel } from "@/core/FAB/export/export";
import { saveModel } from "@/core/FAB/save/save";
import { importModel } from "@/core/FAB/import/import";

// 컴포넌트
import { ExportModal } from "@/components/Menu/ExportModal/ExportModal";
import { SaveModal } from "@/components/Menu/SaveModal/SaveModal";
import { ImportModal } from "@/components/Menu/ImportModal/ImportModal";
import { ModelDataType } from "@/ts/types/ModelDataType";
import { FormatType } from "@/ts/types/FormatType";

const FloatingMenu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentGeometry, length, width, thickness, unit } =
    useModelingContext();
  const { operations } = useProcessingContext();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [savedModels, setSavedModels] = useState<ModelDataType[]>([]);

  const { setCurrentGeometry, setLength, setWidth, setThickness, setUnit } =
    useModelingContext();
  const { setOperations } = useProcessingContext();

  const handleExport = (format: FormatType, fileName: string) => {
    if (currentGeometry) {
      exportModel({
        format: format as FormatType,
        fileName,
        geometry: currentGeometry,
      });
    } else {
      console.error("No geometry available for export");
    }
  };

  const handleSave = (modelName: string) => {
    if (currentGeometry) {
      const modelData = {
        title: modelName,
        modelingData: {
          geometry: currentGeometry,
          length: length,
          width: width,
          thickness: thickness,
          unit: unit,
          pxDimensions: { length: length, width: width, thickness: thickness },
          operations: operations,
        },
      };
      saveModel(modelData);
    } else {
      console.error("No geometry available to save");
    }
  };

  const loadSavedModels = () => {
    const models = importModel();
    setSavedModels(models);
  };

  const handleImport = (modelData: ModelDataType) => {
    const { geometry, length, width, thickness, unit, operations } =
      modelData.modelingData;

    setCurrentGeometry(geometry);
    setLength(length);
    setWidth(width);
    setThickness(thickness);
    setUnit(unit);
    setOperations(operations);

    setIsImportModalOpen(false);
  };

  const handleImportClick = () => {
    loadSavedModels();
    setIsImportModalOpen(true);
  };

  const actions = [
    {
      icon: isMobile ? "Save" : <IoSave />,
      name: "Save",
      onClick: () => {
        if (currentGeometry) {
          setIsSaveModalOpen(true);
        } else {
          console.error("No geometry available to save");
        }
      },
    },
    {
      icon: isMobile ? "Export" : <FaFileExport />,
      name: "Export",
      onClick: () => {
        if (currentGeometry) {
          setIsExportModalOpen(true);
        } else {
          console.error("No geometry available to export");
        }
      },
    },
    {
      icon: isMobile ? "Import" : <FaFileImport />,
      name: "Import",
      onClick: handleImportClick,
    },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 10,
        }}
        icon={<SpeedDialIcon />}
        FabProps={{
          tabIndex: -1,
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={isMobile ? null : action.name}
            onClick={action.onClick}
            FabProps={{
              "aria-label": action.name,
              sx: isMobile
                ? {
                    minWidth: "80px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    padding: "6px 1px",
                    "& .MuiSpeedDialAction-staticTooltipLabel": {
                      width: "auto",
                    },
                    height: "32px",
                    "& .MuiButtonBase-root": {
                      borderRadius: "4px",
                    },
                  }
                : {},
            }}
          />
        ))}
      </SpeedDial>

      <SaveModal
        open={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSave}
      />

      <ExportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <ImportModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
        savedModels={savedModels}
        setSavedModels={setSavedModels}
      />
    </>
  );
};

export default FloatingMenu;
