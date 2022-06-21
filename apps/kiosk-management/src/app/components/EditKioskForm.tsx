import {
  editKiosk,
  getSingleKiosk,
  IUser,
} from '@fingermark-workspace/data-access';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { Button, Form, Modal } from 'semantic-ui-react';
import { userAtom } from '../atoms/atoms';

export default function EditKioskForm() {
  const user = useRecoilValue<IUser>(userAtom);
  const [description, setDescription] = useState('');
  const [storeOpeningTime, setStoreOpeningTime] = useState('09:00');
  const [storeClosingTime, setStoreClosingTime] = useState('17:00');
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function setCurrentKiosk() {
      if (id) {
        const currentInfo = await getSingleKiosk(id);
        if (currentInfo) {
          const data = currentInfo.data;
          setDescription(data.description);
          setIsActive(data.isActive);
          setStoreOpeningTime(data.storeOpeningTime);
          setStoreClosingTime(data.storeClosingTime);
        }
      }
    }
    setCurrentKiosk();
  }, [id]);

  function submitEditRequest() {
    if (id && user.id) {
      const newData = {
        id,
        description,
        storeClosingTime,
        storeOpeningTime,
        isActive,
      };
      editKiosk(newData, user.name);
      alert('Kiosk Edited Succesfully')
      setIsModalOpen(false);
    }
  }

  return (
    <div className="form-container">
      <Form className="create-form">
        <Form.Field>
          <label>Kiosk ID (not editable)</label>
          <input disabled value={id} />
        </Form.Field>
        <Form.Field required>
          <label>Description</label>
          <input
            value={description}
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
        <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
      </Form>
      <Modal
        size="mini"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header>Edit Kiosk</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to edit Kiosk ID {id}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setIsModalOpen(false)}>
            No
          </Button>
          <Button positive onClick={() => submitEditRequest()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
