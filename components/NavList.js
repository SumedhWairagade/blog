import React from 'react';
import styled, { keyframes } from 'styled-components';
import isAbsoluteUrl from 'is-absolute-url';
import { FormattedMessage } from 'react-intl';
import Link from './LinkWithData';

const NavLinks = [
  {
    name: <FormattedMessage id="NavList.home" defaultMessage="Home" />,
    slug: '/',
  },
  {
    name: <FormattedMessage id="NavList.github" defaultMessage="GitHub" />,
    slug: 'https://github.com/mcansh',
  },
  {
    name: <FormattedMessage id="NavList.twitter" defaultMessage="Twitter" />,
    slug: 'https://twitter.com/loganmcansh',
  },
  {
    name: (
      <FormattedMessage id="NavList.instagram" defaultMessage="Instagram" />
    ),
    slug: 'https://instagram.com/loganmcansh',
  },
  {
    name: <FormattedMessage id="NavList.email" defaultMessage="Email" />,
    slug: 'mailto:logan@mcan.sh',
  },
  {
    name: (
      <FormattedMessage id="NavList.changelog" defaultMessage="Changelog" />
    ),
    slug: '/changelog',
  },
];

const openNav = keyframes`
  0% {
    transform: translate3d(-100vw, 0, 0);
  }
  100% {
    transform: none;
  }
`;

const NavStyles = styled.ul`
  height: 100vh;
  max-width: 40rem;
  width: 95%;
  position: fixed;
  background: black;
  top: 0;
  left: 0;
  z-index: 3;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0.4rem 0 1.5rem 0.3rem rgba(0, 0, 0, 0.4);
  will-change: transform;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  animation: ${openNav} 250ms ease;

  li {
    margin: 1rem 0;
    color: white;

    a {
      color: currentcolor;
      text-decoration: none;
      font-size: 3rem;
      &:hover {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const NavList = () => (
  <NavStyles>
    {NavLinks.map(({ name, slug }) => {
      const isExternal = isAbsoluteUrl(slug);
      return (
        <li key={name.props.defaultMessage}>
          <Link href={slug} prefetch={!isExternal}>
            <a
              rel={isExternal ? 'noopener external nofollow' : ''}
              target={isExternal ? '_blank' : ''}
            >
              {name}
            </a>
          </Link>
        </li>
      );
    })}
  </NavStyles>
);

export default NavList;
