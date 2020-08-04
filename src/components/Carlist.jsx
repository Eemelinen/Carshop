import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import './Carlist.css';

function Carlist() {
  const [ cars, setCars ] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(data => data.json())
    .then(data => setCars(data._embedded.cars));
  }

  const deleteCar = link => {
    console.log(link);
    fetch(link, {
      method: 'DELETE'
    })
    .then(res => fetchData())
    .catch(err => console.log(err));
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
      accessor: '_links.self.href',
      Cell: row => <button onClick={() => deleteCar(row.value)}>Delete</button>
    }
  ];

  return (
    <div className="carlist">
      <ReactTable filterable={true} data={cars} columns={columns}/>
    </div>
  );
}

export default Carlist;