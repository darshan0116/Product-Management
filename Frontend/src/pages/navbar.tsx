import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';


const { Content } = Layout;

const NavbarPage = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{
        minHeight: 'calc(100vh - 64px)', // Adjust height based on Header height
        padding: '20px',
      }}>

        <Outlet />
      </Content>
    </Layout>
  );
};

export default NavbarPage;
