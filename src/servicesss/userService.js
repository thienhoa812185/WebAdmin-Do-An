import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL


class UserService {

    getAllUser() {
        return axios.get(API_URL + "/api/user/allUsers");
    }
    
    getRoleByUsername(username) {
        return axios.get(API_URL + "/api/user/getRoleByUsername?username=" + username);
    }

}

const userService = new UserService();

export default userService;
