import { iterate } from './iterate';
import { iterateDrupal } from './iterateDrupal';

export const displayData = (varState, varId, varData, setData) => {
  if (varState !== null && varState !== undefined && varId !== null) {
    // iterate(varState, '', 'racine', 'gp', varData, setData);
    iterate(varState, 'racine', '', 'chemin', varData, setData);
  } else if (varId === null || varId === undefined || varId === '') {
    setData([]);
  }
};

export const displayDataDrupal = (
  varState,
  varId,
  varData,
  setData,
  varImageArray
) => {
  if (varId !== null) {
    setData([]);
    varImageArray = [];
    iterateDrupal(
      varState,
      'racine',
      '',
      'chemin',
      varData,
      setData,
      varImageArray
    );
  } else {
    setData([]);
    varImageArray = [];
  }
};
