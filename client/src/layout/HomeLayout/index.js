import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'layout/HomeLayout/Header';
import Footer from './Footer';

function HomeLayout() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default HomeLayout;
