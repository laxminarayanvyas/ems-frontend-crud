import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, listAllEmployees, updateEmployee } from '../services/EmployeeService';


const EmployeeComponent = () => {

    const navigator = useNavigate();
    const [first_name, setfirstName] = useState('')
    const [last_name, setlastName] = useState('')
    const [email_id, setemail] = useState('')
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email_id: ''
    });

    const {id}= useParams();

    const handleFirstName = (e) => setfirstName(e.target.value);
    const handleLastName = (e) => setlastName(e.target.value);
    const handleemail = (e) => setemail(e.target.value);

    useEffect(() => {
        // If there's an ID, fetch the employee details for editing
        if (id) {
            console.log("hi");
            listAllEmployees().then((response) => {
                const foundEmployee = response.data.find((emp) => emp.id === parseInt(id));
                if (foundEmployee) {
                    setfirstName(foundEmployee.first_name)
                    setlastName(foundEmployee.last_name)
                    setemail(foundEmployee.email_id)
                    setEmployee(foundEmployee);
                }
            }).catch(error => console.error("Error fetching employee:", error));
        }
    }, [id]);

    const saveOrUpdateEmployee  = (e) => {
        e.preventDefault();
        const employee = {first_name,last_name,email_id}
        if (id) {
            updateEmployee(id, employee)
                .then(() => navigator('/employees'))
                .catch(error => console.error("Error updating employee:", error));
        } else {
            createEmployee(employee)
                .then(() => navigator('/employees'))
                .catch(error => console.error("Error creating employee:", error));
        }
    }

    const pageTitle = id ? 'Update Employee' : 'Add Employee';

    return (
        <>
            <div className='container'>
                <br/>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3'>
                         <h2 className='text-center'>{pageTitle}</h2>

                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label htmlFor="FirstName" className='form-label'>First Name:</label>
                                    <input type="text"
                                    placeholder='Enter first name'
                                    name='first_name'
                                    value={first_name}
                                    className='form-control'
                                    onChange={handleFirstName} />
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="LastName" className='form-label'>Last Name:</label>
                                    <input type="text"
                                    placeholder='Enter last name'
                                    name='last_name'
                                    value={last_name}
                                    className='form-control'
                                    onChange={handleLastName} />
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="Email" className='form-label'>Email:</label>
                                    <input type="email"
                                    placeholder='Enter email'
                                    name='email_id'
                                    value={email_id}
                                    className='form-control'
                                    onChange={handleemail} />
                                </div>

                                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>
                                {id ? 'Update' : 'Submit'}
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <button onClick={() => navigator('/')}>Back to home</button>
            </div> */}
        </>
    )
}

export default EmployeeComponent