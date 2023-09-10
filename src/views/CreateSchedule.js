import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createSchedule } from '../services/scheduleApi';

function CreateSchedule() {
  // Grab schedule state via useSelector here
  // We will also ofc have better form control, this useState is just temporary for simplicity
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreateSchedule = () => {
    createSchedule({
      name,
      start_time: '2023-09-09T10:00:00',
      end_time: '2023-09-09T12:00:00',
    }).then((res) => {
      // I think due to user flow of being able to access the schedule /:id page without going through here, we should only use setSelectedSchedule once the user is on the schedule page
      navigate(`/${res.data.id}`);
    }).catch((error) => {
      // We'll figure out error handling
      console.log(error.message);
    });
  };

  return (
    <div>
      {/*Form stuff goes here*/}
      <label htmlFor='name' onChange={(e) => setName(e.target.value)}>Schedule Name</label>
      <input id='name' type='text'/>
      <button onClick={handleCreateSchedule}>Create</button>
    </div>
  )
};

export default CreateSchedule;