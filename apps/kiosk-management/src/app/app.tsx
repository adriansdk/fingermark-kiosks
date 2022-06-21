/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import { useKiosk } from '@fingermark-workspace/data-access';
import { useRecoilState } from 'recoil';
import { userAtom } from './atoms/atoms';
import { IUser } from './interfaces/interfaces';
import LoginAndRegistration from './pages/LoginAndRegistrationPage';
import KioskManagementPage from './pages/KioskManagementPage';
import 'semantic-ui-css/semantic.min.css';

export function App() {
  const [user, setUser] = useRecoilState<IUser>(userAtom);

  useEffect(() => {
    const retrievedUser = localStorage.getItem('user');
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(retrievedUser!));
    }
  }, [setUser]);
  useKiosk();

  if (user.name !== '') {
    return <KioskManagementPage />;
  } else {
    return <LoginAndRegistration />;
  }
}

export default App;
