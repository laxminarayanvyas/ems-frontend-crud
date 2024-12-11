import React, { useEffect, useState } from 'react'
import { deleteEmployee, listAllEmployees } from '../services/EmployeeService'
import EmployeeComponent from './EmployeeComponent'
import { useNavigate } from 'react-router-dom'

const AllEmployeesList = () => {

    const [employee, setemployee] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        listAllEmployees().then((response) => {
            // console.log(response.data);
            setemployee(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    const AddNewEmployee = () => {
        return <EmployeeComponent/>;
        // navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`)
    }

    const removeEmployee = (id) => {
        // const originalEmployees = employees;
        setemployee((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
        deleteEmployee(id).then((response) => {
            console.log('Employee deleted successfully');
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className='container'>
            <h2 className='text-center'>List of All Employees</h2>
            <button className='btn btn-primary mb-2'
                onClick={AddNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map(emp =>
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.email_id}</td>
                            <td>
                                <button className='btn btn-info'
                                    onClick={() => updateEmployee(emp.id)}>Update</button>
                                <button className='btn btn-danger'
                                    onClick={() => removeEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllEmployeesList