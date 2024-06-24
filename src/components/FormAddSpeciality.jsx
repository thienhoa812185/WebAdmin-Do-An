import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Input } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import specialityService from "../servicesss/specialityService"

const FormAddSpeciality = (props) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [speciality, setSpeciality] = useState({
        name: "",
        description: "",
        image: ""
    });

    console.log(speciality);

    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name === "image") {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                setSpeciality({ ...speciality, [e.target.name]: file });
            } else {
                setSpeciality({ ...speciality, [e.target.name]: "" });
                alert('Vui lòng chọn một file hình ảnh');
            }
        }
        else {
            setSpeciality({ ...speciality, [e.target.name]: value });
        }

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSpeciality({
            name: "",
            description: "",
            image: ""
        })
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();

        if (speciality.image === "") {
            alert('Vui lòng chọn một file hình ảnh');
        }
        else {
            const formData = new FormData();
            formData.append('name', speciality.name);
            formData.append('description', speciality.description);
            formData.append('image', speciality.image);

            specialityService
                .saveSpeciality(formData)
                .then((res) => {
                    alert(res.data)
                    setSpeciality({
                        name: "",
                        description: "",
                        image: ""
                    })
                    handleClose();
                    props.handleRefreshSpeciality();
                })
                .catch((error) => {
                    alert(error.response.data);
                    console.log(error)
                })

        }

    }

    return (
        <Box>
            <Button variant="contained" onClick={handleClickOpen} size="large" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Thêm chuyên khoa</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h2" component='div'>Thêm chuyên khoa</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hãy nhập thông tin chi tiết chuyên khoa cần thêm vào form dưới đây.
                    </DialogContentText>
                    <Box component="form" sx={{ mt: 3 }} onSubmit={handleAddSuccess}>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Tên chuyên khoa"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        // value={category.name}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Mô tả"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="description"
                            onChange={(e) => handleChange(e)}
                        // value={category.name}
                        />
                        <Input
                            type="file"
                            fullWidth
                            required
                            name="image"
                            onChange={(e) => { handleChange(e) }}
                            sx={{ mb: 4 }}
                        />
                        <Button variant="outlined" color="secondary" type="submit">Thêm chuyên khoa</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">Hủy bỏ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormAddSpeciality

