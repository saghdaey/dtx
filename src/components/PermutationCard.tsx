import React from 'react';
import styled from 'styled-components';
import { getColor, getCallToActionText } from './../helpers';
import { Permutation } from './../types/Permutation';


const StyledCard = styled.div<{ colorInput: string; isSelected: boolean | undefined }>`
  background-color: ${({ colorInput }) => colorInput};
  color: white;
  display: flex;
  flex-direction: column;
  margin: 12px;
  padding: 16px 8px;
  width: 160px;

  &:hover{
    cursor: pointer;
    opacity:0.7;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  outline: ${({ isSelected }) => {return isSelected ? '3px solid red' : 'none'}}; 
`;


type Props = {
    permutation: Permutation;
    handleClick: (id: string) => void;

};
 
const PermutationCard = ({
    permutation, handleClick
}: Props) => {
  const color = getColor(permutation);
  const actionText = getCallToActionText(permutation);
    const {
        id, brand, selected
     } = permutation;

  return (
    <StyledCard className="capitalize" colorInput={color} isSelected={selected} onClick={()=>handleClick(id)}>
      <div>brand:{' '} 
        <span><b>{brand}</b></span>
      </div>
      <br/>
      <div>color: <br/>{color}</div>
      <br/>
      <div>call to action: <br/><b><i>{actionText}</i></b></div>
    </StyledCard>
  );
};

export { PermutationCard }