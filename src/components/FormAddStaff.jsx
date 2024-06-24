import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import Header from "./Header";
import adminActionService from "../servicesss/adminActionService";

const FormAdddoctor = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [doctor, setDoctor] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setDoctor({ ...doctor, [e.target.name]: value });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setDoctor({
            email: "",
            name: "",
            password: ""
        })
        setOpen(false);
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();

        if (validateEmail(doctor.email)) {
            adminActionService
                .createAccountForDoctor(doctor)
                .then((res) => {
                    console.log("Doctor Add Sucessfully");
                    handleClose();
                    props.handleRefreshUser();
                })
                .catch((error) => {
                    //alert(error.response.data);
                    console.log(error)
                })
        }
        else {
            alert("The email you entered is not valid")
        }
    }

    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra địa chỉ email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Sử dụng test() để kiểm tra tính hợp lệ của email
        return emailRegex.test(email);
    }

    return (
        <Box mt="20px">
            <Header title="Quản lý thông tin bệnh nhân" subtitle="Danh sách các bệnh nhân có trong hệ thống" />
            <Box>
                {/* <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Thêm tài khoản bác sĩ</Button> */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Thêm tài khoản bác sĩ</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <Box component="form" sx={{ mt: 3 }} onSubmit={handleAddSuccess}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="email"
                                onChange={(e) => handleChange(e)}
                                value={doctor.email}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="UserName"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="username"
                                onChange={(e) => handleChange(e)}
                                value={doctor.username}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Password"
                                fullWidth
                                required
                                sx={{ mb: 3 }}
                                name="password"
                                onChange={(e) => handleChange(e)}
                                value={doctor.password}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Thêm tài khoản </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color="error">Hủy bỏ</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box >
    )
}

export default FormAdddoctor;