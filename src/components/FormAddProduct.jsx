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

    console.log(product);

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

    const getProductByCategoryName = (e) => {
        const nameCategory = e.target.value;
        props.handleGetProductByCategoryName(nameCategory);
    }

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
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('position', product.position);
        formData.append('email', product.email);
        formData.append('examinationPRICE', product.examinationPRICE);
        formData.append('examinationADDRESS', product.examinationADDRESS);
        formData.append('username', product.username);
        formData.append('password', product.password);
        formData.append('description', product.description);
        formData.append('specialityName', product.specialityName);
        formData.append('image', product.images);

        doctorService.saveDoctor(formData)
            .then((res) => {
                console.log("Them thanh cong");
                setProduct({
                    name: "",
                    position:"",
                    email:"",
                    examinationPRICE:"",
                    examinationADDRESS:"",
                    username:"",
                    password: "",
                    description: "",
                    specialityName: "",
                    image: ""
                })
                handleClose();
                props.handleRefreshProduct()
            })
            .catch(error => {
                console.log(error);
                alert("Dữ liệu nhập không hợp lệ");
            })
    }


    return (
        <Box mt="20px">
            <Header
                title="DOCTOR MANAGEMENT"
                subtitle="List of Doctor for Future Reference"
            />
            <Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3

                }}>
                    <Box>
                        <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Add Doctor</Button>
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            color="secondary"
                            select
                            required
                            label="SPECIALITY"
                            name="categoryName"
                            onChange={(e) => getProductByCategoryName(e)}
                            sx={{ width: 300 }}
                        >
                            <MenuItem key={0} value="All Product">
                                All Doctor
                            </MenuItem>
                            {
                                specialityList.map(element => (
                                    <MenuItem key={element.id} value={element.name}>
                                        {element.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Box>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h2" component='div'>Add Doctor</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
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
                                    label="Doctor Name"
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
                                    label="Speciality"
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
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Position"
                                name="position"
                                fullWidth
                                required
                                onChange={(e) => handleChange(e)}
                                sx={{ mb: 4 }}
                            />
                               <TextField
                                type="text"
                                color="secondary"
                                variant='outlined'
                                label="Description"
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
                                label="EXAMINATION_PRICE"
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
                                label="EXAMINATION_ADDRESS"
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
                            <Button variant="outlined" color="secondary" type="submit">Add Doctor </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}

export default FormAddProduct;