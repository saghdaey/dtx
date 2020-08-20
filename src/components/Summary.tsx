import React from 'react';
import { css } from 'styled-components/macro';
import { getColor, getCallToActionText } from './../helpers';
import { Permutation } from './../types/Permutation';

import { ReactComponent as QRCodeIcon } from './../assets/qr-code.svg';

const listStyle = css`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction:column;
    li{
        font-size: 20px;
        display: flex;
        align-items: center;
        :not(:last-child){
            margin-bottom:32px;
        }
        svg{
            margin:0 16px;
        }
        div{
            display:inline-block;
        }
    }
`;

type Props = {
  selections: Permutation[];
  goBack: ()=>void;
};

export const Summary = ({
    selections,
    goBack
}: Props) => {

  return (
    <div>
    <h1>You selected {selections.length} flowcode{selections.length>1 ? 's' : ''} to test:</h1>
     <ul css={listStyle}>
      {selections.map((selection) => {
        return (
          <li key={selection.name}>
            <QRCodeIcon width={'50px'} height={'50px'} fill={getColor(selection)}/>   
            {getCallToActionText(selection)}
            {' '}
            for the brand
            {' '}
            {selection.brand}. 
          </li>
        );
      })}
      </ul>
      <button onClick={goBack}>Edit selections</button>
    </div>
  );
};