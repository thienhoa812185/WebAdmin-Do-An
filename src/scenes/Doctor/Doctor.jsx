
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



function SearchBar({ onSearch, onReset }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    onReset();
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
          placeholder="Bạn đang cần tìm gì?"
        />
        <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
        <button className="btn btn-danger" onClick={handleReset}>Làm mới</button>
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
          <option value="asc">Mặc định</option>
          <option value="asc">Từ trên xuống dưới</option>
          <option value="desc">Từ dưới lên trên</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label" htmlFor="order-column">Sắp xếp theo giá trị</label>
        <select className="form-select" value={orderColumn} onChange={handleColumnChange} required>
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="name">Họ tên</option>
          <option value="price">Mức giá</option>
          <option value="role">Vai trò</option>
          <option value="create_at">Thời gian tạo</option>
          <option value="update_at">Thời gian cập nhật lần cuối</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label" htmlFor="status">Trạng thái</label>
        <select className="form-select" value={status} onChange={handleStatusChange} required>
          <option value="1">Đang hoạt động</option>
          <option value="0">Vô hiệu hóa</option>
        </select>
      </div>
    </div>
  );
}

function SpecialityFilter() {
  // Placeholder for speciality filter
  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="speciality">Sắp xếp theo chuyên khoa</label>
      <select className="form-select" required>
        <option disabled>Chọn...</option>
      </select>
    </div>
  );
}

function RoomFilter() {
  // Placeholder for room filter
  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="room">Sắp xếp theo phòng khám</label>
      <select className="form-select" required>
        <option disabled>Chọn...</option>
      </select>
    </div>
  );
}

function LengthFilter() {
  // Placeholder for length filter
  return (
    <div className="col-md-4">
      <label className="form-label" htmlFor="length">Số lượng kết quả trả về</label>
      <select className="form-select" required>
        <option disabled>Chọn...</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
    </div>
  );
}

function AppointmentsList() {
  // Placeholder for appointments list
  return (
    <div className="col-md-12">
      <div className="card mb-4">
        <div className="card-header">Danh sách khám bệnh</div>
        <div className="card-body">
          {/* Placeholder for appointments table */}
        </div>
        <ul id="pagination" className="pagination pagination justify-content-center">
          <li id="button-previous" className="page-item page-link disabled">Previous</li>
          <li id="current-page" className="page-item page-link">1</li>
          <li id="button-next" className="page-item page-link">Next</li>
        </ul>
      </div>
    </div>
  );
}

function Doctor() {

  const [doctorList, setDoctorList] = useState([]);
  console.log(doctorList);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    doctorService
      .getAllDoctor()
      .then((res) => {
        setDoctorList(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // Placeholder for search and filter handlers
  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  const handleOrderChange = (orderDir) => {
    console.log('Order direction:', orderDir);
  };

  const handleColumnChange = (orderColumn) => {
    console.log('Order column:', orderColumn);
  };

  const handleStatusChange = (status) => {
    console.log('Status:', status);
  };

  return (
    <div className="body flex-grow-1 px-3">
      <div className="container-lg">
        {/* <div className="card mb-4">
          <div className="card-header"><strong>Bộ lọc tìm kiếm</strong></div>
          <div className="card-body">
            <div className="example">
              <SearchBar onSearch={handleSearch} onReset={() => console.log('Reset')} />
              <OrderFilter
                onOrderChange={handleOrderChange}
                onColumnChange={handleColumnChange}
                onStatusChange={handleStatusChange}
              />
              <div className="row mb-3">
                <SpecialityFilter />
                <RoomFilter />
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <Container maxWidth="lg">
            <FormAddProduct handleRefreshProduct={init} />
            <Grid container spacing={5}>
              {doctorList.map((element, index) => (
                <Grid item xs={12} sm={4} ms={4} key={index}>
                  <Card sx={{ maxWidth: 345 }} style={{ padding: "10px", marginBotton: "30px" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={element.image}
                        alt="green iguana"
                        style={{ borderRadius: "5px" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {element.name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                                        {element.description}
                                    </Typography> */}
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button variant="contained" color="success" size="medium" component={Link} to={"/viewDetailDoctor/" + element.id} startIcon={<VisibilityIcon />}>
                        Xem chi tiết
                      </Button>
                      {/* <FormUpdateCategory name={element.name} id={element.id} handleRefreshCategory={init} />
                                <DeleteDialog name="category" id={element.id} handleRefreshCategory={init} /> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))
              }
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Doctor