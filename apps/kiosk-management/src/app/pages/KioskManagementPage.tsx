import { IUser } from '@fingermark-workspace/data-access';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '../atoms/atoms';
import { Button } from 'semantic-ui-react';
import KioskTable from '../components/KioskTable';

function KioskManagementPage() {
  const [user, setUser] = useRecoilState<IUser>(userAtom);

  function handleLogout() {
    localStorage.clear();
    setUser({ name: '', email: '' });
  }

  return (
    <>
      <h1>Kiosks list</h1>
      <h2>Logged in as: {user.name}</h2>{' '}
      <Link to="create">
        <Button id="create-kiosk-button">Create new Kiosk</Button>
      </Link>
      <Link to="log">
        <Button id="view-logs-button">View all logs</Button>
      </Link>
      <span>
        <Button id="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </span>
      <div>
        <KioskTable />
      </div>
    </>
  );
}

export default KioskManagementPage;
