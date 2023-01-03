import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../../Theme';

const Nav = styled.nav`
  text-align: center;
`;
const NavList = styled.ul`
  display: flex;
  justify-content: center;
`;

const NavListItem = styled.li`
  margin: 0 1rem;
`;

const links = [
  {
    path: '/upcoming-trips',
    title: 'Upcoming Trips',
  },
  {
    path: '/plan-trip',
    title: 'Plan a Trip',
  },
];

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        {links.map((link) => (
          <NavListItem key={link.path}>
            <NavLink
              to={link.path}
              style={({ isActive }) => {
                return {
                  color: isActive
                    ? theme.colors.grey['800']
                    : theme.colors.grey['400'],
                  fontWeight: isActive ? 'bold' : 'normal',
                  textDecoration: isActive ? 'underline' : 'none',
                };
              }}
            >
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
