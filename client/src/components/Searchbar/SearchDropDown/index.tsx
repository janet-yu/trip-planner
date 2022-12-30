import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const TextWrapper = styled.div`
  padding-left: 1em;
`;

const DropDownItem = styled.button<{ lastItem: boolean }>`
  border: none;
  background: none;
  text-align: left;
  padding-left: 1em;
  display: flex;
  padding: 1em;
  align-items: center;
  width: 100%;

  ${(props) =>
    !props.lastItem &&
    css`
      border-bottom: 2px solid #d0d6ef;
    `}

  :hover {
    background-color: ${(props) => props.theme.colors.primary['50']};
    cursor: pointer;
  }
`;

const ItemTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  margin-bottom: 4px;
`;

const ItemSubtitle = styled.p`
  font-size: 12px;
  margin: 0;
  color: #646464;
`;

export type Item = {
  title: string;
  subtitle?: string;
  value: string;
};

// why was the div not 100% width by default?
const DropDownContainer = styled.div`
  position: absolute;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 5px #ddd;
  background-color: #fff;
  width: 100%;
`;

type DropDownProps = {
  items: Item[];
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  clearSuggestions: any;
};

const DropDown = ({
  items,
  setFieldValue,
  setShowDropDown,
  clearSuggestions,
}: DropDownProps) => {
  const renderDropDown = (items: Item[]) => {
    const handleOnClick = (item: Item) => {
      setFieldValue('place.id', item.value);
      setFieldValue('place.value', item.title);
      setShowDropDown(false);
      clearSuggestions();
    };

    return items.map((item, idx) => (
      <DropDownItem
        role="option"
        lastItem={idx === items.length - 1}
        type="button"
        onClick={() => handleOnClick(item)}
      >
        <FontAwesomeIcon icon={faLocationDot} />
        <TextWrapper>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemSubtitle>{item.subtitle}</ItemSubtitle>
        </TextWrapper>
      </DropDownItem>
    ));
  };

  return (
    <DropDownContainer role="listbox">
      {items.length && renderDropDown(items)}
    </DropDownContainer>
  );
};

export default DropDown;
