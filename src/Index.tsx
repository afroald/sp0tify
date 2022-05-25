import { Outlet } from 'react-router-dom';
import { MainLayout } from './layout/main-layout';
import { PlaybackBack } from './playback/playback-bar';
import { SideBar } from './side-bar';

export const Index = () => (
  <MainLayout sideBar={<SideBar />} bottomBar={<PlaybackBack />}>
    <Outlet />
  </MainLayout>
);
