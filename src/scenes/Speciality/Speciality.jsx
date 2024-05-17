import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import specialityService from "../../servicesss/specialityService"
import FormAddSpeciality from "../../components/FormAddSpeciality"
import FormUpdateSpeciality from "../../components/FormUpdateSpeciality"
import DeleteDialog from "../../components/DeleteDialog"

const Speciality = () => {
    const [specialityList, setSpecialityList] = useState([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        specialityService
            .getAllSpeciality()
            .then((res) => {
                console.log(res.data)
                setSpecialityList(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                <FilterSection init={init} />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-header">Danh sách chuyên khoa</div>
                            <div className="card-body">
                                <div className="table-responsive"> 
                                    <table className="table border mb-0">
                                        <thead className="table-light fw-semibold">
                                            <tr className="align-middle">
                                                <th>
                                                    <i className="icon cil-compress">Hình ảnh</i>
                                                </th>
                                                <th>ID</th>
                                                <th>Tên chuyên khoa</th>
                                                {/* <th>Số lượng bác sĩ</th> */}
                                                <th>Hành động</th>
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {specialityList.map(speciality => (
                                                <tr key={speciality.id} className="align-middle">
                                                    <img src={speciality.image} alt="Anh Bac Si" width="100" height="100" />
                                                    <td>{speciality.id}</td>
                                                    <td>{speciality.name}</td>
                                                    {/* <td>{speciality.description}</td> */}
                                                    <td>
                                                        <Box sx={{ display: 'flex', gap: "10px" }}>
                                                            <FormUpdateSpeciality name={speciality.name} id={speciality.id} description={speciality.description} handleRefreshSpeciality={init} />
                                                            <DeleteDialog name="speciality" id={speciality.id} handleRefreshSpeciality={init} />
                                                        </Box>
                                                    </td>
                                                    {/* <td></td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <ul id="pagination" className="pagination pagination justify-content-center">
                                    <li id="button-previous" className="page-item page-link disabled">Previous</li>
                                    <li id="current-page" className="page-item page-link">1</li>
                                    <li id="button-next" className="page-item page-link">Next</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



function FilterSection(props) {
    const [search, setSearch] = useState();

    const handleChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <div className="card mb-4">
            <div className="card-header"><strong>Bộ lọc tìm kiếm</strong></div>
            <div className="card-body">
                <div className="example">
                    <div className="col-md-6 mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="icon cil-magnifying-glass"></i>
                            </span>
                            <input className="form-control" id="search" size="16" type="text" placeholder="Bạn đang cần tìm gì?" onChange={handleChange} />
                            {/* <button className="btn btn-info" type="button" >Tìm kiếm</button>
                            <button className="btn btn-success" type="button" >Làm mới</button> */}
                            <FormAddSpeciality handleRefreshSpeciality={props.init} />

                            {/* <a href="/speciality/create" className="btn btn-dark" type="button">Tạo mới</a> */}


                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="order-dir">Sắp xếp theo chiều</label>
                            <select className="form-select" id="order-dir" required >
                                <option disabled>Chọn...</option>
                                <option value="">Mặc định</option>
                                <option value="asc">Từ trên xuống dưới</option>
                                <option value="desc">Từ dưới lên trên</option>
                            </select>
                            <div className="invalid-feedback">Please select a valid state.</div>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label" htmlFor="order-column">Sắp xếp theo giá trị</label>
                            <select className="form-select" id="order-column" required>
                                <option disabled>Chọn...</option>
                                <option value="id">ID</option>
                                <option value="name">Tên chuyên khoa</option>
                                <option value="doctor_quantity">Số lượng bác sĩ</option>
                            </select>
                            <div className="invalid-feedback">Please select a valid state.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Speciality