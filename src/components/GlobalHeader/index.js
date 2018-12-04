import React, { PureComponent } from 'react';
import { Menu, Icon, Button, Dropdown, Avatar, Divider } from 'antd';
import { Link } from 'dva/router';
import styles from './index.less';

const avatarUrl = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
export default class GlobalHeader extends PureComponent {
  render() {
    const {
      currentUser, isMobile, logo, onMenuClick, handleLogin,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="personal"><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        {isMobile && (
          [
            (
              <Link to="/" className={styles.logo} key="logo">
                <img src={logo} alt="logo" width="32" />
              </Link>
            ),
            <Divider type="vertical" key="line" />,
          ]
        )}
        <div className={styles.right}>
          {currentUser.username ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={avatarUrl} />
                <span className={styles.name}>{currentUser.username}</span>
              </span>
            </Dropdown>
          ) : <Button onClick={handleLogin} type="primary">登录</Button>}
        </div>
      </div>
    );
  }
}
