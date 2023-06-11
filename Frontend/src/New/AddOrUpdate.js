import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from './EmployeeService';
import './AddorUpdate.css';

const AddOrUpdate = () => {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (age.length === 0 || salary.length === 0 || position.length === 0 || name.length === 0 || phone.length === 0) {
      alert('Enter all fields');
    } else if (phone.length < 10) {
      alert('Enter correct phone number!');
    } else if (age < 18 || age > 65) {
      alert('Enter correct age!');
    } else {
      setShowModal(true);
    }
  };

  const confirmSaveOrUpdate = () => {
    setShowModal(false);
    const employee = { id, name, age, phone, salary, position };
    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then((response) => {
          nav('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          nav('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setName(response.data.name);
        setAge(response.data.age);
        setPhone(response.data.phone);
        setPosition(response.data.position);
        setSalary(response.data.salary);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <h2>Employee Details</h2>
      <form onSubmit={saveOrUpdateEmployee}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        <br />
        <label>Phone:</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <br />
        <label>Position:</label>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <br />
        <label>Salary:</label>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <br />
        <button type="submit">Save</button>
        <Link to="/dashboard">
          <button>Cancel</button>
        </Link>
      </form>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Details!</h3>
            <p>Are you sure you want to save the employee details?</p>
            <div className="modal-actions">
              <button className="modal-confirm" onClick={confirmSaveOrUpdate}>Yes</button>
              <button className="modal-cancel" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOrUpdate;
