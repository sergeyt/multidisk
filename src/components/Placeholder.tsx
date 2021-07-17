import React from "react";
import Box from "@material-ui/core/Box";

export default function Placeholder({ children }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={20}
      m={3}
    >
      {children || "NO DATA"}
    </Box>
  );
}
