package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Employees;

public interface EmployeeRepository extends JpaRepository<Employees,Integer>{

}
