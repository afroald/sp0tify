import { Outlet } from 'react-router-dom';
import { MainLayout } from './layout/main-layout';
import { SideBar } from './side-bar';

export const Index = () => (
  <MainLayout sideBar={<SideBar />}>
    <Outlet />
  </MainLayout>
);
