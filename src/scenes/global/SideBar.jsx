import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableBarIcon from '@mui/icons-material/TableBar';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { Category } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PeopleIcon from '@mui/icons-material/People';
import avatar from './1.png'
import { RoleContext } from "../../App";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const role = useContext(RoleContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/")
    window.location.reload();
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" fontWeight="bold" color={colors.grey[100]}>
                  ADAM CLINIC
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={avatar}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {role === "staff" ? "Staff" : "Admin"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {
              role === "doctor" ? (
                <>
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Dashboard
                  </Typography>
                  <Item
                    title="Dashboard"
                    to="/"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Speciality"
                    to="/speciality"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Order
                  </Typography>
                  <Item
                    title="Table Order Management"
                    to="/tableManagement"
                    icon={<TableBarIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Booking Management"
                    to="/appointmentDoctor"
                    icon={<TableBarIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/* <Item
                    title="Offline Order Management"
                    to="/offlineOrderManagement"
                    icon={<ShoppingCartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}

                  <Item
                    title="Online Order Management"
                    to="/onlineOrderManagement"
                    icon={<LocalShippingIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Log out
                  </Typography>
                  <Button variant="contained" color="success" onClick={handleLogOut} startIcon={<LogoutIcon />} sx={{ marginLeft: 5, width: "70%" }}>Log out</Button>
                </>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Dashboard
                  </Typography>
                  <Item
                    title="Dashboard"
                    to="/"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Chuyên khoa"
                    to="/speciality"
                    icon={<LocalHospitalIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Bác sĩ"
                    to="/doctor"
                    icon={<VaccinesIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Dịch vụ"
                    to="/serviceManagement"
                    icon={<VaccinesIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Người dùng"
                    to="/teamManagement"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />


                  <Item
                    title="Quản lý đặt lịch online"
                    to="/appointmentManagement"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Thống kê doanh thu"
                    to="/statistical"
                    icon={<BarChartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Quản lý thông tin cá nhân"
                    to="/personalInformation"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  {/* <Item
                    title="Bệnh nhân"
                    to="/patient"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  
                  <Item
                    title="Thống kê doanh thu"
                    to="/statistical"
                    icon={<BarChartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Product
                  </Typography>
                  <Item
                    title="Category Management"
                    to="/category"
                    icon={<Category />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Product Management"
                    to="/product"
                    icon={<CoffeeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Combo Management"
                    to="/comboManagement"
                    icon={<StorefrontIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    User
                  </Typography>

                  <Item
                    title="User Management"
                    to="/teamManagement"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Order
                  </Typography>
                  <Item
                    title="Table Order Management"
                    to="/tableManagement"
                    icon={<TableBarIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                  {/* <Item
                    title="Offline Order Management"
                    to="/offlineOrderManagement"
                    icon={<ShoppingCartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}

                  {/* <Item
                    title="Online Order Management"
                    to="/onlineOrderManagement"
                    icon={<LocalShippingIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Sales Revenue Management"
                    to="/statistical"
                    icon={<BarChartIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  /> */}
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Log out
                  </Typography>
                  <Button variant="contained" color="success" onClick={handleLogOut} startIcon={<LogoutIcon />} sx={{ marginLeft: 5, width: "70%" }}>Log out</Button>
                </>
              )
            }
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;