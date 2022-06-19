// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import Table from './components/KioskTable';
import { useKiosk } from '@fingermark-workspace/data-access';
import 'semantic-ui-css/semantic.min.css'


export function App() {
  useKiosk();
  return (
    <>
      <Table />
      <div />
    </>
  );
}

export default App;
