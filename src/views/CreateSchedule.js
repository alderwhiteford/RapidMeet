import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createSchedule } from '../services/scheduleApi';

function CreateSchedule() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreateSchedule = () => {
    createSchedule({
      name,
      start_time: '2023-09-09T10:00:00',
      end_time: '2023-09-09T12:00:00',
    }).then((res) => {
      navigate(`/${res.data.id}`);
    }).catch((error) => {
      // Todo: implement error handling
      console.log(error.message);
    });
  };

  return (
    <div>
      {/*Todo: Add form control and form components*/}
      <label htmlFor='name'>Schedule Name</label>
      <input id='name' type='text' onChange={(e) => setName(e.target.value)}/>
      <button onClick={handleCreateSchedule}>Create</button>
    </div>
  )
};

export default CreateSchedule;