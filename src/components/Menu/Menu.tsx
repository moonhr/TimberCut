"use client";

import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { IoSave } from "react-icons/io5"; 
import { MdOutlineFileDownload } from "react-icons/md"; 
import { MdOutlineFileUpload } from "react-icons/md"; 

const actions = [
  { icon: <IoSave />, name: "Save" },
  { icon: <MdOutlineFileDownload />, name: "Export" },
  { icon: <MdOutlineFileUpload />, name: "Import" },
];

const FloatingMenu = () => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default FloatingMenu;
