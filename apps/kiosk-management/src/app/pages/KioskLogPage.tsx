import {
  filteredLogsAtom,
  getKiosksLogs,
  ILog,
  ILogs,
  logsAtom,
} from '@fingermark-workspace/data-access';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Icon } from 'semantic-ui-react';
import LogsGlobalFilter from '../components/LogsGlobalFilter';

function KioskLog() {
  const { id } = useParams();

  const [logs, setLogs] = useRecoilState<ILogs>(logsAtom);
  const [filteredLogs, setFilteredLogs] =
    useRecoilState<ILogs>(filteredLogsAtom);

  useEffect(() => {
    async function setCurrentKiosk() {
      const allLogs = await getKiosksLogs();
      if (id) {
        const data = allLogs.filter((eachLog: ILog) => eachLog.kioskId === id);
        setLogs(data);
        setFilteredLogs(data);
      } else {
        setLogs(allLogs);
        setFilteredLogs(allLogs);
      }
    }
    setCurrentKiosk();
  }, [id, setFilteredLogs, setLogs]);

  function handleLogsRender() {
    return filteredLogs.map((eachLog: ILog) => {
      return (
        <div className="log" key={eachLog.id}>
          Kiosk {eachLog.kioskId} was {eachLog.action} by {eachLog.userName}
        </div>
      );
    });
  }

  if (id && logs) {
    return (
      <>
        <h1>Kiosk ID {id} Logs</h1>
        <Link to="/">
          <Icon name="arrow alternate circle left outline"></Icon>Go back
        </Link>{' '}
        {<LogsGlobalFilter />}
        {handleLogsRender()}
      </>
    );
  } else {
    return (
      <>
        <h1>Every Kiosks Logs {id}</h1>
        <Link to="/">
          <Icon name="arrow alternate circle left outline"></Icon>Go back
        </Link>{' '}
        {<LogsGlobalFilter />}
        {handleLogsRender()}
      </>
    );
  }
}

export default KioskLog;
