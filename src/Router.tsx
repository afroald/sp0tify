import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArtistBrowser } from './artist-browser';
import { RequireAuth } from './authorization/authorization-context';
import { Index } from './index';
import { Login, LoginCallback } from './login';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Index />}>
          <Route path="/artists/:artistId" element={<ArtistBrowser />} />
          <Route path="/artists" element={<ArtistBrowser />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
