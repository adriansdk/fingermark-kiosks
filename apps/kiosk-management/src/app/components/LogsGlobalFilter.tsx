import {
  filteredLogsAtom,
  ILogs,
  logsAtom,
} from '@fingermark-workspace/data-access';
import { SyntheticEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Input } from 'semantic-ui-react';

function LogsGlobalFilter() {
  const logs = useRecoilValue<ILogs>(logsAtom);
  const setFilteredLogs = useSetRecoilState<ILogs>(filteredLogsAtom);

  function handleSearch(currentQuery: string) {
    return logs.filter((eachLog) => {
      return Object.values(eachLog)
        .join(' ')
        .toLowerCase()
        .includes(currentQuery.toLowerCase());
    });
  }

  function handleGlobalFilter(
    e: SyntheticEvent<HTMLElement, Event>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ) {
    const globalFilteredLogs = handleSearch(data.value);
    setFilteredLogs(globalFilteredLogs);
  }
  return (
    <div>
      <Input
        id="logs-global-filter"
        placeholder="Search by log ID, kiosk ID or action..."
        onChange={(e, data) => handleGlobalFilter(e, data)}
      />
    </div>
  );
}

export default LogsGlobalFilter;
