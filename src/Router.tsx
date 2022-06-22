import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArtistBrowser } from './artists/artist-browser';
import { RequireAuth } from './authorization/authorization-context';
import { Index } from './index';
import { Login, LoginCallback } from './login';
import { Page } from './page';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<Page />}>
          <Route path="/artists/:artistId" element={<ArtistBrowser />} />
          <Route path="/artists" element={<ArtistBrowser />} />
          <Route path="/" element={<Index />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
