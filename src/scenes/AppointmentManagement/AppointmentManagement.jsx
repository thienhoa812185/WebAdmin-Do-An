import { useTheme } from "@emotion/react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from "../../theme";
import Header from "../../components/Header"
import { Link } from "react-router-dom";
import Status from "../../components/Status";
import { useEffect, useState } from "react";
import bookingService from "../../servicesss/bookingService";

const AppointmentManagement = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        init()
    }, []);

    const init = () => {
        bookingService.getAllBooking()
            .then(res => {
                console.log(res.data)
                const list = res.data.map(element => {
                    return {
                        id: element.id,
                        fullName: element.patient.name,
                        appointmentTime: element.doctorSchedule.scheduleTime.time,
                        doctorName: element.doctor.name,
                        appointmentDay: element.appointmentTime,
                        //location: element.location,
                        //orderTime: handleDateTime(element.orderTime),
                        //statusBooking: element.statusBooking,
                        statusPayment: element.statusPayment,
                        totalPrice: element.doctor.examination_Price,
                        statusBooking: element.statusBooking,
                        note: element.note
                        //paymentMethod: element.paymentMethod
                    }
                })
                setBookingList(list);
            })
            .catch(error => {
                console.log(error);
            })
    }

    //console.log(bookingList);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "fullName", headerName: "Tên Bệnh Nhân" },
        {
            field: "appointmentDay",
            headerName: "Ngày hẹn",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "appointmentTime",
            headerName: "Giờ hẹn",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "doctorName",
            headerName: "Bác sĩ",
            flex: 1.5,
        },
        {
            field: "note",
            headerName: "Nguyên nhân khám bệnh",
            flex: 1.5,
        },
        {
            field: "statusBooking",
            headerName: "Trạng thái",
            flex: 2,
            renderCell: (params) => (
                <div>
                    <Status status={params.row.statusBooking} />
                </div>
            ),
        },

        {
            field: "totalPrice",
            headerName: "Tiền khám",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "statusPayment",
            headerName: "Trạng thái thanh toán",
            flex: 1,
            renderCell: (params) => (
                <div>
                    {
                        params.row.statusPayment === "PAID" && <span className="badge bg-success rounded-pill">{params.row.statusPayment}</span>
                    }
                    {
                        params.row.statusPayment === "UNPAID" && <span className="badge bg-danger rounded-pill">{params.row.statusPayment}</span>
                    }
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: 1,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<VisibilityIcon />}
                        component={Link} to={"/viewOnlineOrderDetail/" + params.row.id}
                    >
                        View
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="Quản lý thông tin đặt lịch Online"
                subtitle="Danh sách các lịch hẹn đã được đặt"
            />
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={bookingList}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );

}


export default AppointmentManagement