import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { FormatType } from "@/ts/types/FormatType";
interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  onExport: (format: FormatType, fileName: string) => void;
}

const fileFormats = [
  { value: "glb", label: "GLB - Binary GL Transmission" },
  { value: "gltf", label: "GLTF - GL Transmission Format" },
  { value: "stl", label: "STL - Stereolithography" },
  { value: "obj", label: "OBJ - Wavefront Object" },
  { value: "nc", label: "NC - Numerical Control" },
  { value: "gcode", label: "G-code - CNC Machine Code" },
];

export const ExportModal: React.FC<ExportModalProps> = ({
  open,
  onClose,
  onExport,
}) => {
  const [selectedFormat, setSelectedFormat] = useState("glb");
  const [fileName, setFileName] = useState("model");

  const handleExport = () => {
    onExport(selectedFormat as FormatType, fileName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Export Model</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>File Format</InputLabel>
            <Select
              value={selectedFormat}
              label="File Format"
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {fileFormats.map((format) => (
                <MenuItem key={format.value} value={format.value}>
                  {format.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            helperText={`Will be saved as: ${fileName}.${selectedFormat}`}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleExport} variant="contained" color="primary">
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};
