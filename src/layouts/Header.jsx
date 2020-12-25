import React from 'react';
import { Link } from 'umi';
import { Row, Col, Menu, Dropdown } from 'antd';
import copy from 'copy-to-clipboard';
import { CaretDownOutlined } from '@ant-design/icons';

import Keystation from '@/utils/Keystation';
import { ReactComponent as CopyIcon } from '@/assets/copy.svg';
import { ReactComponent as ShareIcon } from '@/assets/share.svg';

import PhoneNav from './PhoneNav';
import { WALLET_API_URL } from '../../config/constant';

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

const handleClickConnectWallet = () => {
  const myKeystation = new Keystation({
    client: WALLET_API_URL,
    lcd: 'https://lcd-cosmos-free.cosmostation.io',
    path: '44/118/0/0/0',
    keystationUrl: WALLET_API_URL,
  });

  const prefix = 'cosmos';
  const popup = myKeystation.openWindow('signin', prefix);
  const popupTick = setInterval(function () {
    if (popup.closed) {
      clearInterval(popupTick);
    }
  }, 500);
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletAddress: null,
    };
  }

  componentDidMount() { 
    this.setState({
      walletAddress: window.localStorage.getItem('wallet_address'),
    });

    window.addEventListener('message', this.handleConnectWallet, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleConnectWallet);
  }

  handleConnectWallet = (e) => {
    if (e?.data?.address) {
      window.localStorage.setItem('wallet_address', e.data.address);
      this.setState({
        walletAddress: e.data.address,
      });
    }
  };

  connectWallet = (e) => {
    e.preventDefault();
    handleClickConnectWallet();
  };

  closeWallet = () => {
    this.setState({
      walletAddress: '',
    });
    window.localStorage.setItem('wallet_address', '');
  };

  renderWallet = () => {
    if (!this.state.walletAddress) {
      return (
        <Menu.Item key="wallet">
          <a href="https://docs.orai.io/docs/whitepaper/introduction/" onClick={this.connectWallet}>
            Connect Wallet
          </a>
        </Menu.Item>
      );
    }
    const profile = (
      <Menu>
        <div className="orai-profile">
          <div className="wallet-name">Address (your name here)</div>
          <div className="wallet-link">
            <a href="/" onClick={(e) => e.preventDefault()}>
              {this.state.walletAddress}
            </a>
            <span className="wallet-copy" onClick={() => copy(this.state.walletAddress)}>
              <CopyIcon />
            </span>
            <span className="wallet-share">
              <ShareIcon />
            </span>
          </div>
          <div className="orai-btn-group">
            <div className="btn-orai change-wallet" onClick={handleClickConnectWallet}>
              Change Wallet
            </div>
            <div className="btn-orai close-wallet" onClick={this.closeWallet}>
              Close Wallet
            </div>
          </div>
        </div>
      </Menu>
    );
    return (
      <Menu.Item key="wallet">
        <Dropdown overlay={profile} placement="bottomRight">
          <i className="fa fa-user-circle" aria-hidden="true" />
        </Dropdown>
      </Menu.Item>
    );
  };

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
        {/* {this.renderWallet()} */}
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
            <Link className="logo" to="/">
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
                  fontFamily: 'Roboto, sans-serif',
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
