import React, { useState } from 'react';

const ServiceManagement = () => {
    const [statusBefore, setStatusBefore] = useState('');
    const [statusAfter, setStatusAfter] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        // Xử lý logic lưu dữ liệu khi người dùng nhấn nút "Lưu lại"
    };

    return (
        <div className="body flex-grow-1 px-3">
            <div className="container-lg">
                <div className="card mb-4">
                    <div className="card-header"><strong>Thông tin bệnh án</strong></div>
                    <div className="card-body">
                        <div className="example">
                            <div className="tab-pane p-3 active preview" role="tabpanel" id="preview-1252">
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="status-before">Trạng thái trước khám</label>
                                        <textarea className="form-control" id="status-before" rows="1" value={statusBefore} onChange={(e) => setStatusBefore(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-4">
                                        <label className="form-label" htmlFor="status-after">Trạng thái sau khám</label>
                                        <textarea className="form-control" id="status-after" rows="1" value={statusAfter} onChange={(e) => setStatusAfter(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="reason">Nguyên nhân</label>
                                        <textarea className="form-control" id="reason" rows="1" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-10">
                                        <label className="form-label" htmlFor="description">Mô tả</label>
                                        <textarea className="form-control" id="description" rows="6" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-3 mx-auto">
                                    <button id="button-save" className="btn btn-primary" type="button" onClick={handleSave}>Lưu lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceManagement;