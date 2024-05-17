import { useTheme } from "@emotion/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Input } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { tokens } from "../theme";
import specialityService from "../servicesss/specialityService"

const FormUpdateSpeciality = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [speciality, setSpeciality] = useState({
        name: props.name,
        description: props.description,
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
    };

    const handleAddSuccess = (e) => {
        e.preventDefault();

        if (speciality.image === "") {
            const formData = new FormData();
            formData.append('name', speciality.name);
            formData.append('description', speciality.description);

            specialityService
                .updateSpecialityNotImage(props.id, formData)
                .then((res) => {
                    handleClose();
                    props.handleRefreshSpeciality();
                })
                .catch((error) => {
                    alert(error.response.data);
                    console.log(error)
                })
        }
        else {
            const formData = new FormData();
            formData.append('name', speciality.name);
            formData.append('description', speciality.description);
            formData.append('image', speciality.image);

            specialityService
                .saveSpeciality(formData)
                .then((res) => {
                    console.log("Speciality Add Sucessfully");
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
            <Button variant="contained" onClick={handleClickOpen} size="medium" startIcon={<AddIcon />} sx={{ backgroundColor: colors.blueAccent[500] }}>Cập nhật</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography variant="h2" component='div'>Cập nhật chuyên khoa</Typography>
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
                            label="Speciality Name"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            value={speciality.name}
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Description"
                            fullWidth
                            required
                            sx={{ mb: 3 }}
                            name="description"
                            onChange={(e) => handleChange(e)}
                            value={speciality.description}
                        />
                        <Input
                            type="file"
                            fullWidth
                            name="image"
                            onChange={(e) => { handleChange(e) }}
                            sx={{ mb: 4 }}
                        />
                        <Button variant="outlined" color="secondary" type="submit">Cập nhật chuyên khoa</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="error">Hủy bỏ</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FormUpdateSpeciality;