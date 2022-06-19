import { useEffect } from 'react';
import { useSetRecoilState, atom } from 'recoil';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios').default;

interface IKioskProperties {
  id: string;
  serialKey: string;
  description: string;
  isKioskActive: boolean;
  storeOpeningTime: string;
  storeClosingTime: string;
}

export type IKiosk = Array<IKioskProperties>;

export const kioskAtom = atom({
  key: 'kioskAtom',
  default: [] as IKiosk,
});

export async function deleteKiosk(kioskId: string) {
  try {
    await axios.delete(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks/${kioskId}`
    );
  } catch (error) {
    console.error(error);
  }
}

export async function editKiosk(kioskData: object, kioskId: string) {
  try {
    await axios.put(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks/${kioskId}`,
      kioskData
    );
  } catch (error) {
    console.error(error);
  }
}

export async function createKiosk(kioskData: object) {
  try {
    await axios.post(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks`,
      kioskData
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleKiosk(kioskId: string) {
  try {
    const response = await axios.get(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks/${kioskId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function useKiosk() {
  const setKiosk = useSetRecoilState(kioskAtom);

  useEffect(() => {
    async function getAllKiosks() {
      try {
        const response = await axios.get(
          `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks`
        );
        setKiosk(response.data);
        console.log(response.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    getAllKiosks();
  }, []);
}
