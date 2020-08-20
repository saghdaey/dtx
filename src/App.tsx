import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { PROXY_URL, FLOW_CODE_URL, FETCH_DATA_ERROR, LOADING_MESSAGE } from './constants';
import './App.css';
import { Page } from './types/Page';
import { Permutation } from './types/Permutation';
import { PermutationContainer } from './components/PermutationContainer';
import { Summary } from './components/Summary';
import { css } from 'styled-components/macro';

const contentContainer = css`
  display:flex;
  flex-direction:column;
`;

const buttonContainer = css`
  text-align:center;
  margin: 0 auto;
  padding-top:20px;
  button:first-child{
    margin-right:16px;
  }
`;

const buttonStyle = css`
  width: 150px;
  padding: 8px;
  :hover{
    cursor:pointer;
  }
  :disabled{
    cursor:not-allowed;
  }
`;

const App: React.FC = () => {

  const [activePage, setActivePage] = useState<Page>('chooseSelections');
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError]=useState<string>('');
  const [permutations, setPermutations]=useState<Permutation[]>([]);

  const fetchPermutations = async () => {
    setApiError('');
    setLoading(true);
    try {
      const { data } = await axios.get(PROXY_URL + FLOW_CODE_URL);
      let formattedPermutations: Array<Permutation> = [];
      for(const permutation of data){
        formattedPermutations.push({
          ...permutation,
          selected: false,
        });
      };
      setPermutations(formattedPermutations);
    } catch (error) {
      setApiError(FETCH_DATA_ERROR);
    }
    setLoading(false);
  };

  useEffect(() => {  
      fetchPermutations();
    }, []);

  const handleSelect = (permutationId: string) => {
    const updatedData: Permutation[] = permutations.map((permutation) => {
      if (permutation.id === permutationId) {
        return {
          ...permutation,
          selected: !permutation.selected, // toggle selected value
        };
      } else {
        return permutation;
      }
    });
    setPermutations(updatedData); // update state
  };

  const deselectAll = () => { // replace state w/ Permutations array s.t. each permutation has selected: false
    const updatedData: Permutation[] = permutations.map((permutation) => {
      return {
        ...permutation,
        selected: false,
      };
    });
    setPermutations(updatedData);
  };

  const viewSummary = () => {
    setActivePage('summary');
  };
  const viewSelectionsPage = () => {
    setActivePage('chooseSelections');
  };

  const selectedPermutations:Permutation[] = permutations.filter((permutation) => permutation.selected);
  const selectionsEmpty = selectedPermutations.length<1; // create a constant for this seeing using more than once

  return (
    <div className="App">
      <header className="App-header">
        <h3> Permutation Wizard</h3>
      </header>
      {loading && 
        <div>{LOADING_MESSAGE}</div>
      }
      {apiError && 
        <div className="App-error">{apiError}</div>
      }
      {permutations && 
        <div css={contentContainer}>
          {activePage==='chooseSelections' ? 
            <Fragment>
              <h1>Hello! Please see below for permutations available to you.</h1>
              <h2>Select anywhere between 1 and {permutations.length} permutations.</h2>
              <PermutationContainer 
                permutationOptions={permutations}
                handleClick={handleSelect}
              />
              <div css={buttonContainer}>
                <button type="button" css={buttonStyle} onClick={deselectAll} disabled={selectionsEmpty}>remove selections</button>
                <button type="submit" css={buttonStyle} onClick={viewSummary} disabled={selectionsEmpty}>submit selections</button>
              </div>
            </Fragment> : 
            <div>
              <Summary goBack={viewSelectionsPage} selections={selectedPermutations}/>
            </div>
          }

        </div>
      }
    </div>
  );
}

export { App };
