import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

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
    background-color: ${(props) => props.theme.colors.primary["50"]};
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

type Item = {
  title: string;
  subtitle?: string;
  value: string;
};

const DropDownContainer = styled.div`
  position: relative;
  top: 1rem;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 5px #ddd;
`;

const DropDown = (props: any) => {
  // Dummy data for now
  const items = [
    {
      title: "Calgary",
      subtitle: "Canada",
      value: "calgary, ca",
    },
    {
      title: "California",
      subtitle: "United States",
      value: "calgary, ca",
    },
  ];

  const renderDropDown = (items: Item[]) => {
    return items.map((item, idx) => (
      <DropDownItem role="option" lastItem={idx === items.length - 1}>
        <FontAwesomeIcon icon={faLocationDot} />
        <TextWrapper>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemSubtitle>{item.subtitle}</ItemSubtitle>
        </TextWrapper>
      </DropDownItem>
    ));
  };

  return (
    <DropDownContainer>
      {items.length && renderDropDown(items)}
    </DropDownContainer>
  );
};

export default DropDown;
