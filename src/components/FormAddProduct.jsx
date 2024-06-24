import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { tokens } from "../theme";
import Header from "./Header"
import specialityService from "../servicesss/specialityService";
import doctorService from "../servicesss/doctorService";

const FormAddProduct = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [specialityList, setSpecialityList] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        position: "",
        examinationPRICE: "",
        examinationADDRESS: "",
        username: "",
        email: "",
        password: "",
        description: "",
        specialityName: "",
        images: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name === "images") {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setProduct({ ...product, [e.target.name]: file });
            } else {
                setProduct({ ...product, [e.target.name]: "" });
                alert('Vui lòng chọn một file hình ảnh');
            }
        }
        else {
            setProduct({ ...product, [e.target.name]: value });
        }

    }

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        specialityService
            .getAllSpeciality()
            .then((res) => {
                setSpecialityList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();

        // Thay thế dấu phẩy bằng dấu chấm và chuyển đổi giá trị examinationPRICE thành số thực
        const priceString = product.examinationPRICE.replace(',', '.');
        const price = parseFloat(priceString);

        // Kiểm tra nếu price không phải là số thực hoặc không phải là số nguyên
        if (isNaN(price) || !Number.isInteger(price)) {
            alert("Giá tiền phải là một số nguyên");
            return;
        }

        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(product.email)) {
            alert("Email không hợp lệ");
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('position', product.position);
        formData.append('email', product.email);
        formData.append('examinationPRICE', price); // Sử dụng giá trị price đã chuyển đổi
        formData.append('examinationADDRESS', product.examinationADDRESS);
        formData.append('username', product.username);
        formData.append('password', product.password);
        formData.append('description', product.description);
        formData.append('specialityName', product.specialityName);
        formData.append('image', product.images);

        doctorService.saveDoctor(formData)
            .then((res) => {
                console.log("Thêm thành công");
                setProduct({
                    name: "",
                    position: "",
                    email: "",
                    examinationPRICE: "",
                    examinationADDRESS: "",
                    username: "",
                    password: "",
                    description: "",
                    specialityName: "",
                    image: ""
                });
                handleClose();
                props.handleRefreshProduct();
            })
            .catch(error => {
                console.log(error);
                alert("Dữ liệu nhập không hợp lệ");
            });
    }


    return (
        <Box mt="20px">
            <Header
                title="Quản lý thông tin bác sĩ"
                subtitle="Danh sách các bác sĩ có trong hệ thống"
            />
            <Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                    mb: 2

                }}>
                    <Box>
                        <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Thêm bác sĩ</Button>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Thêm bác sĩ</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Hãy nhập thông tin chi tiết bác sĩ cần thêm vào form dưới đây
                        </DialogContentText>
                        <Box component="form" onSubmit={handleAddSuccess}>

                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Username"
                                name="username"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Email"
                                name="email"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Password"
                                name="password"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color="secondary"
                                    label="Tên bác sĩ"
                                    name="name"
                                    fullWidth
                                    required
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextField
                                    fullWidth
                                    color="secondary"
                                    select
                                    required
                                    label="Chuyên Khoa"
                                    name="specialityName"
                                    onChange={(e) => handleChange(e)}
                                >
                                    {
                                        specialityList.map(element => (
                                            <MenuItem key={element.id} value={element.name}>
                                                {element.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Stack>
                            <TextField
                                fullWidth
                                color="secondary"
                                select
                                required
                                label="Chức vụ"
                                name="position"
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            >
                                <MenuItem value="Bác sĩ">Bác sĩ</MenuItem>
                                <MenuItem value="Thạc sĩ">Thạc sĩ</MenuItem>
                                <MenuItem value="Tiến sĩ">Tiến sĩ</MenuItem>
                                <MenuItem value="Bác sĩ Chuyên khoa I">Bác sĩ Chuyên khoa I</MenuItem>
                                <MenuItem value="Bác sĩ Chuyên khoa II">Bác sĩ Chuyên khoa II</MenuItem>
                            </TextField>
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Mô tả"
                                name="description"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Giá khám"
                                name="examinationPRICE"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Địa chỉ khám"
                                name="examinationADDRESS"
                                required
                                fullWidth
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                            <Input
                                type="file"
                                fullWidth
                                required
                                name="images"
                                onChange={(e) => { handleChange(e) }}
                                sx={{ mb: 4 }}
                            />
                            <Button variant="outlined" color="secondary" type="submit">Thêm bác sĩ</Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color="error">Hủy bỏ</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

export default FormAddProduct;