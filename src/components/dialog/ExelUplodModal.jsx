import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import * as XlSX from "xlsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ExelUplodModal = ({ handleClose, open }) => {
  const [file, setFile] = React.useState();
  const [error, setError] = React.useState();
  const [excelData, setExcelData] = React.useState([]);

  React.useEffect(() => {
    console.log(excelData);
  }, [excelData]);

  const handleOnchange = (e) => {
    let selectedFile = e.target.files[0];
    console.log(selectedFile);
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setFile(e.target.result);
        };
      } else {
        setError("Please Select Valid Exel File");
        setFile(null);
      }
    } else {
      console.log("Please Select file");
    }
  };

  const submitHandler = () => {
    if (file !== null) {
      const workbook = XlSX.read(file, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XlSX.utils.sheet_to_json(sheet);
      console.log("excelData ", data);
      setExcelData(data);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="90vw"
      >
        <div  className="dialog-container">
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <h5>Import Items</h5>
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <div className="error-message">{error}</div>
              <div className="upload-container">
                <Button variant="outlined">
                  <Input
                    id="raised-button-file"
                    onChange={handleOnchange}
                    style={{ display: "none" }}
                    type="file"
                    hidden={true}
                  />
                  <label htmlFor="raised-button-file">Select files</label>
                </Button>
                <div id="file-name"></div>
              </div>
            </Typography>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" autoFocus onClick={submitHandler}>
              Import
            </Button>
          </DialogActions>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default ExelUplodModal;
