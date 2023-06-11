import axios from 'axios'

const URL = 'http://localhost:8080/employees';
const url='/get?page=${currentPage}&size=${itemsPerPage}'
class EmployeeService{

    getAllEmployees(){
        return axios.get(URL)
    }
    getEmployeesPage(){
        return axios.get(URL+url);
    }

    createEmployee(employee){
        return axios.post(URL,employee)
    }

    getEmployeeById(employeeId){
        return axios.get(URL + '/' + employeeId);
    }

    updateEmployee(employeeId, employee){
        return axios.put(URL + '/' +employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(URL + '/' + employeeId);
    }
    deleteAllEmployee(employeeId){
        return axios.delete(URL);
    }
}

export default new EmployeeService();