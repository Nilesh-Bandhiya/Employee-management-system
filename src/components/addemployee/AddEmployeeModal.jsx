import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpData } from "../../store/slices/empSlice";
import { createEmployee, editEmployee } from "../../services/api/employeeApi";

const AddEmployee = ({ open, handleEmployeeFormClose, formData }) => {
  const dispatch = useDispatch();
  const [fileds, setFields] = React.useState([]);
  let employees = useSelector((state) => state.emp.data);

  useEffect(() => {
    if (employees.length > 0) {
      setFields(Object.keys(employees[0]));
    }
  }, [employees]);

  const defaultValue = {
    id: null,
    name: null,
    designation: null,
    status: null,
    salary: null,
    location: null,
    skills: null,
  };

  const validation = yup.object().shape({
    name: yup.string().required("Name is Required"),

    designation: yup.string().required("Designation is Required"),

    salary: yup.number().required("Salary is Required"),

    location: yup.string().required("Location is Required"),

    status: yup.string().required("Status is Required"),

    skills: yup.string().required("Skills are Required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    if (formData) {
      console.log(formData);
      reset(formData);
    } else {
      reset(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, reset]);

  const addEmployeeHandler = async (data) => {
    const { id, ...newData } = data;

    //if there is formdata means that's open and data for upload employee
    if (formData) {
      await editEmployee(id, newData);
      dispatch(fetchEmpData());
    } else {
      await createEmployee(newData);
      dispatch(fetchEmpData());
    }
    
    reset(defaultValue);
    handleEmployeeFormClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleEmployeeFormClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {formData ? "Update Employee" : "Add New Employee"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(addEmployeeHandler)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {fileds.map((field) => {
                  if (field === "name") {
                    return (
                      <Grid key={'name'} item xs={6}>
                        <TextField
                          required
                          fullWidth
                          {...register("name")}
                          error={errors.name ? true : false}
                          helperText={errors.name?.message}
                          autoFocus
                          id="name"
                          label="Name"
                          name="name"
                          autoComplete="name"
                        />
                      </Grid>
                    );
                  }
                  if (field === "designation") {
                    return (
                      <Grid key={'designation'} item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          {...register("designation")}
                          error={errors.designation ? true : false}
                          helperText={errors.designation?.message}
                          id="designation"
                          label="Designation"
                          name="designation"
                          autoComplete="designation"
                        />
                      </Grid>
                    );
                  }
                  if (field === "salary") {
                    return (
                      <Grid key={'salary'} item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          type="number"
                          {...register("salary")}
                          error={errors.salary ? true : false}
                          helperText={errors.salary?.message}
                          id="salary"
                          label="Salary"
                          name="salary"
                          autoComplete="salary"
                        />
                      </Grid>
                    );
                  }
                  if (field === "location") {
                    return (
                      <Grid key={'location'} item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          {...register("location")}
                          error={errors.location ? true : false}
                          helperText={errors.location?.message}
                          id="location"
                          label="Location"
                          name="location"
                          autoComplete="location"
                        />
                      </Grid>
                    );
                  }
                  if (field === "status") {
                    return (
                      <Grid key={'status'} item xs={12} sm={6}>
                        <FormControl sx={{ minWidth: 270 }}>
                          <InputLabel
                            id="status"
                            sx={{ color: errors.status ? "red" : "" }}
                          >
                            Status
                          </InputLabel>
                          <Select
                            required
                            labelId="status"
                            id="status"
                            {...register("status")}
                            error={errors.status ? true : false}
                            label="Status"
                            name="status"
                            value={watch("status") || ""}
                          >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"inactive"}>In Active</MenuItem>
                            <MenuItem value={"selfEmployed"}>
                              Self Employeed
                            </MenuItem>
                          </Select>
                          <FormHelperText sx={{ color: "red" }}>
                            {errors.status?.message}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    );
                  }
                  if (field === "skills") {
                    return (
                      <Grid key={'skills'} item xs={6}>
                        <TextField
                          required
                          fullWidth
                          {...register("skills")}
                          error={errors.skills ? true : false}
                          helperText={errors.skills?.message}
                          autoFocus
                          id="skills"
                          label="Skills"
                          name="skills"
                          autoComplete="skills"
                        />
                      </Grid>
                    );
                  }
                  if (field === "joining_date") {
                    return (
                      <Grid key={'joining_date'} item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Joining Date"
                              {...register("joining_date")}
                              value={
                                watch("joining_date")
                                  ? dayjs(watch("joining_date"))
                                  : dayjs()
                              }
                              onChange={(newValue) =>
                                setValue("joining_date", dayjs(newValue))
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    );
                  }
                  if (field === "birth_date") {
                    return (
                      <Grid key={'birth_date'} item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              label="Birth Date"
                              {...register("birth_date")}
                              value={
                                watch("birth_date")
                                  ? dayjs(watch("birth_date"))
                                  : dayjs()
                              }
                              onChange={(newValue) =>
                                setValue("birth_date", dayjs(newValue))
                              }
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    );
                  }
                })}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "20px",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={handleEmployeeFormClose}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={formData ? "success" : "primary"}
                  autoFocus
                >
                  {formData ? "Update" : "Add"}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployee;
