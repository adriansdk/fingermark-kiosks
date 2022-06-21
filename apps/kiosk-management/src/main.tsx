import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './app/app';
import EditKioskPage from './app/pages/EditKioskPage';
import KioskLogPage from './app/pages/KioskLogPage';
import CreateKioskPage from './app/pages/CreateKioskPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create" element={<CreateKioskPage />} />
          <Route path="/log/" element={<KioskLogPage />} />
          <Route path="/log/:id" element={<KioskLogPage />} />
          <Route path="/edit/:id" element={<EditKioskPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
