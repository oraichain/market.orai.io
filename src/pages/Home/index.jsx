import React from 'react';
import { enquireScreen } from 'enquire-js';
import Nav from './Nav';
import Footer1 from './Footer1';
import Scripts from "./Scripts"
import {
  NavDataSource,
  Footer10DataSource,
} from './data.source';
import './less/antMotionStyle.less';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
    };
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    const children = [
      <Nav
        id="Nav"
        key="Nav"
        dataSource={NavDataSource}
        isMobile={this.state.isMobile}
      />,
      <Scripts />,
      <Footer1
        id="Footer"
        key="Footer"
        dataSource={Footer10DataSource}
        isMobile={this.state.isMobile}
      />,
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >
        {children}
      </div>
    );
  }
}
