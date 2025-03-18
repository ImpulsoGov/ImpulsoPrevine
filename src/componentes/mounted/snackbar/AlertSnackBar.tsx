'use client';
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";

interface AlertSnackBarProps {
  show: boolean;
}

export default function AlertSnackBar({ show }: AlertSnackBarProps) {
  const [open, setOpen] = React.useState(show);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={null} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <SnackbarContent
        sx={{
          width: 437,
          minHeight: 66, 
          backgroundColor: "#E57373", 
          fontFamily: "Inter, sans-serif",
          display: "flex",
          alignItems: "center",
        }}
        message={
          <span style={{alignItems: "center", fontSize: "13px", color: "white", fontWeight:400 }}>
            <img src={"https://media.graphassets.com/C2ic3rsScOkYLsRSTalo"} alt="Warning" style={{ marginRight: 8, width: 20, height: 20 }} />
            Não foi possível carregar os dados. Entre em 
            <strong>
              <a href="www.google.com" style={{ color: "white", textDecoration: "underline" }}> contato com o suporte </a>
            </strong> 
            para entender o que aconteceu.
          </span>
        }
        action={
          <IconButton size="small" onClick={handleClose} sx={{ color: "white" }}>
            <img src={"https://media.graphassets.com/cvo7ewTTTTKXgWHRd6g1"} alt="Close" style={{ width: 20, height: 20 }} />
          </IconButton>
        }
      />
    </Snackbar>
  );
};
