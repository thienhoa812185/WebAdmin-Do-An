import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class SpecialityService {

    getAllSpeciality() {
        return axios.get(API_URL + "/api/speciality");
    }

    saveSpeciality(speciality) {
        return axios.post(API_URL + "/api/speciality/add", speciality, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    updateSpecialityNotImage(id, speciality) {
        return axios.put(API_URL + `/api/speciality/update/${id}`, speciality, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    deleteSpeciality(id) {
        return axios.delete(API_URL + "/api/speciality/delete/" + id)
    }

}


const specialityService = new SpecialityService();

export default specialityService