const Patient = () => {

    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                {/* SECTION FILTER */}
                <div className="card mb-4">
                    <div className="card-header"><strong>Bộ lọc tìm kiếm</strong></div>
                    <div className="card-body">
                        <div className="example">
                            <div className="col-md-6 mb-3">
                                {/* 1. SEARCH - search */}
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="icon cil-magnifying-glass"></i>
                                    </span>
                                    <input className="form-control" id="search" size="16" type="text" placeholder="Bạn đang cần tìm gì?" />
                                    <button id="button-search" className="btn btn-info" type="button">Tìm kiếm</button>
                                    <button id="button-reset" className="btn btn-success" type="button">Làm mới</button>
                                    {/* <a href={`${APPURL}/patient/create`} className="btn btn-dark" type="button">Tạo mới</a> */}
                                </div>
                                {/* end 1. SEARCH - search */}
                            </div>
                            <div className="row mb-3">
                                {/* 2. ORDER dir | column | STATUS */}
                                {/* order[dir] */}
                                <div className="col-md-4">
                                    <label className="form-label" htmlFor="order-dir">Sắp xếp theo chiều</label>
                                    <select className="form-select" id="order-dir" required="">
                                        <option selected disabled value="">Chọn...</option>
                                        <option value="">Mặc định</option>
                                        <option value="asc">Từ trên xuống dưới</option>
                                        <option value="desc">Từ dưới lên trên</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a valid state.</div>
                                </div>
                                {/* end order[dir] */}
                                {/* order[column] */}
                                <div className="col-md-4">
                                    <label className="form-label" htmlFor="order-column">Sắp xếp theo giá trị</label>
                                    <select className="form-select" id="order-column" required="">
                                        <option selected disabled value="">Chọn...</option>
                                        <option value="id">ID</option>
                                        <option value="name">Tên</option>
                                        <option value="gender">Giới tính</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a valid state.</div>
                                </div>
                                {/* end order[column] */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* end SECTION FILTER */}
                {/* APPOINTMENTS LIST */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-header">
                                Danh sách bệnh nhân
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table border mb-0">
                                        <thead className="table-light fw-semibold">
                                            <tr className="align-middle">
                                                <th className="text-center">
                                                    <i className="icon cil-people"></i>
                                                </th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Số điện thoại</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Data here */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ul id="pagination" className="pagination pagination justify-content-center">
                                <li id="button-previous" className="page-item page-link disabled">Previous</li>
                                <li id="current-page" className="page-item page-link">1</li>
                                <li id="button-next" className="page-item page-link">Next</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* end APPOINTMENT LIST */}
            </div>
        </div>
    );
}

export default Patient