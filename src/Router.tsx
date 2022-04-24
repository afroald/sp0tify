import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './AuthenticationContext';
import Index from './Index';
import Login from './Login';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
