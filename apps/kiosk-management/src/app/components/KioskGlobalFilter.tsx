import {
  filteredKiosksAtom,
  IKiosk,
  kioskAtom,
} from '@fingermark-workspace/data-access';
import { SyntheticEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Input } from 'semantic-ui-react';

function KioskGlobalFilter() {
  const kiosks = useRecoilValue<IKiosk>(kioskAtom);
  const setFilteredKiosks = useSetRecoilState<IKiosk>(filteredKiosksAtom);

  function handleSearch(kiosks: IKiosk, currentQuery: string) {
    return kiosks.filter((eachKiosk) => {
      const {
        storeOpeningTime,
        storeClosingTime,
        isOpen,
        isActive,
        ...filteredPropertiesKiosk
      } = eachKiosk;
      return Object.values(filteredPropertiesKiosk)
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
    const globalFilteredKiosks = handleSearch(kiosks, data.value);
    setFilteredKiosks(globalFilteredKiosks);
  }
  return (
    <Input
      id="kiosk-global-filter"
      placeholder="Search by ID, description or serial key"
      onChange={(e, data) => handleGlobalFilter(e, data)}
    />
  );
}

export default KioskGlobalFilter;
