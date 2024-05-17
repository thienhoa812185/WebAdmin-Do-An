import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL

class AdminActionService {

    createAccountForDoctor(doctor) {
        return axios.post(API_URL + "/api/adminAction/createAccountForDoctor", doctor);
    }

    deleteAccountUser(username) {
        return axios.delete(API_URL + "/api/adminAction/deleteUserAccount", {
            params: {
                username: username
            }
        });
    }

    resetUserPassword(username) {
        return axios.put(API_URL + `/api/adminAction/resetUserPassword?username=${encodeURIComponent(username)}`);
    }

}

const adminActionService = new AdminActionService();

export default adminActionService;
