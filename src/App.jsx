import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AllEmployeesList from './components/AllEmployeesList'
import Demo from './components/Demo'
import EmployeeComponent from './components/EmployeeComponent'


function App() {

  return (
    <>
      <BrowserRouter>
        <Demo />
        <Routes>
          <Route path='/' element={<AllEmployeesList />}></Route>
          <Route path='/employees' element={<AllEmployeesList />}></Route>
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
