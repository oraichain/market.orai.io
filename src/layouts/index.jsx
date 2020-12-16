import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { enquireScreen } from 'enquire-js';
import Animate from 'rc-animate';
import './less/index.less';

import Header from './Header';
import Footer from './Footer';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});
class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    return (
      <IntlProvider locale="en">
        <ConfigProvider locale="en">
          <div>
            <div className="header-placeholder" />
            <Header {...restProps} isMobile={this.state.isMobile} />
            <Animate component="div" transitionName="landing-move">
              {children}
            </Animate>
            <Footer {...restProps} isMobile={this.state.isMobile} />
          </div>
        </ConfigProvider>
      </IntlProvider>
    );
  }
}

export default Layout;
