import { createKiosk, IUser } from '@fingermark-workspace/data-access';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Form, Modal } from 'semantic-ui-react';
import { userAtom } from '../atoms/atoms';

export default function CreateKioskForm() {
  const user = useRecoilValue<IUser>(userAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [storeOpeningTime, setStoreOpeningTime] = useState('09:00');
  const [storeClosingTime, setStoreClosingTime] = useState('17:00');
  const [isActive, setIsActive] = useState(true);

  function submitCreateRequest() {
    createKiosk(
      {
        description,
        storeOpeningTime,
        storeClosingTime,
        isActive,
      },
      user.name
    );
    alert('Kiosk Created Succesfully')
    setIsModalOpen(false);
  }

  return (
    <div className="form-container">
      <Form className="create-form">
        <Form.Field required>
          <label>Description</label>
          <input
            placeholder="Drive-thru Kiosk"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Store opening time</label>
          <input
            type="time"
            value={storeOpeningTime}
            onChange={(e) => setStoreOpeningTime(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label>Store closing time</label>
          <input
            type="time"
            value={storeClosingTime}
            onChange={(e) => setStoreClosingTime(e.target.value)}
          />
        </Form.Field>
        <Form.Group grouped>
          <label>Is kiosk active?</label>
          <Form.Field
            label="Yes"
            control="input"
            type="radio"
            name="activeKioskRadio"
            defaultChecked={isActive}
            onClick={() => setIsActive(true)}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="activeKioskRadio"
            onClick={() => setIsActive(false)}
          />
        </Form.Group>
        <Button onClick={() => setIsModalOpen(true)} type="submit">
          Create Kiosk
        </Button>
        <Modal
          size="mini"
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Modal.Header>Create Kiosk</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to create a new kiosk?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setIsModalOpen(false)}>
              No
            </Button>
            <Button positive onClick={() => submitCreateRequest()}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Form>
    </div>
  );
}
