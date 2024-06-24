import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class DoctorService {

    getAllDoctor() {
        return axios.get(API_URL + "/api/doctor");
    }

    saveDoctor(doctor) {
        return axios.post(API_URL + "/api/doctor/add", doctor, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    getDoctorById(id) {
        return axios.get(API_URL + "/api/doctor/getById/" + id);
    }

    getDoctorByUsername(username) {
        return axios.get(API_URL + "/api/doctor/getByUsername/" + username)
    }

    updateScheduleDoctor(id, schedule) {
        return axios.put(API_URL + "/api/doctor/updateScheduleDoctor/" + id, schedule);
    }

    updateInfomationDoctor(id, doctor) {
        return axios.put(API_URL + "/api/doctor/updateInformationDoctor/" + id, doctor, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    deleteDoctor(id) {
        return axios.delete(API_URL + "/api/doctor/delete/" + id)
    }

}


const doctorService = new DoctorService();

export default doctorService