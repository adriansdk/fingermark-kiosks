// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import {
  deleteKiosk,
  IKiosk,
  kioskAtom,
} from '@fingermark-workspace/data-access';

function KioskTable() {
  const [kiosks, setKiosks] = useRecoilState<IKiosk>(kioskAtom);

  function handleDeleteKiosk(kioskId: string) {
    deleteKiosk(kioskId);
    const updatedList = kiosks.filter((eachKiosk) => {
      return eachKiosk.id !== kioskId;
    });
    setKiosks(updatedList);
  }

  function handleKioskRender() {
    const kioskRows = kiosks.map((eachKiosk, idx) => {
      return (
        <tr key={eachKiosk.id}>
          <td>{kiosks[idx].id}</td>
          <td>{kiosks[idx].serialKey}</td>
          <td>{kiosks[idx].description}</td>
          <td>{kiosks[idx].isKioskActive.toString()}</td>
          <td>{kiosks[idx].storeOpeningTime}</td>
          <td>{kiosks[idx].storeClosingTime}</td>
          <td>
            <Link to="log">Change Log</Link>
          </td>
          <td>
            <Link to={`edit/${eachKiosk.id}`}>Edit</Link>
          </td>
          <td>
            <button onClick={() => handleDeleteKiosk(eachKiosk.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return kioskRows;
  }

  if (kiosks.length > 0) {
    console.log(kiosks[0]);
    return (
      <div>
        <h1>Kiosks list</h1>{' '}
        <span>
          <Link to="create">Create Kiosk</Link>
        </span>
        <table className="kioskTable">
          <tr>
            <th>ID</th>
            <th>Serial Key</th>
            <th>Description</th>
            <th>Is Kiosk Open</th>
            <th>Opens at:</th>
            <th>Closes at:</th>
          </tr>
          {handleKioskRender()}
        </table>
      </div>
    );
  } else return <div></div>;
}

export default KioskTable;
