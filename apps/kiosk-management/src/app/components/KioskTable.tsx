import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import {
  deleteKiosk,
  filteredKiosksAtom,
  IKiosk,
  IUser,
  kioskAtom,
} from '@fingermark-workspace/data-access';
import { Button, Icon, Modal, Table } from 'semantic-ui-react';
import { useState } from 'react';
import KioskDropdownFilter from './KioskDropdownFilter';
import KioskGlobalFilter from './KioskGlobalFilter';
import { userAtom } from '../atoms/atoms';

function KioskTable() {
  const user = useRecoilValue<IUser>(userAtom);
  const [kiosks, setKiosks] = useRecoilState<IKiosk>(kioskAtom);
  const [filteredKiosks, setFilteredKiosks] =
    useRecoilState<IKiosk>(filteredKiosksAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState<string>('');

  function handleDeleteKiosk(kioskId: string) {
    deleteKiosk(kioskId, user.name);
    const updatedList = kiosks.filter((eachKiosk) => {
      return eachKiosk.id !== kioskId;
    });
    setKiosks(updatedList);
    setFilteredKiosks(updatedList);
    alert('Kiosk Deleted Succesfully');
    setIsModalOpen(false);
  }

  function handleDeleteModal(kioskId: string) {
    setToBeDeletedId(kioskId);
    setIsModalOpen(true);
  }

  function handleKioskRender() {
    const kioskRows = filteredKiosks.map((eachKiosk, idx) => {
      return (
        <Table.Row key={eachKiosk.id}>
          <Table.Cell>{eachKiosk.id}</Table.Cell>
          <Table.Cell>{eachKiosk.serialKey}</Table.Cell>
          <Table.Cell>{eachKiosk.description}</Table.Cell>
          <Table.Cell>{eachKiosk.isActive.toString()}</Table.Cell>
          <Table.Cell>{eachKiosk.isOpen}</Table.Cell>
          <Table.Cell>{eachKiosk.storeOpeningTime}</Table.Cell>
          <Table.Cell>{eachKiosk.storeClosingTime}</Table.Cell>
          <Table.Cell>
            <Link to={`log/${eachKiosk.id}`}>
              <Button animated="vertical">
                <Button.Content hidden>View</Button.Content>
                <Button.Content visible>
                  <Icon name="file alternate" />
                </Button.Content>
              </Button>
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`edit/${eachKiosk.id}`}>
              <Button primary animated="vertical">
                <Button.Content hidden>Edit</Button.Content>
                <Button.Content visible>
                  <Icon name="edit" />
                </Button.Content>
              </Button>
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Button
              animated="vertical"
              color={'red'}
              onClick={() => handleDeleteModal(eachKiosk.id)}
            >
              <Button.Content hidden>Delete</Button.Content>
              <Button.Content visible>
                <Icon name="trash" />
              </Button.Content>
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return kioskRows;
  }

  if (filteredKiosks.length > 0) {
    return (
      <div>
        <div id="filter-container">
          <KioskGlobalFilter />
          <KioskDropdownFilter />
        </div>
        <div className="table-container">
          <Table id="table" celled singleLine textAlign={'center'}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Serial Key</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Is active?</Table.HeaderCell>
                <Table.HeaderCell>Is open?</Table.HeaderCell>
                <Table.HeaderCell>Opens at:</Table.HeaderCell>
                <Table.HeaderCell>Closes at:</Table.HeaderCell>
                <Table.HeaderCell>View Log</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{handleKioskRender()}</Table.Body>
          </Table>
          <Modal
            size="mini"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <Modal.Header>Delete Kiosk</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete Kiosk ID {toBeDeletedId}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => setIsModalOpen(false)}>
                No
              </Button>
              <Button positive onClick={() => handleDeleteKiosk(toBeDeletedId)}>
                Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <div id="filter-container">
          <KioskGlobalFilter />
          <KioskDropdownFilter />
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Serial Key</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Is kiosk active?</Table.HeaderCell>
              <Table.HeaderCell>Is kiosk open?</Table.HeaderCell>
              <Table.HeaderCell>Opens at:</Table.HeaderCell>
              <Table.HeaderCell>Closes at:</Table.HeaderCell>
              <Table.HeaderCell>Kiosk Log</Table.HeaderCell>
              <Table.HeaderCell>Edit Kiosk</Table.HeaderCell>
              <Table.HeaderCell>Delete Kiosk</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body id="no-results">
            <p>No kiosks match the search criteria</p>
          </Table.Body>
        </Table>
      </div>
    );
}

export default KioskTable;
