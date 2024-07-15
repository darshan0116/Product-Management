
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../../hooks/reduxHooks';




const { Header } = Layout;


const Navbar: React.FC = () => {
  const {CartData}  = useAppSelector((state) => state.cart)

  const length = CartData.length
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: '/',
      label: 'Home',
    },
    {
      key:'/manageProducts',
      label:'Manage Products'
    },
  
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: length > 0 ? `Cart (${length})` : 'Cart'
      // label:'Cart'
    }
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const selectedKey = location.pathname;
  return (
    <Header className="navbar">
      <div className="logo">
        <img src="/satvaLogo.png" alt="logo"  />
      </div>
      <Menu mode="horizontal" className="menu" items={items} onClick={onClick} selectedKeys={[selectedKey]}  style={{ flex: 'auto', minWidth: 0 , justifyContent: 'end' }}>

      </Menu>
    </Header>
  );
};

export default Navbar;
