import React, { useState } from 'react'
import './Overtime.scss';
import OvertimeList from '../features/Overtime/OvertimeList';

const Overtime = () => {



  return (
    <div className='ovetimePage'>
       <div className="header1">
        <h1>Overtime.</h1>
        <div className="generate">
          <span >+ Add</span>
        </div>
      </div>

      <div className="ovetimeRatesList">
        
      

        <OvertimeList />
      {/* {showForm && <AddPosition onClose={toggleForm} />} */}
     
     {/* <OvertimeList overtimes={overtimes} onDeleteOvertime={handleDeleteOvertime} /> */}
      
      </div>

    </div>
  )
}

export default Overtime;