import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/app';
import EditKiosk from './app/pages/EditKiosk';
import KioskLog from './app/pages/KioskLog';
import CreateKiosk from './app/pages/CreateKiosk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateKiosk />} />
          <Route path="/log" element={<KioskLog />} />
          <Route path="/edit/:id" element={<EditKiosk />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
