import { Box, Grid, Paper } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chart from "./Chart";
import Deposits from "./Deposits";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { ThemeProvider } from '@emotion/react';
import bookingService from "../../servicesss/bookingService";


const defaultTheme = createTheme();
const Statistical = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [valueFromDate, setValueFromDate] = useState(dayjs('2024-05-15'));
  const [valueToDate, setValueToDate] = useState(dayjs('2024-06-10'));
  const [orderList, setOrderList] = useState([]);



  useEffect(() => {
    initBooking();
  }, [])

  const initBooking = () => {
    const role = localStorage.getItem("role")

    if (role === "doctor") {
      const username = localStorage.getItem("username")

      bookingService.getAllBookingDoctor(username)
        .then(res => {
          const order = []
          res.data.forEach(element => {
            if (element.statusPayment === 'PAID') {
              order.push(element);
            }
          })
          console.log(order)
          setOrderList(order);
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      bookingService.getAllBooking()
        .then(res => {
          const order = []
          res.data.forEach(element => {
            if (element.statusPayment === 'PAID') {
              order.push(element);
            }
          })
          console.log(order)
          setOrderList(order);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }


  return (
    <Container maxWidth="lg">
      <Box>
        <Header
          title="Thống kê doanh thu"
          subtitle="Thống kê doanh thu theo ngày"
        />
        {/* <TextField
          color="secondary"
          select
          required
          label="Statistics Follow"
          name="statisticsFollow"
          onChange={(e) => handleChangeStatisticsFollow(e)}
          sx={{ width: 300 }}
        >
          {
            statistics.map(element => (
              <MenuItem key={element.id} value={element.name}>
                {element.name}
              </MenuItem>
            ))
          }
        </TextField> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Từ ngày"
              value={valueFromDate}
              onChange={(newValue) => setValueFromDate(newValue)}
            />
            <DatePicker
              label="Đến ngày"
              value={valueToDate}
              onChange={(newValue) => setValueToDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          {/* <CssBaseline /> */}
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? colors.blueAccent[900]
                  : theme.palette.grey[900],
              flexGrow: 1,
              // height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Chart order={orderList} valueFromDate={valueFromDate} valueToDate={valueToDate} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 300,
                    }}
                  >
                    <Deposits order={orderList} valueFromDate={valueFromDate} valueToDate={valueToDate} />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Container>

  )
}

export default Statistical