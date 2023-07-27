import React from 'react';
import styled from 'styled-components';

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
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  min-width: 40%;
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
