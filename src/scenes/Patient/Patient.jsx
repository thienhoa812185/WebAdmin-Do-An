import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useEffect, useState } from "react";
import FormAddStaff from "../../components/FormAddStaff";
import patientService from "../../servicesss/patientService";



const Patient = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userList, setUserList] = useState([]);


    useEffect(() => {
        init();
    }, [])

    const init = () => {
        patientService.getAllPatient()
            .then(res => {
                setUserList(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Tên bệnh nhân",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Số điện thoại",
            flex: 1,
        },
        {
            field: "dateOfBirth",
            headerName: "Ngày sinh",
            flex: 1,
        },

    ];

    return (
        <Box m="20px">
            <FormAddStaff handleRefreshUser={init} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={userList} columns={columns} />
            </Box>
        </Box>
    );
};

export default Patient;