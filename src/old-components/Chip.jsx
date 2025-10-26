import React from "react";
import { Chip } from "@mui/material";

const ChipCard = (props) => {
  const { label, color } = props;

  return <Chip label={label} variant="outlined" sx={{color: '#E0E0E0', height: "24px"}} />;
};

export default ChipCard;
