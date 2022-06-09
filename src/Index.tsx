import { Outlet } from 'react-router-dom';
import { MainLayout } from './layout/main-layout';
import { NowPlayingBar } from './playback/now-playing-bar';
import { SideBar } from './side-bar/side-bar';

export const Index = () => (
  <MainLayout sideBar={<SideBar />} bottomBar={<NowPlayingBar />}>
    <Outlet />
  </MainLayout>
);
