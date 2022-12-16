import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey['400']};
  background: none;
  padding: 1em;
  width: 200px;
`;

const TextInput = (props: any) => {
  return <StyledInput {...props} />;
};

export default TextInput;
