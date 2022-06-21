import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import EditKioskForm from '../components/EditKioskForm';

function EditKiosk() {
  return (
    <>
      <h1>Edit Kiosk</h1>
      <Link to="/">
        <Icon name="arrow alternate circle left outline"></Icon>Go back
      </Link>{' '}
      <div>
        {' '}
        <EditKioskForm />
      </div>
    </>
  );
}

export default EditKiosk;
