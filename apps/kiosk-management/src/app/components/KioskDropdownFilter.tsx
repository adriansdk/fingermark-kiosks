import {
  filteredKiosksAtom,
  IKiosk,
  kioskAtom,
} from '@fingermark-workspace/data-access';
import { SyntheticEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'open', text: 'Open', value: 'open' },
  { key: 'closed', text: 'Closed', value: 'closed' },
  { key: 'active', text: 'Active', value: 'active' },
  { key: 'inactive', text: 'Inactive', value: 'inactive' },
];

const KioskDropdownFilter = () => {
  const kiosks = useRecoilValue<IKiosk>(kioskAtom);
  const setFilteredKiosks = useSetRecoilState<IKiosk>(filteredKiosksAtom);

  function handleFilters(
    e: SyntheticEvent<HTMLElement, Event>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newFilter: any
  ) {
    let filtered: IKiosk = [];
    if (newFilter.value.length === 0) {
      setFilteredKiosks(kiosks);
      return;
    }
    if (newFilter.value.includes('open')) {
      filtered = [...new Set([...filtered, ...filterByIsOpen('open')])];
    }
    if (newFilter.value.includes('closed')) {
      filtered = [...new Set([...filtered, ...filterByIsOpen('closed')])];
    }
    if (newFilter.value.includes('active')) {
      filtered = [...new Set([...filtered, ...filterByIsActive(true)])];
    }
    if (newFilter.value.includes('inactive')) {
      filtered = [...new Set([...filtered, ...filterByIsActive(false)])];
    }
    setFilteredKiosks(filtered);
  }

  function filterByIsOpen(filterType: string) {
    const filteredByOpen = kiosks.filter(
      (eachKiosk) => eachKiosk.isOpen === filterType
    );
    return filteredByOpen;
  }

  function filterByIsActive(filterType: boolean) {
    const filteredByIsActive = kiosks.filter(
      (eachKiosk) => eachKiosk.isActive === filterType
    );
    return filteredByIsActive;
  }

  return (
    <Dropdown
      id="dropdown-filter"
      placeholder="Filter Kiosks by:"
      fluid
      multiple
      selection
      defaultSearchQuery="all"
      onChange={(e, data) => handleFilters(e, data)}
      options={options}
    />
  );
};

export default KioskDropdownFilter;
