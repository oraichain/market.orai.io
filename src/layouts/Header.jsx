import React from 'react';
import { Link } from 'umi';
import { Row, Col, Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import PhoneNav from './PhoneNav';

const products = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://scan.orai.io">
        Testnet
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://yai.finance">
        yAI.Finance
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://market.orai.io/">
        Marketplace
      </a>
    </Menu.Item>
  </Menu>
);

const about = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://orai.io/#team">
        Team
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://orai.io/roadmap">
        Roadmap
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://t.me/oraichain_official">
        Community
      </a>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component {
  getMenuToRender = () => {
    const { isMobile } = this.props;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    return (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="aiVault">
          <Link to="/aivaults">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Dropdown overlay={products}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Products
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://orai.io/Tokenomics">
            Tokenomics
          </a>
        </Menu.Item>
        <Menu.Item key="community">
          <Dropdown overlay={about}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              About
            </a>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="twitter">
          <a href="https://docs.orai.io/docs/whitepaper/introduction/" target="_blank">
            Whitepaper
          </a>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { isMobile } = this.props;
    const menu = this.getMenuToRender();
    return (
      <div id="header" className="header page-wrapper">
        {isMobile && <PhoneNav>{menu}</PhoneNav>}
        <Row className="page">
          <Col md={6} sm={24}>
            <Link className="logo" to={'/'}>
              <img
                alt="logo"
                src="https://res.cloudinary.com/djy5gktft/image/upload/v1601636529/ORAI/240x240_bchsqx.png"
                style={{
                  height: 28,
                  width: 28,
                }}
              />
              <span
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Oraichain
              </span>
            </Link>
          </Col>
          {!isMobile && (
            <Col md={18} sm={0}>
              <div className="menu">{menu}</div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Header;
