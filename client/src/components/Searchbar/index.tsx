import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DropDown from './SearchDropDown';

const TextInput = styled.input`
  border: none;
  flex-grow: 1;
  :focus {
    outline: none;
  }
  padding-left: 0.5em;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.primary['800']};
`;

const SearchbarContainer = styled.div`
  padding: 0.5em;
  display: flex;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary['800']};
  align-items: center;
`;

type SearchbarProps = {
  onSelect?: any;
  onChange?: any;
  items?: any[];
};
/**
 * Searchabr dropdown items
 * @param props
 */
const Searchbar = (props: SearchbarProps) => {
  const theme = useTheme();
  const { items } = props;

  return (
    <div>
      <SearchbarContainer role="search">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ width: 20, height: 20, color: theme.colors.primary['800'] }}
        />
        <TextInput placeholder="Search" />
      </SearchbarContainer>
      <DropDown />
    </div>
  );
};

export default Searchbar;
