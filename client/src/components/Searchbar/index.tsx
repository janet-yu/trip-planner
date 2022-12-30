import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DropDown, { Item } from './SearchDropDown';
import { theme as Theme } from '../../Theme';

const SearchContainer = styled.div`
  position: relative;
`;

const TextInput = styled.input`
  border: none;
  flex-grow: 1;
  :focus {
    outline: none;
  }
  padding-left: 0.5em;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.primary['800']};
  background: none;
`;

const SearchbarContainer = styled.div`
  padding: 0.5em;
  display: flex;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary['800']};
  align-items: center;
`;

type SearchbarProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  items: Item[] | undefined;
  value: string;
  clearSuggestions: any;
};

/**
 * Searchabr dropdown items
 * @param props
 */
const Searchbar = (props: SearchbarProps) => {
  const theme = useTheme() as typeof Theme;
  const [showDropDown, setShowDropDown] = useState(false);
  const { items, value, onChange, setFieldValue, clearSuggestions } = props;

  useEffect(() => {
    if (items?.length) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }, [items]);

  return (
    <SearchContainer>
      <SearchbarContainer
        role="search"
        aria-label="Location search"
        aria-description="Search for the location"
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ width: 20, height: 20, color: theme.colors.primary['800'] }}
        />
        <TextInput
          placeholder="Search"
          name="place.value"
          aria-label="Search"
          role="searchbox"
          value={value}
          onChange={onChange}
        />
      </SearchbarContainer>
      {items && showDropDown && (
        <DropDown
          items={items}
          setFieldValue={setFieldValue}
          setShowDropDown={setShowDropDown}
          clearSuggestions={clearSuggestions}
        />
      )}
    </SearchContainer>
  );
};

export default Searchbar;
