import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import { useSetRecoilState, atom } from 'recoil';

export interface IKioskProperties {
  id: string;
  serialKey: string;
  description: string;
  isOpen: string;
  isActive: boolean;
  storeOpeningTime: string;
  storeClosingTime: string;
}

export interface ICreateKioskSchema {
  description: string;
  isActive: boolean;
  storeOpeningTime: string;
  storeClosingTime: string;
}

export interface IEditKioskSchema {
  id: string;
  description: string;
  isActive: boolean;
  storeOpeningTime: string;
  storeClosingTime: string;
}

export interface ILog {
  id: string;
  action: string;
  kioskId: string;
  userName: string;
}

export interface IUser {
  id?: string;
  name: string | '';
  email: string | '';
}

export type ILogs = Array<ILog>;

export type IKiosk = Array<IKioskProperties>;

export const kioskAtom = atom({
  key: 'kioskAtom',
  default: [] as IKiosk,
});

export const filteredKiosksAtom = atom({
  key: 'filteredKiosks',
  default: [] as IKiosk,
});

export const logsAtom = atom({
  key: 'logsAtom',
  default: [] as ILogs,
});

export const filteredLogsAtom = atom({
  key: 'filteredLogs',
  default: [] as ILogs,
});

export async function createLog(
  action: string,
  kioskId: string,
  userName: string
) {
  const newLog = {
    action,
    kioskId,
    userName,
  };
  try {
    await axios.post(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/log`,
      newLog
    );
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(userEmail: string) {
  try {
    const response = await axios.get(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/user`
    );
    const loggedInUser = response.data.filter(
      (user: IUser) => user.email === userEmail
    );
    return loggedInUser[0];
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(userData: IUser) {
  try {
    const response = await axios.post(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/user/`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteKiosk(kioskId: string, userName: string) {
  try {
    await axios.delete(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks/${kioskId}`
    );
    createLog('deleted', kioskId, userName);
  } catch (error) {
    console.error(error);
  }
}

export async function editKiosk(kioskData: IEditKioskSchema, userName: string) {
  try {
    await axios.put(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks/${kioskData.id}`,
      kioskData
    );
    createLog('edited', kioskData.id, userName);
  } catch (error) {
    console.error(error);
  }
}

export async function createKiosk(
  kioskData: ICreateKioskSchema,
  userName: string
) {
  try {
    const response = await axios.post(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks`,
      kioskData
    );
    createLog('created', response.data.id, userName);
  } catch (error) {
    console.error(error);
  }
}

export async function getKiosksLogs() {
  try {
    const response = await axios.get(
      `https://62ae53bab735b6d16a41285f.mockapi.io/api/log`
    );
    return response.data;
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
  return;
}

export function useKiosk() {
  const setKiosk = useSetRecoilState(kioskAtom);
  const setFilteredKiosks = useSetRecoilState(filteredKiosksAtom);

  function handleIsOpenProperty(allKiosks: IKiosk) {
    const time = moment();
    const kiosksWithOpenProperty = allKiosks.map(
      (eachKiosk: IKioskProperties) => {
        const beforeTime = moment(eachKiosk.storeOpeningTime, 'hh:mm');
        const afterTime = moment(eachKiosk.storeClosingTime, 'hh:mm');
        if (time.isBetween(beforeTime, afterTime)) {
          eachKiosk.isOpen = 'open';
        } else {
          eachKiosk.isOpen = 'closed';
        }
        return eachKiosk;
      }
    );
    return kiosksWithOpenProperty;
  }

  useEffect(() => {
    async function getAllKiosks() {
      try {
        const response = await axios.get(
          `https://62ae53bab735b6d16a41285f.mockapi.io/api/kiosks`
        );
        const treatedKiosks = handleIsOpenProperty(response.data);
        setKiosk(treatedKiosks);
        setFilteredKiosks(treatedKiosks);
        return response;
      } catch (error) {
        console.error(error);
      }
      return;
    }
    getAllKiosks();
  }, [setFilteredKiosks, setKiosk]);
}
