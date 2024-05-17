import axios from "axios";
const API_URL = process.env.REACT_APP_BE_URL


class ScheduleTimeService {

    getAllScheduleTime() {
        return axios.get(API_URL + "/api/scheduletime");
    }
    

}

const scheduleTimeService = new ScheduleTimeService();

export default scheduleTimeService;
