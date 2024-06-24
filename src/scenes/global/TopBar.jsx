import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Badge from '@mui/material/Badge';
import BasicMenu from "./BasicMenu";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Snackbar from '@mui/material/Snackbar';
import PopupNotification from "./PopupNotification";
import { useDispatch, useSelector } from "react-redux";
import notificationSlice from "../../redux/notificationSlice";
import updatedOrderDetailSlice from "../../redux/updatedOrderDetailSlice";
import { v4 as uuidv4 } from 'uuid';
import Slide from '@mui/material/Slide';
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const notificationAmount = useSelector((state) => state.notifications.notificationsQuantity)

  // Menu notification
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
  };

  // Notification
  const dispatch = useDispatch();

  const [notificationData, setNotificationData] = useState(null)
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false)
  };

  const incrementNotification = (notification) => {
    dispatch(
      notificationSlice.actions.addNotification(notification)
    );
  };
  const deleteNotification = (id) => {
    dispatch(
      notificationSlice.actions.deleteNotification({ id })
    );
  };

  // save extra food to local storage 
  const addUpdatedItemOrderDetail = (response) => {
    const tableId = response.data.tableId
    const orderDetails = response.data.orderDetails
    const item = {
      tableId: tableId,
      products: [

      ],
      combos: [

      ]
    }
    orderDetails.forEach(orderDetail => {
      if (orderDetail.combo !== null) {
        item.combos.push({
          id: orderDetail.combo.id,
          quantity: orderDetail.quantity
        })
      }
      if (orderDetail.product !== null) {
        item.products.push({
          id: orderDetail.product.id,
          quantity: orderDetail.quantity
        })
      }
    })
    dispatch(
      updatedOrderDetailSlice.actions.addUpdatedOrderDetail(item)
    )
  }

  const getNotificationContent = (wsDataRespone) => {
    if (wsDataRespone.message === "NEW_OFFLINE_ORDER") {
      return {
        content: `Table ${wsDataRespone.data.name} has been ordered`,
        route: `/tableManagement/viewOrderDetail/${wsDataRespone.data.id}`
      }
    }
    if (wsDataRespone.message === "ADD_ORDER_DETAIL") {
      addUpdatedItemOrderDetail(wsDataRespone)
      return {
        content: `Table ${wsDataRespone.data.tableName} has been add new foods`,
        route: `/tableManagement/viewOrderDetail/${wsDataRespone.data.tableId}`
      }
    }
    if (wsDataRespone.message === "CALL_STAFF") {
      return {
        content: `Client at table ${wsDataRespone.data.name} calling...`,
        route: '#' // TODO modify path here
      }
    }
    if (wsDataRespone.message === "NEW_ONLINE_ORDER") {
      return {
        content: `You have new online order`,
        route: `/viewOnlineOrderDetail/${wsDataRespone.data.id}` // TODO modify path here
      }
    }


    if (wsDataRespone.message === "NEW_DOCTOR_APPOINTMENT") {
      return {
        content: `Bạn có một cuộc hẹn của bệnh nhân: ${wsDataRespone.data}`,
        route: `/viewOnlineOrderDetail/${wsDataRespone.data}` // TODO modify path here
      }
    }
  }

  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_BE_URL}/ws`);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/notify', (response) => {
        const data = JSON.parse(response.body);
        console.log('data:', data);
        const contentRoute = getNotificationContent(data)
        const notificationDataToStoreInRedux = {
          id: uuidv4(),
          type: data.message,
          content: contentRoute.content,
          route: contentRoute.route
        }

        const role = localStorage.getItem("role");
        console.log(role)
        if (role === "admin") {
          incrementNotification(notificationDataToStoreInRedux)
          setNotificationData(notificationDataToStoreInRedux)
          setOpenAlert(true)
        }
      });
    });
  }, []);

  return (

    <Box display="flex" justifyContent="space-between" p={2}>

      {/* Notify order */}
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          width: '50%',
        }}
        TransitionComponent={Slide}
        TransitionProps={{
          direction: 'down', // Slide direction
        }}
      >
        <PopupNotification
          notificationData={notificationData}
          onCloseSnackbar={handleCloseAlert}
          handleClickCheck={deleteNotification}
        />
      </Snackbar>


      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleOpen} anchorEl={anchorEl}>
          <Badge badgeContent={notificationAmount} color="success">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <BasicMenu open={open} anchorEl={anchorEl} handleClose={handleClose} handleClickCheck={deleteNotification} />
      </Box>
    </Box>
  );
};

export default Topbar;