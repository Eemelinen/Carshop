import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddCar from './AddCar';

// import './Carlist.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Carlist() {
  const [ cars, setCars ] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(data => data.json())
    .then(data => setCars(data._embedded.cars));
  }

  const deleteCar = link => {
    if(window.confirm('Are you sure you want to delete the car?'))
    fetch(link, {
      method: 'DELETE'
    })
    .then(() => handleClick())
    .then(res => fetchData())
    .catch(err => console.log(err));
  }

  const saveCar = car => {
    fetch('https://carstockrest.herokuapp.com/cars', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(res => fetchData())
    .catch(err => console.log(err))
  }

  const columns = [
    {
      Header: 'Brand',
      accessor: 'brand'
    },
    {
      Header: 'Model',
      accessor: 'model'
    },
    {
      Header: 'Color',
      accessor: 'color'
    },
    {
      Header: 'Fuel',
      accessor: 'fuel'
    },
    {
      Header: 'Year',
      accessor: 'year'
    },
    {
      Header: 'Price',
      accessor: 'price'
    },
    {
      width: 100,
      sortable: false,
      filterable: false,
      accessor: '_links.self.href',
      Cell: row => <Button size='small' color='secondary' onClick={() => deleteCar(row.value)}>Delete</Button>
    }
  ];

  return (
    <div className="carlist">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Car succesfully deleted.
          </Alert>
      </Snackbar>
      <AddCar saveCar={saveCar}/>
      <ReactTable filterable={true} data={cars} columns={columns}/>
    </div>
  );
}

export default Carlist;