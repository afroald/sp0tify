import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './authorization/authorization-context';
import { Index } from './index';
import { Login, LoginCallback } from './login';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
