import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbar,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmpData } from "../../store/slices/empSlice";
import { deleteEmployee } from "../../services/api/employeeApi";

export default function EmpTable() {
  const [data, setData] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.emp.data);
  const isLoading = useSelector((state) => state.emp.isLoading);

  React.useEffect(() => {
    dispatch(fetchEmpData());
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    console.log("employes",employees);
    setData(employees);
  }, [employees]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Name",
      width: 110,
      type: "string",
      editable: true,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 110,
      type: "string",
      editable: true,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 110,
      type: "string",
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      type: "string",
      editable: true,
    },
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

  const handleEditClick =
    ({ id }) =>
    () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

  const handleDeleteClick = (data) => () => {
    console.log(data);
    deleteEmployee(data.id)
      .then((res) => {
        console.log("Deleted Success::::");
        dispatch(fetchEmpData());
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Box sx={{ height: "60%", width: "96%", margin: "0px auto" }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          editMode="row"
          checkboxSelection
          GridRowModesModel={rowModesModel}
          loading={isLoading}
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar,
          }}
        />
    </Box>
  );
}
