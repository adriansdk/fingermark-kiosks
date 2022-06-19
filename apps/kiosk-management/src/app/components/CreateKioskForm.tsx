import { createKiosk } from '@fingermark-workspace/data-access';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

export default function CreateKioskForm() {
  const [description, setDescription] = useState('');
  const [storeOpeningTime, setStoreOpeningTime] = useState('09:00');
  const [storeClosingTime, setStoreClosingTime] = useState('17:00');
  const [isKioskActive, setIsKioskActive] = useState(true);

  function submitCreateRequest() {
    createKiosk({
      description,
      storeOpeningTime,
      storeClosingTime,
      isKioskActive,
    });
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
        <Button onClick={submitCreateRequest} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
