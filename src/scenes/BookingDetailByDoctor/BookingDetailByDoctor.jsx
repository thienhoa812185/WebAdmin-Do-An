import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './BookingDetailByDoctor.css';
import { useTheme } from "@mui/material";
import orderService from "../../service/orderService";
import { Button } from '@mui/material';
import orderOnlineService from '../../service/orderOnlineService';
import { tokens } from "../../theme";

const BookingDetailByDoctor = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [order, setOrder] = useState({
        orderTime: [],
        orderDetails: []
    });

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        init();
    }, [])

    const init = () => {
        orderOnlineService.getOnlineOrderById(id)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleDateTime = () => {
        // Tạo đối tượng Date hiện tại
        const currentDate = new Date();

        // Lấy thông tin ngày giờ
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        const currentDay = currentDate.getDate();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();

        // Hiển thị thời gian hiện tại
        return `${currentDay}/${currentMonth}/${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`;

    }

    const handleComfirmDoneOrder = () => {
        orderOnlineService.confirmDoneOrder(order.id)
            .then((res) => {
                navigate("/onlineOrderManagement");
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (e) => {
        order.orderStatus = e.target.value;
        console.log(e.target.value)
        //setOrder(order);
        // orderService.updateStatusOrder(order.id, order.orderStatus)
        //     .then(res => {
        //         init();
        //     }).catch(error => {
        //         console.log(error)
        //     });

    }

    console.log(order);
    return (
        <div className="container-fluid" style={{ backgroundColor: colors.blueAccent[200] }}>
            <div className="container">
                {/* Title */}
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h2 className="h5 mb-0"><a href="https://mui.com/" style={{ color: 'red' }}>Order #{order.id}</a></h2>
                </div>

                {/* Main content */}
                <div className="row">
                    <div className="col-lg-8">
                        {/* Details */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="mb-3 d-flex justify-content-between">
                                    <div>
                                        <span className="me-3">{handleDateTime()}</span>
                                        <span className="me-3">#{order.id}</span>
                                        <span className="me-3">Visa -1234</span>
                                        {/* <span className="badge rounded-pill bg-info">{order.orderStatus}</span> */}
                                        <select
                                            className="form-select badge rounded-pill bg-info"
                                            style={{ color: 'white', backgroundColor: '#17a2b8', width: "150px" }}
                                            value={order.orderStatus}
                                            onChange={handleChange}
                                        >
                                            <option value="PENDING">PENDING</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            <option value="SHIPPING">SHIPPING</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn btn-link p-0 me-3 d-none d-lg-block btn-icon-text"><i className="bi bi-download"></i> <span className="text">Invoice</span></button>
                                        <div className="dropdown">
                                            <button className="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><a className="dropdown-item" href="https://mui.com/"><i className="bi bi-pencil"></i> Edit</a></li>
                                                <li><a className="dropdown-item" href="https://mui.com/"><i className="bi bi-printer"></i> Print</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên Bệnh Nhân</label>
                                            <p id="name"><strong>Nguyễn Thành Phong</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Email</label>
                                            <p id="name"><strong>thienhoa812185@gmail.com</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Số điện thoại</label>
                                            <p id="name"><strong>0983801656</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên Bệnh Nhân</label>
                                            <p id="name"><strong>Nguyễn Thành Phong</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Email</label>
                                            <p id="name"><strong>thienhoa812185@gmail.com</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Số điện thoại</label>
                                            <p id="name"><strong>0983801656</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>
                                <div className="row mb-4">
                                    {/* 3. NAME | SPECIALITY | ROOM */}
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Tên Bệnh Nhân</label>
                                            <p id="name"><strong>Nguyễn Thành Phong</strong></p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* SPECIALITY */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Email</label>
                                            <p id="name"><strong>thienhoa812185@gmail.com</strong></p>
                                        </div>
                                    </div>
                                    {/* SPECIALITY */}
                                    <div className="col-md-4">
                                        {/* ROOM */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="name">Số điện thoại</label>
                                            <p id="name"><strong>0983801656</strong></p>
                                        </div>
                                    </div>
                                    {/* ROOM */}
                                </div>
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Chi tiết</th>
                                            <th>Số lượng</th>
                                            <th className="text-end">Price</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.orderDetails.map((element, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="d-flex mb-2">
                                                                <div className="flex-shrink-0">
                                                                    <img src={element.product ? element.product.images[0].imageUrl : "https://static.hotdeal.vn/images/1589/1588756/60x60/355791-combo-6-mon-an-nhat-ban-kem-do-uong-cho-2n-tai-nha-hang-kokoro.jpg"} alt="" width="35" className="img-fluid" />
                                                                </div>
                                                                <div className="flex-lg-grow-1 ms-3">
                                                                    <h6 className="small mb-0"><a href="https://mui.com/" className="text-reset">{element.product ? element.product.name : element.combo.name}</a></h6>
                                                                    <span className="small">Description: {element.product ? element.product.description : element.combo.description}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{element.quantity}</td>
                                                        <td className="text-end">{element.product ? element.product.price : element.combo.price}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        {/* <tr>
                                            <td colSpan="2">Subtotal</td>
                                            <td className="text-end">$159.98</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Shipping</td>
                                            <td className="text-end">$20.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">Discount (Code: NEWYEAR)</td>
                                            <td className="text-danger text-end">-$10.00</td>
                                        </tr> */}
                                        <tr className="fw-bold">
                                            <td colSpan="2">TOTAL</td>
                                            <td className="text-end">{order.totalPrice}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        {/* Payment */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h3 className="h6">Payment Method</h3>
                                        <p>{order.paymentMethod || "Trả bằng tiền mặt"}<br />
                                            Total: {order.totalPrice} <span className="badge bg-danger rounded-pill">UNPAID</span></p>
                                    </div>
                                    <div className="col-lg-6">
                                        <h3 className="h6">Billing address</h3>
                                        <address>
                                            {/* <strong>John Doe</strong><br /> */}
                                            1355 Market St, Suite 900<br />
                                            San Francisco, CA 94103<br />
                                            <abbr title="Phone">P:</abbr> (123) 456-7890
                                        </address>
                                        <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleComfirmDoneOrder}>Comfirm</Button>
                                        <Button variant='contained' color="secondary" onClick={() => navigate("/appointmentDoctor")}>Back</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* Customer Notes */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="h6">Customer Notes</h3>
                                <p>{order.note}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            {/* Shipping information */}
                            <div className="card-body">
                                <h3 className="h6">Booking Information</h3>
                                {/* <strong>Id Table: </strong> */}
                                {/* <span><a href="https://mui.com/" className="text-decoration-underline" target="_blank" rel="noreferrer">{order.tableId}</a> <i className="bi bi-box-arrow-up-right"></i> </span> */}
                                <hr />
                                <h3 className="h6">Address</h3>
                                <address>
                                    <strong>02/09/2002</strong><br />
                                    Điện Biên Phủ<br />
                                    <abbr title="Phone">P:</abbr> Số điện thoại Bác sĩ
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BookingDetailByDoctor