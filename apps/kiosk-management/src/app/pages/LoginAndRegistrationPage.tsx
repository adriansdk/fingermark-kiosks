import { loginUser, registerUser } from '@fingermark-workspace/data-access';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { Form, Button } from 'semantic-ui-react';
import { userAtom } from '../atoms/atoms';
import { IUser } from '../interfaces/interfaces';

function LoginAndRegistration() {
  const setUser = useSetRecoilState<IUser>(userAtom);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function submitRegister() {
    if (name && email) {
      const newUser = {
        name,
        email,
      };
      const newRegisteredUser = await registerUser(newUser);
      setUserCredentials(newRegisteredUser.email);
    }
  }

  async function setUserCredentials(userAuthentication: string) {
    const userData = await loginUser(userAuthentication);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  return (
    <div className="form-container">
      <h1>Welcome, please login!</h1>
      <Form className="create-form" onSubmit={() => submitRegister()}>
        <Form.Field required>
          <label>Name:</label>
          <input
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field required>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Button type={'submit'}>Login</Button>
      </Form>
    </div>
  );
}

export default LoginAndRegistration;
