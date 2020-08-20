import React from 'react';
import { css } from 'styled-components/macro';
import { Permutation } from './../types/Permutation';
import { PermutationCard } from './PermutationCard';

const styledContainer = css`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content: center;
`;

type Props = {
  handleClick: (id: string) => void;
  permutationOptions: Permutation[];
};


export const PermutationContainer = ({
    permutationOptions,
    handleClick,
}: Props) => {
  return (
    <div css={styledContainer}>
      {permutationOptions.map((option) => {
        return (
          <PermutationCard 
            key={option.id} permutation={option}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};