import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/lab';
import axios from 'axios';
import './Dashboard.css';
import EmployeeService from './EmployeeService';
import logo from './logo.png';
const Dashboard = () => {
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [employees, setEmployees] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    getAllEmployees();
  }, [currentPage, itemsPerPage, sortBy, sortOrder]);

  const getAllEmployees = () => {
    axios
      .get(`http://localhost:8080/employees/${currentPage}/${itemsPerPage}/${sortBy}/${sortOrder}`)
      .then((response) => {
        const { content, totalPages } = response.data;
        setEmployees(response.data);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const deleteEmployee = (employeeId) => {
    setConfirmAction(() => () => {
      EmployeeService.deleteEmployee(employeeId)
        .then((response) => {
          getAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setSelectedEmployeeId(employeeId);
    setShowConfirmation(true);
  };

  const deleteAllEmployee = () => {
    setConfirmAction(() => () => {
      EmployeeService.deleteAllEmployee()
        .then((response) => {
          getAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setSelectedEmployeeId(null);
    setShowConfirmation(true);
  };

  const confirmActionHandler = () => {
    setShowConfirmation(false);
    if (confirmAction) {
      confirmAction();
    }
  };

  const cancelActionHandler = () => {
    setShowConfirmation(false);
  };

  const LogoutHandler = () => {
    setConfirmAction(() => () => {
      nav('/');
    });
    setSelectedEmployeeId(null);
    setShowConfirmation(true);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="container">
    <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img alt="logo" src={logo} style={{ width: '50px' }} />
            <span className="logo-name">Scribble</span>
          </Link>
          <div className="nav-links">
            <Link to="/">
              <button className="nav-link">
                Home
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <h1 className='logo-name-dash'>Scribble Station</h1>

      <div className="actions-container">
        <div className="actions-buttons">
          <Link to="/add">
            <button id="addbtn">Add Products</button>
          </Link>
          <button id="delbtn" onClick={deleteAllEmployee}>
            Delete All Products
          </button>
          <button id="logout" onClick={LogoutHandler}>
          Logout
        </button>
        </div>
       
      </div>

      <table id="table">
        <thead>
          <tr>
            <th
              className={sortBy === 'id' ? sortOrder === 'asc' ? 'asc' : 'desc' : ''}
              onClick={() => handleSort('id')}
            >
              Id
            </th>
            <th
              className={sortBy === 'name' ? sortOrder === 'asc' ? 'asc' : 'desc' : ''}
              onClick={() => handleSort('name')}
            >
              Name
            </th>
            <th
              className={sortBy === 'age' ? sortOrder === 'asc' ? 'asc' : 'desc' : ''}
              onClick={() => handleSort('age')}
            >
              Age
            </th>
            <th>Phone</th>
            <th>Product</th>
            <th
              className={sortBy === 'salary' ? sortOrder === 'asc' ? 'asc' : 'desc' : ''}
              onClick={() => handleSort('salary')}
            >
              Price
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.content &&
            employees.content.map((employee) => (
              <tr key={employee.id}>
                <td id="id">{employee.id}</td>
                <td id="name">{employee.name}</td>
                <td id="age">{employee.age}</td>
                <td id="phone">{employee.phone}</td>
                <td id="pos">{employee.position}</td>
                <td id="salary">{employee.salary}</td>
                <td id="action">
                  <Link to={`/update/${employee.id}`}>
                    <button id="actions">Update</button>
                  </Link>
                  <button id="action-del" onClick={() => deleteEmployee(employee.id)}>
                    Delete!
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="small"
        />

        <div className="entries-per-page">
          <span>Entries per page:</span>
          <select value={itemsPerPage} onChange={handleEntriesPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h2>Confirmation</h2>
            <p>Are you sure?</p>
            <div className="confirmation-buttons">
              <button className='confirm-yes' onClick={confirmActionHandler}>Yes</button>
              <button onClick={cancelActionHandler}>No</button>
            </div>
          </div>+
        </div>
      )}
    </div>
  );
};

export default Dashboard;
