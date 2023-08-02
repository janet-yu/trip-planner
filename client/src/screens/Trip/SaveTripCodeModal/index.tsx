import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import axios from 'axios';

const ModalContent = styled.div`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const TripCodeWrapper = styled.div`
  background: ${(props) => props.theme.colors.primary['50']};
  padding: 14px;
  border-radius: 8px;
`;

const TripCode = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary['800']};
  text-align: center;
`;

const SaveButton = styled(Button)`
  display: block;
  margin: 10px auto;
`;

const SaveTripCodeModal = ({ setModalClose, tripId }: { setModalClose: any; tripId: string }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Generate the trip code
    const generateTripCode = async () => {
      const request = {
        tripId
      };
      const updated = await axios.post(`${process.env.REACT_APP_API_URL}/trip-codes`, request);

      setCode(updated.data.code);
    };

    generateTripCode();
  }, []);

  return (
    <Modal setModalClose={setModalClose}>
      <ModalContent>
        <FormTitle>Trip Code</FormTitle>
        <TripCodeWrapper>{!!code && <TripCode>{code}</TripCode>}</TripCodeWrapper>
        <SaveButton variant="primary" mTop={10}>
          Copy code
        </SaveButton>
      </ModalContent>
    </Modal>
  );
};

export default SaveTripCodeModal;
