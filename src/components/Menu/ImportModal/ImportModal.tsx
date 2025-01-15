import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { ModelDataType } from "@/core/types/ModelDataType";
import { useModelingContext } from "@/context/ModelingContext";
import { useProcessingContext } from "@/context/ProcessingContext";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (modelData: ModelDataType) => void;
  savedModels: ModelDataType[];
}

export const ImportModal: React.FC<ImportModalProps> = ({
  open,
  onClose,
  onImport,
  savedModels,
}) => {
  const modelingContext = useModelingContext();
  const processingContext = useProcessingContext();

  const handleImport = (model: ModelDataType) => {
    // 모델링 컨텍스트 업데이트
    modelingContext.setLength(model.modelingData.length);
    modelingContext.setWidth(model.modelingData.width);
    modelingContext.setThickness(model.modelingData.thickness);
    modelingContext.setUnit(model.modelingData.unit);
    modelingContext.setCurrentGeometry(model.modelingData.geometry);

    // 가공 컨텍스트 업데이트
    processingContext.setOperations(model.modelingData.operations);
    processingContext.setSelectedOperation(null);
    processingContext.setProcessingParameters(null);
    processingContext.clearPreview();

    onImport(model);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Load Saved Model
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <IoClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {savedModels.length === 0 ? (
          <Typography>No saved models found.</Typography>
        ) : (
          <List
            sx={{
              padding: "8px",
              "& .MuiListItem-root": {
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "8px",
                border: "1px solid #e0e0e0",
                "&:last-child": {
                  marginBottom: 0,
                },
              },
            }}
          >
            {savedModels.map((model, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleImport(model)}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      transform: "translateX(4px)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      transform: "translateX(2px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={model.title}
                    secondary={`Size: ${model.modelingData.length}x${model.modelingData.width}x${model.modelingData.thickness} ${model.modelingData.unit}`}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 500,
                        color: "#2c3e50",
                      },
                      "& .MuiListItemText-secondary": {
                        color: "#7f8c8d",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};
