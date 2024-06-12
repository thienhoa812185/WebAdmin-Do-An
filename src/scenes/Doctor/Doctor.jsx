import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import { Button, Container, Grid, Typography } from "@mui/material";
import { CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import VisibilityIcon from '@mui/icons-material/Visibility';
import doctorService from "../../servicesss/doctorService";
import FormAddProduct from "../../components/FormAddProduct";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="col-md-10 mb-3">
      <div className="input-group">
        <span className="input-group-text">
          <i className="icon cil-magnifying-glass"></i>
        </span>
        <input
          className="form-control"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên bác sĩ bạn cần tìm ?"
        />
      </div>
    </div>
  );
}

function OrderFilter({ onOrderChange, onColumnChange, onStatusChange }) {
  const [orderDir, setOrderDir] = useState('');
  const [orderColumn, setOrderColumn] = useState('');
  const [status, setStatus] = useState('');

  const handleOrderDirChange = (event) => {
    setOrderDir(event.target.value);
    onOrderChange(event.target.value);
  };

  const handleColumnChange = (event) => {
    setOrderColumn(event.target.value);
    onColumnChange(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    onStatusChange(event.target.value);
  };

  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <label className="form-label" htmlFor="order-dir">Sắp xếp theo chiều</label>
        <select className="form-select" value={orderDir} onChange={handleOrderDirChange} required>
          <option value="">Chọn</option>
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label" htmlFor="order-column">Sắp xếp theo giá trị</label>
        <select className="form-select" value={orderColumn} onChange={handleColumnChange} required>
          <option value="">Chọn</option>
          <option value="id">ID</option>
          <option value="price">Giá khám</option>
          <option value="name">Họ tên</option>
        </select>
      </div>
      {/* <div className="col-md-4">
        <label className="form-label" htmlFor="status">Trạng thái</label>
        <select className="form-select" value={status} onChange={handleStatusChange} required>
          <option value="">Tất cả</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Vô hiệu hóa</option>
        </select>
      </div> */}
    </div>
  );
}

function SpecialityFilter({ onSpecialityChange }) {
  const [speciality, setSpeciality] = useState('');

  const handleSpecialityChange = (event) => {
    setSpeciality(event.target.value);
    onSpecialityChange(event.target.value);
  };

  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="speciality">Chuyên khoa</label>
      <select className="form-select" value={speciality} onChange={handleSpecialityChange} required>
        <option value="">Chọn...</option>
        <option value="Cơ Xương Khớp">Cơ Xương Khớp</option>
        <option value="Thần Kinh">Thần Kinh</option>
        <option value="Tiêu Hóa">Tiêu Hóa</option>
      </select>
    </div>
  );
}

function PositionFilter({ onPositionChange }) {
  const [position, setPosition] = useState('');

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    onPositionChange(event.target.value);
  };

  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="room">Chức vụ</label>
      <select className="form-select" value={position} onChange={handlePositionChange} required>
        <option value="">Chọn...</option>
        <option value="Tiến sĩ">Tiến sĩ</option>
        <option value="Thạc sĩ">Thạc sĩ</option>
        <option value="Bác sĩ Chuyên khoa II">Bác sĩ Chuyên khoa II</option>
        <option value="Bác sĩ Chuyên khoa I">Bác sĩ Chuyên khoa I</option>
        <option value="Bác sĩ">Bác sĩ</option>
      </select>
    </div>
  );
}

function PriceFilter({ onPriceChange }) {
  const [price, setPrice] = useState('');

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    onPriceChange(event.target.value);
  };

  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="length">Giá khám</label>
      <select className="form-select" value={price} onChange={handlePriceChange} required>
        <option value="">Chọn...</option>
        <option value="100000">Dưới 100.000đ</option>
        <option value="300000">Dưới 300.000đ</option>
        <option value="500000">Dưới 500.000đ</option>
      </select>
    </div>
  );
}

function Doctor() {
  const [doctorList, setDoctorList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDir, setOrderDir] = useState('');
  const [orderColumn, setOrderColumn] = useState('');
  const [status, setStatus] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [position, setPosition] = useState('');
  const [price, setPrice] = useState('');
  const [filteredDoctorList, setFilteredDoctorList] = useState([]);

  console.log(doctorList)

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, orderDir, orderColumn, status, speciality, position, price]);

  const init = () => {
    doctorService
      .getAllDoctor()
      .then((res) => {
        setDoctorList(res.data);
        setFilteredDoctorList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const applyFilters = () => {

    setFilteredDoctorList((prev) => {
      let filtered = [...doctorList];

      // Apply search term
      if (searchTerm) {
        filtered = filtered.filter(doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (status) {
        filtered = filtered.filter(doctor => doctor.status.toString() === status);
      }

      // Apply speciality filter
      if (speciality) {
        filtered = filtered.filter(doctor => doctor.speciality.name === speciality);
      }

      // Apply position filter
      if (position) {
        filtered = filtered.filter(doctor => doctor.position === position);
      }

      // Apply price filter
      if (price) {
        filtered = filtered.filter(doctor => doctor.examination_Price <= parseInt(price));
      }

      // Apply sorting
      if (orderColumn) {
        // console.log(orderDir)
        // console.log(orderColumn)
        filtered.sort((a, b) => {
          let compareA = a[orderColumn];
          let compareB = b[orderColumn];
          if (orderColumn === 'name') {
            compareA = compareA.toLowerCase();
            compareB = compareB.toLowerCase();
          }
          if (orderColumn === 'price') {
            compareA = a['examination_Price'];
            console.log(compareA)
            compareB = b['examination_Price'];
          }
          if (orderDir === 'asc') {
            return compareA > compareB ? 1 : -1;
          } else if (orderDir === 'desc') {
            return compareA < compareB ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      return filtered;
    })



  };

  return (
    <div className="body flex-grow-1 px-3">
      <div className="container-lg">
        <FormAddProduct handleRefreshProduct={init} />

        <div className="card mb-4">
          <div className="card-header"><strong>Bộ lọc tìm kiếm</strong></div>
          <div className="card-body">
            <div className="example">
              <SearchBar onSearch={setSearchTerm} />
              <OrderFilter
                onOrderChange={setOrderDir}
                onColumnChange={setOrderColumn}
                onStatusChange={setStatus}
              />
              <div className="row mb-3">
                <SpecialityFilter onSpecialityChange={setSpeciality} />
                <PositionFilter onPositionChange={setPosition} />
                <PriceFilter onPriceChange={setPrice} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              {filteredDoctorList.map((element, index) => (
                <Grid item xs={12} sm={4} ms={4} key={index}>
                  <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBottom: "30px" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={element.image}
                        alt="doctor"
                        style={{ borderRadius: "5px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {element.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {element.examination_Price} VND
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button variant="contained" color="success" size="medium" component={Link} to={"/viewDetailDoctor/" + element.id} startIcon={<VisibilityIcon />}>
                        Xem chi tiết
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
