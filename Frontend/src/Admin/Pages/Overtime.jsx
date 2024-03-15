import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Overtime = () => {
  const overtimeRates = [
    {id: 1, position: 'Developer', rate: 500.00 },
    {id: 2, position: 'Manager', rate: 700.00 },
    {id: 3, position: 'Trainer', rate: 600.00 },
    {id: 4, position: 'Worker', rate: 300.00 },
    {id: 5, position: 'Designer', rate: 400.00 }
  ]
  return (
    <div className='ovetimePage'>
       <div className="header1">
        <h1>Overtime.</h1>
        <div className="generate">
          <span>+ Add</span>
        </div>
      </div>

      <div className="ovetimeRatesList">
        <table>
          <thead>
          <tr>
            <td>ID</td>
            <td>Position</td>
            <td>Rate/Hour</td>
            <td>Action</td>
          </tr>
          </thead>
          <tbody>
            {overtimeRates.map(overtimeRate =>(
              <tr key={overtimeRate.id}>
                <td>{overtimeRate.id}</td>
                <td>{overtimeRate.position}</td>
                <td>{overtimeRate.rate}</td>
                <td>
                <div className="action-icons">
                    <FaEdit  className="icon2" />
                    <FaTrash className="icon3" />
                  </div>                 
                  </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>

    </div>
  )
}

export default Overtime