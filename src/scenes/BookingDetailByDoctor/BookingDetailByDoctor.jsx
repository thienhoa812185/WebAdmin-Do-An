import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './BookingDetailByDoctor.css';
import { useTheme } from "@mui/material";
import { Button } from '@mui/material';
import bookingService from '../../servicesss/bookingService';
import { tokens } from "../../theme";

const BookingDetailByDoctor = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [order, setOrder] = useState();

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        init();
    }, [])

    const init = () => {
        bookingService.getBookingAdminById(id)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    console.log(order)

    const formatCurrencyVND = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const handleUpdateConclude = () => {
        const data = {
            conclude: order.conclude,
            precaution: order.precaution
        }

        bookingService.updateConcludeBooking(id, data)
            .then(res => {
                console.log(res.data)
                alert("Cập nhật thông tin thành công")
                // navigate("/appointmentManagement")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleComfirmBooking = (status) => {
        const data = {
            statusBooking: status
        }

        bookingService.updateStatusBooking(id, data)
            .then(res => {
                console.log(res.data)
                navigate("/appointmentDoctor")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });


    }

    console.log(order);

    return (
        <div className="container-fluid" style={{ backgroundColor: colors.blueAccent[200] }}>
            <div className="container">
                {/* Title */}
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h2 className="h5 mb-0"><a href="https://mui.com/" style={{ color: 'red' }}>Lịch đặt:{order && order.id}</a></h2>
                </div>

                {/* Main content */}
                <div className="row">
                    <div className="col-lg-8">
                        {/* Details */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="mb-3 d-flex justify-content-between">
                                    <div>
                                        <span className="me-3">Thời gian đặt lịch: {order && order.doctorSchedule.scheduleTime.time} {order && order.appointmentTime}</span>
                                        {/* <span className="me-3">#id</span>
                                        <span className="me-3">Visa -1234</span> */}
                                        <span className="badge rounded-pill bg-info">{order && order.statusBooking}</span>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên Bệnh Nhân</label>
                                            <p id="name"><strong>{order && order.patient.name}</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Email</label>
                                            <p id="name"><strong>{order && order.patient.email}</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Số điện thoại</label>
                                            <p id="name"><strong>{order && order.patient.phone}</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Địa chỉ</label>
                                            <p id="name"><strong>{order && order.patient.address}</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Ngày sinh</label>
                                            <p id="name"><strong>{order && order.patient.dateOfBirth}</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Giới tính</label>
                                            <p id="name"><strong>{order && order.patient.gender === true ? "Nam" : "Nữ"}</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>

                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="mb-3 d-flex justify-content-between">
                                    <div>
                                        <h6>Thông tin kết luận của bác sĩ</h6>
                                        {/* <span className="me-3">#id</span>
                                        <span className="me-3">Visa -1234</span> */}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="description">Kết luận</label>
                                            <textarea className="form-control" id="description" value={order && order.conclude} name='conclude' onChange={handleChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="description">Cách chữa trị</label>
                                            <textarea className="form-control" id="description" value={order && order.precaution} name='precaution' onChange={handleChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="description">Thuốc</label>
                                            <textarea className="form-control" id="description" ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h3 className="h6">Phương thức thanh toán</h3>
                                        <p>"Trả bằng thẻ"<br />
                                            {order && order.statusPayment === "UNPAID" && <>Tổng tiền: {order && formatCurrencyVND(order.price)} <span className="badge bg-danger rounded-pill">{order && order.statusPayment}</span></>}
                                            {order && order.statusPayment === "PAID" && <>Tổng tiền: {order && formatCurrencyVND(order.price)} <span className="badge bg-success rounded-pill">{order && order.statusPayment}</span></>}

                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <h3 className="h6">Billing address</h3>
                                        <address>
                                            {/* <strong>John Doe</strong><br /> */}
                                            1355 Market St, Suite 900<br />
                                            San Francisco, CA 94103<br />
                                            <abbr title="Phone">P:</abbr> (123) 456-7890
                                        </address>
                                        <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleUpdateConclude}>Cập nhật</Button>
                                        <Button variant='contained' color="secondary" onClick={() => navigate("/appointmentDoctor")}>Quay lại</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        {/* Customer Notes */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="h6">Nguyên nhân khám bệnh</h3>
                                <p>{order && order.note}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            {/* Shipping information */}
                            <div className="card-body">
                                <h3 className="h6">Thông tin đặt lịch hẹn</h3>
                                <strong>Id Đặt lịch: </strong>
                                <span><a href="https://mui.com/" className="text-decoration-underline" target="_blank" rel="noreferrer">{order && order.id}</a> <i className="bi bi-box-arrow-up-right"></i> </span>
                                <hr />

                                <div>
                                    <label className="form-label" htmlFor="name">Nguyên nhân khám bệnh: </label>
                                    <p id="name"><strong>{order && order.note}</strong></p>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="name">Thời gian đặt lịch: </label>
                                    <p id="name"><strong>{order && order.doctorSchedule.scheduleTime.time}, {order && order.appointmentTime}</strong></p>
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="name">Địa điểm khám: </label>
                                    <p id="name"><strong>{order && order.doctor.examination_Address}</strong></p>
                                </div>


                                {
                                    order && order.statusBooking === "PENDING" && <>
                                        <Button variant='contained' sx={{ marginRight: 2 }} onClick={() => handleComfirmBooking("CONFIRM")} >Comfirm</Button>
                                        <Button variant='contained' sx={{ marginRight: 2 }} onClick={() => handleComfirmBooking("CANCELLED")} color='error'>Cancelled</Button>
                                    </>
                                }
                                {
                                    order && order.statusBooking === "CONFIRM" &&
                                    <Button variant='contained' sx={{ marginRight: 2 }} onClick={() => handleComfirmBooking("COMPLETED")} >Completed</Button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BookingDetailByDoctor