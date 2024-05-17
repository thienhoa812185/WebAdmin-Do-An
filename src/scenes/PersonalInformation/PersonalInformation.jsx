


const PersonalInformation = () => {


    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                <div className="card mb-4">
                    <div className="card-header"><strong>Thông tin cá nhân</strong></div>
                    <div className="card-body">
                        <div className="example">
                            <div className="tab-pane p-3 active preview" role="tabpanel" id="preview-1252">
                                <div className="row mb-4">
                                    {/* 1. AVATAR & BUTTON UPLOAD */}
                                    <div className="row mb-3 mx-1">
                                        <img id="avatar" src="https://mdbcdn.b-cdn.net/img/new/avatars/5.webp" className="rounded-circle mb-3" style={{ width: "200px" }} alt="Avatar" />
                                    </div>
                                </div>
                                {/* end 1. AVATAR & BUTTON UPLOAD */}
                                <div className="row mb-4">
                                    {/* 2. PATIENT ID */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="id">Mã số bác sĩ</label>
                                            <p id="id"><strong>1</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <p id="email"><strong>example@gmail.com</strong></p>
                                        </div>
                                    </div>
                                </div>
                                {/* end 2. PATIENT ID */}
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên</label>
                                            <p id="name"><strong>Nguyễn Thành Phong</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Chuyên khoa</label>
                                            <p id="name"><strong>Ngoại khoa</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Phòng</label>
                                            <p id="name"><strong>Khu D, tầng 3, phòng 303</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>
                                {/* end 3. NAME | SPECIALITY | ROOM */}
                                <div className="row mb-4">
                                    {/* 4. PHONE | PRICE */}
                                    <div className="col-md-4">
                                        {/* PHONE */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="phone">Số điện thoại</label>
                                            <p id="name"><strong>0366253623</strong></p>
                                        </div>
                                    </div>
                                    {/* end PHONE */}
                                    <div className="col-md-4">
                                        {/* PRICE */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="price">Giá</label>
                                            <p id="name"><strong>0</strong></p>
                                        </div>
                                    </div>
                                    {/* end PRICE */}
                                </div>
                                {/* end 4. PHONE | PRICE */}
                                <div className="row mb-4">
                                    {/* 6. DESCRIPTION */}
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="description">Mô tả</label>
                                        <p id="description" rows="3"><strong>Hello</strong></p>
                                    </div>
                                </div>
                                {/* end 6. DESCRIPTION */}
                                <div className="row mb-4">
                                    {/* 7. ACTIVE */}
                                    <div className="col-md-4">
                                        {/* ACTIVE */}
                                        <label className="form-label" htmlFor="active">Trạng thái</label>
                                        <p id="active"><strong>Đang hoạt động</strong></p>
                                    </div>
                                    {/* end ACTIVE */}
                                    <div className="col-md-4">
                                        {/* ACTIVE */}
                                        <label className="form-label" htmlFor="role">Vai trò</label>
                                        <p id="role"><strong>Bác sĩ</strong></p>
                                    </div>
                                    {/* end ACTIVE */}
                                </div>
                                {/* end 7. ACTIVE */}
                                <div className="row mb-4">
                                    {/* 8. CREATE AT | UPDATE AT */}
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="create-at">Khởi tạo</label>
                                        <p id="create-at"><strong>2022-11-10 11:13</strong></p>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="update-at">Cập nhật lần cuối</label>
                                        <p id="update-at"><strong>2022-11-10 11:13</strong></p>
                                    </div>
                                </div>
                                {/* end 8. CREATE AT | UPDATE AT */}
                                <div className="d-grid gap-2 col-3 mx-auto">
                                    {/* 9. BUTTON */}
                                    <a href="<?= APPURL + '/personal/update' ?>" className="btn btn-primary" type="button">Cập nhật thông tin</a>
                                </div>
                                {/* end 9. BUTTON */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformation