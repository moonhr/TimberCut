import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import { IoClose, IoTrash } from "react-icons/io5";
import { ModelDataType } from "@/ts/types/ModelDataType";
import { useModelingContext } from "@/context/ModelingContext";
import { useProcessingContext } from "@/context/ProcessingContext";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (modelData: ModelDataType) => void;
  savedModels: ModelDataType[];
  setSavedModels: (models: ModelDataType[]) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  open,
  onClose,
  onImport,
  savedModels,
  setSavedModels,
}) => {
  const modelingContext = useModelingContext();
  const processingContext = useProcessingContext();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<number | null>(
    null
  );

  const handleImport = (model: ModelDataType) => {
    modelingContext.setLength(model.modelingData.length);
    modelingContext.setWidth(model.modelingData.width);
    modelingContext.setThickness(model.modelingData.thickness);
    modelingContext.setUnit(model.modelingData.unit);
    modelingContext.setCurrentGeometry(model.modelingData.geometry);

    processingContext.setOperations(model.modelingData.operations);
    processingContext.setSelectedOperation(null);
    processingContext.setProcessingParameters(null);
    processingContext.clearPreview();

    onImport(model);
    onClose();
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmOpen(index);
  };

  const confirmDelete = (index: number) => {
    const newModels = savedModels.filter((_, i) => i !== index);

    const savedModelData = JSON.parse(
      localStorage.getItem("SaveModelData") || "[]"
    );
    savedModelData.splice(index, 1);
    localStorage.setItem("SaveModelData", JSON.stringify(savedModelData));

    localStorage.setItem("savedModels", JSON.stringify(newModels));
    setSavedModels(newModels);
    setDeleteConfirmOpen(null);
  };

  return (
    <>
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
                <ListItem
                  key={index}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(e) => handleDelete(index, e)}
                      sx={{
                        color: "#e74c3c",
                        "&:hover": {
                          color: "#c0392b",
                        },
                      }}
                    >
                      <IoTrash />
                    </IconButton>
                  }
                >
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

      <Dialog
        open={deleteConfirmOpen !== null}
        onClose={() => setDeleteConfirmOpen(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this model?</Typography>
        </DialogContent>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            pb: 2,
            pr: 2,
          }}
        >
          <Button onClick={() => setDeleteConfirmOpen(null)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() =>
              deleteConfirmOpen !== null && confirmDelete(deleteConfirmOpen)
            }
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
