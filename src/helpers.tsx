import { Permutation } from './types/Permutation';

export const getColor = (permutation: Permutation): string=> {
    return permutation.variables[0]; 
}

export const getCallToActionText = (permutation: Permutation): string => {
    return permutation.variables[1];
}