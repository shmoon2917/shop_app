import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import { LeftMenu } from './Sections/LeftMenu';
import { RightMenu } from './Sections/RightMenu';
import AuthService from '../../../_services/auth.service';
import { logoutUserThunk } from '../../../_modules/user';
import './Sections/NavBar.css';

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <nav
        className="menu"
        style={{ position: 'fixed', zIndex: 5, width: '100%' }}
      >
        <div className="menu__logo">
          <a href="/">Logo</a>
        </div>
        <div className="menu__container">
          <div className="menu__left">
            <LeftMenu mode="horizontal" />
          </div>
          <div className="menu__right">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            className="menu__mobile-button"
            type="primary"
            onClick={showDrawer}
          >
            <AlignRightOutlined />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu__drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          ></Drawer>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
