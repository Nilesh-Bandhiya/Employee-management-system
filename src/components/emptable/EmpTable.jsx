import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpData } from "../../store/slices/empSlice";
import { deleteEmployee } from "../../services/api/employeeApi";

export default function EmpTable({ addEmpOpen }) {
  const dispatch = useDispatch();
  let employees = useSelector((state) => state.emp.data);
  const isLoading = useSelector((state) => state.emp.isLoading);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  React.useEffect(() => {
    dispatch(fetchEmpData());
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    //for converting date into YYYY-MM-DD this format
    const employeesData = employees.map((emp) => {
      if (emp && emp.joining_date) {
        const updatedEmp = {
          ...emp,
          joining_date: dayjs(emp.joining_date).format("YYYY-MM-DD"),
        };
         emp = Object.assign({}, updatedEmp)
      }

      if (emp && emp.birth_date) {
        const updatedEmp = {
          ...emp,
          birth_date: dayjs(emp.birth_date).format("YYYY-MM-DD"),
        };
        emp = Object.assign({}, updatedEmp)
      }
      return emp
    });

    //for adding dynamic columns in table
    if (employees.length > 0) {
      const columns = Object.keys(employees[0])?.map((key) => ({
        field: key,
        headerName: key,
        flex: 1,
        sortable: true,
      }));

      //for add actions column in table
      const updatedColumns = [
        ...columns,
        {
          field: "actions",
          type: "actions",
          headerName: "Actions",
          width: 100,
          cellClassName: "actions",
          getActions: (data) => {
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(data)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(data)}
                color="inherit"
              />,
            ];
          },
        },
      ];
      setColumns(updatedColumns);
    }
    setData(employeesData);
  }, [employees]);

  const handleEditClick = (data) => () => {
    addEmpOpen(data);
  };

  const handleDeleteClick = (data) => async () => {
    try {
      await deleteEmployee(data.id)
          dispatch(fetchEmpData());
    } catch (error) {
       console.log(error.message);
    }
  };

  return (
    <Box sx={{ height: "70%", width: "96%", margin: "0px auto" }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoPageSize
        checkboxSelection
        loading={isLoading}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
