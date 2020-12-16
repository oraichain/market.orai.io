import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'umi';

class Footer extends React.PureComponent {
  render() {
    return (
      <div className="footer">
        <Row gutter={16} id="footer-top">
          <Col xs={12} sm={4} md={4} lg={4}>
            <p>
              <b>General Inquiries</b>
            </p>
            <p>
              <u style={{ cursor: 'pointer' }}>contact@orai.io</u>
            </p>
            <p style={{ paddingTop: '10px' }}>
              <b>Technical support</b>
            </p>
            <p>
              <u style={{ cursor: 'pointer' }}>support@orai.io</u>
            </p>
          </Col>

          <Col xs={12} sm={8} md={8} lg={8}>
            <div className="sub-footer-2">
              <p>We can be mailed at:</p>
              <p>Oraichain Pte. Ltd.</p>
              <p>68 Circular Road, #02-01, 049422, Singapore</p>
            </div>
          </Col>

          <Col xs={12} sm={4} md={4} lg={4}>
            <p style={{ fontSize: '16px' }}>
              <b>About</b>
            </p>
            <p>
              <a
                style={{ color: '#8AA2C9' }}
                href="https://orai.io/presentations/intro.pdf"
                target="_blank"
              >
                Introduction
              </a>
            </p>
            <p>
              <a
                style={{ color: '#8AA2C9' }}
                href="https://orai.io/presentations/Binance-talk-Oct28-EN.pdf"
                target="_blank"
              >
                Binance Task
              </a>
            </p>
            <p style={{ color: '#8AA2C9' }}>
              <a
                href="https://gov.orai.io/c/knowledge-base/7"
                className="link-style"
                target="_blank"
              >
                FAQ
              </a>
            </p>
            <p>
              <a
                style={{ color: '#8AA2C9' }}
                href="https://drive.google.com/drive/u/0/folders/16AOw7DJNkLp4IryQEpp1kfzGdhoJWBc_"
                target="_blank"
              >
                Media Park
              </a>
            </p>
          </Col>

          <Col xs={12} sm={4} md={4} lg={4}>
            <p style={{ fontSize: '16px' }}>
              <b>Product</b>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://liquidity.orai.io/" target="_blank">
                MLE
              </a>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://scan.orai.io/" target="_blank">
                Testnet
              </a>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://yai.finance/" target="_blank">
                yAI.Finance
              </a>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://market.orai.io/oscript" target="_blank">
                Marketpalce
              </a>
            </p>
          </Col>
          <Col xs={12} sm={4} md={4} lg={4}>
            <p style={{ fontSize: '16px' }}>
              <b>Official Channels</b>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://twitter.com/oraichain" target="_blank">
                Twitter
              </a>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://t.me/oraichain" target="_blank">
                Telegram
              </a>
            </p>
            <p>
              <a
                style={{ color: '#8AA2C9' }}
                href="https://www.coingecko.com/en/coins/oraichain-token"
                target="_blank"
              >
                Coingecko
              </a>
            </p>
            <p>
              <a style={{ color: '#8AA2C9' }} href="https://medium.com/oraichain" target="_blank">
                Medium
              </a>
            </p>
          </Col>
        </Row>

        <Row id="footer-bottom">
          <div>
            <p>©2020 Oraichain Pte. Ltd. All rights reserved.</p>
          </div>

          <div className="privacy">
            <p>
              <a style={{ color: '#99AAC2' }} href="">
                Privacy Policy
              </a>
            </p>
            <p>
              <a style={{ color: '#99AAC2' }} href="">
                Customer Support
              </a>
            </p>
            <p>
              <a style={{ color: '#99AAC2' }} href="">
                Careers
              </a>
            </p>
          </div>
        </Row>
      </div>
    );
  }
}

export default Footer;
