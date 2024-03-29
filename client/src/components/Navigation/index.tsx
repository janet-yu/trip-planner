import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../../Theme';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const Nav = styled.nav`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: 48px;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
`;

const NavListItem = styled.li`
  margin: 0 1rem;
`;

type NavigationProps = {
  variant?: 'primary' | 'secondary';
};

const Navigation = (props: NavigationProps) => {
  const variant = props.variant ? props.variant : 'primary';
  const { setAuth } = useAuth();

  const links = [
    {
      path: '/upcoming-trips',
      title: 'Upcoming Trips'
    },
    {
      path: '/plan-trip',
      title: 'Plan a Trip'
    },
    {
      path: '/login',
      title: 'Logout',
      onClick: async () => {
        setAuth({
          accessToken: '',
          user: null
        });

        await axios.post('/users/logout');
      }
    }
  ];

  const getVariantTextColor = (isActive: boolean) => {
    switch (variant) {
      case 'primary': {
        if (isActive) {
          return theme.colors.grey['800'];
        }

        return theme.colors.grey['400'];
      }
      case 'secondary': {
        return '#fff';
      }
    }
  };

  return (
    <Nav>
      <NavList>
        {links.map((link) => (
          <NavListItem key={link.path}>
            <NavLink
              to={link.path}
              onClick={link.onClick}
              style={({ isActive }) => {
                return {
                  color: getVariantTextColor(isActive),
                  fontWeight: isActive ? 'bold' : 'normal',
                  textDecoration: isActive ? 'underline' : 'none'
                };
              }}>
              {link.title}
            </NavLink>
          </NavListItem>
        ))}
        <NavListItem></NavListItem>
      </NavList>
    </Nav>
  );
};

export default Navigation;
