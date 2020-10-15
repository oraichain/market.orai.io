import React from 'react';
import { Link } from "umi";
export const NavDataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: '/images/favicon.png'
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: 'https://orai.io/',
          children: [
            {
              children: (
                <span>
                  <p>Home</p>
                </span>
              ),
              name: 'text',
            },
          ],
        },
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'Product', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Testnet',
                  href: "https://scan.orai.io/"
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Yield Farming',
                  href: 'https://yield.orai.io/'
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'Sale', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Seed Sale',
                  href: 'https://medium.com/oraichain/guideline-for-orai-seed-sale-c23a903c89c5'
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Token Economics',
                  href: 'https://orai.io/economics'
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: '#',
          children: [{ children: 'About', name: 'text' }],
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Team',
                  href: 'https://orai.io/#team'
                },
              ],
            },
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Road map',
                  href: 'https://orai.io/roadmap'
                },
              ],
            },
          },
          {
            name: 'sub2',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'content',
                  className: 'item-content',
                  children: 'Community',
                  href: 'https://t.me/oraichain_official'
                },
              ],
            },
          },
        ],
      },
      {
        name: 'item4',
        className: 'header0-item',
        children: {
          href: 'https://docs.orai.io/docs/',
          children: [
            {
              children: (
                <span>
                  <p>Whitepaper</p>
                </span>
              ),
              name: 'text',
            },
          ],
        },
      },
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};

export const Footer10DataSource = {
  wrapper: { className: 'home-page-wrapper footer1-wrapper' },
  OverPack: { className: 'footer1', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block1',
        xs: 24,
        md: 12,
        className: 'block',
        title: { children: 'General Inquiries' },
        childWrapper: {
          children: [
            { name: 'link0', href: 'mailto:contact@orai.io', children: 'contact@orai.io' },
            { 
              name: 'link1', 
              children: (
                <span>
                  <p>
                    Technical Support
                  </p>
                </span>
              ), 
            },
            { name: 'link2', href: 'mailto:support@orai.io', children: 'support@orai.io' },
            { 
              name: 'link3', 
              children: (
                <span>
                  <p>
                  We can be mailed at:
                  </p>
                </span>
              ), 
            },
            { 
              name: 'link4', 
              children: (
                <span>
                  <p>
                  Oraichain Pte. Ltd.
                  </p>
                </span>
              ), 
            },
            { 
              name: 'link5', 
              children: (
                <span>
                  <p>
                  68 Circular Road, #02-01, 049422, Singapore
                  </p>
                </span>
              ), 
            },
          ],
        },
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Product' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Provider Marketplaces' },
            { href: '#', name: 'link1', children: 'Testcase Marketplaces' },
          ],
        },
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: { children: 'Company' },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Partners' },
            { href: '#', name: 'link1', children: 'Investors' },
            { href: '#', name: 'link2', children: 'FAQ' },
          ],
        },
      },
    ],
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: [
      <img src="/images/favicon.png" width="60"  />,
      <div style={{
        width: "100%"
      }}>
        <a 
          href="https://orai.io/"
          style={{
            fontSize: 25,
            marginLeft: 10,
            marginRight: 20,
          }}
        >
          Oraichain
        </a>
        <span>
          ©2020 <a href="https://orai.io/">Oraichain Pte. Ltd.</a> All rights reserved.
        </span>
        <span style={{
          float: "right"
        }}>
          <a href="#" style={{marginRight: 10}}>
            Privacy Policy
          </a>
          <a href="#" style={{marginRight: 10}}>
            Customer Support
          </a>
          <a href="#" style={{marginRight: 10}}>
            Careers
          </a>
        </span>
      </div>,
    ]
  },
};