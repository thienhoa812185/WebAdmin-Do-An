import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import specialityService from "../../servicesss/specialityService";
import FormAddSpeciality from "../../components/FormAddSpeciality";
import FormUpdateSpeciality from "../../components/FormUpdateSpeciality";
import DeleteDialog from "../../components/DeleteDialog";
import Header from "../../components/Header";

const Speciality = () => {
    const [specialityList, setSpecialityList] = useState([]);
    const [filteredSpecialityList, setFilteredSpecialityList] = useState([]);
    const [search, setSearch] = useState("");
    const [orderDir, setOrderDir] = useState("asc");
    const [orderColumn, setOrderColumn] = useState("id");

    console.log(orderDir);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        handleFilterAndSort();
    }, [search, orderDir, orderColumn, specialityList]);

    const init = () => {
        specialityService
            .getAllSpeciality()
            .then((res) => {
                setSpecialityList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFilterAndSort = () => {
        let filteredList = specialityList.filter((speciality) =>
            speciality.name.toLowerCase().includes(search.toLowerCase())
        );

        if (orderColumn) {
            filteredList.sort((a, b) => {
                if (orderDir === "asc") {
                    return a[orderColumn] > b[orderColumn] ? 1 : -1;
                } else {
                    return a[orderColumn] < b[orderColumn] ? 1 : -1;
                }
            });
        }

        setFilteredSpecialityList(filteredList);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleOrderDirChange = (e) => {
        setOrderDir(e.target.value);
    };

    const handleOrderColumnChange = (e) => {
        setOrderColumn(e.target.value);
    };

    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                <Header
                    title="Quản lý thông tin chuyên khoa"
                    subtitle="Danh sách các chuyên khoa có trong hệ thống"
                />
                <FilterSection
                    handleSearchChange={handleSearchChange}
                    handleOrderDirChange={handleOrderDirChange}
                    handleOrderColumnChange={handleOrderColumnChange}
                    init={init}
                />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-header">Danh sách chuyên khoa</div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table border mb-0">
                                        <thead className="table-light fw-semibold">
                                            <tr className="align-middle">
                                                <th>Hình ảnh</th>
                                                <th>ID</th>
                                                <th>Tên chuyên khoa</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSpecialityList.map(speciality => (
                                                <tr key={speciality.id} className="align-middle">
                                                    <td><img src={speciality.image} alt="Anh Bac Si" width="100" height="100" /></td>
                                                    <td>{speciality.id}</td>
                                                    <td>{speciality.name}</td>
                                                    <td>
                                                        <Box sx={{ display: 'flex', gap: "10px" }}>
                                                            <FormUpdateSpeciality
                                                                name={speciality.name}
                                                                id={speciality.id}
                                                                description={speciality.description}
                                                                handleRefreshSpeciality={init}
                                                            />
                                                            <DeleteDialog
                                                                name="speciality"
                                                                id={speciality.id}
                                                                handleRefreshSpeciality={init}
                                                            />
                                                        </Box>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const FilterSection = ({ handleSearchChange, handleOrderDirChange, handleOrderColumnChange, init }) => {
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
                            <input
                                className="form-control"
                                id="search"
                                size="16"
                                type="text"
                                placeholder="Bạn đang cần tìm gì?"
                                onChange={handleSearchChange}
                            />
                            <FormAddSpeciality handleRefreshSpeciality={init} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="order-dir">Sắp xếp theo chiều</label>
                            <select className="form-select" id="order-dir" onChange={handleOrderDirChange} required>
                                <option disabled>Chọn...</option>
                                <option value="asc">Từ trên xuống dưới</option>
                                <option value="desc">Từ dưới lên trên</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label" htmlFor="order-column">Sắp xếp theo giá trị</label>
                            <select className="form-select" id="order-column" onChange={handleOrderColumnChange} required>
                                <option disabled>Chọn...</option>
                                <option value="id">ID</option>
                                <option value="name">Tên chuyên khoa</option>
                                <option value="doctor_quantity">Số lượng bác sĩ</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Speciality;
