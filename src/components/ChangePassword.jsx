import React, { useState } from 'react';
import { Button } from "@mui/material";
import adminActionService from '../servicesss/adminActionService';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = () => {
        // Add your password validation and update logic here
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        const data = {
            username: localStorage.getItem("username"),
            password: currentPassword,
            newPassword: newPassword
        }
        adminActionService.changePassword(data)
            .then(res => {
                alert(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="card mb-4">
            <div className="card-header"><strong>Đổi mật khẩu</strong></div>
            <div className="card-body">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Nhập mật khẩu hiện tại</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="newPassword">Nhập mật khẩu mới</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="newPassword2nd">Nhập lại mật khẩu mới</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword2nd"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <Button
                            variant='contained'
                            fullWidth
                            onClick={handlePasswordChange}
                        >
                            Cập nhật mật khẩu
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;