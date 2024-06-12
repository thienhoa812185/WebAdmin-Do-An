import CheckboxesTags from "../../components/CheckboxesTags"
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../servicesss/doctorService";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ChangePassword from "../../components/ChangePassword"


const ViewDetailDoctor = () => {

    const [doctor, setDoctor] = useState({
        name: "",
        description: "",
        username: "",
        doctorSchedules: [],
        education: "",
        experience: "",
        examination_Address: "",
        examination_Price: "",
        position: "",
        image: "",
        speciality: {
            name: ""
        }
    });

    console.log(doctor)

    const { id } = useParams();

    useEffect(() => {
        init();
    }, [])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDoctor((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateDoctor = () => {
        // Chuyển đổi giá trị price thành số
        const price = parseFloat(doctor.examination_Price);

        // Kiểm tra nếu price không phải là một số hoặc là NaN
        if (isNaN(price)) {
            alert("Giá tiền phải là một số");
            return;
        }

        const formData = new FormData();
        formData.append('name', doctor.name);
        formData.append('description', doctor.description);
        formData.append('education', doctor.education);
        formData.append('experience', doctor.experience);
        formData.append('price', price); // Sử dụng giá trị price đã chuyển đổi

        doctorService
            .updateInfomationDoctor(doctor.id, formData)
            .then((res) => {
                alert("Update thành công");
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            });
    };


    const init = () => {
        if (id === "GetByUsername") {
            const username = localStorage.getItem("username")
            doctorService.getDoctorByUsername(username)
                .then((res) => {
                    setDoctor(res.data);
                })
                .catch((error) => {
                    console.log(error);

                })
        }
        else {
            doctorService.getDoctorById(id)
                .then((res) => {
                    setDoctor(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }

    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                <div className="card mb-4">
                    <div className="card-header"><strong>Thông tin cá nhân</strong></div>
                    <div className="card-body">
                        <div className="example">
                            <div className="tab-pane p-3 active preview" role="tabpanel" id="preview-1252">
                                <div className="row mb-4">
                                    <div className="row mb-3 mx-1">
                                        <img id="avatar" src={doctor.image}
                                            className="rounded-circle mb-3" style={{ width: '200px' }} alt="Avatar" />
                                    </div>
                                </div>
                                {/* end 1. AVATAR & BUTTON UPLOAD */}
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="id">Mã số bác sĩ</label>
                                            <textarea className="form-control" id="id" rows="1" disabled value={doctor.id}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <textarea className="form-control" id="username" rows="1" disabled value={doctor.username}></textarea>
                                        </div>
                                    </div>
                                </div>
                                {/* end 2. PATIENT ID */}
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên</label>
                                            <textarea className="form-control" id="name" rows="1" name="name" onChange={handleInputChange} value={doctor.name}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="speciality">Chuyên khoa</label>
                                            <textarea className="form-control" id="speciality" rows="1" value={doctor.speciality.name}></textarea>
                                        </div>
                                    </div>{/* SPECIALITY */}
                                    <div className="col-md-4">
                                        <div className="mb-3">{/* ACTIVE */}
                                            <label className="form-label" htmlFor="role">Vai trò</label>
                                            <textarea className="form-control" id="role" rows="1" value={doctor.position}></textarea>
                                        </div>{/* end ACTIVE */}
                                    </div>{/* ROOM */}
                                </div>
                                {/* end 3. NAME | SPECIALITY | ROOM */}
                                <div className="row mb-4">
                                    <div className="col-md-4">{/* PHONE */}
                                        <div className="mb-3">{/* ACTIVE */}
                                            <label className="form-label" htmlFor="active">Trạng thái</label>
                                            <p id="active"><strong>Đang hoạt động</strong></p>
                                        </div>{/* end ACTIVE */}
                                    </div>{/* end PHONE */}
                                    <div className="col-md-4">{/* PRICE */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="price">Giá</label>
                                            <textarea className="form-control" id="price" name="examination_Price" rows="1" onChange={handleInputChange} value={doctor.examination_Price}></textarea>
                                        </div>
                                    </div>{/* end PRICE */}
                                </div>
                                {/* end 4. PHONE | PRICE  */}
                                <div className="row mb-4">
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="description">Mô tả</label>
                                        <textarea className="form-control" id="description" name="description" onChange={handleInputChange} value={doctor.description}></textarea>
                                    </div>
                                </div>{/* end 6. DESCRIPTION */}
                                <div className="row mb-4">
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="education">Giáo dục</label>
                                        <textarea className="form-control" id="education" name="education" onChange={handleInputChange} value={doctor.education}></textarea>
                                    </div>
                                </div>{/* end 6. DESCRIPTION */}
                                <div className="row mb-4">
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="experience">Kinh nghiệm</label>
                                        <textarea className="form-control" id="experience" name="experience" onChange={handleInputChange} value={doctor.experience}></textarea>
                                    </div>
                                </div>{/* end 6. DESCRIPTION */}
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="create-at">Khởi tạo</label>
                                        <p id="create-at"><strong>2022-11-10 11:13</strong></p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="update-at">Cập nhật lần cuối</label>
                                        <p id="update-at"><strong>2022-11-10 11:13</strong></p>
                                    </div>
                                </div>{/* end 8. CREATE AT | UPDATE AT */}
                                <div className="d-grid gap-2 col-3 mx-auto">{/* 9. BUTTON */}
                                    {/* <a href={`${APPURL}/personal/update`} className="btn btn-primary" type="button">Cập nhật thông tin</a> */}
                                </div>{/* end 9. BUTTON */}
                                <div>
                                    <label className="form-label" htmlFor="update-at">Giờ khám</label>
                                    <CheckboxesTags id={doctor.id} time={doctor.doctorSchedules} />
                                </div>

                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    fullWidth
                                    //startIcon={<VisibilityIcon />}
                                    onClick={handleUpdateDoctor}
                                    sx={{ margin: 2 }}>
                                    Cập nhật thông tin
                                </Button>
                            </div>{/* end tab-content */}
                        </div>{/* end EXAMPLE */}
                    </div>
                </div>
                {
                    localStorage.getItem("role") === "doctor" && <ChangePassword />
                }
            </div>
        </div>
    );

}

export default ViewDetailDoctor;