import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import CreateKioskForm from '../components/CreateKioskForm';

function CreateKiosk() {
  return (
    <>
      <h1>Create new Kiosk</h1>
      <Link to="/">
        <Icon name="arrow alternate circle left outline"></Icon>Go back
      </Link>
      <div>
        <CreateKioskForm />
      </div>
    </>
  );
}

export default CreateKiosk;
