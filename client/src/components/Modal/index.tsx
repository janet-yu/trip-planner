import React from 'react';
import styled from 'styled-components';
import { device } from '../../utils/mediaQueries';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalPopup = styled.div`
  background: #fff;
  position: absolute;
  padding: 24px;
  bottom: 0;
  width: 100%;
  border-radius: 16px 16px 0 0;
  height: 50vh;
  overflow-y: auto;

  @media ${device.tablet} {
    border-radius: 16px;
    width: 40%;
    max-width: 500px;
    top: 50%;
    left: 50%;
    bottom: auto;
    height: auto;
    transform: translate(-50%, -50%);
`;

const Modal = ({
  children,
  setModalClose
}: {
  children: JSX.Element;
  setModalClose: () => void;
}) => {
  return (
    <ModalContainer>
      <Overlay onClick={setModalClose} />
      <ModalPopup>{children}</ModalPopup>
    </ModalContainer>
  );
};

export default Modal;
