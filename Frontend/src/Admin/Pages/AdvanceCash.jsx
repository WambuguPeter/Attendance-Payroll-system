import React, { useState } from 'react'
import './Advancecash.scss';
import AdvanceCashlList from '../features/AdvanceCash/AdvancecashList';
import AddAdvanceCash from '../features/AdvanceCash/CreateAdvance';

const Advancecash = () => {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm)}
    // setShowForm((prevState) => !prevState);}
  
  return (
    <div className='advancecash'>
       <div className="header1">
        <h1>Advancecash.</h1>
        <div className="generate">
        <span onClick={toggleForm}>+ Add</span>
        </div>
      </div>

      <div className="list">
      {showForm && <AddAdvanceCash onClose={toggleForm} />}
        <AdvanceCashlList />
      </div>

      

    </div>
  )
}

export default Advancecash;