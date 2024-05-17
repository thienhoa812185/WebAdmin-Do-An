import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class BookingService {

    getAllBooking() {
        return axios.get(API_URL + "/api/booking/admin");
    }

    getBookingAdminById(idBooking) {
        return axios.get(API_URL + "/api/booking/admin/getById/" + idBooking);
    }

    getAllBookingDoctor(username) {
        return axios.get(API_URL + "/api/booking/getBookingByUsernameDoctor/" + username);
    }

    updateStatusBooking(idBooking, status) {
        return axios.post(API_URL + "/api/booking/updateStatusBooking/" + idBooking, status);
    }

    updateConcludeBooking(idBooking, data) {
        return axios.post(API_URL + "/api/booking/updateConclude/" + idBooking, data);
    }

    // updateStatusOrder(idOrder, statusOrder) {
    //     return axios.put(API_URL + "/api/booking/updateStatusBooking/" + idOrder, { orderStatus: statusOrder }, { headers });
    // }

}


const bookingService = new BookingService();

export default bookingService