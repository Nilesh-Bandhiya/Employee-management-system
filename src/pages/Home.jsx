import React, { useState } from "react";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EmpTable from "../components/emptable/EmpTable";
import ExelUplodModal from "../components/importmodal/ExelUplodModal";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className="main-layout">
      <div className="main-header">
        <h2 className="main-header-text">Employee Details</h2>
        <Button variant="outlined" onClick={handleClickOpen} className="main-add-btn">
          <AddOutlinedIcon />
        </Button>
      </div>
      <div className="second-header">
        <h3>Employee Details</h3>
      </div>
        <EmpTable />
    </div>
    <ExelUplodModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Home;
