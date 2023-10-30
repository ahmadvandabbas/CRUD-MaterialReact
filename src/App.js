import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { CreateNewPillModal } from "./CreateNewPillModal ";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { DeleteModal } from "./DeleteModal";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import Loading from "./Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading, setFalseLoading } from "./redux/loadingSlice";

function App() {
  const [data, setData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const loader = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8000/bills")
      .then((res) => {
        dispatch(setIsLoading());
        setData(res.data);
        setTimeout(() => {
          dispatch(setFalseLoading());
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "شماره فاکتور",
        accessorKey: "numberFactor",
        size: 120,
      },
      {
        header: "تاریخ فاکتور",
        accessorKey: "dateFactor",
        size: 100,
      },
      {
        header: "نام مشتری",
        accessorKey: "nameCustomer",
        size: 100,
      },
      {
        header: "مبلغ فاکتور",
        accessorKey: "priceFactor",
        size: 100,
      },
      {
        header: "نوع فاکتور",
        accessorKey: "typeFactor",
        size: 80,
      },
      {
        header: "نحوه ارسال",
        accessorKey: "howSend",
        size: 80,
      },
    ],
    []
  );

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    data[row.index] = values;

    setData([...data]);
    exitEditingMode();
  };
  const handleCreateNewRow = (values) => {
    data.push(values);
    setData([...data]);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      data.splice(row.index, 1);
      setData([...data]);
    },
    [data]
  );

  return (
    <div className="App">
      <MaterialReactTable
        columns={columns}
        data={data}
        editingMode="modal"
        muiTableContainerProps={{ sx: { maxHeight: "900px" } }}
        enableRowSelection
        enableColumnOrdering
        enableGlobalFilter={false}
        enableEditing={true}
        localization={MRT_Localization_FA}
        onEditingRowSave={handleSaveRow}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            header: "ویرایش", //change "Actions" to "Edit"
          },
        }}
        enableRowActions
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "0.25rem", textAlign: "right" }}>
            <Tooltip arrow placement="left" title="ویرایش">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="حذف">
              <IconButton
                color="error"
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Add
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            style={{
              cursor: "pointer",
              fontSize: "32px",
              marginLeft: "10px",
              color: "green",
            }}
          ></Add>
        )}
      />

      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        handleDeleteRow={handleDeleteRow}
      />
      <CreateNewPillModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      {loader && <Loading />}
    </div>
  );
}

export default App;
