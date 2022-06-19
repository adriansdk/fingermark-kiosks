import axios from 'axios';
import { editKiosk, getSingleKiosk } from '@fingermark-workspace/data-access';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Form } from 'semantic-ui-react';

export default function EditKioskForm() {
  const [description, setDescription] = useState('');
  const [storeOpeningTime, setStoreOpeningTime] = useState('09:00');
  const [storeClosingTime, setStoreClosingTime] = useState('17:00');
  const [isKioskActive, setIsKioskActive] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function setCurrentKiosk() {
      if (id) {
        const currentInfo = await getSingleKiosk(id);
        const data = currentInfo.data;
        setDescription(data.description);
        setIsKioskActive(data.isKioskActive);
        setStoreOpeningTime(data.storeOpeningTime);
        setStoreClosingTime(data.storeClosingTime);
      }
    }
    setCurrentKiosk();
  }, [id]);

  function submitEditRequest() {
    const newData = {
      description,
      storeClosingTime,
      storeOpeningTime,
      isKioskActive,
    };
    if (id) {
      editKiosk(newData, id);
    }
  }

  return (
    <div className="form-container">
      <Form className="create-form">
        <Form.Field>
          <label>Kiosk ID</label>
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
            defaultChecked={isKioskActive}
            onClick={() => setIsKioskActive(true)}
          />
          <Form.Field
            label="No"
            control="input"
            type="radio"
            name="activeKioskRadio"
            onClick={() => setIsKioskActive(false)}
          />
        </Form.Group>
        <Button onClick={submitEditRequest} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
