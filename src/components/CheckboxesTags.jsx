import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import scheduleTimeService from '../servicesss/scheduleTimeService';
import { Box, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import doctorService from '../servicesss/doctorService';


export default function CheckboxesTags({ id, time }) {

    const [originalArray, setOriginalArray] = React.useState([])
    // State to store all schedule times
    const [scheduleTime, setScheduleTime] = React.useState([]);

    // State to store selected schedule times
    const [selectTimeList, setSelectTime] = React.useState([]);

    // Function to map schedule times with status 0 to their scheduleTime
    const mapToScheduleTime = (time) => {
        return time
            .filter(element => element.status === 0)
            .map(element => element.scheduleTime);
    };

    // Effect to fetch schedule times and set initial selected times
    React.useEffect(() => {
        scheduleTimeService.getAllScheduleTime()
            .then(res => {
                setOriginalArray(res.data)
                const array1 = res.data;
                const array2 = mapToScheduleTime(time)

                const filteredArray = array1.filter(item1 => !array2.some(item2 => item1.time === item2.time));

                console.log(filteredArray);

                setScheduleTime(filteredArray);
                setSelectTime(mapToScheduleTime(time));
            })
            .catch(err => {
                console.log(err);
            });
    }, [time]);

    // Handle change in selected times
    const handleChange = (event, newValue) => {
        setSelectTime(newValue);
        const filteredArray = originalArray.filter(item1 => !newValue.some(item2 => item1.time === item2.time));

        setScheduleTime(filteredArray);

    };

    // Handle form submission to update doctor's schedule
    const handleSubmitWorkingHour = () => {
        doctorService.updateScheduleDoctor(id, selectTimeList)
            .then(res => {
                console.log("Update Thanh Cong");
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={scheduleTime} // Ensure options are defined
                getOptionLabel={(option) => option.time} // Handle undefined options
                value={selectTimeList} // Use the state for the value
                filterSelectedOptions
                onChange={handleChange} // Handle change
                sx={{ backgroundColor: 'primary.main', width: "500px" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Choose medical examination hours"
                        placeholder="Hour"
                    />
                )}
            />
            <Button
                variant="contained"
                color="success"
                size="medium"
                startIcon={<VisibilityIcon />}
                onClick={handleSubmitWorkingHour}
                sx={{ marginRight: 40 }}>
                Cập nhật giờ khám
            </Button>
        </Box>
    );
}
