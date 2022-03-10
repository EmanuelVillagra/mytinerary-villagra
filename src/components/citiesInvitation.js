import '../App.css';
import { Link as Linkrouter } from 'react-router-dom';
import { Button } from '@mui/material';

function GoToCities() {
  return (
    <div className='goToCities'>
        <h2>You wanna see our itineraries and activities?</h2>
        <Button >
        <Linkrouter className='buttonInvitation' to='/cities'>
          Click here!
        </Linkrouter>
          </Button>
    </div>
  );
}

export default GoToCities;
