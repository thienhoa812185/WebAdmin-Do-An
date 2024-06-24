import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL


class PatientService {

    getAllPatient() {
        return axios.get(API_URL + "/api/patient");
    }
    

}

const patientService = new PatientService();

export default patientService;
