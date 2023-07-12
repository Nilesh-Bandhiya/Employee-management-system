import React, { useState } from "react";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EmpTable from "../components/emptable/EmpTable";
import ExelUplodModal from "../components/importmodal/ExelUplodModal";
import AddEmployee from "../components/addemployee/AddEmployeeModal";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);
  const [formData, setFormData] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addEmpOpen = () => {
    setEmpOpen(true);
  };

  const addEmpClose = () => {
    setFormData(null)
    setEmpOpen(false);
  };

  const editEmpOpen = (data) => {
    setFormData(data.row)
    setEmpOpen(true);
  };


  return (
    <>
      <div className="main-layout">
        <div className="main-header">
          <h2 className="main-header-text">Employee Details</h2>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            className="main-add-btn"
          >
            <AddOutlinedIcon />
          </Button>
        </div>
        <div className="second-header">
          <h3>Employee Details</h3>
          <Button
          variant="contained"
          onClick={addEmpOpen}
          className="emp-add-btn"
        >
          Add Employee
        </Button>
        </div>
        <EmpTable addEmpOpen={editEmpOpen} />
      </div>
      <ExelUplodModal handleClose={handleClose} open={open} />
      <AddEmployee open={empOpen} handleEmployeeFormClose={addEmpClose} formData={formData} />
    </>
  );
};

export default Home;
