import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

interface SaveModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (modelName: string) => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [modelName, setModelName] = useState("");

  const handleSave = () => {
    onSave(modelName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Save Model</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Model Name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            helperText="Enter a name for your model"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!modelName.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
